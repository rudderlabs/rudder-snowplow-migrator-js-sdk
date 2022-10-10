/* eslint-disable import/no-extraneous-dependencies */

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from '@rollup/plugin-json';
import gzipPlugin from 'rollup-plugin-gzip';
import brotli from 'rollup-plugin-brotli';
import visualizer from 'rollup-plugin-visualizer';
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';

export function getOutputFilePath(dirPath, distName) {
  const fileNamePrefix = `${distName}${process.env.STAGING === 'true' ? '-staging' : ''}`;
  let outFilePath = '';

  if (process.env.ENV === 'prod') {
    switch (process.env.ENC) {
      case 'gzip':
        if (process.env.PROD_DEBUG_INLINE === 'true') {
          outFilePath = `${dirPath}/${fileNamePrefix}-map.min.gzip.js`;
        } else {
          outFilePath = `${dirPath}/${fileNamePrefix}.min.gzip.js`;
        }
        break;

      case 'br':
        if (process.env.PROD_DEBUG_INLINE === 'true') {
          outFilePath = `${dirPath}/${fileNamePrefix}-map.min.br.js`;
        } else {
          outFilePath = `${dirPath}/${fileNamePrefix}.min.br.js`;
        }
        break;

      default:
        if (process.env.PROD_DEBUG_INLINE === 'true') {
          outFilePath = `${dirPath}/${fileNamePrefix}-map.min.js`;
        } else {
          outFilePath = `${dirPath}/${fileNamePrefix}.min.js`;
        }
        break;
    }
  } else {
    outFilePath = `${dirPath}/${fileNamePrefix}.js`;
  }

  return outFilePath;
}

export function getOutputConfiguration(outDir, modName, outFilePath) {
  const outputFiles = [];

  if (process.env.NPM === 'true') {
    outputFiles.push({
      file: `${outDir}/index.js`,
      format: 'umd',
      name: modName,
    });
    outputFiles.push({
      file: `${outDir}/index.es.js`,
      format: 'esm',
      name: modName,
    });
  } else {
    outputFiles.push({
      file: outFilePath,
      format: 'iife',
      name: modName,
      sourcemap: process.env.PROD_DEBUG === 'inline' ? 'inline' : process.env.PROD_DEBUG === 'true',
    });
  }

  return outputFiles;
}

export function getDefaultConfig(distName, outDir) {
  const version = process.env.VERSION;
  const moduleType = process.env.NPM === 'true' ? 'npm' : 'cdn';

  return {
    external: [],
    plugins: [
      replace({
        preventAssignment: true,
        'process.browser': process.env.NPM !== 'true',
        'process.prod': process.env.ENV === 'prod',
        'process.package_version': version,
        'process.module_type': moduleType,
      }),
      resolve({
        jsnext: true,
        browser: true,
        preferBuiltins: false,
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      json(),
      globals(),
      builtins(),
      babel({
        inputSourceMap: true,
        babelHelpers: 'bundled',
        exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
      }),
      process.env.uglify === 'true' &&
        terser({
          // remove all comments
          format: {
            comments: false,
          },
        }),
      process.env.ENC === 'gzip' && gzipPlugin(),
      process.env.ENC === 'br' && brotli(),
      process.env.visualizer === 'true' &&
        process.env.uglify === 'true' &&
        visualizer({
          filename: `./reports/stats/${distName}.html`,
          title: `Rollup Visualizer - ${distName}`,
          sourcemap: true,
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      filesize({
        showBeforeSizes: 'build',
        showBrotliSize: true,
      }),
      process.env.NPM === 'true' &&
        copy({
          targets: [
            { src: 'package.json', dest: outDir },
            { src: 'README.md', dest: outDir },
            { src: 'CHANGELOG.md', dest: outDir },
            { src: 'LICENCE', dest: outDir },
          ],
        }),
    ],
  };
}
