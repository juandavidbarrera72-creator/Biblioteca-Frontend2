let listaPrestamos = [];
let listaLibros = [];
let listaUsuarios = [];

let modal;


// ==========================
// INICIO
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    modal = new bootstrap.Modal(
        document.getElementById("modalPrestamo")
    );


    cargarDatos();


    document
        .getElementById("buscarPrestamo")
        .addEventListener("input", buscarPrestamos);


    document
        .getElementById("guardarPrestamo")
        .addEventListener("click", guardarPrestamo);

});



// ==========================
// CARGAR DATOS
// ==========================

async function cargarDatos(){

    listaLibros = await obtenerLibros();

    listaUsuarios = await obtenerUsuarios();

    cargarSelects();

    cargarPrestamos();

}



// ==========================
// CARGAR SELECTS
// ==========================

function cargarSelects(){

    const selectLibro = document.getElementById("libro_id");

    const selectUsuario = document.getElementById("usuario_id");


    selectLibro.innerHTML = "";

    selectUsuario.innerHTML = "";



    listaLibros.forEach(libro => {

        selectLibro.innerHTML += `

            <option value="${libro.id}">
                ${libro.titulo}
            </option>

        `;

    });



    listaUsuarios.forEach(usuario => {

        selectUsuario.innerHTML += `

            <option value="${usuario.id}">
                ${usuario.nombre} ${usuario.apellido}
            </option>

        `;

    });


}




// ==========================
// MOSTRAR PRÉSTAMOS
// ==========================

async function cargarPrestamos(){

    listaPrestamos = await obtenerPrestamos();

    mostrarPrestamos(listaPrestamos);

}



function mostrarPrestamos(prestamos){

    const tabla = document.getElementById("tablaPrestamos");

    tabla.innerHTML = "";



    prestamos.forEach(prestamo => {


        tabla.innerHTML += `

        <tr>

            <td>${prestamo.id}</td>

            <td>${prestamo.libro}</td>

            <td>${prestamo.usuario}</td>


            <td>
                ${prestamo.fecha_prestamo
                ? prestamo.fecha_prestamo.substring(0,10)
                : ""}
            </td>


            <td>
                ${prestamo.fecha_devolucion
                ? prestamo.fecha_devolucion.substring(0,10)
                : ""}
            </td>


            <td>

                ${
                prestamo.estado === "Devuelto"

                ? '<span class="badge bg-success">Devuelto</span>'

                : '<span class="badge bg-warning text-dark">Prestado</span>'
                }

            </td>



            <td>


                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarPrestamo(${prestamo.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>



                <button
                    class="btn btn-danger btn-sm"
                    onclick="borrarPrestamo(${prestamo.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>


            </td>


        </tr>

        `;


    });


}




// ==========================
// BUSCAR
// ==========================

function buscarPrestamos(){


    const texto =
    document.getElementById("buscarPrestamo")
    .value
    .toLowerCase();



    const resultado =
    listaPrestamos.filter(prestamo =>


        prestamo.libro
        .toLowerCase()
        .includes(texto)


        ||

        prestamo.usuario
        .toLowerCase()
        .includes(texto)


        ||

        prestamo.estado
        .toLowerCase()
        .includes(texto)


    );



    mostrarPrestamos(resultado);


}




// ==========================
// GUARDAR
// ==========================

async function guardarPrestamo(){


    const id =
    document.getElementById("idPrestamo").value;



    const prestamo = {


        libro_id:
        document.getElementById("libro_id").value,


        usuario_id:
        document.getElementById("usuario_id").value,


        fecha_prestamo:
        document.getElementById("fecha_prestamo").value,


        fecha_devolucion:
        document.getElementById("fecha_devolucion").value,


        estado:
        document.getElementById("estado").value


    };



    if(id === ""){


        await agregarPrestamo(prestamo);


    }else{


        await editarPrestamo(id,prestamo);


    }



    alert("Préstamo guardado correctamente");


    modal.hide();


    limpiarFormulario();


    cargarPrestamos();


}




// ==========================
// EDITAR
// ==========================

function editarPrestamo(id){


    const prestamo =
    listaPrestamos.find(p => p.id == id);



    document.getElementById("idPrestamo").value =
    prestamo.id;


    document.getElementById("libro_id").value =
    prestamo.libro_id;


    document.getElementById("usuario_id").value =
    prestamo.usuario_id;


    document.getElementById("fecha_prestamo").value =
    prestamo.fecha_prestamo.substring(0,10);



    document.getElementById("fecha_devolucion").value =
    prestamo.fecha_devolucion
    ? prestamo.fecha_devolucion.substring(0,10)
    : "";



    document.getElementById("estado").value =
    prestamo.estado;



    document.getElementById("tituloModal").innerText =
    "Editar Préstamo";


    modal.show();


}




// ==========================
// ELIMINAR
// ==========================

async function borrarPrestamo(id){


    if(!confirm("¿Desea eliminar este préstamo?"))
    return;



    await eliminarPrestamo(id);


    alert("Préstamo eliminado correctamente");


    cargarPrestamos();


}




// ==========================
// LIMPIAR
// ==========================

function limpiarFormulario(){


    document.getElementById("idPrestamo").value = "";

    document.getElementById("fecha_prestamo").value = "";

    document.getElementById("fecha_devolucion").value = "";

    document.getElementById("estado").value = "Prestado";


}