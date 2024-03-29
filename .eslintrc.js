/* Copyright 2021, vite-plugin-book by Mirone. */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:promise/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'simple-import-sort', 'header'],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],

        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/no-unresolved': 'error',

        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',

        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        'header/header': ['error', 'block', ' Copyright 2021, vite-plugin-book by Mirone. '],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['**/*.js'],
            rules: {
                'global-require': 'off',
                '@typescript-eslint/no-require-imports': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/naming-convention': 'off',
                'import/no-default-export': 'off',
            },
        },
        {
            files: ['shim.d.ts', 'vite.*.ts', '*.config.ts', './src/plugin/index.ts'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                'no-var': 'off',
            },
        },
    ],
};
