///////////////////////////Cambio de titulo dinamico///////////////////////////////////////////////////////////////////////////
const tituloDinamico = document.getElementById("tituloUsuario")
const nombreUsuario = JSON.parse(localStorage.getItem("usuario"))
tituloDinamico.innerText = "Bienvenido " + nombreUsuario

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
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
                                            <h2>Simulacion de Prestamo Personal</h2>
                                            <h3 class="card-title">Monto Solicitado $: ${credito.importe}</h3>
                                            <h3 class="card-title">Pago de $: ${credito.importe / credito.meses}</h3>
                                            <h4>Meses : ${credito.meses}</h4>`
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

        this.importe = importe,
            this.meses = meses,
            this.fecha = fecha
    }
}

let cargaImporte = document.getElementById("cargaImporteCargado")
let cargarMeses = document.getElementById("cargaMesesCargado")
let cargarFecha = document.getElementById("cargaFechaCargado")
const creditoSacado = JSON.parse(localStorage.getItem("creditoSacado")) || []
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
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
                                            <h5 class="card-title">Monto Solicitado $: ${creditoA.importe}</h5>
                                        <h5 class="card-title">Pago Mensual $: ${creditoA.importe / creditoA.meses + creditoA.importe / creditoA.meses}</h5>
                                            <h5 class="card-title">Intereses: ${creditoA.importe / creditoA.meses * 21 / 100}% Mensuales</h5>
                                            <h5>Meses : ${creditoA.meses}</h5>
                                            <h5>Fecha de Emision : ${creditoA.fecha}</h5>
                                            `


    const botonBorrar = document.createElement("button")
    botonBorrar.textContent = "Borrar"
    botonBorrar.className = "btn btn-danger btn-s mt-2"
    botonBorrar.onclick = () => {
        // Filtramos el array para quitar este crédito
        const nuevosCreditos = creditosAprovados.filter(c => c.id !== creditoA.id)
        // Guardamos en localStorage
        localStorage.setItem("creditoSacado", JSON.stringify(nuevosCreditos))
        // Recargamos la página para ver cambios
        location.reload()
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
        let card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
                                            <h2>Prestamos Personales</h2>
                                            <h5 class="card-title">Monto Solicitado $: ${creditosAprovados.importe}</h5>
                                        <h5 class="card-title">Pago Mensual $: ${creditosAprovados.importe / creditosAprovados.meses + creditosAprovados.importe / creditosAprovados.meses}</h5>
                                            <h5 class="card-title">Intereses: ${creditosAprovados.importe / creditosAprovados.meses * 21 / 100}% Mensuales</h5>
                                            <h5>Meses : ${creditosAprovados.meses}</h5>
                                            <h5>Fecha de Emision : ${creditosAprovados.fecha}</h5>`
        mostrarCOtorgado.appendChild(card)
    })
}

let mostrarsaldocuenta = document.getElementById("mostrarsaldocuenta")
const sumaImportes = creditosAprovados.reduce((acumulado, credito) => {
    return acumulado + Number(credito.importe)
}, 0)
mostrarsaldocuenta.innerText = "Su saldo actual es " + "$" + sumaImportes