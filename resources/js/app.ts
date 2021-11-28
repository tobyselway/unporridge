import { createApp } from 'vue';
import store from './store';
import App from './components/App.vue';

const app = createApp({
    components: { App },
});

app.use(store);

app.mount('#app');
