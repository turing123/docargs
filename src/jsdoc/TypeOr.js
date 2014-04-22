define([ 
  "./Type"
], function(Type) {

var TypeOr = function(types) {  
  this.types = [];
  if (types) {
    this.types.concat(types);
  }
};

TypeOr.prototype = new Type();

TypeOr.prototype.add = function(type) {
  this.types.add(type);
};

TypeOr.prototype.match = function(arg) {
  var i;
  for (i=0; i<this.types.length; i++) {
    if (this.types[i].match(arg)) {
      return true;
    }

    return false;
  }
};

return TypeOr;
});
