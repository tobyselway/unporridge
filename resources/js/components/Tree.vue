<template>
    <div class="flex flex-col h-full border-r border-gray-800">
        <h2 class="flex items-center h-12 pl-4 text-sm font-semibold tracking-wider text-gray-400 uppercase border-b border-gray-700">
            PorridJS
        </h2>
        <div class="flex flex-col flex-1 w-full mt-4" @click.stop="$store.dispatch('unselect')">
            <div class="py-1 mb-4" v-for="group in groups" :key="group.uuid">
                <p class="ml-2 text-sm font-semibold text-gray-300">{{ group.name }}</p>
                <ul v-if="group.children.length > 0" class="mt-1">
                    <li v-for="child in group.children" :key="child.uuid" @click.stop="$store.dispatch('select', child)" class="flex flex-col py-2 select-none" :class="{ 'bg-gray-800': selected && selected.uuid == child.uuid }">
                        <!-- <p class="text-xs tracking-tighter text-gray-500 cursor-default">{{ child.uuid }}</p> -->
                        <div class="-ml-0.5 flex items-center text-xs tracking-tighter text-gray-500 cursor-default px-4">
                            <svg v-if="child.type == 'PointLight'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                            <svg v-else-if="child.type == 'Mesh'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            <svg v-else-if="child.type == 'PointLightHelper'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                            <span class="ml-0.5">{{ child.type }}</span>
                        </div>
                        <div class="flex items-center justify-between px-4">
                            <p class="text-sm font-semibold tracking-wide text-gray-300 bg-transparent">
                                {{ child.name }}
                            </p>
                            <div class="flex items-center">
                                <svg @click.stop="() => $store.dispatch('delete', child)" class="w-4 h-4 mr-2 text-red-400 cursor-pointer hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                <svg @click.stop="child.visible = false" v-if="child.visible" class="w-4 h-4 text-gray-300 cursor-pointer hover:text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                <svg @click.stop="child.visible = true" v-else class="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                            </div>
                        </div>
                        <ul v-if="child.children" class="mt-2">
                            <li v-for="subchild in child.children" :key="subchild.uuid" @click.stop="$store.dispatch('select', subchild)" class="select-none py-2" :class="{ 'bg-gray-800': selected && selected.uuid == subchild.uuid }">
                                <div class="flex items-center justify-between px-4">
                                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    <div class="ml-2 flex flex-col flex-1">
                                        <div class="-ml-0.5 flex items-center text-xs tracking-tighter text-gray-500 cursor-default">
                                            <svg v-if="subchild.type == 'PointLight'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                            <svg v-else-if="subchild.type == 'Mesh'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                            <svg v-else-if="subchild.type == 'PointLightHelper'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                                            <span class="ml-0.5">{{ subchild.type }}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <p class="text-sm font-semibold tracking-wide text-gray-300 bg-transparent">
                                                {{ subchild.name }}
                                            </p>
                                            <div class="flex items-center">
                                                <svg v-if="subchild.type != 'PointLightHelper'" @click.stop="() => $store.dispatch('delete', subchild)" class="w-4 h-4 mr-2 text-red-400 cursor-pointer hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                <svg @click.stop="subchild.visible = false" v-if="subchild.visible" class="w-4 h-4 text-gray-300 cursor-pointer hover:text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                <svg @click.stop="subchild.visible = true" v-else class="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div v-else class="pl-4 mt-2 text-xs tracking-tighter text-gray-500 cursor-default">
                    Empty
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({

    computed: {
        ...mapGetters([
            'groups',
            'selected',
        ]),
    },

});
</script>

<style>

</style>