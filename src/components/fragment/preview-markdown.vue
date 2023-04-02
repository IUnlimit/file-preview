<template>
  <div v-html="content"></div>
</template>

<script setup lang="ts">
import { computed, nextTick, onActivated, onMounted, ref } from "vue";
import { marked } from "marked";
import Prism from "prismjs";
import "../../../public/css/redefine-light.css";

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
});

const content = computed(() => marked(props.markdown));

onMounted(() => Prism.highlightAll());
</script>

<style scoped></style>
