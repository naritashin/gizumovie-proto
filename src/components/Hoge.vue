<template lang="pug">
  div#app
    h2(@click="add()") this page is hoge
    p {{ hogeMessage }}
    div
      input.input(type="text" placeholder="text" v-model="inputText")
      p {{ inputText }}
</template>

<script>
export default {
  name: 'Hoge',
  data () {
    return {
      hogeMessage: 'hogehogehogehoge',
      inputText: '',
      todoData: []
    }
  },
  methods: {
    add () {
      console.log('hoge')
    }
  }
}
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
