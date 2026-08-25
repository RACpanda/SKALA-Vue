<script setup>
import { ref } from 'vue'

// 날씨 데이터
const weatherList = ref([
  {id: 'city_01', name: '서울',temp: 28, status: '맑음',humidity: 45,},
  {id: 'city_02',name: '수원', temp: 24, status: '비', humidity: 72,},
  {id: 'city_03',name: '부산', temp: 26, status: '구름', humidity: 60,},
  {id: 'city_04',name: '인천', temp: 30, status: '눈', humidity: 58,},
])

// 도시 검색
const searchCity = ref('')

// 상태바
const Message = ref('카드를 클릭하거나 검색해 보세요.')

////////////////
// 이벤트 및 수식어
////////////////

// 날씨 카드를 클릭했을 때
const selectCity = (cityName) => {
  Message.value = '${cityName}이 선택되었습니다.'
}

// 상세보기
const showDetail = (cityName, status, temp, humidaty) => {
  window.alert(
    '${cityName}의 현재 날씨는 [${status}] 상태입니다.\n' +
      '기온은 ${temp}도이고, \n' + 
      '습도는 ${humidity}%입니다.')
}
</script>

<template>
  <main class="weather-Mockup">
    <h1>과제 1: 날씨 (Mockup)</h1>

    // 도시 검색 섹션
    <section class="search-box">
      <h2>도시 검색</h2>

      // 양방향 바인딩 및 한글 처리 (:value, @input)
      <input
        type="text"
        placeholder="검색할 도시 이름 입력"
        :value="searchCity"
        @input="searchCity = $event.target.value"/>
      <p>
        검색 중인 도시:
        {{ searchCity }}
      </p>
    </section>

    // 지역별 날씨 현황 섹션
    <section class="weather-card">
      <h2>지역별 날씨 현황</h2>

      // 배열 렌더링(v-for)
      <div
        v-for="weather in weatherList":key="weather.id"
        class="weather-card"
        @click="selectCity(weather.name)">

        <div>
          <h3>{{ weather.name }} ({{ weather.status }})</h3>

          <p>현재 기온:{{ weather.temp }}도</p>
          <p>습도:{{ weather.humidity }}%</p>

          // 조건부 렌더링(v-if)
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

        <button
          type="button"
          @click.stop="showDetail(weather)"
        >
          상세보기
        </button>
      </div>
    </section>

    // 결과
    <div class="status-bar">{{ Message }}</div>
  </main>
</template>