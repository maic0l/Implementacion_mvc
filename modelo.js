class ModeloTareas {
  constructor() {
    this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  }

  agregarTarea(tarea) {
    this.tareas.push({
      id: Date.now(),
      texto: tarea,
      completada: false
    });
    this._guardarEnLocalStorage();
  }

  obtenerTareas() {
    return this.tareas;
  }

  alternarTarea(id) {
    this.tareas = this.tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    this._guardarEnLocalStorage();
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    this._guardarEnLocalStorage();
  }

  _guardarEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
}
