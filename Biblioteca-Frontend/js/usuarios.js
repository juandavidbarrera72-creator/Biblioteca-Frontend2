let listaUsuarios = [];
let editando = false;

const modal = new bootstrap.Modal(document.getElementById("modalUsuario"));

document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();

    document.getElementById("buscarUsuario").addEventListener("input", buscarUsuarios);
    document.getElementById("guardarUsuario").addEventListener("click", guardarUsuario);
});

async function cargarUsuarios() {
    listaUsuarios = await obtenerUsuarios();
    mostrarUsuarios(listaUsuarios);
}

function mostrarUsuarios(usuarios) {

    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    usuarios.forEach(usuario => {

        tabla.innerHTML += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.direccion}</td>

                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar(${usuario.id})">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="borrar(${usuario.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;

    });

}

function buscarUsuarios() {

    const texto = document.getElementById("buscarUsuario").value.toLowerCase();

    const filtrados = listaUsuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.apellido.toLowerCase().includes(texto) ||
        usuario.correo.toLowerCase().includes(texto)
    );

    mostrarUsuarios(filtrados);

}

async function guardarUsuario() {

    const id = document.getElementById("idUsuario").value;

    const usuario = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value
    };

    if (editando) {
        await editarUsuario(id, usuario);
    } else {
        await agregarUsuario(usuario);
    }

    limpiarFormulario();
    modal.hide();
    cargarUsuarios();

}

function editar(id) {

    const usuario = listaUsuarios.find(u => u.id == id);

    document.getElementById("idUsuario").value = usuario.id;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellido").value = usuario.apellido;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("telefono").value = usuario.telefono;
    document.getElementById("direccion").value = usuario.direccion;

    document.getElementById("tituloModal").innerText = "Editar Usuario";

    editando = true;

    modal.show();

}

async function borrar(id) {

    if (!confirm("¿Desea eliminar este usuario?")) return;

    await eliminarUsuario(id);

    cargarUsuarios();

}

function limpiarFormulario() {

    document.getElementById("idUsuario").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";

    document.getElementById("tituloModal").innerText = "Agregar Usuario";

    editando = false;

}

document.getElementById("modalUsuario").addEventListener("hidden.bs.modal", limpiarFormulario);