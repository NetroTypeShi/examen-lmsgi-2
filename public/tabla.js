// Función para obtener los vinos y sus catas
async function cargarVinos() {
    try {
      const response = await fetch('/vinos');
      const vinos = await response.json();

      const tablaVinos = document.getElementById('tabla-vinos').getElementsByTagName('tbody')[0];
      tablaVinos.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

      vinos.forEach(vino => {
        const row = tablaVinos.insertRow();
        row.insertCell(0).textContent = vino.nombre;
        row.insertCell(1).textContent = vino.año;
        row.insertCell(2).textContent = vino.tipo;
        row.insertCell(3).textContent = `$${vino.precio}`;
      });
    } catch (error) {
      console.error('Error al cargar los vinos:', error);
    }
  }

  
  async function cargarCatas() {
    try {
      const response = await fetch('/catas');
      const catas = await response.json();

      const tablaCatas = document.getElementById('tabla-catas').getElementsByTagName('tbody')[0];
      tablaCatas.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

      catas.forEach(cata => {
        const row = tablaCatas.insertRow();
        row.insertCell(0).textContent = cata.vino; // Asumiendo que 'vino' es un campo que existe en las catas
        row.insertCell(1).textContent = cata.fecha;
        row.insertCell(2).textContent = cata.puntuacion;
      });
    } catch (error) {
      console.error('Error al cargar las catas:', error);
    }
  }

  
  window.onload = function() {
    cargarVinos();
    cargarCatas();
  }