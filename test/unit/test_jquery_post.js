require(["docargs/docargs"], function(docargs){
  var postFunc = function(url, data, success, dataType) {
    eval(docargs.parse(arguments,
      "/** "+
      "* @param {string} url The position where to start the extraction "+
      "* @param {object|string} [data] The number of characters to extract "+
      "* @param {function} [success] The number of characters to extract "+
      "* @param {string} [dataType] The number of characters to extract "+
      "* "+
      "*/"));
    
    assertHelper(url, data, success, dataType);
  };

  // the assert helper function to verify the argument parsing is correct
  var assertHelper = function() {};

  // the values for testing input
  var artifact_url = "http://my_post_url";
  var artifact_string_data = "my post data";
  var artifact_object_data = {myData: 123};
  var artifact_success = function(data, textStatus, jqXHR) {
    console.log("post success");
  };
  var artifact_dataType = "data_type";

  module("jQuery post function");
  test( "Call as post(url, success)", function() {
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === undefined);
      ok(success === artifact_success);
      ok(dataType === undefined);
    };
    
    postFunc(artifact_url, artifact_success);
  });

  test( "Call as post(url, success, dataType)", function() {
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === undefined);
      ok(success === artifact_success);
      ok(dataType === artifact_dataType);
    };
    
    postFunc(artifact_url, artifact_success, artifact_dataType);
  });

  test( "Call as post(url, string_data)", function() {    
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === artifact_string_data);
      ok(success === undefined);
      ok(dataType === undefined);
    };
    
    postFunc(artifact_url, artifact_string_data); 
  });

  test( "Call as post(url, object_data)", function() {    
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === artifact_object_data);
      ok(success === undefined);
      ok(dataType === undefined);
    };
    
    postFunc(artifact_url, artifact_object_data); 
  });

  test( "Call as post(url, string_data, dataType)", function() {    
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === artifact_string_data);
      ok(success === undefined);
      ok(dataType === artifact_dataType);
    };
    
    postFunc(artifact_url, artifact_string_data, artifact_dataType); 
  });

  test( "Call as post(url, string_data, success, dataType)", function() {    
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === artifact_string_data);
      ok(success === artifact_success);
      ok(dataType === artifact_dataType);
    };
    
    postFunc(artifact_url, artifact_string_data, artifact_success, artifact_dataType); 
  });

  test( "Call as post(url, object_data, success, dataType)", function() {    
    assertHelper = function(url, data, success, dataType) {
      ok(url === artifact_url);
      ok(data === artifact_object_data);
      ok(success === artifact_success);
      ok(dataType === artifact_dataType);
    };
    
    postFunc(artifact_url, artifact_object_data, artifact_success, artifact_dataType); 
  });

  test( "Invalid call as post({}, success)", function() {    
    throws(
      function() {
        postFunc(artifact_object_data, artifact_success);     
      }
    );
  });

  test( "Invalid call as post(url, 123)", function() {    
    throws(
      function() {
        postFunc(artifact_url, 123);     
      }
    );
  });
});

