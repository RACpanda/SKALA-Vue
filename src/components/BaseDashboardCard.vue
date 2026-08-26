<template>
    <div class="dashboard-card">
        <slot />
    </div>
</template>

<style scoped>
/* Vite 기본 다크 배경 제거 */
.dashboard-card {
  margin-bottom: 24px;
  padding: 18px;

  background-color: #f6f7f8;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>