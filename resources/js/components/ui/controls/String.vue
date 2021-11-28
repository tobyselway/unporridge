<template>
    <div class="flex flex-col items-start">
        <p v-if="label" class="mt-3 mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
            {{ label }}
        </p>
        <div class="flex items-center">
            <input type="text" class="w-32 bg-gray-800 rounded px-1 border text-gray-300 text-sm border-gray-700 py-0.5 focus:outline-none" :value="error ? '' : modelValue" @change="e => change(e.target.value)" @input="e => input(e.target.value)" />
        </div>
        <p v-if="!allowEmpty && error" class="ml-0.5 mt-0.5 text-xs tracking-tight text-red-400">Cannot be empty</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        label: String,
        modelValue: String,
        allowEmpty: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        error: false,
    }),

    methods: {
        change(val) {
            this.$nextTick(() => {
                if(!this.error) {
                    this.$emit('update:modelValue', val);
                }
            });
        },
        input(val) {
            if(this.allowEmpty || val !== '') {
                if(this.error) {
                    this.$emit('update:modelValue', val);
                    this.error = false;
                }
            } else {
                this.error = true;
            }
        },
    },

});
</script>

<style>

</style>
