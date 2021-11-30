<template>
    <div ref="preview"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

let scene;
let camera;
let renderer;
let composer;
let meshes;
let lights;
let cameras;

export default defineComponent({

    mounted() {
        this.setupScene();
        this.setupCamera();
        this.setupEntities();
        this.setupRenderer();
        this.setupComposer();

        this.animate();
    },

    methods: {

        setupScene() {
            scene = new THREE.Scene();
            // scene.add(new THREE.GridHelper(10, 10, 0x888888, 0x444444));
        },

        setupCamera() {
            camera = new THREE.PerspectiveCamera(75, this.$refs.preview.clientWidth / this.$refs.preview.clientHeight, 0.1, 1000);
            window.addEventListener('resize', this.onWindowResize);
            camera.position.set(8, 7, 2);
            camera.lookAt(0, 0, 0);
        },

        setupEntities() {
            this.meshes.traverse(mesh => scene.add(mesh.clone()));
            this.lights.traverse(light => {
                // const children = light.children;
                // light.children = [];
                const newLight = light.clone();
                // light.children = children;
                // console.log(newLight);
                scene.add(newLight);
            });
            // this.cameras.traverse(camera => scene.add(camera.clone()));
        },

        setupRenderer() {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(this.$refs.preview.clientWidth, this.$refs.preview.clientHeight);
            this.$refs.preview.appendChild(renderer.domElement);
        },

        setupComposer() {
            composer = new EffectComposer(renderer);

            const renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);
        },

        loop() {
            //
        },

        animate() {
            requestAnimationFrame(this.animate);
            this.loop();
            this.$emit('loop');
            composer.render(scene, camera);
        },

        onWindowResize() {
            const aspect = this.$refs.preview.clientWidth / this.$refs.preview.clientHeight;

            camera.aspect = aspect;
            camera.updateProjectionMatrix();

            // cameraOrtho.left = cameraOrtho.bottom * aspect;
            // cameraOrtho.right = cameraOrtho.top * aspect;
            // cameraOrtho.updateProjectionMatrix();

            renderer.setSize(this.$refs.preview.clientWidth, this.$refs.preview.clientHeight);
            composer.render(scene, camera);
        },

    },

    unmounted() {
        renderer.dispose();
    },

    computed: {
        ...mapGetters([
            'meshes',
            'lights',
        ]),
    },

});
</script>

<style>

</style>
