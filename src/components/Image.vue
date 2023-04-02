<template>
  <div v-if="entity.data.length !== 0" class="dialog-body-content-base-style">
    <img :src="entity.data" alt="pic" />
  </div>
</template>

<script setup>
import { reactive } from "vue";

const entity = reactive({
  data: "",
  type: "png",
});

window["setData"] = (base64, type) => {
  entity.data = "data:image/" + type + ";base64," + base64;
  entity.type = type;
  return "ok";
};
</script>

<style scoped>
.dialog-body-content-base-style {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
}
</style>
