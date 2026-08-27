# ☁️ Hands on - Weather analysis with Vue

## 1. 프로젝트 소개

Vue Router를 적용한 기존 Weather Router 프로젝트에 Pinia를 활용한 전역 상태 관리 기능과 외부 API 연동 기능을 추가한 프로젝트입니다.

Pinia Store를 적용하여 온도 단위 설정을 전역 상태로 관리하고, OpenWeather API와 News API를 활용하여 실시간 날씨 데이터와 관련 뉴스 데이터를 제공하도록 확장했습니다.

또한 Vuetify UI Library를 적용하여 기존 HTML 기반 UI를 Component 기반 구조로 개선했습니다.

주요 구현 내용:

- Pinia Store 생성
- State 기반 전역 상태 관리
- Getter를 활용한 계산 데이터 관리
- Action을 활용한 상태 변경
- UnitToggler Component 구현
- 날씨 상세 페이지 온도 단위 변환 적용
- OpenWeather API 연동
- News API 연동
- Vuetify UI Library 적용


---

# 2. 프로젝트 구조

```
src

├── App.vue

├── api
│   ├── weatherApi.ts
│   └── newsApi.ts

├── stores
│   └── configStore.ts

├── components
│   └── exercise
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       ├── WeatherCard.vue
│       └── UnitToggler.vue

└── views
    ├── WeatherHomeView.vue
    ├── WeatherDetailView.vue
    ├── WeatherAboutView.vue
    └── NotFoundView.vue
```

---

# 3. Pinia 설정

## Pinia 등록

`main.ts`에서 Pinia를 Vue Application에 등록합니다.

```ts
app.use(createPinia())
```

Pinia 등록 이후 여러 Component에서 하나의 Store를 공유할 수 있습니다.


---

# 4. Config Store 구현

파일 위치:

```
src/stores/configStore.ts
```

Config Store는 온도 단위 설정을 전역으로 관리합니다.

주요 역할:

- 현재 온도 단위 저장
- 화면 표시용 단위 반환
- 온도 단위 변경


## State

현재 선택된 온도 단위를 저장합니다.

```ts
const unit = ref('celsius')
```

저장 값:

```
celsius
fahrenheit
```


## Getter

현재 상태를 기반으로 화면 표시용 단위를 반환합니다.

```ts
const unitSymbol = computed(() => {

    if(unit.value === 'fahrenheit'){
        return '°F'
    }

    return '°C'

})
```

결과:

```
celsius → °C

fahrenheit → °F
```


## Action

사용자의 버튼 입력에 따라 상태를 변경합니다.

```ts
function toggleUnit(){

    if(unit.value === 'celsius'){
        unit.value = 'fahrenheit'
    }
    else{
        unit.value = 'celsius'
    }

}
```

동작:

```
°C

↓

°F

↓

°C
```

---

# 5. External API 적용

## OpenWeather API

실시간 날씨 데이터를 제공하기 위해 OpenWeather API를 사용했습니다.

파일 위치:

```
src/api/weatherApi.ts
```

데이터 흐름:

```
WeatherDetailView

↓

weatherApi.ts

↓

OpenWeather API

↓

날씨 데이터 반환
```

제공 데이터:

- 현재 기온
- 습도
- 날씨 상태


API 호출 구조:

```ts
axios.get(BASE_URL,{
    params:{
        lat,
        lon,
        appid:API_KEY,
        units:'metric',
        lang:'kr'
    }
})
```

---

## News API

날씨 관련 뉴스 데이터를 제공하기 위해 News API를 추가했습니다.

파일 위치:

```
src/api/newsApi.ts
```

데이터 흐름:

```
WeatherDetailView

↓

newsApi.ts

↓

News API

↓

뉴스 목록 반환
```

제공 데이터:

- 뉴스 제목
- 뉴스 설명
- 기사 링크


검색 방식:

```
도시명 + 날씨

↓

지역명 + 날씨

↓

날씨
```

검색 결과가 부족한 지역은 더 넓은 범위로 검색하도록 구성했습니다.

---

# 6. UnitToggler Component 구현

파일 위치:

```
src/components/exercise/UnitToggler.vue
```

역할:

