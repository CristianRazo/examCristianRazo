import { datosCita, nuevaCita } from "../funciones.js";
import { formulario } from "../selectores.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    formulario.addEventListener("input", datosCita);
    formulario.addEventListener("submit", nuevaCita);
  }
}

export default App;
