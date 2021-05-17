import { editarCita, eliminarCita } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";
import { citaObj } from "../funciones.js";
class UI {
  mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-canter", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.textContent = mensaje;

    //Agregar al DOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    //quitar la alerta en 5 seg
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();
    citas.forEach((cita) => {
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = cita.id;

      //Creando el HTML
      Object.keys(cita).forEach((key) => {
        if (key === "mascota") {
          const parrafo = document.createElement("h2");
          parrafo.classList.add("card-title", "font-weight-bolder");
          parrafo.textContent = cita[key];
          divCita.appendChild(parrafo);
        } else {
          const parrafo = document.createElement("p");
          parrafo.innerHTML = `
            <span class="fontweight-bolder text-capitalize">${key}</span> ${cita[key]}
          `;
          divCita.appendChild(parrafo);
        }
      });
      //Boton Eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML =
        'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>';
      divCita.appendChild(btnEliminar);
      btnEliminar.onclick = () => eliminarCita(cita.id);

      //Boton Editar
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info", "mr-2");
      btnEditar.innerHTML =
        'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /> <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg>';
      divCita.appendChild(btnEditar);
      btnEditar.onclick = () => editarCita(cita);

      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }

  cargarDatos(cita) {
    Object.keys(cita).forEach((key) => {
      if (key !== "id") {
        document.querySelector(`#${key}`).value = cita[key];
      }
      citaObj[key] = cita[key];
    });
    window.editando = true;
  }
}

export default UI;
