# ☁️ 과제 4: Weather Router

## 1. 프로젝트 소개

Vue Router를 활용하여 기존 Weather Component 프로젝트를 여러 페이지 구조의 SPA(Single Page Application) 형태로 확장한 프로젝트입니다.

기존 과제에서는 하나의 화면에서 날씨 데이터를 관리하고 Component를 분리하는 구조였다면, 이번 과제에서는 Router를 적용하여 URL에 따라 서로 다른 View를 출력하도록 구현했습니다.

주요 구현 내용:

- Vue Router 설정
- RouterLink를 이용한 페이지 이동
- RouterView를 이용한 화면 출력
- Dynamic Route를 활용한 상세 페이지 구현
- Catch-all Route를 활용한 404 페이지 처리


---

# 2. 프로젝트 구조

```
src
├── App.vue
│
├── router
│   └── index.ts
│
├── components
│   └── exercise
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       └── WeatherCard.vue
│
└── views
    ├── WeatherHomeView.vue
    ├── WeatherDetailView.vue
    ├── WeatherAboutView.vue
    └── NotFoundView.vue
```


## 구조 설명

### components

재사용 가능한 UI Component를 관리합니다.

- SearchBar.vue
  - 도시 검색 입력창 담당
  - v-model을 이용한 양방향 데이터 전달

- WeatherCard.vue
  - 지역별 날씨 카드 출력
  - 상세 페이지 이동 이벤트 처리

- BaseDashboardCard.vue
  - 공통 카드 디자인 제공


### views

URL 단위의 페이지 Component입니다.

- WeatherHomeView.vue
  - 메인 날씨 대시보드 화면

- WeatherDetailView.vue
  - 선택한 도시의 상세 날씨 정보 화면

- WeatherAboutView.vue
  - 서비스 소개 페이지

- NotFoundView.vue
  - 존재하지 않는 URL 접근 시 표시되는 404 페이지



---

# 3. Vue Router 설정

## Router 등록

`main.ts`에서 Router를 Vue 애플리케이션에 등록합니다.

```ts
createApp(App)
.use(router)
.mount('#app')
```


Router를 등록하면 URL 변경에 따라 Vue Component를 동적으로 변경할 수 있습니다.


---

# 4. 페이지 이동 구조

## App.vue

App.vue에서는 공통 Navigation과 RouterView 영역을 관리합니다.


```vue
<RouterLink to="/">
날씨 대시보드
</RouterLink>


<RouterLink to="/about">
서비스 소개
</RouterLink>


<RouterView />
```


역할:

- RouterLink
  - 사용자가 페이지 이동을 수행하는 영역

- RouterView
  - 현재 URL에 해당하는 View가 출력되는 위치



---

# 5. WeatherHomeView

기존 Weather Component 구조를 페이지 단위 View로 변경했습니다.


구조:

```
WeatherHomeView

 ├ SearchBar

 └ WeatherCard
```


기존 과제에서 구현한 기능을 유지합니다.

- 도시 검색
- 날씨 목록 출력
- 날씨 상태 표시
- 상세보기 버튼 제공



---

# 6. Dynamic Route 구현

날씨 상세 페이지는 Dynamic Route를 이용하여 구현했습니다.


Router 설정:

```ts
{
 path:'/weather/:id',
 component:WeatherDetailView
}
```


예:

```
/weather/city_01
```


URL의 id 값을 이용하여 선택한 도시 정보를 확인합니다.


사용:

```ts
const route = useRoute()

const cityId = route.params.id
```


동작 흐름:

```
날씨 카드 클릭

↓

router 이동

↓

/weather/city_01

↓

WeatherDetailView 출력
```



---

# 7. WeatherDetailView

선택한 도시의 상세 정보를 표시합니다.


출력 정보:

- 도시명
- 현재 기온
- 습도
- 날씨 상태


예:

```
지역 상세 기상 정보

지역 : 서울
현재 기온 : 28℃
습도 : 45%
날씨 : 맑음
```


---

# 8. WeatherAboutView

서비스 소개 페이지입니다.


포함 내용:

- Vue Router 기반 프로젝트 설명
- Component 구조 분리
- Router Navigation
- Dynamic Route 사용


또한 사용자가 다시 메인 화면으로 이동할 수 있도록

```
대시보드 홈으로 이동
```

버튼을 추가했습니다.



---

# 9. NotFoundView

존재하지 않는 URL 접근을 처리합니다.


Router 설정:

```ts
{
 path:'/:pathMatch(.*)*',
 component:NotFoundView
}
```


예:

```
localhost:5173/test
```


결과:

```
페이지를 찾을 수 없습니다.
```


---

# 10. 구현 결과

구현된 페이지:

## 1) 날씨 대시보드

- 도시 검색
- 지역별 날씨 카드 출력
- 상세보기 이동


## 2) 상세 날씨 페이지

- Dynamic Route 기반 도시 정보 출력


## 3) 서비스 소개 페이지

- 프로젝트 설명
- 홈 이동 버튼 제공


## 4) 404 페이지

- 잘못된 URL 접근 처리



---

# 11. 과제4 핵심 학습 내용

이번 과제를 통해 Vue Router를 활용한 SPA 구조를 구현했습니다.

기존 Component 기반 화면에서:

```
Component
    ↓
View
    ↓
Router
    ↓
URL 기반 페이지 관리
```

형태로 확장하면서 실제 웹 서비스와 유사한 페이지 구조를 구성했습니다.

특히 Dynamic Route를 활용하여 하나의 상세 페이지 Component에서 여러 도시 데이터를 처리할 수 있도록 구현했습니다.