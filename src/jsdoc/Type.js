define([  
  "./TypeString",
  "./TypeArray",
  "./TypeFunction",
  "./TypeObject",
  "./TypeOr"
], function(TypeString, TypeArray, TypeFunction, TypeObject, TypeOr) {

function _createType(typeString) {
  if (typeString.toLowerCase() === "string") {
    return new TypeString();
  }
  if (typeString.toLowerCase() === "array") {
    return new TypeArray();
  }
  if (typeString.toLowerCase() === "function") {
    return new TypeFunction();
  }
  if (typeString.toLowerCase() === "object") {
    return new TypeObject();
  }
  return undefined;
}

var Type = function() {
};

Type.prototype.match = function(arg) {
  return false;
};

Type.createType = function(typeDeclaration) {
  if (typeof typeDeclaration === "string") {
    return _createType(typeDeclaration);
  }
 
  if (typeDeclaration.length === 1) {
    return _createType(typeDeclaration[0]);
  }

  // otherwise, typeDeclaration is an array of multiple type declarations
  var typeOr = new TypeOr();
  var i;
  var subType;
  for (i=0; i<typeDeclaration.length; i++) {
    subType = _createType(typeDeclaration[i]);
    if (!subType) {
      return undefined;
    }

    typeOr.add(subType);
  }

  return typeOr;
};

return Type;
});
