<template>
  <div v-if="entity.data.length !== 0">
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
