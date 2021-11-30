<template>
    <div class="w-full h-6 px-2 py-0.5 bg-gray-900 border-t border-gray-800 flex items-center justify-between text-xs tracking-tight font-semibold text-gray-500">
        <p>UnPorridge v0.1.0</p>
        <div class="flex items-center">
            <div class="fixed bottom-0 right-0 px-2 py-8 flex items-end justify-end flex-col">
                <ErrorBox
                    v-for="(error, i) in errors"
                    :key="`error-${i}`"
                    :error="error"
                    @close="$store.dispatch('deleteError', i)"
                    class="mt-3"
                />
            </div>
            <div v-if="showCurrentTask" class="flex items-center">
                <svg class="animate-spin h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="ml-1">{{ currentTaskName }} ({{ currentTaskPercent }}%)</span>
                <div class="ml-4 w-48 h-2 rounded-full border border-gray-800">
                    <div class="h-full bg-indigo-800 rounded-full" :style="{ width: currentTaskPercent + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import ErrorBox from './ErrorBox.vue';

export default defineComponent({

    components: {
        ErrorBox,
    },

    computed: {
        ...mapGetters([
            'showCurrentTask',
            'currentTaskName',
            'currentTaskPercent',
            'errors',
        ]),
    },

});
</script>

<style>

</style>
