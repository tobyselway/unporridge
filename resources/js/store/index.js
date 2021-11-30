import { createStore } from 'vuex';
import * as THREE from 'three';

export default createStore({

    state: () => ({
        scene: null,
        meshes: null,
        lights: null,
        cameras: null,
        helpers: {},
        selected: null,
        
        errors: [],

        playMode: false,

        fileManagerOpen: false,
        fileManagerCallback: () => null,
        fileManagerFilter: null,

        showCurrentTask: false,
        currentTaskName: '',
        currentTaskPercent: 0,
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

        cameras(state) {
            return state.cameras;
        },

        helpers(state) {
            return state.helpers;
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

        fileManagerFilter(state) {
            return state.fileManagerFilter;
        },

        showCurrentTask(state) {
            return state.showCurrentTask;
        },

        currentTaskName(state) {
            return state.currentTaskName;
        },

        currentTaskPercent(state) {
            return state.currentTaskPercent;
        },

        errors(state) {
            return state.errors;
        },

        playMode(state) {
            return state.playMode;
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

        setCameras(state, cameras) {
            state.cameras = cameras;
        },

        addCamera(state, camera) {
            state.cameras.add(camera);
        },

        setFileManagerOpen(state, open) {
            state.fileManagerOpen = open;
        },

        setFileManagerCallback(state, callback) {
            state.fileManagerCallback = callback;
        },

        setFileManagerFilter(state, filter) {
            state.fileManagerFilter = filter;
        },

        setShowCurrentTask(state, show) {
            state.showCurrentTask = show;
        },

        setCurrentTaskName(state, name) {
            state.currentTaskName = name;
        },

        setCurrentTaskPercent(state, percent) {
            state.currentTaskPercent = percent;
        },

        pushError(state, error) {
            state.errors.push(error);
        },

        deleteError(state, ix) {
            state.errors.splice(ix, 1);
        },

        setPlayMode(state, playMode) {
            state.playMode = playMode;
        },

        unsetHelper(state, uuid) {
            delete state.helpers[uuid];
        },

        registerHelper(state, { uuid, helper }) {
            state.helpers[uuid] = helper;
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

        setCamerasGroup({ commit }, cameras) {
            commit('setCameras', cameras);
        },

        addCamera({ commit }, camera) {
            commit('addCamera', camera);
        },

        delete({ state, commit, dispatch }, entity) {
            if(state.selected && entity.uuid == state.selected.uuid) {
                dispatch('unselect');
            }
            if(state.helpers[entity.uuid]) {
                state.helpers[entity.uuid].removeFromParent();
                commit('unsetHelper', entity.uuid);
            }
            entity.removeFromParent();
        },

        openFileManager({ commit }, { filter, callback }) {
            commit('setFileManagerOpen', true);
            commit('setFileManagerFilter', filter);
            commit('setFileManagerCallback', callback);
        },

        closeFileManager({ commit }) {
            commit('setFileManagerOpen', false);
            commit('setFileManagerFilter', null);
            commit('setFileManagerCallback', () => null);
        },

        showLoading({ commit }, { name, percent }) {
            commit('setCurrentTaskName', name);
            commit('setCurrentTaskPercent', percent);
            commit('setShowCurrentTask', true);
        },

        hideLoading({ commit }) {
            commit('setShowCurrentTask', false);
            commit('setCurrentTaskName', '');
            commit('setCurrentTaskPercent', 0);
        },

        pushError({ commit }, text) {
            commit('pushError', { text });
        },

        deleteError({ commit }, ix) {
            commit('deleteError', ix);
        },

        enterPlayMode({ commit }) {
            commit('setPlayMode', true);
        },

        leavePlayMode({ commit }) {
            commit('setPlayMode', false);
        },

        registerHelper({ commit, state }, { uuid, helper }) {
            commit('registerHelper', { uuid, helper });
            state.scene.add(helper);
        },

    },

});
