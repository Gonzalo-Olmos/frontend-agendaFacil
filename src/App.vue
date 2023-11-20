<script setup>
  import Footer from './components/Footer.vue';
  import Nav from './components/Nav.vue';
</script>

<template>
  <main>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
  </main>
</template>

