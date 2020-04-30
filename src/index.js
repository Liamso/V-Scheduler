import VueScheduler from "./Calendar.vue";

export default {
    install(Vue) {
        Vue.component("v-scheduler", VueScheduler);
    }
};