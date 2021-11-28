<template>
    <div class="flex flex-col items-start">
        <p v-if="label" class="mt-3 mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
            {{ label }}
        </p>
        <div class="flex items-center">
            <input class="w-32 bg-gray-800 rounded px-1 border text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="renderVal(modelValue)" @change="e => $emit('update:modelValue', parseVal(e.target.value))" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        label: String,
        modelValue: Number,
    },

    methods: {

        parseVal(val) {
            if(isNaN(parseFloat(val))) val = '0';
            return parseFloat(val);
        },

        renderVal(val) {
            return val.toFixed(2);
        },

    },

});
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
