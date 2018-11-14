<template lang="pug">
  div#app
    div.top
      transition(
        name="custom-classes-transition"
        enter-class="animated rollOut"
        leave-active-class="animated rollOut"
      )
        img.top__movizo2(v-if="roll" src="./assets/movizo2.png")
      transition(name="logo")
        img.top__logo(v-if="show" src="./assets/gizumovie.png")
      transition(
        name="custom-classes-transition"
        enter-active-class="animated bounce"
      )
        img.top__movizo(v-if="jump" src="./assets/movizo.png")
      ul.play-links
        li
          router-link(to="/" v-on:click.native="jumping()") top
        li()
          router-link(to="/hoge" v-on:click.native="jumping()") hoge
        li()
          router-link(to="/proto" v-on:click.native="jumping()") todoproto
        li()
          router-link(to="/todo" v-on:click.native="jumping()") todo
        li()
          router-link(to="/api" v-on:click.native="jumping()") api
        li()
          router-link(to="/gizumovie" v-on:click.native="jumping()") gizumovie
    router-view
    div.smooth-top(v-if="scroll" v-on:click="smooth()")
      p.smooth-top__txt TOPへ戻る
      img.smooth-top__img(src="./assets/movizo2.png")
</template>

<script>
import { setTimeout } from 'timers'
import smoothScroll from 'smoothscroll'
export default {
  name: 'App',
  data () {
    return {
      show: false,
      jump: true,
      roll: false,
      jumpCount: 0,
      scroll: 0
    }
  },
  methods: {
    smooth () {
      const target = window.document.querySelector('body')
      smoothScroll(target)
    },
    jumping () {
      this.jumpCount++
      if (this.jumpCount % 10) {
        this.jump = false
        setTimeout(this.jumpFlg, 1)
      } else {
        this.show = false
        setTimeout(this.fadeLogo, 1)
      }
    },
    jumpFlg () {
      this.jump = true
    },
    fadeLogo () {
      this.show = true
    },
    rolling () {
      this.roll = true
      setTimeout(this.rollFlg, 1000)
    },
    rollFlg () {
      this.roll = false
    },
    pageScroll () {
      if (window.pageYOffset >= 60) {
        this.scroll = true
      } else {
        this.scroll = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.pageScroll)
    this.rolling()
    setTimeout(this.jumping, 2000)
    setTimeout(this.fadeLogo, 3000)
  }
}
</script>

<style lang="scss">
@import '../styles/foundation';
@keyframes fadein-logo {
  0% {
    transform: scale(0) rotate(15deg);
  }
  50% {
    transform: scale(1.5) rotate(735deg);
  }
  100% {
    transform: scale(1) rotate(735deg);
  }
}
@-webkit-keyframes fadein-logo {
  0% {
    transform: scale(0) rotate(15deg);
  }
  50% {
    transform: scale(1.5) rotate(735deg);
  }
  100% {
    transform: scale(1) rotate(735deg);
  }
}
@-moz-keyframes fadein-logo {
  0% {
    transform: scale(0) rotate(15deg);
  }
  50% {
    transform: scale(1.5) rotate(735deg);
  }
  100% {
    transform: scale(1) rotate(735deg);
  }
}
@keyframes smooth-top--rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes smooth-top--rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes smooth-top--rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 90%;
  padding: 60px 0;
  margin: 0 auto;
  z-index: 10;
  @media screen and (max-width: 767px) {
    max-width: 95%;
    padding: 30px 0;
  }
}
.logo {
  &-enter-active,
  &-leave-active {
    transform: rotate(15deg);
    animation: fadein-logo 1s;
  }
  &-enter,
  &-leave-to {
    transform: rotate(15deg);
    animation: fadein-logo 1s reverse;
  }
}
.top {
  position: relative;
  padding-top: 40%;
  padding-bottom: 2%;
  background: repeating-linear-gradient(
    -45deg,
    #fafafa,
    #fafafa 10px,
    #fff 0,
    #fff 20px
  );
  overflow: hidden;
  &__movizo {
    position: absolute;
    bottom: 0;
    left: -3%;
    max-width: 50%;
    @media screen and (max-width: 768px) {
      top: 20%;
    }
  }
  &__movizo2 {
    position: absolute;
    top: -70%;
    left: -10%;
    min-width: 120%;
    transition: 1s;
    -webkit-transition: 1s;
    z-index: 1;
  }
  &__logo {
    position: absolute;
    max-width: 50%;
    top: 6%;
    right: 4%;
    transform: rotate(15deg);
  }
}
.play-links {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2em;
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 1em;
  }
  & > li {
    margin: 0 0.5em 0 1.5em;
    @media screen and (max-width: 767px) {
      margin: 0.3em 0 0 0;
      &:first-child {
        margin-top: 0;
      }
    }
    & > a {
      position: relative;
      display: inline-block;
      &:hover:before {
        content: '';
        position: absolute;
        top: 0.1em;
        left: -0.8em;
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.4em solid #0b610b;
        border-top: 0.4em solid transparent;
        border-bottom: 0.4em solid transparent;
      }
    }
  }
}
.smooth-top {
  $parent: smooth-top;
  position: fixed;
  right: 3%;
  bottom: 5%;
  background-size: cover;
  z-index: 10;
  &:hover {
    cursor: pointer;
    .smooth-top__img {
      animation: smooth-top--rotate 1.5s infinite;
    }
  }
  &__txt {
    border-radius: 0.3em;
    background: #fff;
  }
  &__img {
    display: block;
    width: 35px;
    height: 35px;
    margin: 0 auto;
  }
}
</style>
