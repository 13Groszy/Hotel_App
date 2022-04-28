const path = require('path')
module.exports = {
    mode: 'none',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    }
}