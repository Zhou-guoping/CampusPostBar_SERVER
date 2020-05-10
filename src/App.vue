<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  mounted() {

  },
  methods:{

  }
}
</script>

<style>
  #app {
    height: 100%;
  }
  @media screen and (min-width: 1000px){
    html, body { min-width: 1000px !important; }
  }
  a{
    text-decoration: none !important;
  }
  li{
    text-decoration: none !important;
  }
</style>
