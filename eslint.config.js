import pluginVue from 'eslint-plugin-vue'
import vuetify from 'eslint-plugin-vuetify'
import vueA11y from 'eslint-plugin-vuejs-accessibility'

export default [
  ...pluginVue.configs['flat/strongly-recommended'],
  
  ...vueA11y.configs['flat/recommended'],
  
  ...vuetify.configs['flat/base'],
  
  {
    rules: {
      // --- Общие правила JavaScript (стиль Airbnb) ---
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',        // Airbnb: используйте const везде, где возможно [citation:1]
      'no-var': 'error',             // Airbnb: никогда не используйте var [citation:1]
      'object-shorthand': 'error',   // Airbnb: сокращенная запись объектов
      'quote-props': ['error', 'as-needed'], // Airbnb: кавычки только при необходимости
      
      // --- Правила Vue (усиленные) ---
      'vue/multi-word-component-names': 'off', // Исключение для страниц/виджетов
      'vue/require-default-prop': 'error',     // Обязательные дефолты для пропсов
      'vue/require-explicit-emits': 'error',   // Явное объявление emits
      'vue/no-unused-vars': 'error',           // Запрет неиспользуемых переменных в шаблоне
      
      'object-curly-spacing': ['error', 'always'], // Пробелы внутри { ... }
      'array-bracket-spacing': ['error', 'never'], // Пробелы внутри [ ... ] (без пробелов)
      'computed-property-spacing': ['error', 'never'], // obj[key] без пробелов
      
      // --- Правила для шаблонов (строгий порядок атрибутов) ---
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',    // is, v-if, v-for
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',        // id
          'UNIQUE',        // ref, key
          'TWO_WAY_BINDING', // v-model
          'OTHER_DIRECTIVES', // v-custom
          'OTHER_ATTR',    // class, style
          'EVENTS',        // @click
          'CONTENT'        // v-text, v-html
        ],
        alphabetical: false // Не требуем алфавитный порядок (часто мешает)
      }],
      
      'vue/no-use-v-if-with-v-for': 'error',
      
      'vue/attribute-hyphenation': ['error', 'always'], // my-prop, а не myProp [citation:26]
      'vue/v-on-event-hyphenation': ['error', 'always'], // @my-event
      'vue/component-name-in-template-casing': ['error', 'PascalCase'], // <MyComponent />
    },
  },
]