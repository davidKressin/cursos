const fs = require('fs');
const axios = require('axios');


class Busquedas{

    historial= [];
    dbPath= "./db/database.json";

    constructor(){
        // todo: leer bbdd si existe
        this.leerDB();

    }

    get historialCapitalizado(){
        return this.historial.map(lugar=>{
            let palabras = lugar.split(' ');
            palabras= palabras.map(p=> p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
    }

    get paramsMapbox(){
        return {
            "proximity":"ip",
            // "limit": 5,
            "language":"es",
            "access_token":process.env.MAPBOX_KEY,
        }
    }
    get paramsWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            unit: "metric",
            lang: "es"
        }
    }

    async ciudad(lugar=""){
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox

            })

            const resp = await instance.get();
            return resp.data.features.map(lugar=>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
            
            
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon){
        
        try {
        
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            })
        
            const resp = await instance.get();
            const {weather, main} = resp.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }


        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar =''){

        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }   

        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLowerCase());

        //grabar en ddbb
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    leerDB(){
        // debe de existir
        if(!fs.existsSync(this.dbPath))return;
        // cargar info readfilesync
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        const data = JSON.parse(info);

        this.historial = data.historial
    }

}

module.exports = Busquedas;