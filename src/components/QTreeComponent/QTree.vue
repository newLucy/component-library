<template>
  <div class="q-tree">
    <div v-for="(item, index) in model" :key="item.label">
      <p class="q-tree-item" :style="{'padding-left': textIndent + 'px'}">
        <span v-if="item.children && item.children.length > 0" :class="{'el-icon-caret-right': true, 'q-tree_icon': true, 'expand': item.open, 'close': !item.open}" @click="handleCollapseChange(item, index)">
          <img src="@/assets/collapse.png" alt="">
        </span>
        {{item.label}}
      </p>
      <!-- 递归组件 -->
      <div v-if="item.children && item.children.length > 0"></div>
      <!-- <transition name="q-tree-node"> -->
        <div v-show="item.open">
          <q-tree v-if="item.children" :data="item.children" :level="level + 1" :defaultExpandAll="defaultExpandAll"></q-tree>
        </div>
      <!-- </transition> -->
    </div>

  </div>
</template>

<script>
export default {
  name: 'QTree',
  props: {
    data: {
      type: Array,
      required: true
    },
    indent: {
      type: Number,
      default: 30
    },
    level: {
      type: Number,
      default: 1
    },
    defaultExpandAll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      model: []
    }
  },
  computed: {
    textIndent () {
      return this.level * this.indent
    }
    // model () {
    //   return this.data.map(item => {
    //     item.open = this.defaultExpandAll
    //     return item
    //   })
    // }
  },
  watch: {
    data: {
      handler: function () {
        this.model = this.data.map(item => {
          item.open = this.defaultExpandAll
          return item
        })
      },
      immediate: true
    }
  },
  methods: {
    handleCollapseChange (item, index) {
      if (item.children) {
        item.open = !item.open
        this.$set(this.model, index, item)
      }
    }
  }
}
</script>

<style scoped>
  .q-tree {
    text-align: left;
  }
  .q-tree-item {
    display: flex;
    align-items: center;
  }
  .q-tree_icon {
    display: inline-block;
    width: 24px;
  }
  .q-tree_icon.expand {
     animation: collapse 0.5s alternate;
     animation-fill-mode: forwards;
  }
  .q-tree_icon.close {
     animation: collapse1 0.5s alternate;
     animation-fill-mode: forwards;
  }
  @keyframes collapse{
    from {
      transform:rotate(0deg);
      }
    to {
      transform:rotate(-90deg);
    }
  }
  @keyframes collapse1{
    from {
      transform:rotate(-90deg);
      }
    to {
      transform:rotate(0deg);
    }
  }
  .q-tree-node-enter-active, .q-tree-node-leave-active {
    transition: all .3s;
  }
  .q-tree-node-enter, .q-tree-node-leave-to {
    height: 0;
  }
</style>
