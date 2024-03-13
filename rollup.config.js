import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true
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
    image()
  ]
};