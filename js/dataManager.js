import { TOKEN_API } from "../config.js";
let peliculas = null;
let totalPages = 0;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TOKEN_API
    }
};

export function cargarPeliculas() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            peliculas = response.results;
            totalPages = response.total_pages;
            console.log(peliculas);
            console.log(totalPages);

        })
        .catch(err => console.error(err));
}

export async function cargarPeliculasAsync(pagina) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${pagina}`, options)


        if(!response.ok){
            throw new Error("No se pudo obtener las peliculas");

        }
        const data = await response.json()
        peliculas = await data.results;
        totalPages = data.total_pages;
        console.log(peliculas);
        console.log(totalPages)
    }
    catch (error) {
        console.log('Error al obtener las peliculas: ', error)
        peliculas = [];
    }


}

export function getPeliculas() {
    return peliculas;
}

export function getTotalPages() {
    return totalPages;
}