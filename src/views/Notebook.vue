<template>
  <div class="container flex flex-wrap items-center justify-between mx-auto pt-24 mb-8">
    <div class="prose max-w-prose mb-12 mt-28 mx-auto" v-html="notebook"></div>
  </div>
</template>

<script setup>
let { openNotebook } = useNotebook()

let notebook = ref(null)

onMounted(async () => {
  notebook.value = await openNotebook('colorline.ipynb')
  console.log(notebook.value)
})
</script>
