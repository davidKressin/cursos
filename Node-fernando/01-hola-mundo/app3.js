// Todas las funciones son "no boqueantes"


console.log("Inicio de programa");

setTimeout(()=>{
    console.log("primer timeout");
},3000);

setTimeout(()=>{
    console.log("segundo timeout");
},0);

setTimeout(()=>{
    console.log("tercer timeout");
},0);

console.log("fin de programa");


// Como pense que seria :
// inicio programa
// segundo
// tercer
// fin programa
// primer

// Como realmente pasó:
// inicio programa
// fin programa
// segundo: se ejecuta despuesto porque quedo guardado en un stack de codigo que ejecutar luego
// tercer: lo mismo
// primer


// Primero se ejecuta su funcion main() la cual escanea linea por linea de código
// cuando se topa con una funcion que se quiere ejecutar, la ejecuta hasta que retorna algo, y luego la quita de la pila de procesos

