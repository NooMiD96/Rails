<template>
  <div id="app-root" class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-5">
        <menu-component />
      </div>
      <div class="col-lg-9 col-md-8 col-sm-7">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script src="./app.ts"></script>
