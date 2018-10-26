<template>
  <div id="counter">
    <h1>Counter</h1>
    <p>This is a simple example of a Vue.js component.</p>
    <p>Current count:
      <strong>{{ counter.count }}</strong>
    </p>
    <p>Next count:
      <strong>{{ nextCount }}</strong>
    </p>
    <button class="btn btn-outline-primary" @click="incrementCounter">Increment</button>
  </div>
</template>

<script src="./counter.ts"></script>
