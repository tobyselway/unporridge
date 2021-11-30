<template>
    <div class="flex flex-col items-start justify-between w-full h-full">
        <div class="flex items-start justify-between w-full h-full">
            <Tree class="w-64" />
            <div class="flex flex-col flex-1 h-full">
                <Toolbar class="h-12" />
                <Scene v-show="!playMode" @loop="loop" class="flex-1" />
                <Game v-if="playMode" class="flex-1" />
                <Editor class="h-64" />
            </div>
        </div>
        <StatusBar />
        <FileManager
            v-if="fileManagerOpen"
            @close="$store.dispatch('closeFileManager')"
            @select="fileManagerCallback"
            :filter="fileManagerFilter"
        />
        <CodeEditor v-if="editorOpen" @close="editorOpen = false" @save="editorSaved" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Scene from './Scene.vue';
import Game from './Game.vue';
import Tree from './Tree.vue';
import Editor from './Editor.vue';
import Toolbar from './Toolbar.vue';
import FileManager from './ui/FileManager.vue';
import CodeEditor from './ui/CodeEditor.vue';
import StatusBar from './ui/StatusBar.vue';

export default defineComponent({

    components: {
        Scene,
        Game,
        Tree,
        Editor,
        Toolbar,
        FileManager,
        CodeEditor,
        StatusBar,
    },

    data: () => ({
        editorOpen: false,
    }),

    methods: {

        editorSaved(contents) {
            console.log(contents);
        },

        loop() {
            // this.meshes.traverse(mesh => {
            //     mesh.rotation.x += 0.01;
            //     mesh.rotation.y += 0.01;
            // });
            // TODO: Apply scripts to meshes
        },

    },

    computed: {
        ...mapGetters([
            'fileManagerOpen',
            'fileManagerCallback',
            'fileManagerFilter',
            'playMode',
        ]),
    },

});
</script>

<style>

</style>
