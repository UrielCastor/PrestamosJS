///////////////////////////Cambio de titulo dinamico///////////////////////////////////////////////////////////////////////////
const tituloDinamico = document.getElementById("tituloUsuario")
const nombreUsuario = JSON.parse(localStorage.getItem("usuario"))
tituloDinamico.innerHTML = `Bienvenido <i class=" fa fa-user-circle"> ${nombreUsuario}</i> `
/////////////////////////// Busqueda de prestamos///////////////////////////////////////////////////////////////////////////
let modalAsesores = document.getElementById("modalAsesores")
let modalAsesoresCargados = document.getElementById("asesoresCargado")
const URL = "https://jsonplaceholder.typicode.com/users"
function obtenerUsuarios() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            mostrarAsesores(data)
        })
}

function mostrarAsesores(listaAsesores) {
    listaAsesores.forEach(usuarios => {
        let card = document.createElement("div")
        card.className = "cardAsesores";
        card.innerHTML = ` <i class="fa fa-id-card aria-hidden="true"> Nombre: ${usuarios.name}</i>
                               <i class="fa fa-user-circle"> Usuario: ${usuarios.username}</i>
                               <i class="fa fa-envelope"> E-mail: ${usuarios.email}</i>
                               <i class="fa fa-street-view"> Sucursal: ${usuarios.address.city}</i>
                               <i class="fa fa-mobile"> Contacto: ${usuarios.address.zipcode}</i>`
        modalAsesoresCargados.appendChild(card)
    })

}
obtenerUsuarios()
///////////////////////////Simulacion de creditos///////////////////////////////////////////////////////////////////////////
const simularCredito = document.getElementById("simularCredito")
class creditoS {
    static id = 0
    constructor(importe, meses,) {
        this.id = ++creditoS.id,
            this.importe = importe,
            this.meses = meses
    }
}
let cargaImporteSimulado = document.getElementById("cargaImporte")
let cargaMesesSimulado = document.getElementById("cargaMeses")
let creditosSimulados = []
const cargarCreditoSimulado = () => {
    if (!cargaImporteSimulado.value || !cargaMesesSimulado.value) {
        Swal.fire({
            title: "Campos obligatorios!",
            icon: "warning",
            draggable: true
        })
        return
    }
    const credito = new creditoS(cargaImporteSimulado.value, cargaMesesSimulado.value,)
    let mostraCsimulado = document.getElementById("cardSimulacion")
    mostraCsimulado.innerHTML = ""
    let tasaInteres = 0.05
    let pagoMensual = Math.round(credito.importe * (1 + tasaInteres * credito.meses)) / credito.meses
    let totalaPagar = pagoMensual * credito.meses
    let card = document.createElement("div")
    card.className = "cardCreditos";
    card.innerHTML = `
                    <h4>Simulacion de Prestamo Personal</h4>
                    <h5 class="card-title">Monto Solicitado $: ${credito.importe}</h5>
                    <h5 class="card-title">Pago Mensual $: ${pagoMensual}</h5>
                    <h5>Meses : ${credito.meses}</h5>
                    <h5>Total a Pagar $: ${totalaPagar}</h5>
                    <h5>Interés aplicado $: ${(totalaPagar - credito.importe)}</h5>`

    mostraCsimulado.appendChild(card)
}
const cerrarSimulador = document.getElementById("cerrarCimulador")
cerrarSimulador.onclick = () => {
    Swal.fire({
        icon: "success",
        title: "Simulador Cerrado",
        text: "Gracias por usar nuestros servicios",
    })
    creditosSimulados.length = 0
    document.getElementById("cardSimulacion").innerHTML = ""
    cargaImporteSimulado.value = ""
    cargaMesesSimulado.value = "Cuotas"
}

simularCredito.onclick = () => {

    cargarCreditoSimulado()

}
///////////////////////////Solicitud de creditos///////////////////////////////////////////////////////////////////////////
const sacarCredito = document.getElementById("solicitarboton")
class CreditoSolicitar {
    static id = 0;
    constructor(importe, meses, fecha,) {
        this.id = ++CreditoSolicitar.id;
        this.importe = importe,
            this.meses = meses,
            this.fecha = fecha
    }
}

let cargaImporte = document.getElementById("cargaImporteCargado")
let cargarMeses = document.getElementById("cargaMesesCargado")
let cargarFecha = document.getElementById("cargaFechaCargado")
const creditoSacado = JSON.parse(localStorage.getItem("creditoSacado")) || []
if (creditoSacado.length > 0) {
    CreditoSolicitar.id = Math.max(creditoSacado.map(c => c.id));
}
const cargarCreditoSacado = () => {
    if (!cargaImporte.value || !cargarMeses.value) {
        Swal.fire({
            title: "Campos obligatorios!",
            icon: "warning",
            draggable: true
        })
        return
    }
    const CreditoSolicita = new CreditoSolicitar(cargaImporte.value, cargarMeses.value, cargarFecha.value)
    creditoSacado.push(CreditoSolicita)
    const creditoJSon = JSON.stringify(creditoSacado)
    localStorage.setItem("creditoSacado", creditoJSon)
}
const fechaCargada = document.getElementById("cargaFechaCargado")
const hoy = new Date()
const dia = hoy.getDate().toString().padStart(2, '0')
const mes = (hoy.getMonth() + 1).toString().padStart(2, '0')
const anio = hoy.getFullYear()
const fechaDeHot = `${anio}-${mes}-${dia}`
fechaCargada.value = fechaDeHot

