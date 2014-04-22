define([ 
  "./Type"
], function(Type) {

var TypeFunction = function() {
};

TypeFunction.prototype = new Type();
TypeFunction.prototype.match = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Function]";
};

return TypeFunction;
});
