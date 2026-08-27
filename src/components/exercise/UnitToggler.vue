<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore() // 온도 단위 Store 연결
</script>

<template>
    <v-btn
    type="button"
    class="unit-button"
    @click="configStore.toggleUnit()">
    현재 단위: {{ configStore.unitSymbol }}
    </v-btn>
</template>

<style scoped>
.unit-button {
  display: inline-block;
  padding: 4px 12px;
  margin-left: 8px;
  border: 1px solid #999;
  border-radius: 8px;
  font-size: 14px;
}
</style>