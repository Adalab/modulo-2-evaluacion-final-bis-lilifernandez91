'use strict';

//Obtener elementos del html y asignar a la constante
const htmlSection = document.querySelector(".section-main");

let userList = [];

//Cada vez que arranca la página hay que obtener 10 usuarios al azar llamando a esta API
const search = () => {
    fetch(`https://randomuser.me/api/?results=10`)
        .then((response) => response.json())
        .then((data) => {

            //Iterar sobre los valores del array:data.result. Por cada iteración user toma el valor del array que se está iterando.
            for (const user of data.results) {

                //Guardar datos de los usuarios en un array
                const newUser = {
                    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                    picture: user.picture.medium,
                    location: user.location.country,
                    login: user.login.username,
                }

                //Añadir usuarios con el formato nuevo al final del array
                userList.push(newUser);
            }

            //Iterar los valores de userList que tiene el listado de usuarios con el formato nuevo. Por cada iteración usuarioNuevo toma el valor de un usuario con el formato nuevo. Dentro del for of se contsruye el html para un usuario.
            htmlSection.innerHTML = "";

            for (const usuarioNuevo of userList) {
                const html = getHtmlForUsers(usuarioNuevo);
                htmlSection.innerHTML += html;
            }
        });
};

//Función para pintar un usuario
const getHtmlForUsers = (user) => {

    const htmlForUsers = `
        <div class="div-main">
            <img class="image" src="${user.picture}" alt="imagen de ${user.name}">
            <h2 class="name">${user.name}</h2>
            <h3 class="country">${user.location}</h3>
            <h6 class="login">${user.login}</h6>
        </div>
    `;
    return htmlForUsers;
};

search();

// const name = 'Lili';
// const age = 30;
// const isWoman = true;

// const person1 = {
//     name: name,
//     age: age,
//     isWoman: isWoman
// }

// const person2 = {
//     name: 'Dayan',
//     age: 31,
//     isWoman: false,
//     esposa: person1
// }



// const persons = [person1,person2,person1];
// for (const person of persons) {
//     const ageTotal = person.age + suma;
//     console.log(`Hola, soy ${person.name}, y tengo ${ageTotal} años`);
// }

// const x = 4;
// x += 5;
//# sourceMappingURL=main.js.map
