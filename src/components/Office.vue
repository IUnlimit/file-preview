<template>
  <div v-if="entity.data.length !== 0">
    <iframe
      :src="'https://view.officeapps.live.com/op/view.aspx?src=' + entity.data"
      class="office-online"
      frameborder="0"
      sandbox="allow-top-navigation allow-scripts allow-forms"
    >
    </iframe>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// others -> online url
const entity = reactive({
  data: "",
  type: "doc",
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
