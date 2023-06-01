(function () {
  const listaClienteHtml = document.querySelector('#listado-clientes');
  let DB;

  // Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    crearBD();
    listaClienteHtml.addEventListener('click', eliminarCliente);
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
      listarCliente();
    };
  };



  // * Lista los clientes de la BD 
  const listarCliente = () => {
    const transaction = DB.transaction('crm');
    const objectStore = transaction.objectStore('crm');

    objectStore.openCursor().onsuccess = (event) => {

      // obtenemos un registro de la bd
      const cursor = event.target.result;

      if (cursor) {
        const { nombre, correo, telefono, empresa, id } = cursor.value;
        const tr = document.createElement('tr');

        tr.innerHTML = ` 
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
              <p class="text-sm leading-10 text-gray-700"> ${correo} </p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
              <p class="text-gray-700">${telefono}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
              <p class="text-gray-600">${empresa}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
              <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
          </td>
  `;
        listaClienteHtml.appendChild(tr);
        // Ve al siguiente elemento
        cursor.continue();
      };
    }
  };


  // * Elimina un cliente de bd 
  const eliminarCliente = (event) => {
    if (event.target.classList.contains('eliminar')) {
      const idEliminar = Number(event.target.dataset.cliente);

      const transaction = DB.transaction(['crm'], 'readwrite');
      const objectStore = transaction.objectStore('crm');

      objectStore.delete(idEliminar);

      // si hay un error
      transaction.onerror = () => {
        console.log('hubo un error');
      };

      // cuando todo sale bien
      transaction.oncomplete = () => {
        event.target.parentElement.parentElement.remove();
      };
    }
  };

})();