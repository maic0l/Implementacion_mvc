const modelo = new ModeloTareas();
const controlador = new ControladorTareas(modelo);

const entrada = document.getElementById('entradaTarea');
const boton = document.getElementById('agregarTarea');
const lista = document.getElementById('listaTareas');
const contadorTareas = document.getElementById('contadorTareas');

document.addEventListener('DOMContentLoaded', () => {
  renderizar();
  actualizarContadorTareas();
});

boton.addEventListener('click', agregarTarea);
entrada.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') agregarTarea();
});

function agregarTarea() {
  if (controlador.agregarNuevaTarea(entrada.value)) {
    entrada.value = '';
    renderizar();
    actualizarContadorTareas();
  }
}

function renderizar() {
  lista.innerHTML = '';
  const tareas = controlador.obtenerListaTareas();
  
  if (tareas.length === 0) {
    const estadoVacio = document.createElement('li');
    estadoVacio.className = 'list-group-item text-center text-muted py-4';
    estadoVacio.textContent = 'No hay tareas todavía. ¡Agrega una arriba!';
    lista.appendChild(estadoVacio);
    return;
  }

  tareas.forEach((tarea) => {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${tarea.completada ? 'completed' : ''}`;
    
    const textoTarea = document.createElement('span');
    textoTarea.textContent = tarea.texto;
    if (tarea.completada) {
      textoTarea.style.textDecoration = 'line-through';
      textoTarea.style.color = '#6c757d';
    }
    
    const botonesDiv = document.createElement('div');
    botonesDiv.className = 'btn-group';
    
    const botonAlternar = document.createElement('button');
    botonAlternar.className = `btn btn-sm ${tarea.completada ? 'btn-warning' : 'btn-success'}`;
    botonAlternar.innerHTML = `<i class="bi ${tarea.completada ? 'bi-arrow-counterclockwise' : 'bi-check'}"></i>`;
    botonAlternar.addEventListener('click', () => {
      controlador.alternarEstadoTarea(tarea.id);
      renderizar();
    });
    
    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'btn btn-sm btn-danger';
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    botonEliminar.addEventListener('click', () => {
      controlador.eliminarTarea(tarea.id);
      renderizar();
      actualizarContadorTareas();
    });
    
    botonesDiv.appendChild(botonAlternar);
    botonesDiv.appendChild(botonEliminar);
    
    li.appendChild(textoTarea);
    li.appendChild(botonesDiv);
    lista.appendChild(li);
  });
}

function actualizarContadorTareas() {
  const cantidad = controlador.obtenerCantidadTareas();
  contadorTareas.textContent = `${cantidad} ${cantidad === 1 ? 'tarea' : 'tareas'}`;
}
