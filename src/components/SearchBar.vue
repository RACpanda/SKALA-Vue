<script setup lang="ts">
defineProps({modelValue:String})

const emit = defineEmits(['update:modelvalue'])
</script>

<template>
    <section class="search-box">
        <h2>도시 검색(한글 즉시 동기화)</h2>
        <input
        type="text"
        placeholder="검색할 도시 이름 입력"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"/>
        <p>
        검색 중인 도시:
        {{ modelValue }}
        </p>
    </section>
</template>