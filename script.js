const URL = "https://684aeaea165d05c5d35ad633.mockapi.io/musica";

async function buscarArtistas(query) { // La función ahora espera un argumento 'query'
  try {
      const response = await fetch(URL);
      if (!response.ok) {
          throw new Error('Error en la red');
      }
      const data = await response.json();
      // Filtrar artistas según la consulta
      const resultados = data.filter(artista => 
          artista.nombre.toLowerCase().includes(query.toLowerCase())
      );
      // Mostrar resultados
      mostrarResultados(resultados);
  } catch (error) {
      console.error('Error:', error);
  }
}

function mostrarResultados(resultados) {
  // Asegúrate de tener un elemento con id 'resultados' en tu HTML para que esto funcione
  // Por ejemplo, podrías añadir un div vacío en main-content: <div id="resultados"></div>
  const contenedor = document.getElementById('resultados'); 
  if (!contenedor) {
      console.warn("Element with ID 'resultados' not found. Results will not be displayed.");
      return;
  }
  contenedor.innerHTML = ''; // Limpiar resultados anteriores
  if (resultados.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron artistas.</p>';
      return;
  }
  resultados.forEach(artista => {
      const div = document.createElement('div');
      div.classList.add('album'); // Reutilizar la clase 'album' para el estilo si es apropiado
      div.innerHTML = `
          <img src="${artista.avatar}" alt="${artista.nombre}" />
          <h3>${artista.nombre}</h3>
          <p>${artista.genero || 'Género desconocido'}</p> <!-- Asumiendo que hay un campo 'genero' o similar -->
      `;
      contenedor.appendChild(div);
  });
}

document.getElementById("search-bar").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita que se recargue la página si está en un formulario
    const query = document.getElementById('search-bar').value; // Obtener el valor del input
    buscarArtistas(query); // Pasar el valor a la función
  }
});