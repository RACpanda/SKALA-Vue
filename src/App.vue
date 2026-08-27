<script setup lang="ts">
</script>

<template>
  <div class="app-container">
    <h1>한국 주요도시 날씨 및 뉴스 탐색</h1>

    <nav>
      <RouterLink to="/">
        날씨 대시보드
      </RouterLink>

      <RouterLink to="/about">
        서비스 소개
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>

  :global(body){

      background:white;

      color:#333333;

}
</style>