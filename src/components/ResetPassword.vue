<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const form = ref({
    password: '',
    password_confirmation: '',
    email: route.query.email,
    token: route.params.token,
})
</script>
<template>
    <form class="max-w-md mx-auto bg-slate-100 p-4 rounded-lg mt-12" @submit.prevent="authStore.handleResetPassword(form)">
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium  text-gray-900">New Password</label>
            <input type="password" v-model="form.password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <div class="mb-6">
            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
            <input type="password" v-model="form.password_confirmation" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        </div>
        <button type="submit" class="text-white bg-ff0060 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
    </form>
</template>