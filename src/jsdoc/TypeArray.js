define([ 
  "./Type"
], function(Type) {

var TypeArray = function() {
};

TypeArray.prototype = new Type();
TypeArray.prototype.match = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};

return TypeArray;
});
