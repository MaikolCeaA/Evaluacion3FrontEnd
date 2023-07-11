let url = "https://restcountries.com/v3.1/lang/spanish";
let array = [];
function mostrarTodo() {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(item) {
      console.log(item);
      array = item.slice(0, 5);//mostramos solo 5 datos de la api
      actualizarTablaHtml();
      console.table(array);
    })
    .catch(function(error) {
      console.log(error);
    });
}

let pais = document.getElementById('pais');
let capital = document.getElementById('capital');
let subregion = document.getElementById('subregion');
let population = document.getElementById('population');

//validadores
function validarPais() {
  let regex = /^[A-Za-z]+$/;
  let validPais = document.getElementById('validPais');
  if (!regex.test(pais.value)) {
    validPais.style.display = "block";
    validPais.innerText = "Ingrese solo letras";
    validPais.className = "text-danger";

    pais.className = "form-control border-input-error";
    return false;
  }
  pais.className = "form-control border-input-ok";
  validPais.style.display = "none";
  return true;
}

function validarCapital() {
  const regex = /^[A-Za-z]+$/;
  let validCapital = document.getElementById("validCapital");
  if (!regex.test(capital.value)) {
    validCapital.innerText = "Ingrese solo letras";
    validCapital.style.display = "block";
    validCapital.className = "text-danger";

    capital.className = "form-control border-input-error";
    return false;
  }
  validCapital.style.display = "none";
  capital.className = "form-control border-input-ok";
  return true;
}

function validarSubregion() {
  let regex = /^[A-Za-z]+$/;
  let validSubregion = document.getElementById('validSubregion');
  if (!regex.test(subregion.value)) {
    validSubregion.style.display = "block";
    validSubregion.innerText = "Ingrese solo letras";
    validSubregion.className = "text-danger";

    subregion.className = "form-control border-input-error";
    return false;
  }
  subregion.className = "form-control border-input-ok";
  validSubregion.style.display = "none";
  return true;
}

function validarPoblacion() {
  let validPoblacion = document.getElementById("validPoblacion");
  if (isNaN(population.value)) {
    validPoblacion.style.display = "block";
    validPoblacion.innerText = "Ingrese solo números";
    validPoblacion.className = "text-danger";

    population.className = "form-control border-input-error";
    return false;
  }
  population.className = "form-control border-input-ok";
  validPoblacion.style.display = "none";
  return true;
}
//ejecutamos los validadores
pais.addEventListener('input', validarPais);
capital.addEventListener('input', validarCapital);
subregion.addEventListener('input', validarSubregion);
population.addEventListener('input', validarPoblacion);
//Leemos lo que tenemos en el formulario
function leerInputForm() {
  let valid1 = validarPais();
  let valid2 = validarCapital();
  let valid3 = validarSubregion();
  let valid4 = validarPoblacion();
  if (valid1 && valid2 && valid3 && valid4) {
    let objeto = {
      "pais": pais.value,
      "capital": capital.value,
      "subregion": subregion.value,
      "population": population.value
    };
    array.push(objeto);
    actualizarTablaHtml();
    console.table(array);
  }
}

//agregamos lo que tenemos en el formulario
function actualizarTablaHtml() {
  let data = document.getElementById("data");
  data.innerHTML = '';
  
  array.forEach((element, index) => {
    if(index<5){
        let fila = document.createElement("tr");
    let columnaPais = document.createElement("td");
    columnaPais.textContent = element.name.common;
    fila.appendChild(columnaPais);

    let columnaCapital = document.createElement("td");
    columnaCapital.textContent = element.capital;
    fila.appendChild(columnaCapital);

    let columnaSubregion = document.createElement("td");
    columnaSubregion.textContent = element.subregion;
    fila.appendChild(columnaSubregion);

    let columnaPoblacion = document.createElement("td");
    columnaPoblacion.textContent = element.population;
    fila.appendChild(columnaPoblacion);

    let columnaEliminar = document.createElement("td");
    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn btn-danger me-2";
    btnEliminar.addEventListener("click", function() {
      eliminar(index);
    });
    columnaEliminar.appendChild(btnEliminar);
    fila.appendChild(columnaEliminar);

    data.appendChild(fila);
    }
    else{
        let fila = document.createElement("tr");
        let columnaPais = document.createElement("td");
        columnaPais.textContent = element.pais;
        fila.appendChild(columnaPais);

        let columnaCapital = document.createElement("td");
        columnaCapital.textContent = element.capital;
        fila.appendChild(columnaCapital);

        let columnaSubregion = document.createElement("td");
        columnaSubregion.textContent = element.subregion;
        fila.appendChild(columnaSubregion);

        let columnaPoblacion = document.createElement("td");
        columnaPoblacion.textContent = element.population;
        fila.appendChild(columnaPoblacion);

        let columnaEliminar = document.createElement("td");
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger me-2";
        btnEliminar.addEventListener("click", function() {
        eliminar(index);
        });
        columnaEliminar.appendChild(btnEliminar);
        fila.appendChild(columnaEliminar);

         data.appendChild(fila);
    }
  });
}
//funcion para eliminar columna
function eliminar(index) {
  array.splice(index, 1);
  actualizarTablaHtml();
}