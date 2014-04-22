define([ 
  "./Type"
], function(Type) {

var TypeString = function() {
};

TypeString.prototype = new Type();
TypeString.prototype.match = function(arg) {
  return typeof arg === "string";
};

return TypeString;
});
