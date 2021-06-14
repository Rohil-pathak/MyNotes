console.log('welcome');
showNotes();
// If user adds a note, Add it to localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    //now notesObj will be an array of objects(not strings)
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //localstorage me arrays ko stringify krke hi dalte hen
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
})
//function to show elements by reading from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
          <div class="noteCards my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>`;

        //  yaha hamne button ki id me index use kiya he taki us particular note card ka index function argument k through function ko pass kar den
    });
    // adding above html in innerHTML of div with id="notes"
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add Notes`;
    }
}

// function to delete a note
function deleteNote(index) {
    //to update localstorage again after deleting 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //updating array(index se 1 position tk splice karenge)
    notesObj.splice(index, 1);
    //updating localstorage again
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //again calling shownote() to get updated notes
    showNotes();
}

//searchin notes

let searchTxt = document.getElementById('searchTxt');
//"input" event fires everytime we give any input ietype anything
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value.toLowerCase();
    //selecting all elements with calls name "noteCard". these will be selected as HTML collection
    let noteCards = document.getElementsByClassName("noteCards");
    Array.from(noteCards).forEach(function(element) {
        // yahan [0] lagana padega for 1st 'p' tag
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})