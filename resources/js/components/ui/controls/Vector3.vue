<template>
    <div class="flex flex-col items-start">
        <p v-if="label" class="mt-3 mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
            {{ label }}
        </p>
        <div class="flex items-center">
            <input class="w-12 bg-gray-800 rounded-l px-1 border text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="renderVal(modelValue ? modelValue.x : x)" @change="e => setX(parseVal(e.target.value))" />
            <input class="w-12 bg-gray-800 px-1 border-t border-b text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="renderVal(modelValue ? modelValue.y : y)" @change="e => setY(parseVal(e.target.value))" />
            <input class="w-12 bg-gray-800 rounded-r px-1 border text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="renderVal(modelValue ? modelValue.z : z)" @change="e => setZ(parseVal(e.target.value))" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import * as THREE from 'three';

export default defineComponent({

    props: {
        label: String,
        modelValue: THREE.Vector3 | THREE.Euler,
        // or
        x: Number,
        y: Number,
        z: Number,
    },

    methods: {

        parseVal(val) {
            if(!val) val = '0';
            return parseFloat(val);
        },

        renderVal(val) {
            return val.toFixed(2);
        },

        setX(x) {
            this.$emit('update:x', x);
            if(this.modelValue)
                this.swizzle({ x });
        },

        setY(y) {
            this.$emit('update:y', y);
            if(this.modelValue)
                this.swizzle({ y });
        },

        setZ(z) {
            this.$emit('update:z', z);
            if(this.modelValue)
                this.swizzle({ z });
        },

        swizzle({ x, y, z }) {
            const vec = new THREE.Vector3();
            ['x', 'y', 'z'].map(a => vec[a] = {x, y, z}[a] ?? this.modelValue[a]);
            this.$emit('update:modelValue', vec);
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
