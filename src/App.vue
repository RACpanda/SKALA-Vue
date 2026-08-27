<script setup lang="ts">
import UnitToggler from './components/exercise/UnitToggler.vue'; // 온도 단위 변경 Component
</script>

<template>
  <div class="app-container">
    <h1>과제 4:라우터적용</h1>

    <nav>
      <RouterLink to="/">
        날씨 대시보드
      </RouterLink>

      <RouterLink to="/about">
        서비스 소개
      </RouterLink>

      <UnitToggler />
    </nav>

    <RouterView />
  </div>
</template>