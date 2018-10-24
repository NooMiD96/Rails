<template>
  <div>
    <nav class="nav collapse flex-column nav-pills" id="route-nav-bar" role="tablist">
      <div class="bg-dark p-4">
        <router-link to="/" :exact="true">
          <span class="nav-link nav-link-item" data-toggle="pill">Home</span>
        </router-link>
        <router-link to="/counter">
          <span class="nav-link nav-link-item" data-toggle="pill">Counter</span>
        </router-link>
        <router-link to="/fetchdata">
          <span class="nav-link nav-link-item" data-toggle="pill">Fetch data</span>
        </router-link>
      </div>
    </nav>
    <nav class="justify-content-between navbar navbar-dark bg-dark">
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#route-nav-bar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/">
        <span class="navbar-brand">Vue</span>
      </router-link>
    </nav>
  </div>
</template>

<style src="./navmenu.css">
