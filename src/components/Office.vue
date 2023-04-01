<template>
  <div v-if="entity.type.toLowerCase() === 'pdf'">
    <office-pdf v-if="entity.data.length !== 0" :pdf-url="entity.data" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import OfficePdf from "./fragment/office-pdf.vue";

const entity = reactive({
  data: "",
  type: "pdf",
});

window["setData"] = (base64, type) => {
  entity.data = "data:application/pdf;base64," + base64;
  entity.type = type;
  return "ok";
};
</script>

<style scoped></style>
