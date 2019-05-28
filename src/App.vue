<template>
  <div id="app">
    <h1>{{$hrouter}}</h1>
    
    <div id="nav">
      <button @click="goAbout">GO ABOUT</button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <div>
      {{count}}
      <button @click="onAdd">自增</button>
    </div>
  </div>
</template>
<script>
import store from './wfStore';
export default {
  computed: {
    count() {
      return store.state.count 
    }
  },
  methods: {
    onAdd(){
      store.commit('add')
    },
    goAbout() {
      this.$wfrouter.push('/about')
    }
  },
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
