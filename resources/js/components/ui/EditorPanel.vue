<template>
    <div class="h-full overflow-hidden border-l border-gray-700">
        <div class="flex flex-col items-start justify-start h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800" :class="{ 'px-4': show }">
            <h3 @click="show = !show" class="text-sm font-semibold leading-none text-gray-300 select-none" :class="{ 'mb-2 text-left': show, 'transform -rotate-90 translate-y-4 -translate-x-4 origin-bottom-right text-right w-12': !show }">
                {{ title }}
            </h3>
            <slot v-if="show" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        title: String,
    },

    data: () => ({
        show: true,
    }),

});
</script>

<style>

</style>
