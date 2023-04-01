<template>
  <div>
    <preview-code
      v-if="entity.code.length !== 0"
      :code="entity.code"
      :type="entity.type"
      :is-show-line-numbers="entity.isShowLineNumbers"
    >
    </preview-code>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import PreviewCode from "./fragment/preview-code.vue";

const entity = reactive({
  code: "",
  type: "js",
  isShowLineNumbers: true,
});

window["setData"] = (code, type) => {
  entity.code = code;
  entity.type = type;
  return "ok";
};
</script>

<style lang="less">
pre,
body {
  margin: 0 !important;
}
</style>
