<template lang="pug">
  div#app
    h2 this page is Api
    div.api
      div.api__search
        p.api__target 検索カテゴリー【{{ searchCate }}】
        div.api__tabs
          button.api__tab(v-on:click="tabCity") 市区町村
          button.api__tab(v-on:click="tabMember") 人口
          button.api__tab(v-on:click="tabId") ID
        input.api__input(type="text" :placeholder="placeholder" v-model="searchInput")
      ul.api__list
        li(v-for="api in filterList" v-bind="filterList")
          dl.api__data
           dt ID:
           dd {{ api.id }}
          dl.api__data
            dt 市区町村:
            dd {{ api.city }}
          dl.api__data
            dt  人口:
            dd 約 {{ api.member_count }} 万人
</template>

<script>
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

export default {
  name: 'Api',
  data () {
    return {
      searchInput: '',
      itemList: [],
      inputFlg: false,
      searchCate: '市区町村',
      placeholder: '市区町村を入力してください'
    }
  },
  computed: {
    filterList () {
      let self = this
      return self.itemList.filter(function (app) {
        if (self.searchCate === '市区町村') {
          return app.city.indexOf(self.searchInput) !== -1
        } else if (self.searchCate === '人口') {
          return String(app.member_count).indexOf(self.searchInput) !== -1
        } else if (self.searchCate === 'ID') {
          return String(app.id).indexOf(self.searchInput) !== -1
        }
      })
    }
  },
  methods: {
    tabCity () {
      this.searchCate = '市区町村'
      this.placeholder = '市区町村を入力してください'
      this.searchInput = ''
    },
    tabMember () {
      this.searchCate = '人口'
      this.placeholder = '人口を入力してください'
      this.searchInput = ''
    },
    tabId () {
      this.searchCate = 'ID'
      this.placeholder = 'IDを入力してください'
      this.searchInput = ''
    },
    getData () {
      this.$jsonp('https://api.meetup.com/2/cities').then(json => {
        this.itemList = json.results
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.api {
  max-width: 100%;
  &__search {
    margin: 2em 0;
  }
  &__target {
    margin-bottom: 1em;
  }
  &__tabs {
    margin-bottom: 1em;
  }
  &__tab {
    margin: 0 0.5em;
  }
  &__input {
    width: 40%;
  }
  &__list {
    width: 70%;
    margin: 1em auto;
    & > li {
      padding: 1em;
      margin-top: 1em;
      border: 1px solid #999;
      line-height: 1.5;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  &__data {
    display: flex;
  }
}
</style>
