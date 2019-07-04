/**
 * @file config-overrides.js
 */

const { override,addLessLoader,fixBabelImports,addDecoratorsLegacy } = require ('customize-cra')
const theme = require('./theme')

module.exports = override(
    addLessLoader({
        javascriptEnabled:true,
        theme
    }),
    addDecoratorsLegacy(),
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    })
)