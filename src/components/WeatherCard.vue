<script setup lang="ts">
defineProps({weather:Object})

const emit = defineEmits(['click-card', 'click-detail'])
</script>

<template>
    <div class = "weather-card"
    @click="emit('click-card', weather)"></div>   

    <div >
        <h3>
            {{ weather.name }}
            {{ weather.status }}
        </h3>

        <p>현재 기온 : {{ weather.temp }}도</p>
        <p>현재 습도 : {{ weather.humidity }}%</p>

        <span
            v-if="weather.temp >= 25"
            class="temperature-hot">
            🔥 더움 (25℃ 이상)
        </span>

          <span
            v-else
            class="temperature-cool">
            ❄️ 선선함 (25℃ 미만)
        </span>

        <button
          type="button"
          @click.stop="emit('click-detail', weather)"
        >
          상세보기
        </button>
    </div>
</template>