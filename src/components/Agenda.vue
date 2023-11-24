<template>
  <!--  <Calendar /> -->
  <div class="centered-div">
    <VDatePicker v-model="date" expanded />

  </div>
  </template>

<script setup >
import { ref, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const date = ref(new Date());
let fetchedData = []; // Array para almacenar los datos obtenidos
let idAlquiler = null; // Variable para almacenar los datos obtenidos
let fecha = null; // Variable para almacenar los datos obtenidos
let hora = null; // Variable para almacenar los datos obtenidos
let idCliente = null; // Variable para almacenar los datos obtenidos
let cliente = null;
// Observar cambios en la variable date
watch(date, async (newValue, oldValue) => {
  //console.log('Date changed:', newValue);
  await fetchData(); // Llama a fetchData() cada vez que cambie la fecha
  openModal(); // Abre el modal después de obtener los datos
});


const fetchData = async () => {
  try {
   //console.log(date.value);
    const formattedDate = date.value.toISOString().split('T')[0];
    const response = await axios.get(`/data-alquileres?date=${formattedDate}`);
    
    fetchedData = response.data.data || []; // Asigna los datos o un array vacío

  } catch (error) {
    console.error(error);
  }
};

const openModal= async () => {
  if (fetchedData.length > 0) {
    // Construir la lista de alquileres
    const rentalsList = fetchedData.map(rental => {
      return `
        <li>
          <strong>Alquiler:</strong> Nro ${rental.id} <br/>
          <strong>Hora:</strong> ${rental.hora} <br/>
          <strong>Cliente:</strong> ${rental.cliente} <br/>
          <strong>Juegos:</strong> <button class="custom-button">Ver Juegos </button>   <br/>
        </li>
       <br/>
       <hr/>
       <br/>
      `;
    });

    // Mostrar la lista en el modal
    Swal.fire({
      title: 'Alquileres:',
      html: `<ul>${rentalsList.join('')}</ul>`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  } else {
    Swal.fire({
      title: 'No hay alquileres',
      text: 'Para la fecha seleccionada',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};


</script>




<style>
.centered-div {
  width: 30%;
  /* Tamaño del 70% del contenedor padre */
  height: 100%;
  margin: 30px auto;
  /* Margen de 30px en la parte superior e inferior y centrado horizontalmente */
  padding: 5px;
  /* Padding opcional para el contenido interno */
  background-color: transparent;
  /* Fondo transparente */
  border: 1px solid #ccc;
  /* Borde opcional */
  text-align: center;
  /* Alineación del texto al centro */
}

/* Estilos para el botón */
.my-confirm-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

</style> 