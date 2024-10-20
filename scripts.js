// Cargar los reclusos desde LocalStorage al inicio
let reclusos = JSON.parse(localStorage.getItem('reclusos')) || [];

// Variable para saber si estamos en modo edición
let editandoRecluso = null;

// Referencia a los elementos de la tabla y el botón de agregar
const tbody = document.querySelector("tbody");
const btnAgregar = document.querySelector(".btn-primary");

// Función para renderizar la tabla de reclusos
function renderizarTabla() {
    // Limpiar la tabla antes de volver a llenarla
    tbody.innerHTML = '';

    reclusos.forEach((recluso, index) => {
        const tr = document.createElement('tr');

        // Crear celdas con los datos del recluso
        tr.innerHTML = `
            <td>${recluso.nombre}</td>
            <td>${recluso.identificacion}</td>
            <td>${recluso.delitos}</td>
            <td>${recluso.condena}</td>
            <td>${recluso.fechaIngreso}</td>
            <td class="table-actions">
                <button class="btn btn-warning btn-sm" onclick="editarRecluso(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarRecluso(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para guardar en LocalStorage
function guardarReclusosEnLocalStorage() {
    localStorage.setItem('reclusos', JSON.stringify(reclusos));
}

// Función para agregar o editar un recluso
function agregarEditarRecluso() {
    const nombre = prompt("Ingrese el nombre del recluso:");
    const identificacion = prompt("Ingrese la identificación:");
    const delitos = prompt("Ingrese los delitos:");
    const condena = prompt("Ingrese la condena:");
    const fechaIngreso = prompt("Ingrese la fecha de ingreso (YYYY-MM-DD):");

    if (nombre && identificacion && delitos && condena && fechaIngreso) {
        const nuevoRecluso = {
            nombre: nombre,
            identificacion: identificacion,
            delitos: delitos,
            condena: condena,
            fechaIngreso: fechaIngreso
        };

        if (editandoRecluso !== null) {
            // Si estamos editando, actualizar el recluso
            reclusos[editandoRecluso] = nuevoRecluso;
            editandoRecluso = null;
        } else {
            // Si no estamos editando, agregar un nuevo recluso
            reclusos.push(nuevoRecluso);
        }

        // Guardar en LocalStorage
        guardarReclusosEnLocalStorage();

        // Renderizar la tabla nuevamente
        renderizarTabla();
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

// Función para editar un recluso
function editarRecluso(index) {
    editandoRecluso = index;
    agregarEditarRecluso();
}

// Función para eliminar un recluso
function eliminarRecluso(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este recluso?")) {
        reclusos.splice(index, 1);  // Eliminar el recluso del array
        guardarReclusosEnLocalStorage(); // Guardar en LocalStorage después de eliminar
        renderizarTabla();  // Volver a renderizar la tabla
    }
}

// Evento para el botón "Agregar"
btnAgregar.addEventListener("click", agregarEditarRecluso);

// Renderizar la tabla inicialmente con los datos existentes
renderizarTabla();

/* --- CONTROL DE VISITAS --- */

// Cargar visitas desde LocalStorage
let visitas = JSON.parse(localStorage.getItem('visitas')) || [];

// Referencia al formulario de visitas y la lista de visitas
const formVisitas = document.getElementById('formVisitas');
const listaVisitas = document.getElementById('listaVisitas');

// Función para renderizar las visitas
function renderizarVisitas() {
    listaVisitas.innerHTML = '';

    visitas.forEach((visita, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            ${visita.nombreVisitante} visitó a ${visita.reclusoVisitado} el ${visita.fechaVisita}.
            <button class="btn btn-danger btn-sm float-end" onclick="eliminarVisita(${index})">Eliminar</button>
        `;
        listaVisitas.appendChild(li);
    });
}

// Función para guardar visita en LocalStorage
function guardarVisitasEnLocalStorage() {
    localStorage.setItem('visitas', JSON.stringify(visitas));
}

// Función para guardar visita
document.getElementById('btnGuardarVisita').addEventListener('click', function() {
    const visitante = document.getElementById('nombreVisitante').value;
    const fecha = document.getElementById('fechaVisita').value;
    const recluso = document.getElementById('reclusoVisitado').value;

    if (visitante && fecha && recluso) {
        const nuevaVisita = {
            nombreVisitante: visitante,
            fechaVisita: fecha,
            reclusoVisitado: recluso
        };

        visitas.push(nuevaVisita);
        guardarVisitasEnLocalStorage();
        renderizarVisitas();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

// Función para eliminar una visita
function eliminarVisita(index) {
    if (confirm("¿Estás seguro de que deseas eliminar esta visita?")) {
        visitas.splice(index, 1);  // Eliminar visita del array
        guardarVisitasEnLocalStorage(); // Guardar cambios en LocalStorage
        renderizarVisitas();  // Volver a renderizar la lista de visitas
    }
}

// Renderizar visitas inicialmente
renderizarVisitas();

// Seleccionamos los elementos del DOM para Personal Administrativo
const formPersonal = document.getElementById('formPersonal');
const nombrePersonalInput = document.getElementById('nombrePersonal');
const rolPersonalInput = document.getElementById('rolPersonal');
const personalList = []; // Array para almacenar el personal administrativo

// Seleccionamos el botón para guardar personal
const btnGuardarPersonal = document.getElementById('btnGuardarPersonal');

// Evento para agregar nuevo personal
btnGuardarPersonal.addEventListener('click', () => {
    const nombrePersonal = nombrePersonalInput.value.trim();
    const rolPersonal = rolPersonalInput.value.trim();

    if (nombrePersonal && rolPersonal) {
        // Crear un objeto de personal
        const nuevoPersonal = {
            nombre: nombrePersonal,
            rol: rolPersonal
        };

        // Agregar al array de personal
        personalList.push(nuevoPersonal);

        // Limpiar el formulario
        nombrePersonalInput.value = '';
        rolPersonalInput.value = '';

        // Mostrar la lista actualizada (console.log para fines de demostración)
        console.log('Personal Administrativo Guardado:', personalList);
        alert('Personal administrativo guardado correctamente.');
    } else {
        alert('Por favor, rellena todos los campos.');
    }
});

// Funcionalidad para el Reporte de Actividades
const btnGenerarReporte = document.getElementById('btnGenerarReporte');

// Evento para generar un reporte diario
btnGenerarReporte.addEventListener('click', () => {
    // Simulación de la generación de un reporte
    const reporte = `Reporte Diario Generado el: ${new Date().toLocaleString()}\n\n` +
                    `Total de Personal Administrativo: ${personalList.length}\n\n` +
                    `Listado de Personal:\n` +
                    personalList.map((personal, index) => `${index + 1}. ${personal.nombre} - ${personal.rol}`).join('\n');

    // Mostrar el reporte en consola (podrías implementarlo para mostrarlo en pantalla o descargarlo)
    console.log(reporte);
    alert('Reporte diario generado. Revisa la consola para ver el detalle.');
});