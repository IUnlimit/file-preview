<template>
  <div v-if="entity.data.length !== 0" class="grid-container">
    <div class="row">
      <div class="col_5 break-line" v-text="entity.hexStr"></div>
      <div class="col_2">{{ refresh() }}</div>
      <div class="col_5 break-line" v-text="entity.formatStr"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { Base64 } from "js-base64";

const entity = reactive({
  data: "",
  hexStr: "",
  formatStr: "",
});

function refresh() {
  let bytes = str2Bytes(Base64.decode(entity.data));
  let formatStr = formatCharMap(byte2CharMap(bytes));
  let hexStr = formatHex(bytes);
  entity.formatStr = formatStr;
  entity.hexStr = hexStr;
}

window["setData"] = (base64) => {
  entity.data = base64;
  return "ok";
};

// temporary impl
function formatCharMap(charMap) {
  let formatStr = "";
  for (let i = 0; i < charMap.length; i++) {
    const pair = charMap[i];
    formatStr += pair[1].repeat(pair[0]);
  }
  return formatStr;
}

function formatHex(bytes) {
  let hexStr = "";
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    if (byte < 17) {
      // 补齐前置0
      hexStr += "0";
    }
    hexStr += byte.toString(16) + " ";
  }
  return hexStr;
}

// UTF-8
function byte2CharMap(bytes) {
  let result = [],
    _arr = bytes;
  for (let i = 0; i < _arr.length; i++) {
    const one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length === 8) {
      // +=bytesLength
      const bytesLength = v[0].length;
      let store = _arr[i].toString(2).slice(7 - bytesLength);
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      result.push([bytesLength, "."]);
      //String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      result.push([1, String.fromCharCode(_arr[i])]);
    }
  }
  return result;
}

// UTF-8
function str2Bytes(str) {
  const bytes = [];
  let len, c;
  len = str.length;
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}
</script>

<style scoped>
.break-line {
  word-break: break-word;
}

.grid-container {
  width: 100%;
  margin: 0 auto;
}

.row:before,
.row:after {
  content: "";
  display: block;
  height: 0;
  width: 0;
  visibility: hidden;
  clear: both;
}

[class*="col_"] {
  float: left;
  min-height: 1px;
  width: 8.33%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.col_1 {
  width: 8.33%;
}

.col_2 {
  width: 16.66%;
}

.col_3 {
  width: 25%;
}

.col_4 {
  width: 33.33%;
}

.col_5 {
  width: 41.66%;
}

.col_6 {
  width: 50%;
}

.col_7 {
  width: 58.33%;
}

.col_8 {
  width: 66.66%;
}

.col_9 {
  width: 75%;
}

.col_10 {
  width: 83.33%;
}

.col_11 {
  width: 91.66%;
}

.col_12 {
  width: 100%;
}
</style>
