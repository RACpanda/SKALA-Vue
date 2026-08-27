<script setup lang="ts">
import { ref, onMounted, computed,} from 'vue'
import { getWeather } from '@/api/weatherApi.js'

import BaseDashboardCard from './BaseDashboardCard.vue'
import WeatherCard from './WeatherCard.vue'
import SearchBar from './SearchBar.vue'

const weatherList = ref([]) // 지역별 날씨 데이터 저장
const loading = ref(false)

const cityList = [
  {id:'city_01', name:'서울', region:'서울', lat:37.5665, lon:126.9780},
  {id:'city_02', name:'수원', region:'경기', lat:37.2636, lon:127.0286},
  {id:'city_03', name:'부산', region:'부산', lat:35.1796, lon:129.0756},
  {id:'city_04', name:'인천', region:'인천', lat:37.4563, lon:126.7052}
]

const convertWeatherStatus = (status) => {
  if(status.includes('비')) return '비'
  if(status.includes('구름') || status.includes('흐림')) return '흐림'
  if(status.includes('맑')) return '맑음'
  return status
}

const fetchWeather = async () => {
  loading.value = true

  try {
    const result = []

    for(const city of cityList) {
      const data = await getWeather(city.lat, city.lon)

      result.push({
        id: city.id,
        name: city.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        status: convertWeatherStatus(data.weather[0].description)
      })
    }

    weatherList.value = result

  } catch(error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(()=>{fetchWeather()}) // 화면 생성 후 날씨 데이터 호출

const searchQuery = ref('') // 검색어 저장

const selectedCityInfo = ref(null) // 선택한 도시 저장

const filteredWeatherList = computed(() => {
  if (!searchQuery.value) {
    return weatherList.value}

  return weatherList.value.filter(
    weather =>weather.name.includes(searchQuery.value))
})

const selectCity = (weather)=>{
  selectedCityInfo.value = weather}

</script>

<template>
    <main class="weather-Mockup">   
        
        <BaseDashboardCard>
          <SearchBar v-model = "searchQuery">
          </SearchBar>
        </BaseDashboardCard>

        <BaseDashboardCard>
          <h2>지역별 날씨 현황</h2>
          
          <p v-if="filteredWeatherList.length === 0">
              검색 결과가 없습니다.</p>

          <WeatherCard
              v-for="weather in filteredWeatherList"
              :key="weather.id"
              :weather="weather"
              @click-card="selectCity(weather)">
              </WeatherCard>
        </BaseDashboardCard>

        <div class="status-bar">
          <span v-if="selectedCityInfo">
              {{selectedCityInfo.name}}
              이 선택되었습니다.
          </span>

          <span v-else>
              카드를 클릭하거나 검색해 보세요.
          </span>
        </div>
    </main>
</template>

<style scoped>

.weather-Mockup {

    max-width: 900px;

    margin: auto;

    padding: 40px;

}


.status-bar {

    margin-top: 30px;

    color: #555;

}


h2 {

    margin-bottom: 20px;

}


</style>