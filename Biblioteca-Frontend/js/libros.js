let listaLibros = [];
let editando = false;

const modal = new bootstrap.Modal(document.getElementById("modalLibro"));

document.addEventListener("DOMContentLoaded", async () => {

    await cargarLibros();

    document
        .getElementById("buscarLibro")
        .addEventListener("input", buscarLibros);

    document
        .getElementById("guardarLibro")
        .addEventListener("click", guardarLibro);

});

async function cargarLibros() {

    listaLibros = await obtenerLibros();

    mostrarLibros(listaLibros);

}

function mostrarLibros(libros) {

    const tabla = document.getElementById("tablaLibros");

    tabla.innerHTML = "";

    libros.forEach(libro => {

        tabla.innerHTML += `
        <tr>

            <td>${libro.id}</td>

            <td>${libro.titulo}</td>

            <td>${libro.categoria}</td>

            <td>${libro.editorial}</td>

            <td>${libro.anio_publicacion}</td>

            <td>
                ${libro.disponible
                    ? '<span class="badge bg-success">Sí</span>'
                    : '<span class="badge bg-danger">No</span>'}
            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editar(${libro.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="borrar(${libro.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

}

function buscarLibros() {

    const texto = document
        .getElementById("buscarLibro")
        .value
        .toLowerCase();

    const resultado = listaLibros.filter(libro =>
        libro.titulo.toLowerCase().includes(texto)
    );

    mostrarLibros(resultado);

}

async function guardarLibro() {

    const id = document.getElementById("idLibro").value;

    const libro = {

        titulo: document.getElementById("titulo").value,
        isbn: "",
        categoria: document.getElementById("categoria").value,
        editorial: document.getElementById("editorial").value,
        anio_publicacion: document.getElementById("anio").value,
        disponible: true,
        imagen: "",
        autor_id: 1

    };

    if (editando) {

        await editarLibro(id, libro);

        alert("Libro actualizado correctamente");

    } else {

        await agregarLibro(libro);

        alert("Libro agregado correctamente");

    }

    limpiarFormulario();

    modal.hide();

    await cargarLibros();

}

function editar(id) {

    const libro = listaLibros.find(l => l.id == id);

    document.getElementById("idLibro").value = libro.id;
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("categoria").value = libro.categoria;
    document.getElementById("editorial").value = libro.editorial;
    document.getElementById("anio").value = libro.anio_publicacion;

    document.getElementById("tituloModal").innerText = "Editar Libro";

    editando = true;

    modal.show();

}

async function borrar(id) {

    const confirmar = confirm("¿Desea eliminar este libro?");

    if (!confirmar) return;

    await eliminarLibro(id);

    alert("Libro eliminado correctamente");

    await cargarLibros();

}

function limpiarFormulario() {

    document.getElementById("idLibro").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("editorial").value = "";
    document.getElementById("anio").value = "";

    document.getElementById("tituloModal").innerText = "Agregar Libro";

    editando = false;

}