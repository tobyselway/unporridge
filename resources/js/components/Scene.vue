<template>
    <div ref="preview"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

let scene;
let camera;
let renderer;
let composer;
let meshes;
let lights;
let orbit;
let control;

export default defineComponent({

    data: () => ({
        // scene: null,
        // camera: null,
        // renderer: null,
        // composer: null,
    }),

    mounted() {
        this.setupScene();
        this.setupGroups();
        this.setupLight();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupComposer();

        this.animate();
    },

    methods: {

        setupScene() {
            scene = new THREE.Scene();
            scene.add(new THREE.GridHelper(10, 10, 0x888888, 0x444444));
            this.$store.dispatch('setScene', scene);
        },

        setupGroups() {
            meshes = new THREE.Group();
            meshes.name = 'Meshes';
            scene.add(meshes);
            this.$store.dispatch('setMeshesGroup', meshes);

            lights = new THREE.Group();
            lights.name = 'Lights';
            scene.add(lights);
            this.$store.dispatch('setLightsGroup', lights);
        },

        setupLight() {
            const light = new THREE.PointLight(0xffffff, 8, 10, 1);
            light.name = 'Point Light';
            light.position.set(5, 5, 5);
            const lightHelper = new THREE.PointLightHelper(light, 0.5);
            lightHelper.name = 'Helper';
            light.children.push(lightHelper);
            this.$store.dispatch('addLight', light);
        },

        setupCamera() {
            camera = new THREE.PerspectiveCamera(75, this.$refs.preview.clientWidth / this.$refs.preview.clientHeight, 0.1, 1000);
            window.addEventListener('resize', this.onWindowResize);
            camera.position.set(8, 7, 2);
            camera.lookAt(0, 0, 0);
        },

        setupControls() {
            orbit = new OrbitControls(camera, renderer.domElement);
            orbit.update();

            control = new TransformControls(camera, renderer.domElement);
            control.addEventListener('dragging-changed', e => orbit.enabled = !e.value);
            window.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                    case 16: // Shift
                        control.setTranslationSnap(1);
                        control.setRotationSnap(THREE.MathUtils.degToRad(45));
                        control.setScaleSnap(0.25);
                        break;

                    case 84: // T
                        control.setMode('translate');
                        break;

                    case 82: // R
                        control.setMode('rotate');
                        break;

                    case 83: // S
                        control.setMode('scale');
                        break;

                    case 88: // X
                        control.showX = ! control.showX;
                        break;

                    case 89: // Y
                        control.showY = ! control.showY;
                        break;

                    case 90: // Z
                        control.showZ = ! control.showZ;
                        break;
                }
            });
            window.addEventListener('keyup', function(event) {
                switch (event.keyCode) {
                    case 16: // Shift
                        control.setTranslationSnap(null);
                        control.setRotationSnap(null);
                        control.setScaleSnap(null);
                        break;
                }
            });
            scene.add(control);
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
            if(this.selected) {
                control.attach(this.selected);
            } else {
                control.detach();
            }
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

    computed: {
        ...mapGetters([
            'selected',
        ]),
    },

});
</script>

<style>

</style>
