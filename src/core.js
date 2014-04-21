define([  
], function() {

var docargs;

function getDoc() {

}

function parseDoc() {

}

function parseParams(doc) {  
  var token = "@param";
  var index = doc.indexOf(token);
  var nextIndex;
  var paramString;
  while (index > 0) {
    nextIndex = doc.indexOf(token, index+token.length);
    paramString = doc.substring(index, nextIndex>0?nextIndex:doc.length);    
    index = nextIndex;
  }
}

function parseParamDeclaration(paramString) {
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
}

function parseParamType(typeString) {
  // trim { and }
  typeString = typeString.substring(1, typeString.length-1);
  // replace the type "OR" operand with space
  typeString = typeString.replace("|", " ").trim();
  // replace multiple spaces with one spaces
  typeString = typeString.replace.replace(/[\s]+/g, " ");
  var types = typeString.split(" ");

  if (!types || types.length === 0) {
    throw new Error("Syntax error, param type is missing.");
  }

  var paramType;  
  if (types.length === 1) {

  } else {

  }

  return paramType;
}

docargs = {
  parse: function(args, doc) {  
    var callee = args.callee;
    var callee.toString();
    console.log(args);

    var nextToken = "@param";

    var index = doc.indexOf(nextToken);


    args[0] = "-1";
    args[1] = "createMap";
    args[2] = {};
    args[3] = function() {
      console.log("I am callback function.");
    };
    args[4] = function() {
      console.log("I am targetClass function.");
    };

    return "coreObjId = arguments[0];" +
      "methodName = arguments[1];" +
      "argJsonObj = arguments[2];" +
      "callback = arguments[3];" +
      "targetClass = arguments[4];";
  }
};

return docargs;
});