- 현재 온도 단위 표시
- 버튼 클릭 이벤트 처리
- Pinia Action 실행


데이터 흐름:

```
UnitToggler.vue

↓

configStore.toggleUnit()

↓

전체 Component 상태 변경
```

---

# 7. WeatherDetailView 적용

상세 페이지에서는 Store의 현재 단위 설정에 따라 온도를 변환합니다.

기존:

```ts
weather.temp
```

변경:

```ts
displayTemp
```

Computed를 활용하여 표시 값을 관리합니다.

```ts
const displayTemp = computed(() => {

    const rawTemp = weather.value.temp

    if(configStore.unit === 'fahrenheit'){
        return Math.round(
            (rawTemp * 9) / 5 + 32
        )
    }

    return rawTemp

})
```

변환 예시:

```
섭씨

28°C


↓

화씨

82°F
```

---

# 8. External UI Library 적용

## Vuetify 적용

화면 Component 구조 개선을 위해 Vuetify UI Library를 적용했습니다.

설치:

```bash
npm install vuetify
```

등록:

```ts
app.use(vuetify)
```

적용 목적:

기존 HTML 태그 기반 UI를 재사용 가능한 Component 기반 UI 구조로 개선합니다.


주요 Component:

| 기존 UI | Vuetify Component |
|---|---|
| button | v-btn |
| 카드 영역 | v-card |
| 입력 영역 | v-text-field |


적용 범위:

- WeatherCard UI
- SearchBar 입력 영역
- UnitToggler 버튼
- 상세 정보 카드


기존 데이터 처리 로직은 유지하고 화면 출력 Component만 개선했습니다.

---

# 9. 구현 결과

## 온도 단위 변경

- UnitToggler 버튼 제공
- 섭씨/화씨 전환


## 날씨 대시보드

- OpenWeather API 기반 실시간 날씨 출력
- 지역별 날씨 정보 표시


## 상세 페이지

- Dynamic Route 기반 상세 정보 출력
- Store 기반 온도 변환 적용


## 뉴스 기능

- News API 연동
- 날씨 관련 뉴스 출력
- 기사 링크 제공


## UI 개선

- Vuetify Component 적용
- 기존 기능 유지
- UI 구조 개선

---

# 10. Source Code 품질관리 및 Build & Deployment

## Source Code 품질관리

코드 품질 관리를 위해 ESLint와 Oxlint를 활용하여 Source Code를 점검했습니다.

적용 내용:

- ESLint를 통한 코드 규칙 검사
- Oxlint를 활용한 정적 분석
- TypeScript Type Check를 통한 오류 검증
- API Key 환경 변수 관리


검사 명령어:

```bash
npm run lint
```


검사 결과:

- Oxlint 검사 완료
- ESLint 검사 완료


---

## Build & Deployment

배포 전 Production Build를 수행하여 실행 가능한 결과물을 생성했습니다.

Build 명령어:

```bash
npm run build
```


Build 결과:

```
dist/

├── index.html

└── assets/
```


생성된 Build 결과물을 기반으로 Hosting 환경에서 배포 가능한 형태로 구성했습니다.

---
---

# 추가 사항. UnitToggler Component 위치 변경

기존에는 `App.vue`의 Navigation 영역에 `UnitToggler` Component를 배치하여 모든 페이지에서 온도 단위 변경 버튼이 표시되었습니다.

변경 후에는 상세 날씨 정보 화면에서만 온도 단위 변경 기능을 사용할 수 있도록 위치를 변경했습니다.


변경 전:

```
App.vue

↓

UnitToggler

↓

전체 페이지 표시
```


변경 후:

```
WeatherDetailView.vue

↓

UnitToggler

↓

상세 페이지 표시
```


수정 내용:

- `App.vue`에서 `UnitToggler` Component 제거
- `WeatherDetailView.vue`에 `UnitToggler` Component 추가
- 기존 Pinia Store 상태 관리 구조 유지
- 버튼 동작 방식과 온도 변환 기능 유지


이를 통해 메인 화면에서는 날씨 정보 확인에 집중하고, 실제 온도 변환이 필요한 상세 페이지에서만 단위 변경 기능을 사용할 수 있도록 화면 구성을 개선했습니다.