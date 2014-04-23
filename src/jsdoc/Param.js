define([  
], function() {

var Param = function(type, name, optional) {
  this.type = type;
  this.name = name;
  this.optional = optional;  
};

Param.prototype.isOptional = function() {
  return this.optional;
};

Param.prototype.match = function(arg) {
  return this.type.match(arg);
};

return Param;
});
