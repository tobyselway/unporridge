<template>
    <div v-if="selected" class="flex items-center justify-end w-full px-3 py-4 pt-4 border-t border-gray-700">
        <EditorPanel title="General">
            <String label="Name" v-model="selected.name" />
            <Boolean label="Visible" v-model="selected.visible" />
        </EditorPanel>
        <EditorPanel title="Material" v-if="selected.type === 'Mesh'">
            <Select label="Shader" :modelValue="1">
                <option :value="1">Mesh Normal</option>
            </Select>
            <Colour label="Colour" v-model="selected.material.color" />
            <Scalar label="Sheen" v-model="selected.material.sheen" />
            <Boolean label="Transparent" v-model="selected.material.transparent" />
            <Scalar label="Opacity" v-model="selected.material.opacity" v-if="selected.material.transparent" />
        </EditorPanel>
        <EditorPanel title="Light" v-if="selected.type === 'PointLight'">
            <Scalar label="Intensity" v-model="selected.intensity" />
            <Scalar label="Decay" v-model="selected.decay" />
        </EditorPanel>
        <EditorPanel title="Transform" v-if="selected.type !== 'PointLightHelper'">
            <Vector3 label="Position" v-model:x="selected.position.x" v-model:y="selected.position.y" v-model:z="selected.position.z" />
            <Vector3 label="Rotation" v-model:x="selected.rotation.x" v-model:y="selected.rotation.y" v-model:z="selected.rotation.z" />
            <Vector3 label="Scale" v-model:x="selected.scale.x" v-model:y="selected.scale.y" v-model:z="selected.scale.z" />
        </EditorPanel>
    </div>
    <div v-else class="flex items-center justify-center w-full pt-4 text-lg font-semibold tracking-tight text-gray-500 border-t border-gray-700">
        Nothing selected
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import EditorPanel from './ui/EditorPanel';
import Vector3 from './ui/controls/Vector3';
import Scalar from './ui/controls/Scalar';
import Select from './ui/controls/Select';
import String from './ui/controls/String';
import Colour from './ui/controls/Colour';
import Boolean from './ui/controls/Boolean';

export default defineComponent({

    components: {
        EditorPanel,
        Vector3,
        Scalar,
        Select,
        String,
        Colour,
        Boolean,
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