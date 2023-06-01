(function () {
  const inputNombre = document.querySelector('#nombre');
  const inputCorreo = document.querySelector('#email');
  const inputTelefono = document.querySelector('#telefono');
  const inputEmpresa = document.querySelector('#empresa');
  const formulario = document.querySelector('#formulario');
  let DB;
  let id;

  // * Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    // Conectar la bd
    conectarDB();

    formulario.addEventListener('submit', actualizarCaliente);

    // obtener el id de la URL
    const urlParametro = new URLSearchParams(window.location.search);
    id = urlParametro.get('id');
  });


  //* Conecta con la base de datos, si no bd la crea si hay la conecta
  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = () => {
      console.log('Hubo un error');
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
      obtenerCliente(id);
    };
  }


  // * Obtener cliente de la bd
  const obtenerCliente = (id) => {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.openCursor().onsuccess = (event) => {
      // obtenemos un registro de la bd
      const cursor = event.target.result

      if (cursor) {

        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }

        cursor.continue();
      };
    };
  };

})();