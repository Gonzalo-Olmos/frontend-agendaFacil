<template>
    <div class="calendar-app">
      <h1 class="app-title">Eventos Proximos</h1>
  
      <div class="button-container">
        <button id="authorize_button" class="authorize-button" @click="handleAuthClick">Ver Eventos</button>
        <button id="signout_button" class="signout-button" @click="handleSignoutClick">Salir</button>
      </div>
  
      <div class="content" v-if="content === 'Eventos Próximos'">
        <h2>Eventos Próximos:</h2>
        <div class="max-h-48 overflow-y-auto">
          <div v-for="event in events" :key="event.id" class="event-card bg-white border border-gray-300 rounded p-4 mb-4 shadow">
            <h3 class="text-blue-500 text-lg font-bold mb-2">{{ event.summary }}</h3>
            <p class="text-gray-600 text-sm">Inicio: {{ event.start.dateTime }}</p>
          </div>
        </div>
      </div>
  
      <div v-else>
        <p class="no-events">{{ content }}</p>
      </div>
    </div>
  </template>
  
<script>
export default {
    data() {
        return {
            CLIENT_ID: '22406417766-8h3r9b1bichpb0hihqm71b3cv47r9056.apps.googleusercontent.com',
            API_KEY: 'AIzaSyCAsK3VVsWP5WPdfNj6GED-U1_T2RxYpw8',
            DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            SCOPES: 'https://www.googleapis.com/auth/calendar.readonly',
            tokenClient: null,
            gapiInited: false,
            gisInited: false,
            content: '', // Agregamos una propiedad para almacenar el contenido
            events: [],  // Agregamos la propiedad events e inicializamos como un array vacío
        };
    },
    mounted() {
        this.initGoogleAPI();
    },
    methods: {
        initGoogleAPI() {
            const script1 = document.createElement('script');
            script1.src = 'https://apis.google.com/js/api.js';
            script1.onload = this.gapiLoaded;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.src = 'https://accounts.google.com/gsi/client';
            script2.onload = this.gisLoaded;
            document.head.appendChild(script2);
        },
        gapiLoaded() {
            gapi.load('client', this.initializeGapiClient);
        },
        initializeGapiClient() {
            gapi.client.init({
                apiKey: this.API_KEY,
                discoveryDocs: [this.DISCOVERY_DOC],
            }).then(() => {
                this.gapiInited = true;
                this.maybeEnableButtons();
            });
        },
        gisLoaded() {
            this.tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: this.CLIENT_ID,
                scope: this.SCOPES,
                callback: '', // Defina aquí su función callback
            });
            this.gisInited = true;
            this.maybeEnableButtons();
        },
        maybeEnableButtons() {
            if (this.gapiInited && this.gisInited) {
                document.getElementById('authorize_button').style.visibility = 'visible';
            }
        },
        handleAuthClick() {
            this.tokenClient.callback = async (resp) => {
                if (resp.error !== undefined) {
                    throw (resp);
                }
                document.getElementById('signout_button').style.visibility = 'visible';
                document.getElementById('authorize_button').innerText = 'Actualizar';
                await this.mostrarEventosProximos();
            };

            if (gapi.client.getToken() === null) {
                // Pedir al usuario que seleccione una cuenta de Google y solicitar su consentimiento para compartir sus datos
                // al establecer una nueva sesión.
                this.tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                // Omitir la visualización del selector de cuenta y del diálogo de consentimiento para una sesión existente.
                this.tokenClient.requestAccessToken({ prompt: '' });
            }
        },
        handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                // Revoca el token de acceso
                google.accounts.oauth2.revoke(token.access_token);
                // Borra el token almacenado localmente
                gapi.client.setToken('');
                // Limpia el contenido en la interfaz
                this.content = '';
                // Restaura la apariencia original de los botones
                document.getElementById('authorize_button').innerText = 'Autorizar';
                document.getElementById('signout_button').style.visibility = 'hidden';
            }
        },

        /**
        * Muestra los próximos eventos del calendario del usuario y los lista en la consola.
        */
        async mostrarEventosProximos() {
            let response;
            try {
                const request = {
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime',
                };
                response = await gapi.client.calendar.events.list(request);
            } catch (err) {
                console.error('Error al recuperar eventos:', err.message);
                this.content = 'Error al recuperar eventos: ' + err.message;
                return;
            }

            const events = response.result.items;
            if (!events || events.length === 0) {
                this.events = [];
                this.content = 'No se encontraron eventos próximos.';
            } else {
                // Convertir las fechas al huso horario de Argentina (Buenos Aires)
                this.events = events.map(event => {
                    const startTime = new Date(event.start.dateTime || event.start.date);
                    const endTime = new Date(event.end.dateTime || event.end.date);
                    return {
                        ...event,
                        start: {
                            ...event.start,
                            dateTime: startTime.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
                        },
                        end: {
                            ...event.end,
                            dateTime: endTime.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
                        },
                    };
                });

                this.content = 'Eventos Próximos';
            }

        }
    },
};

</script>


<style>
.calendar-app {
    text-align: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
    margin-top: 7%;
}

.app-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #020101 ;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.authorize-button,
.signout-button {
    background-color: #FF0060;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.authorize-button:hover,
.signout-button:hover {
    background-color: #FF0060;
}

.content-container {
    
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 20px;
}

.content h2 {
    font-size: 20px;
    color: #FF0060;
    margin-bottom: 10px;
}

.no-events {
    font-size: 16px;
    color: #6c757d;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
}
.event-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #FF0060;
}

.event-time {
  font-size: 14px;
  color: #555;
}

.event-list {
  max-height: 300px; 
  overflow-y: auto; 
}

 
</style>