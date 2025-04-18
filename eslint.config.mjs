import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        extends: fixupConfigRules(compat.extends('next/core-web-vitals', 'plugin:import/recommended')),

        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-one-expression-per-line': 'off',

            'import/order': [
                'error',
                {
                    'newlines-between': 'always',

                    alphabetize: {
                        order: 'asc',
                    },

                    distinctGroup: true,
                },
            ],
        },
    },
]);
