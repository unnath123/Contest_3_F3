const ApiKey = 'zF6PgBpFr791XyFAFPcdcjTvKlAviwWbgvuhUJQF'
// const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`
const Container1 = document.getElementById("cont-block1");
const submitbtn = document.getElementById("submtbtn");
const searchInput = document.getElementById("search-input");
let historyArray = [];
const listDiv = document.getElementById("search-history");



function addSearchToHistory(){
    listDiv.innerHTML=''
    historyArray.forEach((ele)=>{
        let listElement = document.createElement("li");
        
        listElement.innerText = ele
        listDiv.append(listElement)
        listElement.onclick = function(event){
            let currentDate = event.target.innerText
            console.log(event.target.innerText)
            getImageOfTheDay(event.target.innerText)
        }
    })
 
}

function saveSearch(){
    localStorage.setItem("searches",JSON.stringify(historyArray))
    console.log(JSON.parse(localStorage.getItem("searches")))
}

function renderUI(arr){
    // console.log(arr);
    Container1.innerHTML = ''
    historyArray.push(arr.date)
    saveSearch();

    let Nasa_container = document.createElement("div");
    Nasa_container.className = "Container1";

    Nasa_container.innerHTML = `
            <div class="HeadTitle"><h1 id="Container-title">Picture on: ${arr.date}</h1></div>
            <div class="image">
                <img src=${arr.hdurl} id="cont-image" alt="NASA">
            </div>
            <div class="DescTitle"><h3 id="Desc-title">${arr.title}</h3></div>
            <p class="description" id="explanation">${arr.explanation}</p>`
            Container1.append(Nasa_container)
}



function getImageOfTheDay(currentDate){
    const url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${ApiKey}`
        let promise = fetch(url)
        promise
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            // console.log(response)
            renderUI(response);
            addSearchToHistory()
        })
        .catch((e)=>{
            console.log("something went wrong "+e)
        })
}

submitbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    //console.log(searchInput.value)
    let currentDate = searchInput.value;
    getImageOfTheDay(currentDate);
    
})

document.getElementById("item").addEventListener("click",(event)=>{
    let currentDate = event.target.innerText
        console.log(event.target.innerText)
        getImageOfTheDay(event.target.innerText)
    })
// window.onload = function getCurrentImageOfTheDay(){
//     const currentDate = new Date().toISOString().split("T")[0]; 
//     const url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${ApiKey}`
//     let promise = fetch(url)
//     promise
//     .then((data)=>{
//         return data.json();
//     })
//     .then((response)=>{
//         // console.log(response)
//         renderUI(response);
//     })
//     .catch((e)=>{
//         console.log("something went wrong "+e)
//     })
// }