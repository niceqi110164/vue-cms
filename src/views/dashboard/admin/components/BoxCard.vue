<template>
  <el-card
    class="box-card-component"
    style="margin-left:8px;"
  >
    <div
      slot="header"
      class="box-card-header"
    >
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <PanThumb
        :image="avatar"
        class="panThumb"
      >
        Your roles:
        <span
          v-for="item in roles"
          :key="item"
          class="pan-info-roles"
        >{{item}}</span>
      </PanThumb>
      <Mallki
        class="mallki-text"
        text="vue-element-admin"
      ></Mallki>
      <!-- vue -->
      <div
        style="padding-top:35px;"
        class="progress-item"
      >
        <span>Vue</span>
        <el-progress :percentage="70"></el-progress>
      </div>
      <!-- Javascript -->
      <div class="progress-item">
        <span>Javascript</span>
        <el-progress :percentage="18"></el-progress>
      </div>
      <!-- css -->
      <div class="progress-item">
        <span>Css</span>
        <el-progress :percentage="12"></el-progress>
      </div>
      <!-- Esline -->
      <div class="progress-item">
        <span>ESLine</span>
        <el-progress
          :percentage="100"
          status="success"
        ></el-progress>
      </div>
    </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
import PanThumb from "@/components/PanThumb";
import Mallki from "@/components/TextHoverEffect/Mallki";
import { mapGetters } from "vuex";
export default {
  props: {},
  components: { PanThumb, Mallki },
  data() {
    return {
      //统计数据
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  methods: {}
};
</script>

<style rel='stylesheet/scss' lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style rel='stylesheet/scss' lang='scss' >
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        //对比度
        filter: contrast(130%);
      }
    }
  }
  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute;
    top: -45px;
    left: 0px;
    border: 5px solid #fff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    /deep/ .pan-info {
      box-shadow: none !important;
    }
    .pan-info {
      width: 60px !important;
      height: 60px !important;
      .pan-info-roles-container {
        padding: 0;
      }
      .pan-info-roles {
        font-size: 12px;
        font-weight: 700;
        color: #333;
        display: block;
      }
    }
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
