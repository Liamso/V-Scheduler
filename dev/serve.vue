<script>
import Vue from 'vue';
import VueScheduler from '@/VueScheduler.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueScheduler
  }
});
</script>

<template>
  <div id="app">
    <vue-scheduler />
  </div>
</template>
