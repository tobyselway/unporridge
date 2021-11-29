<template>
    <div @click="$emit('close')" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div @click.stop class="w-5/5 sm:w-4/5 h-3/4 bg-gray-800 rounded border border-gray-700 p-1 flex flex-col items-center">
            <div class="flex items-center justify-between p-3 w-full">
                <h1 class="text-gray-300 text-lg font-semibold tracking-tight">
                    Script Editor
                </h1>
                <div class="flex items-center">
                    <button @click="saveCode" class="bg-green-600 hover:bg-green-500 text-gray-100 px-2 py-1 rounded flex items-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        <span class="ml-1 text-sm tracking-tight">Save</span>
                    </button>
                    <button @click="$emit('close')" class="ml-4 text-gray-500 hover:text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>
            <div class="flex-1 w-full">
                <div ref="editor" class="w-full h-full rounded"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import * as monaco from 'monaco-editor';

export default defineComponent({
    
    data: () => ({
        editor: null,
    }),

    mounted() {
        this.editor = monaco.editor.create(this.$refs.editor, {
            value: [
                'function loop(entity) {',
                    '\tentity.position.x += 1.5;',
                '}',
                '',
            ].join('\n'),
            language: 'javascript',
            theme: 'vs-dark',
        });

        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                // // find out if we are completing a property in the 'dependencies' object.
                // var textUntilPosition = model.getValueInRange({
                //     startLineNumber: 1,
                //     startColumn: 1,
                //     endLineNumber: position.lineNumber,
                //     endColumn: position.column
                // });
                // var match = textUntilPosition.match(
                //     /"dependencies"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/
                // );
                // if (!match) {
                //     return { suggestions: [] };
                // }
                var word = model.getWordUntilPosition(position);
                var range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };
                return {
                    suggestions: this.createDependencyProposals(range),
                };
            }
        });
    },

    methods: {
        createDependencyProposals(range) {
            // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
            // here you could do a server side lookup
            return [
                {
                    label: 'entity.position',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'Manipulate the position of the current entity',
                    insertText: 'entity.position = ',
                    range: range
                },
            ];
        },

        saveCode() {
            this.$emit('save', 'test');
            this.$emit('close');
        },
    },

});
</script>

<style>

</style>
