<script setup lang="ts">
import {useRoute} from 'vue-router'

const route = useRoute()
const cityId = route.params.id
</script>

<template>
<h2>지역별 상세 기상 관측 정보</h2>

<p>지정지역 :{{cityId}}</p>

</template>