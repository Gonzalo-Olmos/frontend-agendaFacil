<template>
    <v-footer
    class="footer bg-indigo-lighten-1 text-center d-flex flex-column"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
  
      <v-divider></v-divider>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Agenda Fácil</strong>
      </div>
    </v-footer>
  </template>
  <script>
    export default {
      data: () => ({
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }),
    }
  </script>


<style>
.footer {
  position: fixed; /* Cambiar a 'absolute' si prefieres que esté al final del contenido */
  bottom: 0;
  width: 100%;
}
</style>