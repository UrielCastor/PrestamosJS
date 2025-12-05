///////////////////////////SISTEMA DE LOGEO///////////////////////////////////////////////////////////////////////////
const usuarioSimulador = "admin"
const passSimulador = "1234"

const formulario = document.getElementById("formularioIngreso")
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("usuarioIngreso").value.toLowerCase()
    const pass = document.getElementById("passIngreso").value.toLowerCase()
    function verificarUsuario() {
        if (nombre === usuarioSimulador && pass === passSimulador) {
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


