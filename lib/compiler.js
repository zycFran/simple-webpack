const {getAST, getDependencies, transform} = require("./parser")
const path = require("path")
const fs = require("fs");

module.exports = class Compiler {
    constructor(options){
        this.options = options

        this.entry = options.entry
        this.output = options.output
        this.modules = []
    }
    run(){
        const entryModule = this.buildModule(this.entry, true)
        this.modules.push(entryModule);
        
        this.modules.map( module=>{
            module.dependencies.map(dep=>{
                this.modules.push(this.buildModule(dep))
            })
        })
        
        this.emitFiles()
    }

    buildModule(filename, isEntry){
        const filePath = isEntry?filename: path.join(process.cwd(), './src', filename)

        const ast = getAST(filePath);

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }
    }

    emitFiles(){
        const outputPath = path.join(this.output.path, this.output.filename)

        let modules = ``;
        
        this.modules.map(module=>{
            modules += `'${module.filename}': function(require, module, exports){${module.source}},`;
        })

        const bundle = `(function(modules){
            function require(filename){
                var fn = modules[filename];
                var module = {exports: {}};
                
                fn(require, module, module.exports)

                return module.exports
            }
            require('${this.entry}')
        })({${modules}})`;

        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }

}