<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()
const props = defineProps({
  weather:Object
})

const detail = ()=>{router.push(`/weather/${props.weather.id}`)}

const emit = defineEmits(['click-card'])
</script>

<template>
    <div class = "weather-card"
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
            @click.stop="detail"
            >
            상세보기
            </button>
        </div>
    </div>
</template>