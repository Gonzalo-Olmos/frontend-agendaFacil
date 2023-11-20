<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const email = ref('')
</script>
<template>
    <form class="mx-auto max-w-md p-5 m-4" @submit.prevent="authStore.handleForgotPassword(email)">
        <h3 class="font-bold">Forgot Password?</h3>

        <div class="my-6">
            <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Your email</label>
            <input type="email" id="email" v-model="email" class="block w-full rounded-lg border border-gray-300" placeholder="email@example.com">
        </div>
        <button class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white">Submit</button>
    </form>
</template>    