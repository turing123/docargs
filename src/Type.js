define([  
], function() {

var Type = {
  TYPE_STRING:    "String",
  TYPE_ARRAY:     "Array",
  TYPE_FUNCTION:  "Function",
  TYPE_OBJECT:    "TypeObject"
};

Type.getType = function(arg) {
  if (typeof arg === "string") {
    return Type.TYPE_STRING;
  }

  var toStr = Object.prototype.toString.call(arg);
  if (toStr === "[object Array]") {
    return Type.TYPE_ARRAY;
  }
  if (toStr === "[object Function]") {
    return Type.TYPE_STRING;
  }
  if (toStr === "[object Object]") {
    return Type.TYPE_STRING;
  }

  return undefined;
};

var OrType = function() {
  this.types = [];
};
OrType.prototype.addType = function(type) {
  this.types.push(type);  
};

return Type;
});
