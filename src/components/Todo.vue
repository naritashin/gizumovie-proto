<template lang="pug">
  div#app
    h2 this page is Todo
    div.todo
      div.todo__info
        span(v-if="todoInput") EnterKeyでTodoを登録
        span(v-else) todoを入力してください
      input.todo-input(type="text" placeholder="todo入力欄" v-model="todoInput" v-on:keyup.enter="add")
      div.counter
        span.counter__data.counter__total 登録件数：{{ todoLength }}件
        span.counter__data.counter__fix 完了済件数：{{ fixCount }}件
      button.todo__remove-all(v-on:click="removeAll") 全てのTodoを削除
      ul.todo__list
       li(v-for="(todo, length) in todoData" :class="[todo.doing ? 'todo--doing' : '']")
        p.todo__date 登録日：{{ todo.recordYear }}年 {{ todo.recordMonth }}月 {{ todo.recordHours }}時 {{ todo.recordMinutes }} 分 {{ todo.recordSeconds }} 秒
        p.todo__text {{ todo.text }}
        div.todo__buttons
          button.todo__change.todo__button(v-on:click="changeStatus(todo)")
            span(v-if="!todo.doing") [complete]
            span(v-else) [yet]
          button.todo__remove.todo__button(v-on:click="remove(todo)") [remove]
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      todoInput: '',
      todoData: [],
      fixCount: 0
    }
  },
  computed: {
    todoLength () {
      return this.todoData.length
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
        this.saveTodo()
      }
      this.todoInput = ''
    },
    remove (del) {
      let idx = this.todoData.indexOf(del)
      this.todoData.splice(idx, 1)
      if ((del.doing = del.doing && this.fixCount > 0)) {
        this.fixCount -= 1
      }
      this.saveTodo()
    },
    removeAll (del) {
      this.todoData.splice(this.todoData)
      this.fixCount = 0
      this.saveTodo()
    },
    changeStatus (change) {
      change.doing = !change.doing
      this.fixCount += change.doing ? 1 : -1
      this.saveTodo()
    },
    saveTodo () {
      localStorage.setItem('todoData', JSON.stringify(this.todoData))
      localStorage.setItem('fixCount', JSON.stringify(this.fixCount))
    },
    loadTodo () {
      this.todoData = JSON.parse(localStorage.getItem('todoData'))
      this.fixCount = JSON.parse(localStorage.getItem('fixCount'))
      if (!this.todoData) {
        this.todoData = []
      }
      if (!this.fixCount) {
        this.fixCount = 0
      }
    }
  },
  mounted () {
    this.loadTodo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.counter {
  max-width: 100%;
  margin-top: 1em;
  &__data {
    margin: 0 1em;
  }
}
.todo {
  max-width: 100%;
  &__info {
    margin-bottom: 1em;
  }
  &-input {
    margin-bottom: 1em;
  }
  &__list {
    margin: 2em;
    list-style-type: none;
    & > li {
      padding: 0.5em;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      border-left: 1px solid #000;
      text-align: left;
      &:first-child {
        margin-top: 0;
        border: 1px solid #000;
      }
    }
  }
  &__text {
    margin: 1em 0;
  }
  &__buttons {
    text-align: right;
  }
  &__button {
    margin: 0 0.5em;
    &:hover {
      cursor: pointer;
    }
  }
  &--doing {
    background-color: #999;
  }
  &--remove {
    display: inline-block;
    margin-left: 1em;
  }
  &__remove-all {
    margin-top: 2em;
  }
}
</style>
