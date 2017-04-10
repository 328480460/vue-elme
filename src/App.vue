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
       <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$ajax = axios;

let ERR_OK = 0;

export default {
  name: 'app',
  created: function() {
    this.$ajax({method: 'get', url: '/api/seller'}).then((res) => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data.data;
      }
    });
  },
  components: {
    'v-header': header
  },
  data() {
    return {
      seller: {}
    };
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
      & > a {
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);

          &.active {
              color: rgb(240, 20, 20)
          }
      }
    }
  }
}
</style>
