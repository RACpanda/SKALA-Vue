<script setup lang="ts"></script>

<template>
  <h1>과제 4:라우터적용</h1>
  <nav>
    <RouterLink to="/">
      날씨 리스트
    </RouterLink>

    <RouterLink to="/about">
      서비스 소개
    </RouterLink>
  </nav>

  <RouterView />
</template>