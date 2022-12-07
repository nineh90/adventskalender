window.onload = init()

let doorData;

function init(){
    getDatafromJSON()
}

async function getDatafromJSON(){
    let JSON = './assets/json/door.json';
    let responseFromJSON = await fetch(JSON);
    doorData = await responseFromJSON.json();
    console.log(doorData);
    renderDoors();
}

function renderDoors(){
    let doorContainer = document.getElementById('doorContainer');
    doorContainer.innerHTML = ''; 
    for (let i = 0; i < doorData.length; i++) {
        const doorID = doorData[i]['id'];
        const doorDATE = doorData[i]['date'];
        const poem = doorData[i]['img'];
        generatorDoors(doorContainer,doorID,i); 
        console.log(doorID, doorDATE, poem);
    }
    
}

function generatorDoors(doorContainer,doorID,i){
    doorContainer.innerHTML += `<div class="rotate-center" onclick="openDoor(${i})">
                                        <div id="doorNumber-${doorID}">
                                            <div class="door">${doorID}</div>
                                        </div>
                                    </div>`
}

function openDoor(i){
    let doorContent = document.getElementById('doorContainer');
    let poem = doorData[i]['img'];
    let currentID = doorData[i]['id'];
    const CURRENTDATE = new Date();
    if(CURRENTDATE.getDate() + 1  > currentID){
        doorContent.innerHTML = '';
        doorContent.innerHTML = 
            `<div class="img-overlay scale-up-hor-center d-flex align-center justify-center">
                <img class="current-door" src="${poem}">
                <img  onclick="closeCurrentDoor()" class="cross minus" src="./assets/img/cross.png">
            </div>`;
    } else {
            doorContent.innerHTML = '';
            doorContent.innerHTML = 
            `<div class="img-overlay scale-up-hor-center minus d-flex align-center justify-center">
                <p>
                    Wer kann es da nicht abwarten?
                </p >
                <img  onclick="closeCurrentDoor()"  class="cross minus" src="./assets/img/cross.png">
            </div>`
    }

}

function closeCurrentDoor(){
    renderDoors();
}