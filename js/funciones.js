import Citas from "./clases/Citas.js";
import UI from "./clases/UI.js";

import { formulario } from "./selectores.js";

var editando = false;
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

  if (window.editando) {
    ui.mostrarMensaje("Editado correctamente");
    administrarCitas.actualizarCitas({ ...citaObj });

    //Regresando a la normalidad
    document.querySelector("button[type='submit']").textContent = "CREAR CITA";
    window.editando = false;
  } else {
    //Agregar id
    citaObj.id = Date.now();

    administrarCitas.agregarCitas({ ...citaObj });

    ui.mostrarMensaje("Se agrego correctamente");
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
  //Mostrar mensaje
  ui.mostrarMensaje("La cita se elimino correctamente");
  //Refrescar HTML
  ui.imprimirCitas(administrarCitas);
}

export function editarCita(cita) {
  //Cargar datos
  ui.cargarDatos(cita);
  //Cambiar boton
  document.querySelector("button[type='submit']").textContent =
    "Guardar Cambios";
}
