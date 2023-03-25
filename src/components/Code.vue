<template>
  <div>
    <preview-code
        :code="entity.code"
        :type="entity.type"
        :is-show-line-numbers="true">
    </preview-code>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import PreviewCode from "./fragment/preview-code.vue";

const entity = reactive({
  code: `#!/bin/bash
get_char()
{
  SAVEDSTTY=\`stty -g\`
  stty -echo
  stty raw
  dd if=/dev/tty bs=1 count=1 2> /dev/null
  stty -raw
  stty echo
  stty $SAVEDSTTY
}

if [ -z "$1" ]; then
    echo '请按任意键继续...'
else
    echo -e "$1"
fi

get_char`,
  type: "shell",
})
</script>

<style lang="less">
pre, body {
  margin: 0 !important;
}
</style>

