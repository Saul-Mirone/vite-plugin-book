/* Copyright 2021, vite-plugin-book by Mirone. */
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import pkg from './package.json';

const pluginEntry = ['./src/plugin/index.ts'];

const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies || {}), 'worker_threads'];

export default () => [
    {
        input: pluginEntry,
        output: {
            dir: 'dist/plugin',
            format: 'esm',
        },
        external,
        plugins: [
            resolve({
                preferBuiltins: true,
            }),
            json(),
            commonjs(),
            esbuild({
                target: 'node14',
            }),
        ],
        onwarn(message) {
            if (message.code === 'CIRCULAR_DEPENDENCY') return;
            console.error(message);
        },
    },
    {
        input: pluginEntry,
        output: {
            file: 'dist/plugin/index.d.ts',
            format: 'esm',
        },
        external,
        plugins: [dts()],
    },
];
