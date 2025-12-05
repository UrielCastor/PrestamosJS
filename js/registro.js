const formulario = document.getElementById("formularioRegistro")
formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("usuarioRegistro").value.toLowerCase()
    const pass = document.getElementById("passRegistro").value.toLowerCase()
    if (!nombre || !pass) {
        Swal.fire({
            position: "top",
            icon: "warning",
            title: "Usuario o Password incorrectos, reintentalo",
            showConfirmButton: false,
            timer: 4000
        })
        return;
    }
    function guardarUsuario() {
        const usuarioGuardadoJson = JSON.stringify(nombre)
        localStorage.setItem("usuario", usuarioGuardadoJson)
        const passGuardadoJson = JSON.stringify(pass)
        localStorage.setItem("pass", passGuardadoJson)

        let timerInterval;
        Swal.fire({
            title: "Usuario Registrado",
            icon: "success",
            html: "Sera redirigido en <b></b> segundos.",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            location.href = "../index.html"

        })
        return;
    }
    guardarUsuario(nombre, pass)

})