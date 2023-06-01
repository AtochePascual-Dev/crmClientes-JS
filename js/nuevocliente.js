(function () {
  const formulario = document.querySelector('#formulario');
  let DB;


  //* cundo el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();
    formulario.addEventListener('submit', agregarCliente);
  });



  //* Conecta con la base de datos, si no bd la crea si hay la conecta
  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = () => {
      console.log('Hubo un error');
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
    };
  }



  //* valida un cliente
  const agregarCliente = (event) => {
    event.preventDefault();

    // Leemos todo los inputs
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    // Valdamos si existen vacios
    if ([nombre, correo, telefono, empresa].includes('')) {
      imprimirAlerta('Todos los campos son obligatorios', false);
      return;
    }
  };



  //* Imprime una alerta en pantalla
  const imprimirAlerta = (mensaje, exito = true) => {
    const existeAlerta = document.querySelector('.alerta');

    if (existeAlerta) return;

    const divAlerta = document.createElement('div');
    divAlerta.textContent = mensaje;
    divAlerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'text-center', 'border', 'mt-6', 'alerta');

    (exito)
      ? divAlerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
      : divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');

    // Mostramos la lerta en pantalla
    formulario.appendChild(divAlerta);

    // Eliminamos la alerta
    setTimeout(() => {
      divAlerta.remove();
    }, 3000);
  };
})();