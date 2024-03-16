//carpeta Services --> lugar donde se organizan las conexiones de este frontend a cualquier lugar externo
//configurar base inicial de todas las llamadas al backend

import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

//interceptar salida de la llamada y agregar token
service.interceptors.request.use((config) => {

    const storedToken = localStorage.getItem("authToken")
  
    if (storedToken) {
      config.headers = { authorization: `Bearer ${storedToken}` }
    }
  
    return config
  
  })

export default service