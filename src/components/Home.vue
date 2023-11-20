<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useAccuWeather, useWebStore } from '../stores/api';

const authStore = useAuthStore();
const web = useWebStore();
const accuWeatherApp = useAccuWeather();

onMounted(async () => {
    await authStore.getUser();
});

const form = ref({
    lugar: '',
})

const weatherIcons = {
    1: './public/imagenes/01-s.png',    // Clave: Valor
    2: './public/imagenes/02-s.png',   // Clave: Valor
    3: './public/imagenes/03-s.png',
    4: './public/imagenes/04-s.png',
    5: './public/imagenes/05-s.png',
    6: './public/imagenes/06-s.png',
    7: './public/imagenes/07-s.png',
    8: './public/imagenes/08-s.png',
    11: './public/imagenes/11-s.png',
    12: './public/imagenes/12-s.png',
    13: './public/imagenes/13-s.png',
    14: './public/imagenes/14-s.png',
    15: './public/imagenes/15-s.png',
    16: './public/imagenes/16-s.png',
    17: './public/imagenes/17-s.png',
    18: './public/imagenes/18-s.png',
    19: './public/imagenes/19-s.png',
    20: './public/imagenes/20-s.png',    // Clave: Valor
    // Agrega más asociaciones según sea necesario
};

</script>

<template>
    <!-- <div>
        <div>
            <button @click="web.numberToWord">Realizar Solicitud SOAP</button>
            <div v-if="response">
                <h2>Respuesta:</h2>
                <pre>{{ response }}</pre>
            </div>
        </div>
    </div> -->


    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-3">
        <h1>De que lugar quieres saber el pronostico?</h1>
        <form @submit.prevent="accuWeatherApp.accuWeather(form)" class="space-y-6" action="#" method="POST">

            <div>
                <label for="text" class="block text-sm font-medium leading-6 text-gray-900">Lugar</label>
                <div class="mt-2">
                    <input id="lugar" v-model="form.lugar" name="lugar" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                    
            </div>
            <div v-if="authStore.error.lugar" class="flex">
                <span class="text-red-400 text-sm m-2 p-2">
                    {{ authStore.error.lugar[0] }}
                </span>
            </div>


            <div>
                <button type="submit"
                    class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ff0060 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Buscar</button>
            </div>
        </form>
    </div>

    <div class="flex items-center justify-center p-3">
        <div v-if="accuWeatherApp.resultados"
            class="my-4 p-3 bg-ff0060 w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md">
            <div class="flex justify-center">
                <img v-if="weatherIcons[accuWeatherApp.resultados[0].WeatherIcon]"
                    :src="weatherIcons[accuWeatherApp.resultados[0].WeatherIcon]" alt="Weather Icon"
                    class="w-32 sm:w-40 md:w-48" />
            </div>
            <div class="flex items-center flex-col justify-center text-white">
                <p class="text-lg sm:text-xl md:text-2xl"><b>{{ accuWeatherApp.city.LocalizedName }}</b></p>
                <p class="text-lg sm:text-xl md:text-2xl"><b>{{ accuWeatherApp.resultados[0].WeatherText }}</b></p>
                <p class="text-lg sm:text-xl md:text-2xl"><b>{{ accuWeatherApp.resultados[0].Temperature.Metric.Value }} °{{
                    accuWeatherApp.resultados[0].Temperature.Metric.Unit }}</b></p>
                <p class="text-xs sm:text-base md:text-lg">{{  }}</p>
            </div>
        </div>
    </div>


    <div v-if="authStore.user" class="p-3">
        <div class="text-xl font-medium p-2">
            <h1>{{ authStore.user.name }}</h1>
            <p>{{ authStore.user.email }}</p>
        </div>
    </div>

    <div v-else class="p-3">
        <h1 class="text-xl font-medium p-2">Ve a loguearte</h1>
    </div>
</template>
  
