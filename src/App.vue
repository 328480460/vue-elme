<template>
  <div id="app">
      <v-header :seller='seller'></v-header>
      <div class="tab">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>  
        </div>
        <div class="tab-item">
           <router-link to="/ratings">评论</router-link>  
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>  
        </div>
      </div>
       <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import Vue from 'vue';
import VueResource from 'vue-resource';
import FalseData from '../data.json';

Vue.use(VueResource);

export default {
  name: 'app',
  created: function() {
    this.seller = FalseData.seller;
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="less">
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex:1;
      text-align: center;
    }
  }
}
</style>
