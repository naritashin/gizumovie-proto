<template lang="pug">
  div#app
    username-component
    //- div
    //-   input.input(type="text" placeholder="text" v-model="inputText")
    //-   p {{ inputText }}
</template>

<script>
import Vue from 'vue'

export default {}

let usernameComponent = Vue.extend({
  name: 'username-component',
  template: 'div {{ prop.username }}',
  data: function () {
    return {
      prop: {
        username: 'default username'
      }
    }
  }
})

Vue.component('username-component', usernameComponent)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
  font-weight: normal;
}
.links {
  list-style-type: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}
a {
  color: #42b983;
}
.hello {
  font-size: 50px;
}
</style>
