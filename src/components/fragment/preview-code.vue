<template>
  <pre :class="'language-'+ type + ' ' + lineNumbers"><code
      v-html="Prism.highlight(code, Prism.languages[type], type)"></code></pre>
</template>

<script setup lang="ts">
import {onMounted, computed} from "vue";
import Prism from "prismjs";

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "html",
  },
  isShowLineNumbers: {
    type: Boolean,
    default: false,
  },
});
const lineNumbers = computed(() => {
  return props.isShowLineNumbers ? "line-numbers" : "";
});
onMounted(() => {
  Prism.highlightAll(); //切换菜单重新渲染
});
</script>

<style scoped>

</style>

