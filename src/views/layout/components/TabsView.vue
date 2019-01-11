<template>
  <div class="tabs-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag)?'active':''"
      v-for="(tag,index) in visitedTabsView"
      :to="tag.path"
      :key="index"
    >
      <el-tag
        closable
        :disable-transitions=false
        @close.prevent.stop="handleClose(tag)"
      >{{tag.name}}</el-tag>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
export default {
  name: "TabsView",
  components: {},
  props: {},
  data() {
    return {};
  },
  //   created() {
  //     this.addTabView();
  //   },
  computed: {
    ...mapGetters(["visitedTabsView"])
  },
  mounted() {
    this.addTabView();
  },
  methods: {
    //...mapActions(["add_visited_view", "del_visited_view"]),
    addTabView() {
      window.console.log(this.$route);
      const { name } = this.$route;
      if (name) {
        //执行actions中的添加函数
        this.$store.dispatch("add_visited_view", this.$route);
      }
      return false;
    },
    isActive(route) {
      //判断当前传递进来的路由是不是 和 当前页面的this.$route对象的路由一样(或者是name是否一样)
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    handleClose(tag) {
      //删除之后异步返回删除完的数组
      this.$store.dispatch("del_visited_view", tag).then(tags => {
        //如果关闭的是当前显示页面,就去 到前一个tag-view页面
        if (this.isActive(tag)) {
          const lastTag = tags.slice(-1)[0];
          //前一个tab-view也买你不存在,就跳转 不存在就跳转到首页
          if (lastTag) {
            this.$router.push(lastTag.path);
          } else {
            this.$router.push("/");
          }
        }
      });
    }
  },
  watch: {
    $route() {
      this.addTabView();
    }
  }
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.tabs-container {
  height: 40px;
  padding: 5px;
  border-bottom: 1px solid #dfdfdf;
  .tags-view-item {
    .el-tag {
      margin: 0 3px;
      &:first-child {
        margin-left: 0;
      }
    }
    &.active {
      .el-tag {
        background-color: #00b4aa;
        color: #fff;
        /deep/ .el-icon-close {
          color: #fff;
        }
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
