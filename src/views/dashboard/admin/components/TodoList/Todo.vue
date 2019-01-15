<template>
  <li
    :class="{completed:todo.done,editing:editing}"
    class="todo"
  >
    <div class="view">
      <input
        :checked="todo.done"
        type="checkbox"
        class="toggle"
        @change="toggleTodo(todo)"
      >
      <label
        @dblclick="editing=true"
        v-text="todo.text"
      ></label>
      <button
        class="destroy"
        @click="deleteTodo(todo)"
      ></button>
    </div>
    <input
      v-focus="editing"
      v-show="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Todo",
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus();
        });
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    //删除
    deleteTodo(todo) {
      //触发父组件方法
      this.$emit("deleteTodo", todo);
    },
    //编辑
    editTodo({ todo, value }) {
      //触发父组件方法
      this.$emit("editTodo", { todo, value });
    },
    //切换
    toggleTodo(todo) {
      //触发父组件方法
      this.$emit("toggleTodo", todo);
    },
    //结束编辑
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.deleteTodo({ todo });
      } else if (this.editing) {
        this.editTodo({ todo, value });
        this.editing = false;
      }
    },
    //取消
    cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    }
  },
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
