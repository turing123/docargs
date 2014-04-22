define([ 
  "./Type"
], function(Type) {

var TypeObject = function() {
};

TypeObject.prototype = new Type();
TypeObject.prototype.match = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Object]";
};

return TypeObject;
});
