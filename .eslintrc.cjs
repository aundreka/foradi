module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','react','react-hooks','import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: { react: { version: 'detect' } },
  env: { es2022: true, browser: true, node: true },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/order': ['error',{ 'newlines-between':'always','alphabetize':{order:'asc'} }],
    'react/react-in-jsx-scope': 'off'
  }
}
