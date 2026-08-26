<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/">
      날씨 대시보드
    </RouterLink>

    <RouterLink to="/about">
      서비스 소개
    </RouterLink>
  </nav>

  <RouterView />
</template>