import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist'], // Ignore built files
  },
  {
    files: ['**/*.{js,jsx}'], // Target JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 2021, // Use ES2021 (or the latest)
      globals: globals.browser, // Include browser globals
      parserOptions: {
        ecmaVersion: 'latest', // Latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: 'module', // Use ES module syntax
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // Base recommended JS rules
      ...react.configs.recommended.rules, // Recommended React rules
      ...react.configs['jsx-runtime'].rules, // JSX runtime-specific rules
      ...reactHooks.configs.recommended.rules, // Recommended React hooks rules
      'react/jsx-no-target-blank': 'off', // Allow links to open in a new tab without rel="noopener noreferrer"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'warn', // Warn for unused variables
      'react/prop-types': 'off', // Turn off prop-types validation (use TypeScript or custom validation)
      'react/jsx-key': 'warn', // Warn for missing `key` in lists
      'react/jsx-no-duplicate-props': 'error', // Disallow duplicate props in JSX
    },
  },
];
