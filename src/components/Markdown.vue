<template>
  <div>
    <preview-markdown
      v-if="entity.data.length !== 0"
      :markdown="entity.data"
    ></preview-markdown>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import PreviewMarkdown from "./fragment/preview-markdown.vue";

const entity = reactive({
  data: "",
});

window["setData"] = (data) => {
  entity.data = data;
  return "ok";
};
</script>

<style scoped></style>
