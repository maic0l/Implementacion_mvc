class ControladorTareas {
  constructor(modelo) {
    this.modelo = modelo;
  }

  agregarNuevaTarea(textoTarea) {
    if (textoTarea.trim() !== '') {
      this.modelo.agregarTarea(textoTarea);
      return true;
    }
    return false;
  }

  obtenerListaTareas() {
    return this.modelo.obtenerTareas();
  }

  alternarEstadoTarea(id) {
    this.modelo.alternarTarea(id);
  }

  eliminarTarea(id) {
    this.modelo.eliminarTarea(id);
  }

  obtenerCantidadTareas() {
    return this.modelo.obtenerTareas().length;
  }
}
