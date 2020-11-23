import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.use(VueContentPlaceholders)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
