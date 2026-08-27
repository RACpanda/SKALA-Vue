<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore() // 온도 단위 Store 연결
</script>

<template>
    <button
    type="button"
    class="unit-button"
    @click="configStore.toggleUnit()">
    현재 단위: {{ configStore.unitSymbol }}
    </button>
</template>