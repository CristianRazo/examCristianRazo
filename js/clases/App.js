import { datosCita, nuevaCita, crearDB } from "../funciones.js";
import { formulario } from "../selectores.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    formulario.addEventListener("input", datosCita);
    formulario.addEventListener("submit", nuevaCita);
    crearDB();
  }
}

export default App;
