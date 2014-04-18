define([  
], function() {

var docargs;

function getDoc() {

}

function parseDoc() {

}

function parseParams() {  
}

docargs = {
  parse: function(args) {  
    var callee = args.callee;
    var callee.toString();
    console.log(args);
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
