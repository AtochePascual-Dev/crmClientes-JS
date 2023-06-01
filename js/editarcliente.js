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


  // * llena los datos del formulario
  const llenarFormulario = (cliente) => {
    const { nombre, correo, telefono, empresa } = cliente;

    inputNombre.value = nombre;
    inputCorreo.value = correo;
    inputTelefono.value = telefono;
    inputEmpresa.value = empresa;
  };


  // * Actualiza un cliente en la BD
  const actualizarCaliente = (event) => {
    event.preventDefault();

    const nombre = inputNombre.value;
    const correo = inputCorreo.value;
    const telefono = inputTelefono.value;
    const empresa = inputEmpresa.value;

    // Validamos si exiten valores vacios
    if ([nombre, correo, telefono, empresa].includes('')) {
      imprimirAlerta('Todos los campos son obligatorios', false);
      return;
    };

    // crea un cliente actualizado
    const cliente = {
      nombre,
      correo,
      telefono,
      empresa,
      id: Number(id)
    };

    // Actualiza el cliente
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(cliente);

    // si hay un error
    transaction.onerror = () => {
      imprimirAlerta('Error al editr cliente', false);
    };

    // cuando todo sale bien
    transaction.oncomplete = () => {
      imprimirAlerta('Cliente actualizado corrrectamente');

      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
    };
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