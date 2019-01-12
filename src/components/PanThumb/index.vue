<template>
  <div
    class="pan-item"
    :style="{zIndex:zIndex,height:height,width:width}"
  >

    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <img
      :src="image"
      class="pan-thumb"
      alt=""
    >
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "PanThumb",
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: "150px"
    },
    height: {
      type: String,
      default: "150px"
    }
  },
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  &:hover {
    .pan-thumb {
      transform: rotate(-110deg);
    }
    .pan-info {
      p {
        a {
          opacity: 1;
          transform: translateX(0px) rotate(0deg);
        }
      }
    }
  }

  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    h3 {
      color: #fff;
      padding: 10px 5px;
      font-style: italic;
      margin: 0 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
    }
    p {
      color: #fff;
      padding: 10px 5px;
      font-style: italic;
      margin: 0 30px;
      font-size: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      a {
        display: block;
        color: #333;
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        color: #fff;
        font-style: normal;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 9px;
        letter-spacing: 1px;
        padding-top: 24px;
        margin: 7px auto 0;
        font-family: "Open Sans", Arial, sans-serif;
        opacity: 0;
        transition: transform 0.3s ease-in-out 0.2s,
          opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
        transform: translateX(60px) rotate(90deg);
        &:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .pan-info-roles-container {
      padding: 20px;
      text-align: center;
    }
  }

  .pan-thumb {
    width: 100%;
    height: 100%;
    background-size: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
    &:after {
      content: "";
      width: 8px;
      height: 8px;
      position: absolute;
      border-radius: 50%;
      top: 40%;
      left: 95%;
      margin: -4px 0 0 -4px;
      background: radial-gradient(
        ellipse at center,
        rgba(14, 14, 14, 1) 0%,
        rgba(125, 126, 125, 1) 100%
      );
      box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
