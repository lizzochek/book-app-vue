import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/store';

import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';

const app = createApp(App);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);

app.use(router);
app.use(store);

app.mount('#app');
