<script setup lang="ts">
import { ref } from 'vue'

// 날씨 데이터
const weatherList = ref([
  {id: 'city_01', name: '서울',temp: 28, status: '맑음',humidity: 45,},
  {id: 'city_02',name: '수원', temp: 24, status: '비', humidity: 72,},
  {id: 'city_03',name: '부산', temp: 26, status: '구름', humidity: 60,},
  {id: 'city_04',name: '인천', temp: 22, status: '맑음', humidity: 32,},
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
  Message.value = `${cityName}이 선택되었습니다.`
}

// 상세보기 및 외출 추천
const showDetail = (cityName, status, temp, humidity) => {
  let recommendation = ''
  if (status === '비') {
    recommendation = '비가 오고 있으므로 외출을 추천하지 않습니다.'} 
  else if (status === '눈') {
    recommendation = '눈이 오고 있으므로 외출을 추천하지 않습니다.'}
  else if (temp >= 25) {
    recommendation = '기온이 높아 더우므로 외출을 추천하지 않습니다.'}
    else {
    recommendation = '특별한 날씨 문제는 없지만 혹시 모르니 그냥 외출을 추천하지 않습니다.'}

  window.alert(
    `${cityName}의 현재 날씨는 [${status}] 상태입니다. \n기온은 ${temp}도이고, \n습도는 ${humidity}%입니다. \n${recommendation}`)
}
</script>

<template>
  <main class="weather-Mockup">
    <h1>과제 1: 날씨 (Mockup)</h1>

    <!-- 도시 검색 섹션 -->
    <section class="search-box">
      <h2>도시 검색</h2>

      <!-- 양방향 바인딩 및 한글 처리 (:value, @input) -->
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

    <!-- 지역별 날씨 현황 섹션 -->
    <section class="weather-section">
      <h2>지역별 날씨 현황</h2>

      <!-- 배열 렌더링(v-for) -->
      <div
        v-for="weather in weatherList":key="weather.id"
        class="weather-card"
        @click="selectCity(weather.name)">

        <div>
          <h3>{{ weather.name }} ({{ weather.status }})</h3>

          <p>현재 기온:{{ weather.temp }}도</p>
          <p>습도:{{ weather.humidity }}%</p>

          <!-- 조건부 렌더링(v-if) -->
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
          @click="showDetail(weather.name, weather.status, weather.temp, weather.humidity)"
        >
          상세보기
        </button>
      </div>
    </section>

    <!-- 결과 -->
    <div class="status-bar">{{ Message }}</div>
  </main>
</template>


<style scoped>
/* Vite 기본 다크 배경 제거 */
:global(body) {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;

  background-color: #ffffff;
  color: #333333;
}


/* 전체 화면 */
.weather-Mockup {
  width: 680px;
  max-width: calc(100% - 40px);

  margin: 40px auto;
  padding: 30px;

  box-sizing: border-box;

  font-family: Arial, sans-serif;
  color: #333333;
  background-color: #ffffff;
}


/* 메인 제목 */
.weather-Mockup h1 {
  margin: 0 0 28px;

  font-size: 28px;
  font-weight: 700;

  color: #222222;
}


/* 검색 영역 */
.search-box {
  margin-bottom: 24px;
  padding: 18px;

  background-color: #f6f7f8;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.search-box h2 {
  margin: 0 0 12px;

  font-size: 18px;
  color: #444444;
}

.search-box input {
  width: 100%;

  box-sizing: border-box;

  padding: 10px 12px;

  font-size: 14px;

  color: #333333;
  background-color: #ffffff;

  border: 1px solid #bcbcbc;
  border-radius: 4px;
}

.search-box p {
  margin: 8px 0 0;

  font-size: 14px;
  color: #666666;
}


/* 지역별 날씨 전체 영역 */
.weather-section {
  margin-bottom: 20px;
  padding: 18px;

  background-color: #f6f7f8;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.weather-section > h2 {
  margin: 0 0 15px;

  font-size: 18px;
  color: #444444;
}


/* 도시별 카드 */
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  min-height: 120px;

  box-sizing: border-box;

  margin-bottom: 10px;
  padding: 16px 18px;

  background-color: #ffffff;

  border: 1px solid #d8d8d8;
  border-radius: 6px;

  cursor: pointer;
}

.weather-card:last-child {
  margin-bottom: 0;
}

.weather-card:hover {
  background-color: #fafafa;
}


/* 카드 왼쪽 영역 */
.weather-card > div {
  flex: 1;
}

.weather-card h3 {
  margin: 0 0 8px;

  font-size: 16px;
  font-weight: 700;

  color: #333333;
}

.weather-card p {
  margin: 4px 0;

  font-size: 14px;
  color: #555555;
}


/* 더움 표시 */
.temperature-hot {
  display: inline-block;

  margin-top: 7px;
  padding: 5px 8px;

  font-size: 12px;

  color: #c94b4b;
  background-color: #ffe6e6;

  border-radius: 4px;

  white-space: nowrap;
}


/* 선선함 표시 */
.temperature-cool {
  display: inline-block;

  margin-top: 7px;
  padding: 5px 8px;

  font-size: 12px;

  color: #3977b7;
  background-color: #e4f0ff;

  border-radius: 4px;

  white-space: nowrap;
}


/* 상세보기 버튼 */
.weather-card button {
  flex-shrink: 0;

  min-width: 82px;

  margin-left: 24px;
  padding: 8px 12px;

  font-size: 14px;

  color: #333333;
  background-color: #ffffff;

  border: 1px solid #999999;
  border-radius: 4px;

  cursor: pointer;

  white-space: nowrap;
}

.weather-card button:hover {
  background-color: #eeeeee;
}


/* 하단 상태바 */
.status-bar {
  margin-top: 18px;
  padding: 12px;

  text-align: center;

  font-size: 14px;
  font-weight: 600;

  color: #4d8054;
  background-color: #e8f5e9;

  border-radius: 5px;
}
</style>