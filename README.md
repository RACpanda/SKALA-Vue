# ☁️ 과제 5: Weather Store (Pinia)

## 1. 프로젝트 소개

Vue Router를 적용한 기존 Weather Router 프로젝트에 Pinia를 활용한 전역 상태 관리 기능을 추가한 프로젝트입니다.

기존 과제에서는 각 Component와 View 내부에서 상태 데이터를 관리했지만, 여러 화면에서 동일한 데이터를 공유해야 하는 경우 Props 전달이나 이벤트 전달 과정이 복잡해질 수 있습니다.

이번 과제에서는 Pinia Store를 적용하여 온도 단위 설정을 전역 상태로 관리하고, 여러 Component에서 동일한 상태를 공유할 수 있도록 구조를 개선했습니다.

주요 구현 내용:

- Pinia Store 생성
- State를 활용한 전역 상태 관리
- Getter를 활용한 계산 데이터 관리
- Action을 활용한 상태 변경
- UnitToggle Component 구현
- 날씨 상세 페이지 온도 단위 변환 적용


---

# 2. 프로젝트 구조

```
src
├── App.vue
│
├── stores
│   └── configStore.ts
│
├── components
│   └── exercise
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       ├── WeatherCard.vue
│       └── UnitToggle.vue
│
└── views
    ├── WeatherHomeView.vue
    ├── WeatherDetailView.vue
    ├── WeatherAboutView.vue
    └── NotFoundView.vue
```


## 구조 설명

### stores

전역에서 공유하는 상태를 관리합니다.

- configStore.ts

  - 현재 온도 단위 저장
  - 온도 단위 표시 값 반환
  - 온도 단위 변경 기능 제공


### components

재사용 가능한 UI Component를 관리합니다.

- UnitToggle.vue

  - 현재 온도 단위 표시
  - 버튼 클릭을 통한 단위 변경


- WeatherCard.vue

  - 지역별 날씨 정보 출력
  - Store 상태에 따라 온도 표시 변경


### views

페이지 단위 Component입니다.

- WeatherHomeView.vue

  - 날씨 대시보드 화면


- WeatherDetailView.vue

  - 선택한 도시의 상세 날씨 정보 출력
  - Store를 이용한 온도 변환 적용


---

# 3. Pinia 설정

## Pinia 등록

`main.ts`에서 Pinia를 Vue 애플리케이션에 등록합니다.

```ts
app.use(createPinia())
```


Pinia를 등록하면 여러 Component에서 하나의 Store를 공유할 수 있습니다.


---

# 4. Config Store 구현

온도 단위를 관리하기 위한 Store를 생성했습니다.


파일 위치:

```
src/stores/configStore.ts
```


Store 역할:

- 현재 온도 단위 저장
- 화면 표시용 단위 반환
- 온도 단위 변경


구현:

```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useConfigStore = defineStore('config', () => {


    const unit = ref('celsius')


    const unitSymbol = computed(() => {

        if(unit.value === 'fahrenheit'){
            return '°F'
        }

        return '°C'

    })


    function toggleUnit(){

        if(unit.value === 'celsius'){
            unit.value = 'fahrenheit'
        }
        else{
            unit.value = 'celsius'
        }

    }


    return {
        unit,
        unitSymbol,
        toggleUnit
    }

})
```


---

# 5. Store 구성 요소

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


---

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


---

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

# 6. UnitToggle Component 구현

온도 단위 변경 기능을 별도의 Component로 분리했습니다.


파일 위치:

```
src/components/exercise/UnitToggle.vue
```


역할:

- 현재 온도 단위 표시
- 버튼 클릭 이벤트 처리
- Pinia Action 실행


데이터 흐름:

```
UnitToggle.vue

↓

configStore.toggleUnit()

↓

전체 화면 온도 단위 변경
```


---

# 7. WeatherDetailView 적용

기존 상세 페이지에서는 저장된 온도 값을 그대로 출력했습니다.

변경 전:

```ts
weather.temp
```


변경 후:

```ts
displayTemp
```


computed를 활용하여 현재 선택된 단위에 맞게 온도를 변환합니다.


```ts
const displayTemp = computed(() => {

    const rawTemp = weather.temp


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

# 8. 데이터 흐름 변경

## 적용 전

```
WeatherHomeView

 └ 온도 상태 관리


WeatherDetailView

 └ 별도 온도 처리
```


각 페이지에서 개별적으로 상태를 관리하는 구조였습니다.


---

## 적용 후

```
             configStore

                  |

       ---------------------

       WeatherHomeView

       WeatherDetailView

       UnitToggle
```


하나의 Store를 여러 Component가 공유하여 동일한 상태를 사용할 수 있도록 개선했습니다.


---

# 9. 구현 결과

구현된 기능:


## 1) 온도 단위 변경

- Navigation Bar의 UnitToggle 버튼 제공
- 클릭 시 섭씨/화씨 전환


## 2) 날씨 대시보드 적용

- Store의 현재 단위를 기준으로 온도 표시


## 3) 상세 날씨 페이지 적용

- Dynamic Route 기반 상세 페이지에서도 동일한 단위 적용


## 4) 전역 상태 공유

- 여러 Component가 하나의 Store 데이터 사용


---

# 10. 과제5 핵심 학습 내용

이번 과제를 통해 Pinia를 활용한 Vue 전역 상태 관리 구조를 구현했습니다.

기존 Component 중심 구조:

```
Component

↓

Props / Emit

↓

데이터 전달
```

에서


Pinia 적용 후:

```
Component

↓

Pinia Store

↓

공유 상태 관리
```

구조로 변경했습니다.


이를 통해 여러 페이지와 Component에서 공통으로 사용하는 데이터를 효율적으로 관리할 수 있으며, Vue 애플리케이션의 확장성과 유지보수성을 높이는 방법을 학습했습니다.