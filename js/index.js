///////////////////////////SISTEMA DE LOGEO///////////////////////////////////////////////////////////////////////////
// aca se guardan  los datos de usuario y contraseña para poder ingresar al simulador
const usuarioSimulador = "admin"
const passSimulador = "admin"
// aca se hace el logeo del usuario usando una funcion con un if
const formulario = document.getElementById("formularioIngreso")
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    // se almacenan en constantes los datos traidos desde el formulario del index
    const nombre = document.getElementById("usuarioIngreso").value;
    const pass = document.getElementById("passIngreso").value;
    // se crea la funcion para verificar que los datos del formulario coincidan con las variables codeadas
    // no encontre en el contenido la redireccion asi que busque en internet dejo la fuente https://es.semrush.com/blog/javascript-redirect
    function verificarUsuario() {
        if (nombre === usuarioSimulador && pass === passSimulador) {
            location.href = "./pages/dashboard.html";
            const usuarioJson= JSON.stringify(nombre)
            localStorage.setItem("usuario",usuarioJson)
        } else {
            alert("Error usuario o contraseña incorrectos, vuelva a intentarlo")
        }
    }
    verificarUsuario(nombre, pass)

})


