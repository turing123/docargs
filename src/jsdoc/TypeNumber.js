define([ 
  "./Type"
], function(Type) {

var TypeNumber = function() {
};

TypeNumber.prototype = new Type();
TypeNumber.prototype.match = function(arg) {
  return typeof arg === "number";
};

return TypeNumber;
});
