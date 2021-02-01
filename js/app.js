//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listeners
eventListeners();

function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded',()=>{
        
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        
        crearHtml();
        
    });
}

//functiones

function agregarTweet(e){

   e.preventDefault();

    //text area
    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError('El mensaje no puede estar vacío');
        return;
    }
    
    //anadir al arreglo de tweets 
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

    crearHtml();

    formulario.reset();

}

// mostrar error

function mostrarError(error){
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
       mensajeError.remove(); 
    }, 2000);

}

//muestra un listado de los tweets

function crearHtml(){

    limpiarHtml();
    
    if(tweets.length>0){
        
        tweets.forEach(tweet=>{
            
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //anadir la funcion de eliminar
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }

            //crear el html
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);

            //insertar el html 
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//elimianr tweet
function borrarTweet(id){
   tweets = tweets.filter(tweet => tweet.id !==id);
   crearHtml();
}

//limpiar html
function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}