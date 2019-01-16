<template>
  <section class="todoapp">
    <!-- header  -->
    <header>
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Todo List"
        @keyup.enter="addTodo"
      />

    </header>
    <!-- main section -->
    <section
      v-show="todos.length"
      class="main"
    >

      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({done:!allChecked})"
      >
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <Todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        ></Todo>
      </ul>
    </section>
    <!-- footer -->
    <footer
      v-show="todos.length"
      class="footer"
    >
      <span class="todo-count">
        <strong>{{remaining}}</strong>
        <!-- remaining => 3 -->
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li
          v-for="(val ,key) in filters"
          :key="key"
        >
          <a
            :class="{selected:visibility===key}"
            @click.prevent="visibility=key"
          >
            {{key|capitalize}}
          </a>
        </li>
      </ul>
      <!-- <button
        class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted"
      >
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script type="text/ecmascript-6">
import Todo from "./Todo.vue";

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  //completed 完整的
  completed: todos => todos.filter(todo => todo.done)
};

const defalutList = [
  { text: "star this repository", done: false },
  { text: "fork this repository", done: false },
  { text: "follow author", done: false },
  { text: "vue-element-admin", done: true },
  { text: "vue", done: true },
  { text: "element-ui", done: true },
  { text: "axios", done: true },
  { text: "webpack", done: true }
];

export default {
  props: {},
  filters: {
    pluralize: (n, w) => {
      // window.console.log(n);
      // window.console.log(w);
      return n === 1 ? w : w + "s";
    },
    //首字母大写
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  components: { Todo },
  data() {
    return {
      visibility: "all",
      filters,
      todos: defalutList
    };
  },
  computed: {
    //检测数组中的所有选中项(done:true)
    allChecked() {
      //every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。
      //window.console.log(this.todos.every(todo => todo.done));
      return this.todos.every(todo => todo.done);
    },
    filteredTodos() {
      //返回数据
      return filters[this.visibility](this.todos);
    },
    /** 剩下的数据*/
    remaining() {
      return this.todos.filter(todo => !todo.done).length;
    }
  },
  mounted() {
    //获取缓存数据
    let todoList = window.localStorage.getItem("STORAGE_KEY");
    //window.console.log(JSON.parse(todoList));
    if (todoList) {
      this.todos = JSON.parse(todoList);
    }
  },
  methods: {
    //保存数据
    setLocalStorage() {
      localStorage.setItem("STORAGE_KEY", JSON.stringify(this.todos));
    },
    //添加
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        });
        this.setLocalStorage();
      }
      e.target.value = "";
    },
    //切换
    toggleTodo(val) {
      val.done = !val.done;
      this.setLocalStorage();
    },
    //删除
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.setLocalStorage();
    },
    //编辑
    editTodo({ todo, value }) {
      todo.text = value;
      this.setLocalStorage();
    },
    //Completed:完整
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done);
      this.setLocalStorage();
    },
    //切换所有 //{done:true}
    toggleAll({ done }) {
      //循环每一项然后把done设置位true 保存
      this.todos.forEach(item => {
        item.done = done;
        this.setLocalStorage();
      });
    }
  }
};
</script>

<style lang='scss'>
@import "./index.scss";
</style>
