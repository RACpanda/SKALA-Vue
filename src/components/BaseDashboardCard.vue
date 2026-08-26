

// 상태바
const Message = ref('카드를 클릭하거나 검색해 보세요.')

////////////////
// 이벤트 및 수식어
////////////////

// 날씨 카드를 클릭했을 때
const selectCitycard = (cityName) => {
  Message.value = `${cityName}이 선택되었습니다.`
}
      </div>
    </section>

  </main>
</template>


<style scoped>
/* Vite 기본 다크 배경 제거 */
:global(body) {
  background-color: #ffffff;
}


/* 전체 화면 */
.weather-Mockup {
  width: 700px;
  max-width: calc(100% - 40px);

  margin: 40px auto;
  padding: 30px;

  box-sizing: border-box;

  font-family: Arial, sans-serif;
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

.weather-section > p {
  font-size: 14px;
  color: grey;
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