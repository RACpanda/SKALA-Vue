<script setup lang="ts">
import { ref, onMounted, computed, watch, watchEffect } from 'vue'
import { getWeather } from '@/api/weatherApi'

// children import
import BaseDashboardCard from './BaseDashboardCard.vue'
import WeatherCard from './WeatherCard.vue'
import SearchBar from './SearchBar.vue'

// WeatherParent : 지역별 날씨 현황 목록과 반응형 로직 포함

//지역별 날씨 현황 목록
const weatherList = ref([])
const loading = ref(false)

const cityList = [
  {id:'city_01', name:'서울', lat:37.5665, lon:126.9780},
  {id:'city_02', name:'수원', lat:37.2636, lon:127.0286},
  {id:'city_03', name:'부산', lat:35.1796, lon:129.0756},
  {id:'city_04', name:'인천', lat:37.4563, lon:126.7052}
]

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
        status: data.weather[0].description
      })
    }
    weatherList.value = result

  } catch(error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(()=>{fetchWeather()})

//검색어
const searchQuery = ref('')

//지역 선택
const selectedCityInfo = ref(null)

//검색어에 맞는 지역만 반환
const filteredWeatherList = computed(() => {
  if (!searchQuery.value) {
    return weatherList.value}

  return weatherList.value.filter(
    weather =>weather.name.includes(searchQuery.value))
})

//selectedCityInfo 변경시 실행
watch(selectedCityInfo, (newCity)=>{
  console.log('watch 실행:',newCity)})

//검색어 변경시 실행
watchEffect(()=>{
    console.log('현재 검색어:',searchQuery.value)})

//카드 클릭
const selectCity = (weather)=>{
  selectedCityInfo.value = weather}

//상세보기 클릭 시
const showDetail = (weather) => {
  let recommendation = ''
  if (weather.status === '비') {
    recommendation = '비가 오고 있으므로 외출을 추천하지 않습니다.'} 
  else if (weather.status === '눈') {
    recommendation = '눈이 오고 있으므로 외출을 추천하지 않습니다.'}
  else if (weather.temp >= 25) {
    recommendation = '기온이 높아 더우므로 외출을 추천하지 않습니다.'}
    else {
    recommendation = '특별한 날씨 문제는 없지만 혹시 모르니 그냥 외출을 추천하지 않습니다.'}

  window.alert(
    `${weather.name}의 현재 날씨는 [${weather.status}] 상태입니다. \n기온은 ${weather.temp}도이고, \n습도는 ${weather.humidity}%입니다. \n${recommendation}`)
}
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
    :global(body) {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;

    background-color: #ffffff;
    color: #333333;
    }
</style>