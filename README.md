DocArgs - Parse JavaScript function arguments simple and smart
================================================================

DocArgs means "you write the DOCuments, and i parse the ARGumentS".

It is common that JavaScript functions have very dynamic argument 
lists in which some arguments are optional, some are required, and
some may allow multiple types. 

DocArgs works this way: you just write the standard JSDoc to describe
the arguments, then call the simplest and the least APIs to parse the 
arguments, and then use the arguments directly.

Examples
-------

Take the `define` function of RequireJS as an example.
You declare the function and use "docargs" API this way:
```js
var docargs = require("docargs/docargs");

function define(name, deps, callback, moduleObj) {
  eval(docargs.parse(arguments,
    "/** "+
    "* @param {string} [name] the module name "+
    "* @param {array} [deps] the dependent modules "+
    "* @param {function} [callback] the callback function to be called when the module is loaded "+
    "* @param {object} [moduleObj] a plain object for the module "+
    "* "+
    "*/"));

  console.log("name=" + name); 
  console.log("deps=" + deps);
  console.log("callback=" + callback);
  console.log("moduleObj=" + JSON.stringify(moduleObj));
};
```
Then if you call
```js
define(["dep1", "dep2", "dep3"], function(){
	console.log("module loaded.");
});
```
you will get the output:
```
name=undefined
deps=dep1,dep2,dep3
callback=function(){
	console.log("module loaded.");
}
moduleObj=undefined
```
If you call
```js
define({
	a: 1,
	b: 2
});
```
you will get the output:
```
name=undefined
deps=undefined
callback=undefined
moduleObj={"a":1,"b":2}
```
And take the `post` function of jQuery as an example.
You declare the function and use "docargs" API this way:
```js
function post(url, data, success, dataType) {
  eval(docargs.parse(arguments,
    "/** "+
    "* @param {string} url The post url "+
    "* @param {object|string} [data] The post data "+
    "* @param {function} [success] The success callback "+
    "* @param {string} [dataType] The expected return data type "+
    "* "+
    "*/"));
  console.log("url=" + url); 
  console.log("data=" + typeof data==="string"?data:JSON.stringify(data));
  console.log("success=" + success);
  console.log("dataType=" + dataType);    
};
```
Then if you call
```js
post("my_url", "my_data", function(){
  console.log("success.");
});
```
you will get the output:
```
url=my_url
data=my_data
success=function(){
  console.log("success.");
}
dataType=undefined
```
And if you call
```js
post("my_url", {a:1,b:2}, "json");
```
you will get the output:
```
url=my_url
data={"a":1,"b":2}
success=undefined
dataType=json
```

Running the Unit Tests
--------------------------------------
Configure your HTTP server to host the docargs repository directory,
then open the URL of the unit testing page(e.g. http://localhost/docargs/test/index.html)
in your browser.

DocArgs is flexible
--------------------------------------
### eval ###
If you are uncomfortable with `eval`, you can use DocArgs this way:
```js
function define(name, deps, callback, moduleObj) {
  docargs.parse(arguments,
    "/** "+
    "* @param {string} [name] the module name "+
    "* @param {array} [deps] the dependent modules "+
    "* @param {function} [callback] the callback function to be called when the module is loaded "+
    "* @param {object} [moduleObj] a plan object for the module "+
    "* "+
    "*/");
  name = arguments[0];
  deps = arguments[1];
  callback = arguments[2];
  moduleObj = arguments[3];

  console.log("name=" + name); 
  console.log("deps=" + deps);
  console.log("callback=" + callback);
  console.log("moduleObj=" + JSON.stringify(moduleObj));
};
```
### JSDoc syntax ###
Both JSDoc syntax and Google Closure syntax for `@param` are supported.
For example, by JSDoc syntax:
```js
/**
 * @param {string} [somebody] - Somebody's name.
 */
```
and by Google Closure syntax:
```js
/**
 * @param {string=} somebody - Somebody's name.
 */
```
Please refer to http://usejsdoc.org/tags-param.html.
### Plain JSDoc ###
If it is not a problem that the JSDoc will be missing after your code is compressed (e.g. for testing code),
then you can write plain JSDoc in your code (unnecessary to wrap in a string variable), and DocArgs just works.
```js
function define(name, deps, callback, moduleObj) {
  /**
   * @param {string} [name] the module name
   * @param {array} [deps] the dependent modules
   * @param {function} [callback] the callback function to be called when the module is loaded
   * @param {object} [moduleObj] a plain object for the module
   * 
   */
  eval(docargs.parse(arguments));

  console.log("name=" + name); 
  console.log("deps=" + deps);
  console.log("callback=" + callback);
  console.log("moduleObj=" + JSON.stringify(moduleObj));
};
```