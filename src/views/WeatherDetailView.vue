<script setup lang="ts">
import {useRoute} from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { getWeather } from '@/api/weatherApi'
import {getNews} from '@/api/newsApi'

const route = useRoute()
const cityId = route.params.id

const weather= ref(null)
const newsList = ref([])

const cityList = {
    city_01:{name:'서울', region:'서울', lat:37.5665, lon:126.9780},
    city_02:{name:'수원', region:'경기', lat:37.2636, lon:127.0286},
    city_03:{name:'부산', region:'부산', lat:35.1796, lon:129.0756},
    city_04:{name:'인천', region:'인천', lat:37.4563, lon:126.7052}
}

const city = cityList[cityId]

const convertWeatherStatus = (status) => {
    if(status.includes('비')) return '비'
    if(status.includes('구름') || status.includes('흐림')) return '구름'
    if(status.includes('맑')) return '맑음'
    return status
}

const fetchWeather = async () => {
    const data = await getWeather(city.lat, city.lon)

    weather.value = ({
        name: city.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        status: convertWeatherStatus(data.weather[0].description)
    })
}

const fetchNews = async () => {
  let result = await getNews(`${city.name} 날씨`)

  if(result.length === 0){
    result = await getNews(`${city.region} 날씨`)
  }

  if(result.length === 0){
    result = await getNews('날씨')
  }

  newsList.value = result
}

onMounted(() => {
    fetchWeather()
    fetchNews()
})

const configStore = useConfigStore()

const displayTemp = computed(() => {
    if(!weather.value) return ''
        
    const rawTemp = weather.value.temp // 기본 원본 데이터는 섭씨 숫자

    if (configStore.unit === 'fahrenheit') {
        return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
    }
    return Math.round(rawTemp) // 'celsius'일 때는 원본 그대로 반환
    
})
</script>

<template>
    <h2>지역별 상세 기상 관측 정보</h2>
    <div v-if="weather">
        <p>지정 지역:{{weather.name}}</p>
        <p>실시간 기온:{{displayTemp }}{{ configStore.unitSymbol }}</p>
        <p>대기 습도:{{weather.humidity}}%</p>
        <p>기상 현황:{{weather.status}}</p>
    </div>

    <section v-if="newsList.length">

        <h3>
        📰 {{weather.name}} 날씨 뉴스
        </h3>

        <div
        v-for="news in newsList.slice(0,3)"
        :key="news.url"
        class="news-card"
        >

            <h4>
            {{news.title}}
            </h4>

            <p>
            {{news.description}}
            </p>

            <a
            :href="news.url"
            target="_blank"
            >
            기사 보기
            </a>

        </div>

    </section>

    <RouterLink to="/">
        메인으로 돌아가기
    </RouterLink>
</template>