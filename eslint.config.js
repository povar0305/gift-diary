import pluginVue from 'eslint-plugin-vue'
import vuetify from 'eslint-plugin-vuetify'

export default [
  ...pluginVue.configs['flat/recommended'],
  
  ...vuetify.configs['flat/base'],
  
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]