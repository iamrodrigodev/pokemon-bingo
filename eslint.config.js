import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  ...tseslint.configs.recommended,
  {
  languageOptions: {
    globals: {
      browser: true,
    },
    parser: vueParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    vue: vuePlugin,
    prettier: prettierPlugin,
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': ['error', { singleline: 3 }],
    'vue/html-self-closing': 'error',
  },
  }
];
