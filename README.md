DocArgs - Parse JavaScript function arguments simple and smart
================================================================

DocArgs means "you write the DOCuments, and i parse the ARGumentS".
It is common that JavaScript functions have very dynamic argument 
lists in which some arguments are optional, some are required, and
some may allow multiple types. DocArgs works this way: you just write
the standard JSDoc to describe the arguments, then call the simplest 
and the least APIs to parse the arguments, and then use the arguments
directly.

Example
-------

Take the `define` function of RequireJS as an example.
You declare the function and use "docargs" this way:
```js
var docargs = require("docargs/docargs");

function define(name, deps, callback, moduleObj) {
  eval(docargs.parse(arguments,
    "/** "+
    "* @param {string} [name] the module name "+
    "* @param {array} [deps] the dependent modules "+
    "* @param {function} [callback] the callback function to be called when the module is loaded "+
    "* @param {object} [moduleObj] a plan object for the module "+
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

Running the Unit Tests
--------------------------------------
Configure your HTTP server to host the docargs repository directory,
then open the URL of the unit testing page(e.g. http://localhost/docargs/test/index.html)
in your browser.


