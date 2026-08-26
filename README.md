# 과제 3: 날씨 (Component)

## 1. 프로젝트 개요

Vue Component 기능을 활용하여 기존 날씨 Mockup 화면을 기능별 Component로 분리하여 구현했습니다.

기존에는 하나의 Vue 파일에서 데이터 관리, 검색, 날씨 카드 출력, 이벤트 처리를 모두 수행했지만, 이번 실습에서는 부모 Component와 자식 Component로 역할을 나누어 구조를 개선했습니다.

부모 Component에서는 전체 데이터와 반응형 상태를 관리하고, 자식 Component에서는 화면 구성과 사용자 이벤트 처리를 담당하도록 구현했습니다.

---

## 2. 프로젝트 구조

```
src
 ├ App.vue
 └ components
      ├ WeatherParent.vue
      ├ SearchBar.vue
      ├ WeatherCard.vue
      └ BaseDashboardCard.vue
```

---

## 3. Component 구성 및 역할

### WeatherParent.vue

전체 날씨 데이터를 관리하는 부모 Component입니다.

날씨 목록, 검색어, 선택된 도시 정보를 상태 변수로 관리하며, 자식 Component들에게 필요한 데이터를 전달합니다.

주요 기능:

- 지역별 날씨 데이터 관리
- 검색어 상태 관리
- 선택된 도시 정보 관리
- computed를 활용한 검색 결과 필터링
- watch와 watchEffect를 활용한 상태 변화 감지
- 자식 Component 이벤트 처리

관리하는 주요 데이터:

```javascript
weatherList
searchQuery
selectedCityInfo
filteredWeatherList
```

---

### SearchBar.vue

도시 검색 기능을 담당하는 Component입니다.

부모 Component에서 전달받은 검색어를 기반으로 입력창을 구성하며, `v-model`을 활용한 양방향 데이터 바인딩을 구현했습니다.

구현 내용:

- props를 통한 `modelValue` 전달
- emit을 통한 입력값 변경 이벤트 전달
- 검색어 변경 시 부모 상태 업데이트

데이터 흐름:

```
사용자 입력
    ↓
SearchBar Component
    ↓
emit(update:modelValue)
    ↓
WeatherParent
    ↓
searchQuery 변경
```

---

### WeatherCard.vue

지역별 날씨 정보를 출력하는 Component입니다.

부모 Component에서 전달받은 날씨 데이터를 props로 받아 화면에 표시합니다.

구현 내용:

- props를 활용한 데이터 전달
- emit을 활용한 카드 선택 이벤트 전달
- 상세보기 버튼 이벤트 전달
- 조건부 렌더링을 통한 날씨 상태 표시

이벤트 흐름:

```
사용자 카드 클릭
        ↓
WeatherCard
        ↓
emit(click-card)
        ↓
WeatherParent
        ↓
selectedCityInfo 변경
```

---

### BaseDashboardCard.vue

공통 카드 레이아웃을 관리하는 Component입니다.

반복적으로 사용되는 카드 형태와 스타일을 하나의 Component로 분리하여 재사용성을 높였습니다.

이를 통해 화면 구조를 단순화하고 동일한 디자인을 여러 영역에서 활용할 수 있도록 구성했습니다.

---

## 4. Vue 주요 기능 활용

### Component 분리

화면을 기능 단위로 나누어 유지보수성과 재사용성을 높였습니다.

```
WeatherParent
 ├ SearchBar
 └ WeatherCard
```

부모 Component는 데이터 관리 역할을 수행하고, 자식 Component는 화면 출력과 이벤트 전달 역할을 수행합니다.

---

### Props

부모 Component의 데이터를 자식 Component로 전달하기 위해 사용했습니다.

예시:

```vue
<WeatherCard
  :weather="weather"
/>
```

부모의 날씨 데이터를 자식 Component에서 받아 출력합니다.

---

### Emit

자식 Component에서 발생한 이벤트를 부모 Component로 전달하기 위해 사용했습니다.

예시:

```javascript
emit('click-card')
```

카드 선택 이벤트를 부모에서 처리하도록 구현했습니다.

---

### Computed

검색어에 따라 출력할 날씨 목록을 자동으로 계산하기 위해 사용했습니다.

```javascript
const filteredWeatherList = computed(() => {

  if (!searchQuery.value) {
    return weatherList.value
  }

  return weatherList.value.filter(
    weather => weather.name.includes(searchQuery.value)
  )
})
```

검색어가 변경되면 관련된 데이터가 자동으로 갱신됩니다.

---

### Watch / WatchEffect

반응형 데이터의 변경을 감시하기 위해 사용했습니다.

Watch는 특정 데이터 변경을 감지합니다.

```javascript
watch(selectedCityInfo, (newCity)=>{
  console.log(newCity)
})
```

선택된 도시 정보가 변경될 때 실행됩니다.


WatchEffect는 내부에서 사용하는 반응형 데이터를 자동 추적합니다.

```javascript
watchEffect(()=>{
  console.log(searchQuery.value)
})
```

검색어 변경을 감지하여 실행됩니다.

---

## 6. 학습 내용

이번 실습을 통해 Vue Component 기반 개발 구조를 학습했습니다.

하나의 화면을 여러 Component로 분리하고, 부모 Component에서는 데이터와 상태를 관리하며 자식 Component에서는 props와 emit을 활용하여 데이터를 전달하고 이벤트를 처리하는 구조를 구현했습니다.

또한 `computed`, `watch`, `watchEffect`를 활용하여 Vue의 반응형 시스템을 적용하고, 데이터 변경에 따라 화면이 자동으로 갱신되는 과정을 이해했습니다.

Component 분리를 통해 코드 재사용성과 유지보수성이 향상되는 Vue 개발 방식의 장점을 확인할 수 있었습니다.