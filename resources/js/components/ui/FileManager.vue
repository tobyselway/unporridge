<template>
    <div @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div @click.stop class="w-2/5 bg-gray-800 rounded border border-gray-700 p-4">
            <div class="flex items-center justify-between">
                <h1 class="text-gray-300 text-lg font-semibold tracking-tight">
                    File Manager
                </h1>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div v-if="files" class="mt-6 w-full" :class="{ 'grid grid-cols-4 gap-4': !uploadMode }">
                <div ref="uploadArea" class="cursor-pointer border border-dashed flex items-center justify-center rounded border-gray-700 text-gray-600 hover:text-gray-500 hover:border-gray-500 focus:outline-none" :class="{ 'w-32 h-32': !uploadMode }">
                    <svg v-if="!uploadMode" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                </div>
                <template v-if="!uploadMode">
                    <button v-for="file in files" :key="file.filename" @click="file.selected = !file.selected" class="flex text-gray-300 flex-col items-center justify-center relative border w-32 h-32 rounded focus:outline-none" :class="{ 'border-gray-700 hover:border-gray-500': !file.selected, 'border-indigo-600 hover:border-indigo-500': file.selected }">
                        <div v-if="file.selected" class="absolute top-0 right-0 p-2 text-indigo-600">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        </div>
                        <svg v-if="file.ext === 'obj'" class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        <svg v-else class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        <p class="mt-3 tracking-tight text-sm">{{ file.filename }}</p>
                        <p class="mt-1 tracking-tight font-semibold text-xs text-gray-500">{{ file.size }}</p>
                    </button>
                </template>
            </div>
            <div v-if="files" class="w-full flex items-center justify-between">
                <div></div>
                <button v-if="uploadMode" :disabled="numSelectedFiles == 0" class="flex items-center px-2 py-1 rounded font-semibold tracking-tight text-sm" :class="{ 'bg-indigo-900 text-gray-500': numSelectedFiles == 0, 'bg-indigo-700 hover:bg-indigo-800 text-gray-300': numSelectedFiles > 0 }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <span class="ml-0.5">
                        Upload {{ numSelectedFiles }} {{ numSelectedFiles == 1 ? 'file' : 'files' }}
                    </span>
                </button>
                <button v-else :disabled="numSelectedFiles == 0" @click="selectFiles" class="flex items-center px-2 py-1 rounded font-semibold tracking-tight text-sm" :class="{ 'bg-indigo-900 text-gray-500': numSelectedFiles == 0, 'bg-indigo-700 hover:bg-indigo-800 text-gray-300': numSelectedFiles > 0 }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span class="ml-0.5">
                        Select {{ numSelectedFiles }} {{ numSelectedFiles == 1 ? 'file' : 'files' }}
                    </span>
                </button>
            </div>
        </div> 
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Dropzone from "dropzone";
import axios from 'axios';
import prettyBytes from 'pretty-bytes';

export default defineComponent({
    
    data: () => ({
        dropzone: null,
        uploadMode: false,
        files: null,
    }),

    async mounted() {
        this.files = (await axios.get('/api/files')).data.map(file => {
            file.selected = false;
            file.size = prettyBytes(file.size);
            return file;
        });
        // this.dropzone = new Dropzone(this.$refs.uploadArea, {
        //     url: '/api/upload',
        // });
        // this.dropzone.on("addedfile", file => {
        //     console.log(`File added: ${file.name}`);
        //     this.uploadMode = true;
        // });
    },

    methods: {

        selectFiles() {
            this.$emit('select', this.selectedFiles.map(file => file.filename));
            this.$emit('close');
        },

    },

    computed: {

        selectedFiles() {
            return this.files.filter(file => file.selected);
        },

        numSelectedFiles() {
            return this.selectedFiles.length;
        },

    },

});
</script>

<style>

</style>
