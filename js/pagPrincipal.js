const $divTabla = document.getElementById("divTabla");
const listaAnuncios = JSON.parse(localStorage.getItem("listaAnuncios")) || [];
console.log(listaAnuncios);



const crearAnuncio = (data) => {
  const $anuncios = document.getElementById("anuncios");

    data.forEach((element, index) => {
    const $anuncio = document.createElement("anunciox");
    $anuncio.classList.add("anuncioCuerpo");
    const $titulo = document.createElement("h3");
    $titulo.classList.add("anuncioTitulo");
    $titulo.textContent = element.titulo;
    $anuncio.appendChild($titulo);
    const $transaccion = document.createElement("p");
    $transaccion.classList.add("anuncioTextoTransaccion");
    $transaccion.textContent = element.transaccion;
    $anuncio.appendChild($transaccion);
    const $descripcion = document.createElement("p");
    $descripcion.classList.add("anuncioTexto");
    $descripcion.textContent = element.descripcion;
    $anuncio.appendChild($descripcion);
    const $precio = document.createElement("p");
    $precio.classList.add("anuncioPrecio");
    $precio.textContent = "$" + element.precio + ".-";
    $anuncio.appendChild($precio);



    const $ul = document.createElement("ul");
    const $li1 = document.createElement("li");
    const $img1 = document.createElement("img");
    $img1.setAttribute("src", "../images/puertaAnuncio.png");
    $img1.setAttribute("width", "20px");
    $img1.setAttribute("alt", "puertas");
    $img1.classList.add("iconos");
    $li1.appendChild($img1);
    const $span1 = document.createElement("span");
    $span1.classList.add("anuncioIconos");
    $span1.textContent = element.puertas;
    $span1.classList.add("anuncioTextoIcono");
    $li1.appendChild($span1);
    $ul.appendChild($li1);

    const $li2 = document.createElement("li");
    const $img2 = document.createElement("img");
    $img2.setAttribute("src", "../images/kmsAnuncio.png");
    $img2.setAttribute("width", "20px");
    $img2.setAttribute("alt", "km");
    $img2.classList.add("anuncioIconos");
    $li2.appendChild($img2);
    const $span2 = document.createElement("span");
    $span2.classList.add("anuncioIconos");
    $span2.textContent = element.kilometros;
    $span2.classList.add("anuncioTextoIcono");
    $li2.appendChild($span2);
    $ul.appendChild($li2);

    const $li3 = document.createElement("li");
    const $img3 = document.createElement("img");
    $img3.setAttribute("src", "../images/potenciaAnuncio.png");
    $img3.setAttribute("width", "40px");
    $img3.setAttribute("alt", "potencia");
    $img3.classList.add("anuncioIconos");
    $li3.appendChild($img3);
    const $span3 = document.createElement("span");
    $span3.classList.add("anuncioIconos");
    $span3.textContent = element.potencia;
    $span3.classList.add("anuncioTextoIcono");
    $li3.appendChild($span3);
    $ul.appendChild($li3);

    $anuncio.appendChild($ul);

    const $a = document.createElement("a");
    $a.setAttribute("href", "#");
    $a.classList.add("verVehiculo");
    $a.textContent = "Ver Vehiculo";

    $anuncio.appendChild($a);

    $anuncios.appendChild($anuncio);
  });
};

if (listaAnuncios.length != 0) {
    crearAnuncio(listaAnuncios);
  }