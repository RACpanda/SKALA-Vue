<script setup lang="ts"></script>

<template>
  <nav>
    <h1>과제 4:라우터적용</h1>

    <RouterLink to="/">
      날씨 대시보드
    </RouterLink>

    <RouterLink to="/about">
      서비스 소개
    </RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
.app-container {
  width: 720px;
  margin: 40px auto;
  font-family:
  Arial, sans-serif;
}

header h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

nav {
  display:flex;
  gap:20px;
  margin-bottom:30px;
}


nav a {
  text-decoration:none;
  color:#555;
  padding:8px 14px;
  border-radius:6px;
}


nav a.router-link-active {
  color:#1976d2;
  background:#eaf3ff;
}


main {
  width:100%;
}

</style>