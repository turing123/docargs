require(["docargs/docargs"], function(docargs){
  var substrFunc = function(start, length) {
    eval(docargs.parse(arguments,
      "/** "+
      "* @param {number} start The position where to start the extraction "+
      "* @param {number=} length The number of characters to extract "+
      "* "+
      "*/"));
    
    assertHelper(start, length);
  };

  // the assert helper function to verify the argument parsing is correct
  var assertHelper = function() {};

  // the values for testing input
  var artifact_start = 1;
  var artifact_length = 23;

  test( "Call as substr(start, length)", function() {
    assertHelper = function(start, length) {
      ok(start === artifact_start);
      ok(length === artifact_length);
    };
    
    substrFunc(artifact_start, artifact_length);
  });

  test( "Call as substr(start)", function() {    
    assertHelper = function(start, length) {
      ok(start === artifact_start);
      ok(length === undefined);
    };
    
    substrFunc(artifact_start);  
  });

  test( "Invalid call as substr('hello')", function() {    
    throws(
      function() {
        substrFunc("hello");        
      }
    );
  });
});

