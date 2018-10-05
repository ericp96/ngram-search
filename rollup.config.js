import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.es.js',
            format: 'es'
        },
        {
            file: 'lib/index.cjs.js',
            format: 'cjs'
        },
    ],
    plugins: [
        babel(),
        commonjs()
    ]
};