<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

interface Weather {
  id:string
  name:string
  temp:number
  humidity:number
  status:string
}

const props = defineProps<{
  weather:Weather
}>()

const detail = ()=>{router.push(`/weather/${props.weather.id}`)} // 상세 페이지 이동
const emit = defineEmits(['click-card']) // 카드 선택 이벤트 전달
</script>

<template>
    <v-card class="weather-card"
    @click="emit('click-card', weather)">

        <div >
            <h3>
                {{ weather.name }}
                ({{ weather.status }})
            </h3>
            <span
                v-if="weather.temp >= 25"
                class="temperature-hot">
                🔥 더움
            </span>

            <span
                v-else
                class="temperature-cool">
                ❄️ 선선함
            </span>
        </div>

        <div>
            <button
            type="button"
            @click.stop="detail">
            상세보기
            </button>
        </div>
    </v-card>
</template>

<style scoped>
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: white;
}

.weather-card h3 {
  margin: 0 0 10px;
}

button {
  padding: 8px 16px;
  border: 1px solid #999;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
}
</style>