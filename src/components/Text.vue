<template>
  <div v-if="entity.data.length !== 0" class="content wrapper" @click="flip">
    <div ref="article" class="article" v-text="entity.data"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";

const entity = reactive({
  data: "",
});

const article = ref(null);
let i = 0;
let pages = 1;

watch(article, () => {
  const contentWidth = article.value.scrollWidth;
  const { clientWidth } = document.body;
  pages = Math.ceil(contentWidth / clientWidth); // 页数
  console.log(pages);
});

function lastPage() {
  const width = document.body.offsetWidth;
  --i;
  article.value.style.transform = `translateX(-${(width - 16) * i}px)`;
}

function nextPage() {
  const width = document.body.offsetWidth;
  ++i;
  article.value.style.transform = `translateX(-${(width - 16) * i}px)`;
}

function flip(event) {
  const e = window.event || event;
  if (e.clientX < document.body.offsetWidth / 2) {
    if (i === 0) return;
    lastPage();
  } else {
    if (i + 1 >= pages) return;
    nextPage();
  }
}

window["setData"] = (data) => {
  entity.data = data;
  return "ok";
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  white-space: pre-line;
  word-break: break-all;
  margin: 0 auto;
  text-align: left;
  text-indent: 2em;
}

.article {
  columns: calc(100vw - 32px) 1;
  column-gap: 16px;
  height: 100%;
  transition: 0.4s;
}

.wrapper {
  height: 100vh;
  overflow: hidden;
  margin: 0 16px;
}
</style>
