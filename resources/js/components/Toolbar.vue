<template>
    <div class="flex items-center justify-between w-full border-b border-gray-700">
        <div class="flex items-center justify-start h-full">
            <div v-if="open" @click="open = false" class="fixed inset-0"></div>
            <div class="relative h-full">
                <button @click="open = !open" @mouseover="selected = 'add'" class="flex items-center w-full h-full pl-2 pr-3 text-sm font-semibold text-gray-400 cursor-default focus:outline-none hover:text-gray-300" :class="{ 'bg-gray-800': open && selected == 'add' }">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span class="ml-1">Add</span>
                </button>
                <ul v-if="open && selected == 'add'" class="absolute top-0 left-0 w-48 py-1 mt-12 text-gray-300 bg-gray-800 border-b border-l border-r border-gray-700 shadow">
                    <li @click="addCube" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Cube</li>
                    <li @click="addLight" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Point Light</li>
                    <li @click="addCamera" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Perspective Camera</li>
                    <li @click="addOBJ" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">OBJ File</li>
                </ul>
            </div>

            <div class="relative h-full">
                <button @click="open = !open" @mouseover="selected = 'edit'" class="flex items-center w-full h-full pl-2 pr-3 text-sm font-semibold text-gray-400 cursor-default focus:outline-none hover:text-gray-300" :class="{ 'bg-gray-800': open && selected == 'edit' }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    <span class="ml-1">Edit</span>
                </button>
                <ul v-if="open && selected == 'edit'" class="absolute top-0 left-0 w-48 py-1 mt-12 text-gray-300 bg-gray-800 border-b border-l border-r border-gray-700 shadow">
                    <li @click="deselect" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Deselect</li>
                </ul>
            </div>

        </div>
        <div class="flex items-center h-full px-2">
            <img class="w-8 h-8 rounded-full object-cover border border-gray-800" src="https://userstock.io/data/wp-content/uploads/2017/09/lesly-b-juarez-276953-1024x885.jpg" alt="" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export default defineComponent({

    data: () => ({
        open: false,
        selected: null,
    }),

    methods: {

        addCube() {
            this.open = false;
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
            const cube = new THREE.Mesh(geometry, material);
            cube.name = 'Cube';
            this.$store.dispatch('addMesh', cube);
        },

        addLight() {
            this.open = false;
            const light = new THREE.PointLight(0xffffff, 8, 10, 1);
            light.name = 'Point Light';
            light.position.set(5, 5, 5);
            const lightHelper = new THREE.PointLightHelper(light, 0.5);
            lightHelper.name = 'Helper';
            light.children.push(lightHelper);
            this.$store.dispatch('addLight', light);
        },

        addCamera() {
            this.open = false;
            const camera = new THREE.PerspectiveCamera(75, 16/9, 1, 1000);
            camera.name = 'Camera';
            camera.position.set(-10, 10, 10);
            camera.lookAt(0, 0, 0);
            const cameraHelper = new THREE.CameraHelper(camera);
            cameraHelper.name = 'Helper';
            camera.children.push(cameraHelper);
            this.$store.dispatch('addCamera', camera);
        },

        addOBJ() {
            this.open = false;
            this.$store.dispatch('openFileManager', {
                filter: 'obj',
                callback: files => files.forEach(filename => {
                    const loader = new OBJLoader();
                    loader.load(
                        // resource URL
                        `/api/files/${filename}`,
                        // called when resource is loaded
                        obj => {
                            if(obj.type === 'Group') {
                                obj.traverse(child => {
                                    if(child.type === 'Mesh') {
                                        child.material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
                                        if(child.name === '') {
                                            child.name = 'Mesh';
                                        }
                                        this.$store.dispatch('addMesh', child);
                                    }
                                });
                            } else {
                                obj.material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
                                if(obj.name === '') {
                                    obj.name = 'Mesh';
                                }
                                this.$store.dispatch('addMesh', obj);
                            }
                            this.$store.dispatch('hideLoading');
                        },
                        // called when loading is in progress
                        xhr => {
                            const percent = (xhr.loaded / xhr.total * 100);
                            this.$store.dispatch('showLoading', {
                                name: 'Loading mesh...',
                                percent,
                            });
                        },
                        // called when loading has errors
                        err => {
                            this.$store.dispatch('pushError', 'Error loading mesh!\n' + err);
                            this.$store.dispatch('hideLoading');
                        }
                    );
                }),
            });
        },

        deselect() {
            this.open = false;
            this.$store.dispatch('unselect');
        },

    },

});
</script>

<style>

</style>