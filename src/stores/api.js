import { defineStore } from "pinia";
import axios from 'axios';

export const useWebStore = defineStore("api", {
    state: () => ({
        authErrors: []
    }),
    getters: {
        error: (state) => state.authErrors
    },
    actions: {
        async numberToWord() {
            this.authErrors = [];
            try {
                await axios.post('/soap-conversion', {

                });
                this.router.push("/");
            } catch (error) {
                if (error.response.status == 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        }
    },
});

export const useAccuWeather = defineStore("accuWeather", {
    state: () => ({
        city: null,
        weatherData: null,
        authErrors: [],
    }),
    getters: {
        ciudad: (state) => state.city,
        resultados: (state) => state.weatherData,
        error: (state) => state.authErrors
    },
    actions: {
        async accuWeather(city) {
            try {
                const key = 'aMG0QLFytrAElcpY4MdMUpplvgOCImFP';
                const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
                const query = `?apikey=${key}&q=${city.lugar}`;

                const response = await fetch(base + query);
                if (!response.ok) {
                    throw new Error('Error al obtener datos del clima');
                }

                const datos = await response.json();
                if (!datos || datos.length === 0) {
                    throw new Error('No se encontraron datos del clima');
                }

                this.weatherData = await this.getWeather(datos[0].Key);
                
                this.city = datos[0];
            } catch (error) {
                console.error(error); // Maneja el error de manera efectiva aquí
                throw error; // Lanza la excepción para que el componente pueda manejarla si es necesario
            }
        },

        async getWeather(id) {
            const key = 'aMG0QLFytrAElcpY4MdMUpplvgOCImFP';
            const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
            const query = `${id}?apikey=${key}`;

            const response = await fetch(base + query);
            const data = await response.json();

            this.weatherData = data;
            return data;
        }
    },
});
