<template>
  <pre
    :class="'language-' + type + (isShowLineNumbers ? ' line-numbers' : ' ')"
  ><code
          v-html="highlight"></code></pre>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
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

let highlight = computed(() =>
  Prism.highlight(props.code, Prism.languages[props.type], props.type)
);

onMounted(() => {
  Prism.highlightAll();
});
</script>

<style>
pre.line-numbers,
pre.no-line-numbers {
  white-space: pre-wrap;
}
</style>
