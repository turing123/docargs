define([
  "./jsdoc/Param",
  "./jsdoc/typeFactory"
], function(Param, typeFactory) {

var docargs;

function getDoc() {

}

function parseParams(doc) {  
  var token = "@param";
  var index = doc.indexOf(token);
  var nextIndex;
  var paramString;
  var params = [];
  while (index > 0) {
    nextIndex = doc.indexOf(token, index+token.length);
    paramString = doc.substring(index, nextIndex>0?nextIndex:doc.length); 
    params.push(parseParam(paramString));
    index = nextIndex;
  }

  return params;
}

function parseParam(paramString) {
  var typeStartIndex = paramString.indexOf("{");
  var typeEndIndexEnd = paramString.indexOf("}");
  var typeString = paramString.substring(typeStartIndex, typeEndIndexEnd + 1);
  if (!typeString) {
    throw new Error("Param type information is missing.");
  }

  var optional = false;
  if (typeString.indexOf("=") > 0) {
    // optional param for Google closure JSDOC
    var optionalString = typeString.substring(typeString.indexOf("="), typeString.length-1);
    if (optionalString.trim() !== "=") {
      throw new Error("Syntax error, invalid optional param.");
    }

    optional = true;
  }

  var paramType = parseParamType(typeString);

  var restString = paramString.substr(typeEndIndexEnd + 1).trim();
  var paramNamePattern = /\w[\S]+/;  
  var paramName = restString.match(paramNamePattern)[0];

  if (restString.charAt(0) === "[") {
    // optional param for JSDOC
    var paramNameEndIndex = restString.indexOf("]");
    if (paramNameEndIndex < 0) {
      throw new Error("Syntax error, invalid optional param, ] not found.");
    }

    optional = true;

    var paramNameStr = restString.substring(1, paramNameEndIndex).trim();
    paramName = paramNameStr.match(paramNamePattern)[0];
    if (paramName !== paramNameStr) {
      throw new Error("Syntax error, invalid param name.");
    }
  } else {    
    paramName = restString.match(paramNamePattern)[0];
  }

  if (!paramName) {
   throw new Error("Param name is missing."); 
  }

  // param parsing is done, we got the information type, name, optional  
  return new Param(paramType, paramName, optional);
}

function parseParamType(typeString) {
  // trim { and }
  typeString = typeString.substring(1, typeString.length-1);
  // replace the "optional" identifier
  typeString = typeString.replace("=", "").trim();
  // replace the type "OR" operand with space
  typeString = typeString.replace("|", " ").trim();
  // replace multiple spaces with one spaces
  typeString = typeString.replace(/[\s]+/g, " ");
  var types = typeString.split(" ");

  if (!types || types.length === 0) {
    throw new Error("Syntax error, param type is missing.");
  }

  return typeFactory.createType(types);
}

function getBestMatch(allMatches) {
  // TODO 
  // the best match should be decided by the priorities of 
  // the possible function invocations declared in the JSDOC
  return allMatches[0];
}

function convertMatch(params, args, match) {
  var i;
  var tempArgs = [];
  var pair;
  var paramIndex = 0;
  var evalStr = "";

  while(match.length > 0) {
    pair = match.shift();
    for (i=paramIndex; i<pair.paramIndex; i++) {
      tempArgs[i] = undefined;
    }

    tempArgs[i] = args[pair.argIndex];
    paramIndex = pair.paramIndex + 1;
  }

  for (i=paramIndex; i<params.length; i++) {
    tempArgs[i] = undefined;
  }
  
  args.length = tempArgs.length;
  for (i=0; i<tempArgs.length; i++) {
    args[i] = tempArgs[i];
    evalStr += params[i].name+"=arguments["+i+"];"
  }

  return evalStr;
}

docargs = {
  parse: function(args, doc) {  
    // alert("parsing...");
    var params = parseParams(doc);
    
    var argIndex = 0;
    var paramIndex = 0;
    
    var stack = [];
    var allMatches = [];

    var arg, param, argMatched, preArg, i, foundMatch;

    // do depth-first searching to find out all the possible matches
    do {
      arg = args[argIndex];
      argMatched = false;

      if (paramIndex < params.length) {
        param = params[paramIndex];
        if (param.match(arg)) {
          argMatched = true;
        }else if (param.isOptional()) {
          do {
            paramIndex++;
            param = params[paramIndex];
          } while(paramIndex<params.length && !param.match(arg));
          if (paramIndex < params.length) {
            argMatched = true;
          }
        }
      }

      if (argMatched) {
        stack.push({
          argIndex: argIndex,
          paramIndex: paramIndex
        });

        if (argIndex === args.length-1) {
          // we found one OK match
          foundMatch = [];
          for (i=0; i<stack.length; i++) {
            foundMatch.push(stack[i]);
          }
          allMatches.push(foundMatch);

          // retrospect to previous arg
          preArg = stack.pop();
          argIndex = preArg.argIndex;
          paramIndex = preArg.paramIndex + 1;
        } else {
          // go to next arg
          argIndex ++;
          paramIndex ++;
        }
      } else if (stack.length > 0) {
        // retrospect to previous arg
        preArg = stack.pop();
        argIndex = preArg.argIndex;
        paramIndex = preArg.paramIndex + 1;
      } else {
        // searching finished!
        break;
      }
    } while(true);

    if (allMatches.length === 0) {
      throw new Error("Invalid arguments.");
    }

    var bestMatch = getBestMatch(allMatches);
    return convertMatch(params, args, bestMatch);
  }
};

return docargs;
});
