<script setup lang="ts">
import {useRoute} from 'vue-router'

const route = useRoute()
const cityId = route.params.id

const weatherData = {
    city_01:{name: '서울',temp: 28, status: '맑음',humidity: 45,},
    city_02:{name: '수원', temp: 24, status: '비', humidity: 72,},
    city_03:{name: '부산', temp: 26, status: '구름', humidity: 60,},
    city_04:{name: '인천', temp: 22, status: '맑음', humidity: 32,},
}

const weather =
weatherData[cityId]
</script>

<template>
    <h2>지역별 상세 기상 관측 정보</h2>
    <div>
        <p>지정 지역:{{weather.name}}</p>
        <p>실시간 기온:{{weather.temp}}도</p>
        <p>대기 습도:{{weather.humidity}}%</p>
        <p>기상 현황:{{weather.status}}</p>
    </div>

    <RouterLink to="/">
        메인으로 돌아가기
    </RouterLink>
</template>