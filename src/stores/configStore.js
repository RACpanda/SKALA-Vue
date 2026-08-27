import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config',() => {
    const unit = ref('celsius')
    const unitSymbol = computed(() => {
        if (unit.value === 'fahrenheit') {
            return '°F'}
        return '°C'})

    function toggleUnit() {
        if (unit.value === 'celsius') {
            unit.value = 'fahrenheit'}
        else {
            unit.value = 'celsius'
        }}
})
