import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
  entry: 'src/emailcorrect.js',
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  targets: [{ dest: pkg.main, format: 'cjs' }, { dest: pkg.module, format: 'es' }],
};
