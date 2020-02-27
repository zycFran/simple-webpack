(function(modules){
            function require(filename){
                var fn = modules[filename];
                var module = {exports: {}};
                
                fn(require, module, module.exports)

                return module.exports
            }
            require('/home/zyc/desktop/zyc_git/simple-webpack/src/index.js')
        })({'/home/zyc/desktop/zyc_git/simple-webpack/src/index.js': function(require, module, exports){"use strict";

var _hello = require("./hello.js");

document.write((0, _hello.hello)("world"));},'./hello.js': function(require, module, exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;
function hello(name) {
  return "hello " + name;
}},})