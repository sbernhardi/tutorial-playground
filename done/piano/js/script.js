let keyboard = document.querySelector(".piano__keyboard");
let controls = document.querySelectorAll(".piano__control__option");
let pianoNotes = ["C", "D", "E", "F", "G", "A", "B"];

let keyboardMap = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Y", "X", "C", "V", "B", "N"];
let playBtn = document.querySelector(".piano__play-btn");
let tempoSelect = document.querySelector(".piano__tempo");
let songSelect = document.querySelector(".piano__song-list");
let keys = [];

// ### Songs ### 
let happyBirthday = `G4, G4, A4,, G4,, C5,, B4,,,,
                    G4,G4,A4,,G4,,D5,,C5,,,,
                    G4,G4,G5,,E5,,C5,,B4,,A4,,
                    F5,F5,E5,,C5,,D5,,C5`;

let jingleBells = `B3,,B3,,B3,,,,B3,,B3,,B3,,,,
                    B3,,D4,,G3,,,A3,B3,,,,,
                    C4,,C4,,C4,,,C4,C4,,B3,,B3,,
                    B3,B3,B3,,A3,,A3,,B3,,A3,,,,D4`;

let alleMeineEntchen = `C3,,D3,,E3,,F3,,G3,,,,G3,,,,
                    A3,,A3,,A3,,A3,,G3,,,,,,,,
                    A3,,A3,,A3,,A3,,G3,,,,,,,,
                    F3,,F3,,F3,,F3,,E3,,,,E3,,,,
                    G3,,G3,,G3,,G3,,C3`;

let haenschenKlein = `G4,,E4,,E4,,,,F4,,D4,,D4,,,,
                    C4,,D4,,E4,,F4,,G4,,G4,,G4,,,,
                    G4,,E4,,E4,,,,F4,,D4,,D4,,,,
                    C4,,E4,,G4,,G4,,C4,,,,,,,
                    D4,,D4,,D4,,D4,,D4,,E4,,F4,,,,
                    E4,,E4,,E4,,E4,,E4,,F4,,G4,,,,
                    G4,,E4,,E4,,,,F4,,D4,,D4,,,,
                    C4,,E4,,G4,,G4,,C4`;

let bruderJakob = `C3,,D3,,E3,,C3,,C3,,D3,,E3,,C3,,
                    E3,,F3,,G3,,,,E3,,F3,,G3,,,,
                    G3,A3,G3,F3,E3,,C3,,G3,A3,G3,F3,E3,,C3,,
                    C3,,G2,,C3,,,,C3,,G2,,C3`;                    

let playSong = (notesString, tempo, cb) => {
    let notes = notesString.split(",");
    let currentNote = 0;
    let mousedown = new Event("mousedown");
    let mouseup = new Event("mouseup");
    let btn;

    let interval = setInterval(() => {
        if(currentNote < notes.length){
            if(notes[currentNote].trim() !== ""){
                if(btn){
                    btn.dispatchEvent(mouseup);
                }
                btn = document.querySelector(`[data-letter-note = "${notes[currentNote].trim()}"]`);
                btn.dispatchEvent(mousedown);
            }            
            currentNote++;
        } else {
            btn.dispatchEvent(mouseup);
            clearInterval(interval);
            cb();
        }
    }, 300 / tempo);
}

playBtn.addEventListener("mousedown", () => {
    // "+" added to convert string values into number values 
    let tempo = +tempoSelect.value;
    let songNum = +songSelect.value;

    playBtn.disabled = true;

    let enablePlayBtn = () => playBtn.disabled = false;
    switch(songNum){
        case 1 : 
            playSong(jingleBells, tempo, enablePlayBtn); 
            break;
        case 2 : 
            playSong(happyBirthday, tempo, enablePlayBtn); 
            break;
        case 3 : 
            playSong(alleMeineEntchen, tempo, enablePlayBtn); 
            break;
        case 4 : 
            playSong(haenschenKlein, tempo, enablePlayBtn); 
            break;
        case 5 : 
            playSong(bruderJakob, tempo, enablePlayBtn); 
            break;
            
    }
});

let init = () => {
    for(let i = 1; i <= 5; i++){
        for(let j = 0; j < 7; j++){
            let key = createKey("white", pianoNotes[j], i);
            key.dataset.keyboard = keyboardMap[j + (i - 1) * 7];
            keyboard.appendChild(key);
            if(j != 2 && j != 6) {
                key = createKey("black", pianoNotes[j], i);
                key.dataset.keyboard = `⇧+${keyboardMap[j + (i - 1) * 7]}`;
                let emptySpace = document.createElement("div");
                emptySpace.className = "empty-space";
                emptySpace.appendChild(key);
                keyboard.appendChild(emptySpace);
            }
        }
    }
}
let createKey = (type, note, octave) => {
    let key = document.createElement("button");
    key.className = `piano__key piano__key--${type}`;
    key.dataset.letterNote = type === "white" ? note + octave : note + "#" + octave;
    key.dataset.letterNoteFileName = type === "white" ? note + octave : note + "s" + octave;
    key.textContent = key.dataset.letterNote;
    keys.push(key);

    key.addEventListener("mousedown", () =>{
        playSound(key);
        key.classList.add("piano__key--playing");
    });

    key.addEventListener("mouseup", () =>{
        key.classList.remove("piano__key--playing");
    });

    key.addEventListener("mouseleave", () =>{
        key.classList.remove("piano__key--playing");
    });


    return key;
}

let pressKey = (mouseEvent, e) => {
    let lastLetter = e.code.substring(e.code.length-1);

    // Quick Fix für deutsche Tastatur
    if(lastLetter === "Y") lastLetter = "Z";
    else if(lastLetter === "Z") lastLetter = "Y";

    let isShiftPressed = e.shiftKey;
    let selector;
    if(isShiftPressed) selector = `[data-keyboard="⇧+${lastLetter}"]`;
    else selector = `[data-keyboard="${lastLetter}"]`;
    let key = document.querySelector(selector);
    if(key != null) {
        let event = new Event(mouseEvent);
        key.dispatchEvent(event);
    }
}

document.addEventListener("keydown", (e) => {
    if(e.repeat) return;
    pressKey("mousedown", e);    
});

document.addEventListener("keyup", (e) => {
    pressKey("mouseup", e);
});

let playSound = (key) => {
    let audio = document.createElement("audio");
    audio.src = "sounds/" + key.dataset.letterNoteFileName + ".mp3";
    audio.play().then(() => audio.remove());

}

controls.forEach((input) => {
    input.addEventListener("input", () => {
        let value = input.value;
        let type;

        switch(value){
            case "letterNotes": 
                type = "letterNote"; 
                break;
            case "keyboard": 
                type = "keyboard"; 
                break;
            case "none": 
                type = "";
        }
        
        keys.forEach((key) => {
            key.textContent = key.dataset[type];
        })

    })
})




init();