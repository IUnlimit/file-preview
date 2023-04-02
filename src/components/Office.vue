<template>
  <div v-if="entity.type.toLowerCase() === 'pdf'">
    <office-pdf
      v-if="entity.data.length !== 0"
      :pdf-url="'data:application/pdf;base64,' + entity.data"
    />
  </div>
  <div v-else-if="checkOffice()">
    <iframe
      :src="'https://view.officeapps.live.com/op/view.aspx?src=' + entity.data"
      class="office-online"
      frameborder="0"
    >
    </iframe>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import OfficePdf from "./fragment/office-pdf.vue";

// pdf -> base64 data
// others -> online url
const entity = reactive({
  data: "",
  type: "pdf",
});

function checkOffice() {
  return (
    ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].indexOf(
      entity.type.toLowerCase()
    ) !== -1
  );
}

window["setData"] = (data, type) => {
  entity.data = data;
  entity.type = type;
  return "ok";
};
</script>

<style scoped>
.office-online {
  height: 100vh;
  width: 100%;
}
</style>
