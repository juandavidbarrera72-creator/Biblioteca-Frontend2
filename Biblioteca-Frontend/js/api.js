const API_URL = "https://api-biblioteca-1ibw8.onrender.com";

// ==================== LIBROS ====================

async function obtenerLibros() {
    const respuesta = await fetch(`${API_URL}/libros`);
    return await respuesta.json();
}

async function agregarLibro(libro) {
    const respuesta = await fetch(`${API_URL}/libros`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(libro)
    });

    return await respuesta.json();
}

async function editarLibro(id, libro) {
    const respuesta = await fetch(`${API_URL}/libros/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(libro)
    });

    return await respuesta.json();
}

async function eliminarLibro(id) {
    const respuesta = await fetch(`${API_URL}/libros/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
}


// ==================== USUARIOS ====================

async function obtenerUsuarios() {
    const respuesta = await fetch(`${API_URL}/usuarios`);
    return await respuesta.json();
}

async function agregarUsuario(usuario) {
    const respuesta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    return await respuesta.json();
}

async function editarUsuario(id, usuario) {
    const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    return await respuesta.json();
}

async function eliminarUsuario(id) {
    const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
}


// ==================== AUTORES ====================

async function obtenerAutores() {
    const respuesta = await fetch(`${API_URL}/autores`);
    return await respuesta.json();
}

async function agregarAutor(autor) {
    const respuesta = await fetch(`${API_URL}/autores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
    });

    return await respuesta.json();
}

async function editarAutor(id, autor) {
    const respuesta = await fetch(`${API_URL}/autores/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(autor)
    });

    return await respuesta.json();
}

async function eliminarAutor(id) {
    const respuesta = await fetch(`${API_URL}/autores/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
}


// ==================== PRÉSTAMOS ====================

async function obtenerPrestamos() {
    const respuesta = await fetch(`${API_URL}/prestamos`);
    return await respuesta.json();
}

async function agregarPrestamo(prestamo) {
    const respuesta = await fetch(`${API_URL}/prestamos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prestamo)
    });

    return await respuesta.json();
}

async function editarPrestamo(id, prestamo) {
    const respuesta = await fetch(`${API_URL}/prestamos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prestamo)
    });

    return await respuesta.json();
}

async function eliminarPrestamo(id) {
    const respuesta = await fetch(`${API_URL}/prestamos/${id}`, {
        method: "DELETE"
    });

    return await respuesta.json();
}