<template>
    <div class="flex flex-col items-start">
        <p v-if="label" class="mt-3 mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
            {{ label }}
        </p>
        <div class="flex items-center">
            <input type="color" class="w-12 bg-gray-800 rounded px-1 border text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="renderVal(modelValue)" @input="e => $emit('update:modelValue', parseVal(e.target.value))" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import * as THREE from 'three';

export default defineComponent({

    props: {
        label: String,
        modelValue: THREE.Color,
    },

    methods: {
        parseVal(val) {
            return new THREE.Color(val);
        },

        renderVal(val) {
            return '#' + val.getHexString();
        },
    },

});
</script>

<style>

</style>
