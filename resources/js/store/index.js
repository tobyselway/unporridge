import { createStore } from 'vuex';
import * as THREE from 'three';

export default createStore({

    state: () => ({
        scene: null,
        meshes: null,
        lights: null,
        selected: null,
        fileManagerOpen: false,
        fileManagerCallback: () => null,
    }),

    getters: {

        scene(state) {
            return state.scene;
        },

        meshes(state) {
            return state.meshes;
        },

        lights(state) {
            return state.lights;
        },

       groups(state) {
            if(state.scene === null) return null;
            const groups = [];
            state.scene.traverse(entity => {
                if(entity.parent && entity.parent.type == 'Scene' && entity.type == 'Group') {
                    groups.push(entity);
                }
            });
            return groups;
        },

        selected(state) {
            return state.selected;
        },

        fileManagerOpen(state) {
            return state.fileManagerOpen;
        },

        fileManagerCallback(state) {
            return state.fileManagerCallback;
        },

    },

    mutations: {

        setScene(state, scene) {
            state.scene = scene;
        },

        setSelected(state, entity) {
            state.selected = entity;
        },

        setMeshes(state, meshes) {
            state.meshes = meshes;
        },

        addMesh(state, mesh) {
            state.meshes.add(mesh);
        },

        setLights(state, lights) {
            state.lights = lights;
        },

        addLight(state, light) {
            state.lights.add(light);
        },

        setFileManagerOpen(state, open) {
            state.fileManagerOpen = open;
        },

        setFileManagerCallback(state, callback) {
            state.fileManagerCallback = callback;
        },

    },

    actions: {

        setScene({ commit }, scene) {
            commit('setScene', scene);
        },

        select({ commit }, entity) {
            commit('setSelected', entity);
        },

        unselect({ commit }) {
            commit('setSelected', null);
        },

        setMeshesGroup({ commit }, meshes) {
            commit('setMeshes', meshes);
        },

        addMesh({ commit }, mesh) {
            commit('addMesh', mesh);
        },

        setLightsGroup({ commit }, lights) {
            commit('setLights', lights);
        },

        addLight({ commit }, light) {
            commit('addLight', light);
        },

        delete({ state, dispatch }, entity) {
            if(state.selected && entity.uuid == state.selected.uuid) {
                dispatch('unselect');
            }
            entity.removeFromParent();
        },

        openFileManager({ commit }, callback) {
            commit('setFileManagerOpen', true);
            commit('setFileManagerCallback', callback);
        },

        closeFileManager({ commit }) {
            commit('setFileManagerOpen', false);
            commit('setFileManagerCallback', () => null);
        },

    },

});
