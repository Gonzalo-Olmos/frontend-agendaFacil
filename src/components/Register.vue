<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})
</script>
<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"> -->
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registro de Cuenta
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="authStore.handleRegister(form)" class="space-y-6" action="#" method="POST">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nombre de Empresa</label>
                    <div class="mt-2">
                        <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo Electrónico</label>
                    <div class="mt-2">
                        <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" v-model="form.password" name="password" type="password"
                            autocomplete="current-password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="mt-2">
                    <label for="passwordConfirmation" class="block text-sm font-medium leading-6 text-gray-900">
                        Confirmar Contraseña
                    </label>
                    <input id="passwordConfirmation" v-model="form.password_confirmation" name="passwordConfirmation"
                        type="password" autocomplete="current-password" required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ff0060 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ff0060">
                        Registrarse</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
               ¿Ya estás registrado?
                <router-link to="/login"  class="font-semibold leading-6 text-ff0060 hover:text-indigo-500">Ingresa aquí </router-link>
            </p>
        </div>
    </div>
</template>