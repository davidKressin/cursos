require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const {mostrarMenu, pausa } = require("./helpers/mensajes");
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./helpers/inquierer');
const Tareas = require('./models/tareas');

const main = async()=>{

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){// TODO: cargar tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    await pausa();

    do{
        opt = await inquirerMenu()  
        
        switch(opt){
            case "1":
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                // crear opcion
            break;
            case "2":
                tareas.listadoCompleto();
            break; 
            case "3": //listar completados
                tareas.listarPendientesCompletadas(true);
            break; 
            case "4": //listar pendientes
                tareas.listarPendientesCompletadas(false);
            break; 
            case "5": //completado || pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break; 
            case "6": //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== "0"){
                    const ok = await confirmar('Estás seguro?')
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada")
                    }
                }
            break; 

        }

        guardarDB(tareas.listadoArr);

        await pausa();
    }while(opt !=='0')



    // pausa();
}

main();