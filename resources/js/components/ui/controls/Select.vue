<template>
    <div class="flex flex-col items-start">
        <p v-if="label" class="mt-3 mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
            {{ label }}
        </p>
        <div class="flex items-center">
            <select class="w-32 bg-gray-800 rounded px-1 border text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="modelValue" @input="e => $emit('update:modelValue', e.target.value)">
                <slot />
            </select>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        label: String,
        modelValue: String | Number,
    },

});
</script>

<style>

</style>
