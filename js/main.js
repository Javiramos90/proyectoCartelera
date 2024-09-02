// las importaciones se colocan al principio del archivo de javascrit
import { showloading, hidelLoading } from "./loadingManager.js";
import { cargarPeliculasAsync, getTotalPages } from "./dataManager.js";
import { displayPeliculas } from "./renderPeliculas.js";
import { toggleMenu } from "./menuManager.js";

document.getElementById('boton').addEventListener('click', toggleMenu)

let pagina = 1

const botonSiguiente = document.getElementById('btnSiguiente')
const botonAnterior = document.getElementById('btnAnterior')

botonSiguiente.addEventListener('click',() =>{
  if(pagina < getTotalPages()){
  pagina ++
  mostrarPeliculas()
  botonSiguiente.style.display = 'block';
  botonAnterior.style.display = 'block';
}if(pagina === getTotalPages()){
  botonSiguiente.style.display = 'none';
}
})

botonAnterior.addEventListener('click',() =>{
  if(pagina > 1){ 
    pagina --
  mostrarPeliculas()
  botonSiguiente.style.display = 'block';
  botonAnterior.style.display = 'block';
}if(pagina === 1){
  botonAnterior.style.display = 'none';
}
 
})

async function mostrarPeliculas() {
  showloading();
  await cargarPeliculasAsync(pagina);
  displayPeliculas();
  hidelLoading();
}

mostrarPeliculas()
// saegurarse de llamar a mostrarPeliculas cuando se cargue la pagina
document.addEventListener('DDMContentLoaded', mostrarPeliculas)