<template lang="pug">
  div#app
    h2 this page is TodoProto
    div.todo
      div
        span(v-if="todoInput") EnterKeyでTodoを登録
        span(v-else) todoを入力してください
      input.todo-input(type="text" placeholder="todo入力欄" v-model="todoInput" v-on:keyup.enter="add")
      ul.todo__list
       li(v-for="(todo, length) in todoData" v-bind:class="[todo.doing ? 'todo--doing' : '']")
        p.todo__date {{ todo.recordYear }}年 {{ todo.recordMonth }}月 {{ todo.recordHours }}時 {{ todo.recordMinutes }} 分 {{ todo.recordSeconds }} 秒
        p {{ todo.text }}
        div
          button.todo__list-change(v-on:click="changeStatus(todo)")
            span(v-if="!todo.doing") [complete]
            span(v-else) [yet]
          button.todo__list-remove(v-on:click="remove(todo)") [remove]
</template>

<script>
export default {
  name: 'Proto',
  data () {
    return {
      todoInput: '',
      todoData: []
    }
  },
  methods: {
    add () {
      if (this.todoInput !== '') {
        this.todoData.push({
          id: this.todoData.length + 1,
          text: this.todoInput,
          doing: false,
          recordYear: new Date().getFullYear(),
          recordMonth: new Date().getUTCMonth() + 1,
          recordDate: new Date().getUTCDate(),
          recordHours: new Date().getHours(),
          recordMinutes: new Date().getMinutes(),
          recordSeconds: new Date().getSeconds()
        })
      }
      this.todoInput = ''
    },
    remove (del) {
      let idx = this.todoData.indexOf(del)
      this.todoData.splice(idx, 1)
    },
    changeStatus (change) {
      change.doing = !change.doing
      console.log(change.doing)
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
.todo {
  max-width: 100%;
  &__list {
    list-style-type: none;
    & > li {
      padding: 0.5em;
      &:first-child {
        margin-top: 0;
      }
    }
    &-remove {
      display: inline-block;
      margin-left: 2em;
      &:hover {
        cursor: pointer;
      }
    }
  }
  &--doing {
    background-color: #999;
  }
}
</style>