const cerrarSolicitud = document.getElementById("cerrarSolicitud")
cerrarSolicitud.onclick = () => {
    Swal.fire({
        icon: "warning",
        title: "Credito Cancelado",
        text: "Gracias por usar nuestros servicios",
    })
    cargaImporte.value = ""
    cargarMeses.value = "Cuotas"
    cargarFecha.value = "date"
}
sacarCredito.onclick = () => {
    Swal.fire({
        title: "Confirmar Prestamo?",
        text: "Una ves confirmado sera acreditado en tu cuenta",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Perfecto!",
                text: "Prestamo Otorgado.",
                icon: "success"
            }).then(() => {
                location.reload()
            })

        }
    })
    cargarCreditoSacado()
    fechaCargada.value = fechaDeHot

}
///////////////////////////Vizualisacion de creditos///////////////////////////////////////////////////////////////////////////
const modalVisualizacion = document.getElementById("creditosOtorgados")
const creditosAprovados = JSON.parse(localStorage.getItem("creditoSacado"))
const tituloModal = document.getElementById("creditosSolicitadosPor")
tituloModal.innerText = "Creditos Solicitados Por :" + nombreUsuario
let mostrarCOtorgado = document.getElementById("creditosOtorgados")
mostrarCOtorgado.innerHTML = ""

creditosAprovados.forEach(creditoA => {
    let tasaInteres = 0.05
    let pagoMensual = Math.round(creditoA.importe * (1 + tasaInteres * creditoA.meses)) / creditoA.meses
    let totalaPagar = pagoMensual * creditoA.meses
    let card = document.createElement("div")
    card.className = "cardAsesores";
    card.innerHTML = `
                     <h4>Prestamos Personales</h4>
                    <h5 class="card-title">Monto Solicitado $: ${creditoA.importe}</h5>
                    <h5 class="card-title">Pago Mensual $: ${pagoMensual}</h5>
                    <h5>Meses : ${creditoA.meses}</h5>
                    <h5>Total a Pagar $: ${totalaPagar}</h5>
                    <h5>Interés aplicado $: ${(totalaPagar - creditoA.importe)}</h5>
                    <h5>Fecha de Emision : ${creditoA.fecha}</h5>`


    const botonBorrar = document.createElement("button")
    botonBorrar.textContent = "Borrar"
    botonBorrar.className = "btn btn-danger"
    botonBorrar.onclick = () => {
        const nuevosCreditos = creditosAprovados.filter(c => c.id !== creditoA.id)
        localStorage.setItem("creditoSacado", JSON.stringify(nuevosCreditos))
        Swal.fire({
            title: "Deseas eliminar el prestamo?",
            text: "Si aceptas se borrara el prestamo solicitado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si borrar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Confirmacion!",
                    text: "El prestamo fue borrado.",
                    icon: "success"
                }).then(() => {
                    card.remove()
                    location.reload()
                })
            }
        });
    }

    card.appendChild(botonBorrar)
    mostrarCOtorgado.appendChild(card)

})
/////////////////////////// Borrado de prestamos///////////////////////////////////////////////////////////////////////////
const borrarPrestamo = document.getElementById("borrarPrestamo")
borrarPrestamo.onclick = () => {
    Swal.fire({
        title: "Deseas eliminar todo?",
        text: "Si aceptas se borraran todos los prestamos solicitados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si borrar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Confirmacion!",
                text: "Todos los prestamos fueron borrados.",
                icon: "success"
            }).then(() => {
                localStorage.removeItem("creditoSacado")
                location.reload()
            })
        }
    });
}
/////////////////////////// Busqueda de prestamos///////////////////////////////////////////////////////////////////////////
let inputbuscar = document.getElementById("inputbuscar")
inputbuscar.onchange = () => {
    const busqueda = creditosAprovados.filter(creditosAprovado => creditosAprovado.importe === inputbuscar.value)
    let mostrarCOtorgado = document.getElementById("buscrcreditos")
    mostrarCOtorgado.innerHTML = ""
    busqueda.forEach(creditosAprovados => {
        let tasaInteres = 0.05
        let pagoMensual = Math.round(creditosAprovados.importe * (1 + tasaInteres * creditosAprovados.meses)) / creditosAprovados.meses
        let totalaPagar = pagoMensual * creditosAprovados.meses
        let card = document.createElement("div")
        card.className = "cardAsesores";
        card.innerHTML = `
                       <h4>Prestamos Personales</h4>
                    <h5 class="card-title">Monto Solicitado $: ${creditosAprovados.importe}</h5>
                    <h5 class="card-title">Pago Mensual $: ${pagoMensual}</h5>
                    <h5>Meses : ${creditosAprovados.meses}</h5>
                    <h5>Total a Pagar $: ${totalaPagar}</h5>
                    <h5>Interés aplicado $: ${(totalaPagar - creditosAprovados.importe)}</h5>
                    <h5>Fecha de Emision : ${creditosAprovados.fecha}</h5>`
        mostrarCOtorgado.appendChild(card)
    })
}

let mostrarsaldocuenta = document.getElementById("mostrarsaldocuenta")
const sumaImportes = creditosAprovados.reduce((acumulado, credito) => {
    return acumulado + Number(credito.importe)
}, 0)
mostrarsaldocuenta.innerHTML = `Su saldo actual es <i class="fa-solid fa-dollar-sign"> ${sumaImportes}</i>`

