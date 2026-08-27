<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
    <button
    class="unit-button"
    @click="configStore.toggleUnit">
    현재 단위: {{ configStore.unitSymbol }}
    </button>
</template>