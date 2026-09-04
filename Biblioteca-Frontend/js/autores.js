let listaAutores = [];
let editando = false;

const modal = new bootstrap.Modal(document.getElementById("modalAutor"));

document.addEventListener("DOMContentLoaded", () => {

    cargarAutores();

    document
        .getElementById("buscarAutor")
        .addEventListener("input", buscarAutores);

    document
        .getElementById("guardarAutor")
        .addEventListener("click", guardarAutor);

});

async function cargarAutores() {

    listaAutores = await obtenerAutores();

    mostrarAutores(listaAutores);

}

function mostrarAutores(autores) {

    const tabla = document.getElementById("tablaAutores");

    tabla.innerHTML = "";

    autores.forEach(autor => {

        tabla.innerHTML += `
            <tr>

                <td>${autor.id}</td>
                <td>${autor.nombre}</td>
                <td>${autor.nacionalidad ?? ""}</td>
                <td>${autor.fecha_nacimiento ? autor.fecha_nacimiento.split("T")[0] : ""}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editar(${autor.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="borrar(${autor.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

}

function buscarAutores() {

    const texto = document
        .getElementById("buscarAutor")
        .value
        .toLowerCase();

    const filtrados = listaAutores.filter(autor =>

        autor.nombre.toLowerCase().includes(texto) ||
        (autor.nacionalidad || "").toLowerCase().includes(texto)

    );

    mostrarAutores(filtrados);

}

async function guardarAutor() {

    const id = document.getElementById("idAutor").value;

    const autor = {

        nombre: document.getElementById("nombre").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        fecha_nacimiento: document.getElementById("fechaNacimiento").value

    };

    if (editando) {

        await editarAutor(id, autor);

    } else {

        await agregarAutor(autor);

    }

    limpiarFormulario();

    modal.hide();

    cargarAutores();

}

function editar(id) {

    const autor = listaAutores.find(a => a.id == id);

    document.getElementById("idAutor").value = autor.id;
    document.getElementById("nombre").value = autor.nombre;
    document.getElementById("nacionalidad").value = autor.nacionalidad;
    document.getElementById("fechaNacimiento").value =
        autor.fecha_nacimiento ? autor.fecha_nacimiento.split("T")[0] : "";

    document.getElementById("tituloModal").innerText = "Editar Autor";

    editando = true;

    modal.show();

}

async function borrar(id) {

    if (!confirm("¿Desea eliminar este autor?")) return;

    await eliminarAutor(id);

    cargarAutores();

}

function limpiarFormulario() {

    document.getElementById("idAutor").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("nacionalidad").value = "";
    document.getElementById("fechaNacimiento").value = "";

    document.getElementById("tituloModal").innerText = "Agregar Autor";

    editando = false;

}

document
    .getElementById("modalAutor")
    .addEventListener("hidden.bs.modal", limpiarFormulario);