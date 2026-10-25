<script generic="T extends Record<string, unknown >" lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { type DynamicFormProps, FieldFormType } from './types'
import { Text } from "@/shared";

const propsComponent = defineProps<DynamicFormProps<T>>()
propsComponent.fields.forEach((field) => {
  formData[field.key] = propsComponent.initialValues?.[field.key as keyof T] ?? getDefaultValue(field.type)
})

const emit = defineEmits<{
  (e: 'submit', data: T): void
}>()

const formRef = ref()
const formData = reactive<Record<string, unknown>>({})

function getDefaultValue(type: string) {
  if (type === 'checkbox') return false
  if (type === 'number') return null
  return ''
}

const errors = ref<Record<string, string>>({})

const onSubmit = async () => {
  const result = propsComponent.schema.safeParse(formData)
  if (!result.success) {
    errors.value = {}
    result.error.issues.forEach((err) => {
      const path = err.path[0] as string
      if (path) errors.value[path] = err.message
    })
    return
  }

  emit('submit', result.data)
}
const validateField = (key: string) => {
  const result = propsComponent.schema.safeParse(formData)

  if (!result.success) {
    const fieldError = result.error.issues.find(err => err.path[0] === key)
    errors.value[key] = fieldError ? fieldError.message : ''
  } else {
    errors.value[key] = ''
  }
}
const visibleFields = computed(() => {
  return propsComponent.fields.filter(field => {
    if (!field.condition) return true
    return field.condition(formData)
  })
})

const reset = () => {
  propsComponent.fields.forEach((field) => {
    formData[field.key] = propsComponent.initialValues?.[field.key as keyof T] ?? getDefaultValue(field.type)
  })
  errors.value = {}

}

const colorMenuOpen = ref(false)

defineExpose({ reset })
</script>

<template>
  <v-form
    ref="formRef"
    class="form"
    @submit.prevent="onSubmit"
  >
    <div class="d-flex flex-column ga-4 justify-end">
      <div
        v-for="field in visibleFields"
        :key="field.key"
      >
        <Text
          v-if="field.label"
          class="d-flex ga-1 w-auto align-center"
        >
          {{ field.label }}

          <span
            v-if="field.required"
            class="text-error"
          >
            *
          </span>

          <v-menu
            v-if="field.type === FieldFormType.Color"
            v-model="colorMenuOpen"
            :close-on-content-click="false"
            attach="body"
            location="bottom start"
          >
            <template #activator="{ props }">
              <div
                :style="{
                  background: (formData[field.key] as string) || '#cccccc', }"
                class="color-picker"
                v-bind="props"
              />
            </template>


            <v-color-picker
              v-model="formData[field.key] as string"
              :error-messages="errors[field.key]"
              :hide-details="!errors[field.key]"
              :modes="['hex']"
              hide-header
              hide-inputs
              mode="hex"
              show-swatches
              swatches-max-height="400px"
              v-bind="field.props"
            />
          </v-menu>
        </Text>

        <v-text-field
          v-if="field.type === 'text' || field.type === 'number' || field.type === 'date'"
          v-model="formData[field.key]"
          :error-messages="errors[field.key]"
          :hide-details="!errors[field.key]"
          :placeholder="field.placeholder"
          :type="field.type"
          density="comfortable"
          v-bind="field.props"
          variant="outlined"
          @blur="validateField(field.key)"
        />

        <v-textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.key]"
          :error-messages="errors[field.key]"
          :hide-details="!errors[field.key]"
          :placeholder="field.placeholder"
          rows="3"
          v-bind="field.props"
          variant="outlined"
          @blur="validateField(field.key)"
        />

        <v-select
          v-else-if="field.type === FieldFormType.Select"
          v-model="formData[field.key]"
          :error-messages="errors[field.key]"
          :hide-details="!errors[field.key]"
          :items="field.items"
          density="comfortable"
          v-bind="field.props"
          variant="outlined"
          @update:model-value="validateField(field.key)"
        />

        <v-autocomplete
          v-else-if="field.type === FieldFormType.Icon"
          v-model="formData[field.key]"
          :error-messages="errors[field.key]"
          :hide-details="!errors[field.key]"
          :items="field.items"
          autocomplete="iconGift"
          density="comfortable"
          hide-no-data
          v-bind="field.props"
          variant="outlined"
          @update:model-value="validateField(field.key)"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-icon
                  :icon="item.value as string"
                  class="mr-3"
                />
              </template>
            </v-list-item>
          </template>

          <template #selection="{ item }">
            <div class="d-flex align-center">
              <v-icon
                :icon="item.value as string"
                class="mr-2"
              />
              <span>{{ item.title }}</span>
            </div>
          </template>
        </v-autocomplete>

        <v-checkbox
          v-else-if="field.type === 'checkbox'"
          v-model="formData[field.key]"
          :error-messages="errors[field.key]"
          :hide-details="!errors[field.key]"
          v-bind="field.props"
          @update:model-value="validateField(field.key)"
        />
      </div>

      <div class="d-flex justify-end">
        <v-btn
          class="px-8"
          color="primary"
          size="large"
          type="submit"
        >
          {{ submitLabel || 'Сохранить' }}
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.form .color-picker {
  width: 2rem;
  height: 1rem;
  cursor: pointer;
  border-radius: 1rem;
  margin-left: 0.5rem;

}
</style>