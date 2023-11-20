<template>
    <nav class="bg-primary">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo y botones de navegación a la izquierda -->
          <div class="flex items-center">
            <!-- Logo -->
            <span class="text-white text-lg font-semibold">Logo</span>
  
            <!-- Botones de navegación -->
            <div class="hidden md:flex items-center space-x-4 ml-4">
              <!-- Mostrar solo si el usuario no está autenticado -->
              <router-link
                v-if="!authStore.user"
                v-for="(item, index) in leftNavigation"
                :key="index"
                :to="item.href"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'bg-gray-900 text-white': $route.path === item.href }"
              >
                {{ item.name }}
              </router-link>
            </div>
  
            <!-- Mostrar solo si el usuario está autenticado -->
            <router-link
              v-if="authStore.user && showAgendaLink"
              to="/agenda"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'bg-gray-900 text-white': $route.path === '/agenda' }"
            >
              Agenda
            </router-link>
          </div>
  
          <div class="flex items-center">
            <!-- Mostrar solo si el usuario está autenticado -->
            <button v-if="authStore.user" @click="showUserMenu" class="text-gray-300 hover:text-white focus:outline-none">
              <!-- icono o avatar del usuario -->
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
            </button>
            <div v-if="authStore.user">
              <h1 class="text-gray-300" :style="{ marginLeft: '10px' }">{{ authStore.user.name }}</h1>
            </div>
  
            <!-- Menú de usuario -->
            <div v-if="isUserMenuOpen" @click.away="closeUserMenu" class="relative">
              <div
                class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700">Settings</a>
                <button
                  @click="handleSignOut"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { useAuthStore } from "../stores/auth";
  
  export default {
    data() {
      return {
        leftNavigation: [
          { name: 'Home', href: '/' },
          { name: 'Login', href: '/login' },
          { name: 'Registro', href: '/register' },
          // ... (otros elementos de navegación)
        ],
        isUserMenuOpen: false,
      };
    },
    computed: {
      authStore() {
        return useAuthStore();
      },
      showAgendaLink() {
        // Condición para mostrar el enlace de "Agenda" solo si el usuario está autenticado
        return this.authStore.user !== null;
      },
    },
    methods: {
      showUserMenu() {
        this.isUserMenuOpen = !this.isUserMenuOpen;
      },
      closeUserMenu() {
        this.isUserMenuOpen = false;
      },
      // Método para cerrar sesión
      async handleSignOut() {
        await this.authStore.handleLogout();
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style>
  /* Estilos personalizados con Tailwind CSS o CSS regular */
  </style>
  