'use strict';

//6- Obtener elementos del html y asignar a la constante
const htmlSection = document.querySelector(".section-main");

//4- variable que puedo cambiar su valor
let userList = [];

//1- Cada vez que arranca la página hay que obtener 10 usuarios al azar llamando a esta API
const search = () => {
    fetch(`https://randomuser.me/api/?results=10`)
        .then((response) => response.json())
        .then((data) => {

            //2- Iterar sobre los valores del array:data.result. Por cada iteración user toma el valor del array que se está iterando.
            for (const user of data.results) {

                //3- Crear un usuario nuevo con las propiedades requeridas y guardarlas en el objeto
                const newUser = {
                    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                    picture: user.picture.medium,
                    location: user.location.country,
                    login: user.login.username,
                    isFriend: false,
                    id: user.email,
                }

                //5- Añadir usuarios con el formato nuevo al final del array userList
                userList.push(newUser);
            }
    
            renderHtml();

            assignEvents();

        });
    };
       
//8- Función para pintar un usuario
const getHtmlForUsers = (user) => {

    const htmlForUsers = `
        <div id="${user.id}" class="div-main ${user.isFriend === true ? 'is-friend' : ''}">
            <img class="image" src="${user.picture}" alt="imagen de ${user.name}">
            <h2 class="name">${user.name}</h2>
            <h3 class="country">${user.location}</h3>
            <h6 class="login">${user.login}</h6>
        </div>
    `;
    return htmlForUsers;
};

//7- Iterar los valores de userList que tiene el listado de usuarios con el formato nuevo. Por cada iteración usuarioNuevo toma el valor de un usuario con el formato nuevo. Dentro del for of se construye el html para un usuario.
const renderHtml = () =>{
    htmlSection.innerHTML = ''

    for (const userNewFormat of userList) {
        const html = getHtmlForUsers(userNewFormat);
        htmlSection.innerHTML += html;
    }
}

const assignEvents = () =>{
    for (const userNewFormat of userList) {
        const userDiv = document.getElementById(userNewFormat.id)
        userDiv.addEventListener('click', handleFavorite)
    }
}

search();

const handleFavorite = (event) => {
    event.preventDefault()
    const id = event.currentTarget.id
    
    for (const user of userList) {
        if(user.id === id){
            user.isFriend = !user.isFriend //Lo contrario de lo que estaba anteriormente.
        }
    }
    renderHtml()
    assignEvents();
}




