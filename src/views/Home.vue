<script setup>
import Repl from '@/components/Repl.vue'
</script>
<template>
  <main
    class="mt-28 mb-12 relative w-full px-6 py-12 bg-white md:max-w-3xl md:mx-auto lg:max-w-6xl lg:px-16 h-screen"
  >
    <div class="prose max-w-prose mx-auto lg:mx-16 md:mx-8 lg:prose-xl md:prose-lg prose-slate">
      <h1>Welcome to Notes</h1>
      <p>
        Let's see some basic things that you can do with PyScript. In this page, we will use the
        <code>py-script</code> tag in the page so you can see how to use pyscript directly.
      </p>
      <h2>Read Eval Print Loop (REPL)</h2>
      <Repl></Repl>
      <div id="repl-output"></div>
    </div>
  </main>
</template>
