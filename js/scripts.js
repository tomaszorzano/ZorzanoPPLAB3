import Anuncio_auto from "./Anuncio_auto.js";
const anuncios = JSON.parse(localStorage.getItem("listaAnuncios")) || [];

window.addEventListener("DOMContentLoaded", () => {
    
    document.forms[0].addEventListener("submit", handlerSubmit);
    document.addEventListener("click", handlerClick);
    if (anuncios.length > 0) {
        handlerLoadList(anuncios);
    }
})
function handlerSubmit(e) {
    e.preventDefault();
    const frm = e.target;
    
    if (frm.id.value) 
    {
        const anuncioEditado = new Anuncio_auto( 
            parseInt(frm.id.value), 
            frm.titulo.value, 
            frm.transaccion.value, 
            frm.descripcion.value,
            frm.precio.value, 
            frm.puertas.value,
            frm.kilometros.value,
            frm.potencia.value
            );
        if (confirm("Confirma modificacion?")) {
            agregarSpinner();

            setTimeout(() => {
                modificarAnuncio(anuncioEditado);
                eliminarspinner();
            }, 2000);
        }
    } else 
    {
        console.log("Dando de alta");
        const nuevoAnuncio = new Anuncio_auto(
            Date.now(), 
            frm.titulo.value, 
            frm.transaccion.value, 
            frm.descripcion.value,
            frm.precio.value, 
            frm.puertas.value,
            frm.kilometros.value,
            frm.potencia.value

            );
        agregarSpinner();

        setTimeout(() => {
            altaAnuncio(nuevoAnuncio);
            eliminarspinner();
        }, 2000);
    }

    limpiarForm(e.target);
}

function handlerClick(e) {
    if (e.target.matches("td")) 
    {
        const id = e.target.parentNode.dataset.id;
        console.log(id);
        cargarFrm(id);
    } else if (e.target.matches("#btnEliminar")) 
    {
        let id = parseInt(document.forms[0].id.value);
        if (confirm("Confirma baja?")) {
            agregarSpinner();

            setTimeout(() => {
                let index = anuncios.findIndex((el) => el.id == id);
                anuncios.splice(index, 1);
                almacenaDatos(anuncios);
                eliminarspinner();
            }, 2000);
        }
        limpiarForm(document.forms[0]);
    }else if(e.target.matches("#btnCancelar"))
    {
        limpiarForm(document.forms[0]);
    }
}
function handlerLoadList(e) 
{
    renderizarLista(crearTabla(anuncios), document.getElementById("divLista"));
}
function renderizarLista(lista, contenedor) 
{
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (lista) {
        contenedor.appendChild(lista);
    }
}
function altaAnuncio(a) {
    anuncios.push(a);
    almacenaDatos(anuncios);
}
function modificarAnuncio(a) {
    let index = anuncios.findIndex((anun) => {
        return anun.id == a.id;
    });
    anuncios.splice(index, 1, a);
    almacenaDatos(anuncios);

}
function almacenaDatos(data) 
{
    localStorage.setItem("listaAnuncios", JSON.stringify(data));
    handlerLoadList();
}
function crearTabla(items) {
    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    return tabla;
}

function crearThead(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) 
    {
        if (key !== "id") 
        {
            const th = document.createElement('th');
            th.style.backgroundColor = "Green";
            th.textContent = key;
            tr.appendChild(th);
        }
    }
    thead.appendChild(tr);
    return thead;
}
function crearTbody(items) {
    const tbody = document.createElement('tbody');
    items.forEach(item => {
        const tr = document.createElement('tr');
        for (const key in item) {
            if (key === "id") {
                tr.setAttribute("data-id", item[key])
            }
            else {
                const td = document.createElement('td');
                const texto = document.createTextNode(item[key]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}
function eliminarspinner() {
    document.getElementById("spinner-container").innerHTML = "";
}
function limpiarForm(frm) 
{
    frm.reset();
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnCancelar").classList.add("oculto");
    document.getElementById("btnSubmit").value = "Alta anuncio";
    document.forms[0].id.value="";
}
function cargarFrm(id) {
 
    const { titulo, descripcion, precio, transaccion, kilometros, puertas, potencia } = anuncios.filter( (a) => a.id === parseInt(id))[0];
    const form = document.forms[0];
    form.titulo.value = titulo;
    form.descripcion.value = descripcion;
    form.precio.value = precio;
    form.transaccion.value = transaccion;
    form.kilometros.value = kilometros;
    form.puertas.value = puertas;
    form.potencia.value = potencia;
   
    form.id.value=id;
    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("oculto");
    document.getElementById("btnCancelar").classList.remove("oculto");

}
