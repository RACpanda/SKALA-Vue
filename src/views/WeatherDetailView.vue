<script setup lang="ts">
import {useRoute} from 'vue-router'
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const route = useRoute()
const cityId = route.params.id

const weatherData = {
    city_01:{name: '서울',temp: 28, status: '맑음',humidity: 45,},
    city_02:{name: '수원', temp: 24, status: '비', humidity: 72,},
    city_03:{name: '부산', temp: 26, status: '구름', humidity: 60,},
    city_04:{name: '인천', temp: 22, status: '맑음', humidity: 32,},
}

const weather = weatherData[cityId]

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp // 기본 원본 데이터는 섭씨 숫자

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius'일 때는 원본 그대로 반환
})
</script>

<template>
    <h2>지역별 상세 기상 관측 정보</h2>
    <div>
        <p>지정 지역:{{weather.name}}</p>
        <p>실시간 기온:{{ displayTemp }}{{ configStore.unitSymbol }}도</p>
        <p>대기 습도:{{weather.humidity}}%</p>
        <p>기상 현황:{{weather.status}}</p>
    </div>

    <RouterLink to="/">
        메인으로 돌아가기
    </RouterLink>
</template>