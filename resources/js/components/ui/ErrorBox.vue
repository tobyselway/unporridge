<template>
    <div class="relative rounded bg-gray-800 shadow p-4 text-gray-400 w-64">
        <button @click="$emit('close')" class="focus:outline-none absolute top-2 right-2 text-gray-500 hover:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div class="flex items-center text-red-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span class="ml-1 font-semibold text-sm tracking-tight">
                Error
            </span>
        </div>
        <div class="mt-2 mb-1 text-xs font-normal tracking-normal" v-html="error.text.replace('\n', '<br/>')"></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        error: Object,
    },

});
</script>

<style>

</style>
