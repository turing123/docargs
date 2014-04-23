require(["docargs/docargs"], function(docargs){
  var defineFunc = function(name, deps, callback, moduleObj) {
    /**
     * @param {string} [name] the module name
     * @param {array} [deps] the dependent modules
     * @param {function} [callback] the callback function to be called when the module is loaded
     * @param {object} [moduleObj] a plan object for the module
     * 
     */
    eval(docargs.parse(arguments));
    
    assertHelper(name, deps, callback, moduleObj);
  };

  // the assert helper function to verify the argument parsing is correct
  var assertHelper = function() {};

  // the values for testing input
  var artifact_name = "my module";
  var artifact_deps = ["dep1", "dep2", "dep3"];
  var artifact_callback = function() {
  };
  var artifact_moduleObj = {
    i: "1",
    s: "hello"
  };

  module("RequireJS define function (using plain JSDOC - not wrapped as a string variable)");
  test( "Call as define(deps, callback)", function() {
    assertHelper = function(name, deps, callback, moduleObj) {
      ok(name === undefined);
      ok(deps === artifact_deps);
      ok(callback === artifact_callback);
      ok(moduleObj === undefined);
    };
    
    defineFunc(artifact_deps, artifact_callback);
  });

  test( "Call as define(callback)", function() {    
    assertHelper = function(name, deps, callback, moduleObj) {
      ok(name === undefined);
      ok(deps === undefined);
      ok(callback === artifact_callback);
      ok(moduleObj === undefined);
    };
    
    defineFunc(artifact_callback);  
  });

  test( "Call as define(moduleObj)", function() {
    assertHelper = function(name, deps, callback, moduleObj) {
      ok(name === undefined);
      ok(deps === undefined);
      ok(callback === undefined);
      ok(moduleObj === artifact_moduleObj);
    };
    
    defineFunc(artifact_moduleObj);    
  });

  test( "Call as define(name, deps, callback)", function() {   
    assertHelper = function(name, deps, callback, moduleObj) {
      ok(name === artifact_name);
      ok(deps === artifact_deps);
      ok(callback === artifact_callback);
      ok(moduleObj === undefined);
    };
    
    defineFunc(artifact_name, artifact_deps, artifact_callback); 
  });

  test( "Call as define(name, callback)", function() {
    assertHelper = function(name, deps, callback, moduleObj) {
      ok(name === artifact_name);
      ok(deps === undefined);
      ok(callback === artifact_callback);
      ok(moduleObj === undefined);
    };
    
    defineFunc(artifact_name, artifact_callback);    
  });

  test( "Invalid call as define(name, callback, deps)", function() {   
    throws(
      function() {
        defineFunc(artifact_name, artifact_callback, artifact_deps);
      }
    );    
  });

  test( "Invalid call as define(123)", function() {
    throws(
      function() {
        defineFunc(123);        
      }
    );
  });

});

