(function () {
  const formulario = document.querySelector('#formulario');
  let DB;


  // cundo el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();
    formulario.addEventListener('submit', agregarCliente);
  });

  // Conecta con la base de datos, si no bd la crea si hay la conecta
  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = () => {
      console.log('Hubo un error');
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
    };
  }

  // valida un cliente
  const agregarCliente = (event) => {
    event.preventDefault();

    // Leemos todo los inputs
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    // Valdamos si existen vacios
    if ([nombre, correo, telefono, empresa].includes('')) {
      console.log('error');
      return;
    }
  };
})();