<template>
    <div class="flex items-center justify-start w-full border-b border-gray-700">
        <div v-if="open" @click="open = false" class="fixed inset-0"></div>
        <div class="relative h-full">
            <button @click="open = !open" @mouseover="selected = 'add'" class="flex items-center w-full h-full pl-2 pr-3 text-sm font-semibold text-gray-400 cursor-default focus:outline-none hover:text-gray-300" :class="{ 'bg-gray-800': open && selected == 'add' }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                <span class="ml-1">Add</span>
            </button>
            <ul v-if="open && selected == 'add'" class="absolute top-0 left-0 w-32 py-1 mt-12 text-gray-300 bg-gray-800 border-b border-l border-r border-gray-700 shadow">
                <li @click="addCube" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Cube</li>
                <li @click="addLight" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Point Light</li>
                <li @click="addOBJ" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">OBJ File</li>
            </ul>
        </div>

        <div class="relative h-full">
            <button @click="open = !open" @mouseover="selected = 'edit'" class="flex items-center w-full h-full pl-2 pr-3 text-sm font-semibold text-gray-400 cursor-default focus:outline-none hover:text-gray-300" :class="{ 'bg-gray-800': open && selected == 'edit' }">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                <span class="ml-1">Edit</span>
            </button>
            <ul v-if="open && selected == 'edit'" class="absolute top-0 left-0 w-32 py-1 mt-12 text-gray-300 bg-gray-800 border-b border-l border-r border-gray-700 shadow">
                <li @click="deselect" class="px-3 py-1 text-sm cursor-default hover:bg-gray-700">Deselect</li>
            </ul>
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
            light.children.push(lightHelper);
            this.$store.dispatch('addLight', light);
        },

        addOBJ() {
            this.open = false;
            const loader = new OBJLoader();
            const filename = prompt('filename:');
            loader.load(
                // resource URL
                `/api/models/${filename}`,
                // called when resource is loaded
                obj => {
                    if(obj.type === 'Group') {
                        obj.traverse(child => {
                            if(child.type === 'Mesh') {
                                child.material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
                                this.$store.dispatch('addMesh', child);
                            }
                        });
                    } else {
                        obj.material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
                        this.$store.dispatch('addMesh', obj);
                    }
                },
                // called when loading is in progresses
                xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
                // called when loading has errors
                err => console.log('An error happened:', err),
            );
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