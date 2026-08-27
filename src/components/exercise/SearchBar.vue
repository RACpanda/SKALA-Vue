<script setup lang="ts">
defineProps({modelValue:String})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <section class="search-box">
        <h2>도시 검색(한글 즉시 동기화)</h2>
        <input
        type="text"
        placeholder="검색할 도시 이름 입력"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>

        <p>검색 중인 도시:{{ modelValue }}</p>
    </section>
</template>

<style scoped>

input {

    width: 350px;

    padding: 12px 16px;

    border: 1px solid #cccccc;

    border-radius: 8px;

    font-size: 16px;

}


input:focus {

    outline: none;

    border-color: #666;

}

</style>