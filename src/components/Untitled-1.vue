<template lang="pug">
  div
    h2 this page is Gizumovie
    div.api
      div.api__search
        p.api__search__target 表示順序【{{ searchCate }}】
        div.api__tabs
          button.api__tab(v-on:click="tabDate()" :disabled='status') 新着投稿
          button.api__tab(v-on:click="tabView()" :disabled='status') 再生数
          button.api__tab(v-on:click="tabRate()" :disabled='status') 評価順
        p.api__search__word キーワード検索：
          input.api__input(type="text" placeholder="キーワードを入力してください" v-model="searchInput")
      ul.api__list
        li(v-for="api in filterList" v-bind="filterList")
          a.api__list__link(:href="api.url" target="_brank")
            img.api__list__thumb(:src="api.thumbnail")
            dl.api__list__data
              dt {{ api.title }}
              dd {{ api.description }}
</template>

<script>
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

export default {
  name: 'Gizumovie',
  data () {
    return {
      searchInput: '',
      itemList: [],
      searchFlg: true,
      status: false,
      searchCate: '新着投稿',
      channelId: '&channelId=UChIxfr_fGyKEJut0KD2oTnA',
      apiKey: '&key=AIzaSyD_pU3hKIqEx5Bt7PwOegdVyvmpw82sRMI',
      baseUrl: 'https://www.googleapis.com/youtube/v3/search',
      part: 'snippet',
      type: 'video',
      order: 'date',
      maxResults: '50',
      next: ''
    }
  },
  computed: {
    filterList () {
      let self = this
      return self.itemList.filter(function (api) {
        if (
          api.title.toUpperCase().indexOf(self.searchInput.toUpperCase()) !== -1
        ) {
          return (
            api.title.toUpperCase().indexOf(self.searchInput.toUpperCase()) !==
            -1
          )
        } else if (
          api.description
            .toUpperCase()
            .indexOf(self.searchInput.toUpperCase()) !== -1
        ) {
          return (
            api.description
              .toUpperCase()
              .indexOf(self.searchInput.toUpperCase()) !== -1
          )
        }
      })
    }
  },
  methods: {
    tabInitialize () {
      this.status = 'disabled'
      this.itemList = []
      this.next = ''
    },
    tabDate () {
      this.tabInitialize()
      this.searchCate = '新着投稿'
      this.order = 'date'
      this.getdata2()
    },
    tabView () {
      this.tabInitialize()
      this.searchCate = '再生数'
      this.order = 'viewCount'
      this.getdata2()
    },
    tabRate () {
      this.tabInitialize()
      this.searchCate = '評価順'
      this.order = 'rating'
      this.getdata2()
    },
    async getdata2 () {
      while (this.next !== undefined) {
        await this.getData()
      }
      this.status = false
    },
    async getData () {
      let json = await this.$jsonp(
        this.baseUrl +
          '?part=' +
          this.part +
          this.channelId +
          this.apiKey +
          '&type=' +
          this.type +
          '&order=' +
          this.order +
          '&maxResults=' +
          this.maxResults +
          '&pageToken=' +
          this.next
      )
      let itemLength = json.items.length
      this.next = json.nextPageToken
      for (let i = 0; i < itemLength; i++) {
        this.itemList.push({
          title: json.items[i].snippet.title,
          url: 'https://www.youtube.com/watch?v=' + json.items[i].id.videoId,
          thumbnail: json.items[i].snippet.thumbnails.high.url,
          description: json.items[i].snippet.description
        })
      }
    }
  },
  mounted () {
    this.getdata2()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.api {
  max-width: 100%;
  &__search {
    margin: 2em 0;
    &__target {
      margin: 1em 0;
    }
  }
  &__tabs {
    margin-bottom: 2em;
  }
  &__tab {
    min-width: 25%;
    height: 50px;
    margin: 0 0.5em;
    font-family: 'dots';
    font-size: 1.5em;
    background-color: #0b610b;
    color: #fff;
    &:hover {
      background-color: #19b319;
      cursor: pointer;
    }
  }
  &__input {
    width: 40%;
  }
  &__list {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 1em auto;
    & > li {
      display: inline-flex;
      max-width: 20%;
      margin-top: 1.5em;
      border: 4px dashed #0b610b;
      line-height: 1.5;
      &:hover {
        border: 4px solid #19b319;
        color: #19b319;
        .api__list__data {
          color: #19b319;
        }
      }
    }
    &__thumb {
      display: block;
      max-width: 100%;
    }
    &__link {
      width: 100%;
    }
    &__data {
      width: 90%;
      margin: 0.5em auto;
      & > dt {
        font-weight: bold;
      }
      & > dd {
        margin-top: 1em;
        font-size: 0.8em;
      }
    }
  }
}
</style>
