<script setup lang="ts">
import {useRoute} from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { getWeather } from '@/api/weatherApi'

const route = useRoute()
const cityId = route.params.id

const weather= ref([])

const cityList = {
    city_01:{name:'서울', lat:37.5665, lon:126.9780},
    city_02:{name:'수원', lat:37.2636, lon:127.0286},
    city_03:{name:'부산', lat:35.1796, lon:129.0756},
    city_04:{name:'인천', lat:37.4563, lon:126.7052}
}

const city = cityList[cityId]

const fetchWeather = async () => {
    const data = await getWeather(city.lat, city.lon)

    weather.value = ({
        name: city.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        status: convertWeatherStatus(data.weather[0].description)
    })
}

onMounted(() => {
  fetchWeather()
})

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = weather.value.temp // 기본 원본 데이터는 섭씨 숫자

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return Math.round(rawTemp) // 'celsius'일 때는 원본 그대로 반환
})

const convertWeatherStatus = (status) => {
    if(status.includes('비')) return '비'
    if(status.includes('구름') || status.includes('흐림')) return '구름'
    if(status.includes('맑')) return '맑음'
    return status
}
</script>

<template>
    <h2>지역별 상세 기상 관측 정보</h2>
    <div>
        <p>지정 지역:{{weather.name}}</p>
        <p>실시간 기온:{{displayTemp }}{{ configStore.unitSymbol }}</p>
        <p>대기 습도:{{weather.humidity}}%</p>
        <p>기상 현황:{{weather.status}}</p>
    </div>

    <RouterLink to="/">
        메인으로 돌아가기
    </RouterLink>
</template>