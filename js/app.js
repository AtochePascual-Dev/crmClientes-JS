(function () {

  let DB;

  // Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    crearBD();
  });


  // Crea la base de datos
  const crearBD = () => {
    const baseDatos = window.indexedDB.open('crm', 1);

    baseDatos.onupgradeneeded = () => {
      DB = baseDatos.result;
      const objecStore = DB.createObjectStore('crm', {
        keyPath: 'id',
        autoIncrement: true,
      });

      objecStore.createIndex('nombre', 'nombre', { unique: false });
      objecStore.createIndex('correo', 'correo', { unique: true });
      objecStore.createIndex('telefono', 'telefono', { unique: false });
      objecStore.createIndex('empresa', 'empresa', { unique: false });
      objecStore.createIndex('id', 'id', { unique: true });

      console.log('tblas creadas');
    };

    // Cuando hay un error al crear la base de datos
    baseDatos.onerror = () => {
      console.log('hubo un error');
    };

    // Cuando la base de datos se crea correctamente
    baseDatos.onsuccess = () => {
      DB = baseDatos.result;
    };
  };

})();