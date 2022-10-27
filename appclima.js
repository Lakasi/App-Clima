const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const nameCity = document.querySelector("#city");
const nameCountry = document.querySelector("#country");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(nameCity.value == "" || nameCountry.value == ""){
        showError("Todos los campos son obligatorios");
        return;
    }
    callAPI(nameCity.value, nameCountry.value);
})

function callAPI(city, country){
    const apiID = "e5123b6fa276cc16cc7b7de22e70c9af";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiID}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if(dataJSON.cod == "404"){
                showError("Ciudad no encontrada...");
            }
            else{
                clearHTML();
                showWeather(dataJSON);
            }
            console.log(dataJSON)
        })
        .catch(error => {
            console.log(error)
        })
}

function showWeather(data){
    const {name, main:{temp,temp_min,temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentrigrades(temp);
    const min = kelvinToCentrigrades(temp_min);
    const max = kelvinToCentrigrades(temp_max);

    const content = document.createElement("div");
    content.innerHTML = `
        <h4>Clima de ${name}</h4>
        <img scr="http://openweathermap.org/img/wn/10d@2x.png">
        <h2>${degrees}°C</h2>
        <p>Min: ${min}°C</p>
        <p>Max: ${max}°C</p>
    `;

    result.appendChild(content);
    
}

function showError(message){
    console.log(message);
    const alert = document.createElement("p");
    alert.classList.add("alert-message");
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000)
}

function kelvinToCentrigrades(temp){
    return parseInt(temp-273.15);
}

function clearHTML(){
    result.innerHTML = "";
}