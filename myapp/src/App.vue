<template>
  <div class="body">
    <!-- <loadmap ref="loadmap"></loadmap> -->
    <sidebar ref="sidebar"></sidebar>
  </div>
</template>

<script>
import sidebar from './components/AppAside.vue';

export default {
  components: {
    sidebar,
  },
  methods: {
    toggleSidebar() {
      // 调用子组件的方法来切换侧边栏展开和折叠
      this.$refs.sidebar.toggleSidebar();
    }
  }
};
</script>

<style>
  .body {
    background-color: #f2f6fc;
  }
</style>

