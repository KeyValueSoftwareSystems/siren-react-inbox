import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: false
  },
  external:['react', 'react-dom'],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    json(),
    terser(),
    babel({
      presets: ['@babel/preset-react', '@babel/preset-env'],
      exclude: 'node_modules/**'
    }),
    image(),
    postcss(),
  ]
};
