import Citas from "./clases/Citas.js";
import UI from "./clases/UI.js";

import { formulario } from "./selectores.js";

var editando = false;
var DB;
export let citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//Instanciando citas
const ui = new UI();
const administrarCitas = new Citas();

//Funciones
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
  e.preventDefault();
  //validar
  if (Object.keys(citaObj).some((key) => citaObj[key] === "" && key !== "id")) {
    ui.mostrarMensaje("todos los compos son obligatorios", "error");
    return;
  }

  const transaction = window.DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  if (window.editando) {
    document.querySelector("button[type='submit']").textContent = "CREAR CITA";
    administrarCitas.actualizarCitas({ ...citaObj });
    objectStore.put(citaObj);

    transaction.oncomplete = function () {
      ui.mostrarMensaje("Editado correctamente");
      window.editando = false;
    };

    transaction.onerror = () => {
      console.log("Hubo un error");
    };

    //Regresando a la normalidad
  } else {
    //Agregar id
    citaObj.id = Date.now();

    administrarCitas.agregarCitas({ ...citaObj });

    //Insertar registro en IndexDB

    objectStore.add(citaObj);

    transaction.oncomplete = function () {
      console.log("cita agregada");
      ui.mostrarMensaje("Se agrego correctamente");
    };
  }

  //Reiniciamos Objeto y Formulario
  reiniciarObjeto();
  formulario.reset();

  //Mostrar el HTML
  ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
  Object.keys(citaObj).forEach((key) => (citaObj[key] = ""));
}

export function eliminarCita(id) {
  //Eliminar cita
  administrarCitas.eliminarCita(id);

  const transaction = window.DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  objectStore.delete(id);

  transaction.oncomplete = () => {
    //Mostrar mensaje
    ui.mostrarMensaje("La cita se elimino correctamente");
    //Refrescar HTML
    ui.imprimirCitas(administrarCitas);
  };

  transaction.onerror = () => {
    console.log("Hubo un error");
  };
}

export function editarCita(cita) {
  //Cargar datos
  ui.cargarDatos(cita);
  //Cambiar boton
  document.querySelector("button[type='submit']").textContent =
    "Guardar Cambios";
}

export function sincronizarCitas() {
  // Leer el contenido de la base de datos

  const objectStore = window.DB.transaction("citas").objectStore("citas");

  objectStore.openCursor().onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      administrarCitas.agregarCitas(e.target.result.value);
      console.log(administrarCitas);
      ui.imprimirCitas(administrarCitas);
      cursor.continue();
    }
  };
}

export function crearDB() {
  // crear la base de datos 1.0
  const crearDB = window.indexedDB.open("citas", 1);

  //si hay un error
  crearDB.onerror = function () {
    console.log("Hubo un error");
  };

  //si se creo bien
  crearDB.onsuccess = function () {
    console.log("Base creada correctamente");

    window.DB = crearDB.result;

    sincronizarCitas();
  };

  //definir esquema
  crearDB.onupgradeneeded = function (e) {
    const db = e.target.result;

    const objectStore = db.createObjectStore("citas", {
      keyPath: "id",
      autoIncrement: true,
    });

    //Definir las columnas
    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("propietario", "propietario", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });

    console.log("Database creada y lista");
  };
}
