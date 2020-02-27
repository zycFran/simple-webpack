const  {getAST,getDependencies, transform} = require("./parser");

const path = require("path")

const testAst  = getAST(path.join(__dirname, '../src/index.js'))

const testDep  = getDependencies(testAst)

const testTransform  = transform(testAst)




console.log(testTransform)