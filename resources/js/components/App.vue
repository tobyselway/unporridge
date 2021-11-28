<template>
    <div class="flex items-start justify-between w-full h-full">
        <Tree class="w-64" />
        <div class="flex flex-col flex-1 h-full">
            <Toolbar class="h-12" />
            <Scene @loop="loop" class="flex-1" />
            <Editor class="h-64" />
        </div>
        <FileManager v-if="showFileManager" @close="showFileManager = false" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Scene from './Scene.vue';
import Tree from './Tree.vue';
import Editor from './Editor.vue';
import Toolbar from './Toolbar.vue';
import FileManager from './ui/FileManager.vue';

export default defineComponent({

    data: () => ({
        showFileManager: false,
    }),

    components: {
        Scene,
        Tree,
        Editor,
        Toolbar,
        FileManager,
    },

    methods: {

        loop() {
            // this.meshes.traverse(mesh => {
            //     mesh.rotation.x += 0.01;
            //     mesh.rotation.y += 0.01;
            // });
            // TODO: Apply scripts to meshes
        },

    },

});
</script>

<style>

</style>
