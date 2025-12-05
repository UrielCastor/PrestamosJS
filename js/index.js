///////////////////////////SISTEMA DE LOGEO///////////////////////////////////////////////////////////////////////////
const usuarioRegistado = JSON.parse(localStorage.getItem("usuario"))
const passRegistrado = JSON.parse(localStorage.getItem("pass"))

const formulario = document.getElementById("formularioIngreso")
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("usuarioIngreso").value.toLowerCase()
    const pass = document.getElementById("passIngreso").value.toLowerCase()
    function verificarUsuario() {
        if (nombre === usuarioRegistado && pass === passRegistrado) {
            location.href = "./pages/dashboard.html"
            const usuarioJson = JSON.stringify(nombre)
            localStorage.setItem("usuario", usuarioJson)
        } else {
            Swal.fire({
                position: "top",
                icon: "warning",
                title: "Usuario o Password incorrectos, reintentalo",
                showConfirmButton: false,
                timer: 4000
            });
        }
    }
    verificarUsuario(nombre, pass)

})
const borrarUsuario = document.getElementById("botonBorrarUsuario")
borrarUsuario.onclick = () => {
    Swal.fire({
        title: "Deseas eliminar el usuario?",
        text: "Si aceptas se borraran usuario y contraseña",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si borrar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Confirmacion!",
                text: "Todos los datos fueron borrados.",
                icon: "success"
            }).then(() => {
                localStorage.removeItem("usuario")
                localStorage.removeItem("pass")
                location.reload()
            })
        }
    });
}

