define([  
], function() {

var Param = function(name, optional, type) {
  this.name = name;
  this.optional = optional;
  this.type = type;
};

return Param;
});
