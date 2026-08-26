<script setup lang="ts">
defineProps({weather:Object})

const emit = defineEmits(['click-card', 'click-detail'])
</script>

<template>
    <div class = "weather-card"
    @click="emit('click-card', weather)">

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
        </div>

        <div>
            <button
            type="button"
            @click.stop="emit('click-detail', weather)"
            >
            상세보기
            </button>
        </div>
    </div>
</template>

<style scoped>
.weather-card {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:20px;
  margin-bottom:12px;
  background:white;
  border:1px solid #ddd;
  border-radius:8px;
}

.weather-card h3 {
  margin:0 0 10px;
}

.weather-card p {
  margin:5px 0;
}

button {
  padding:8px 12px;
  background:white;
  border:1px solid #999;
  border-radius:5px;
}

button:hover {
  background:#f2f2f2;
}
</style>