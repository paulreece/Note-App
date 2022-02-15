const url = "http://localhost:3000/notes";
const notes = document.getElementById("notes");
const noteForm = document.getElementById("noteForm");
const delNote = document.getElementById("delNote");
const editNote = document.getElementById("editNote");
const noteList = document.getElementById("noteList");
const saveNote = document.getElementById("saveNote");
let deleted = "";
let logged = new Date().toDateString();
console.log(logged);

// const dates = [
//   {
//     id: 1,
//     title: "Sample note",
//     body: "This is the body of my note",
//     date: logged,
//   },
//   {
//     title: "This is one",
//     body: "of my notes",
//     id: 2,
//     date: logged,
//   },
// ];

function listNotes() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let noteObj of data) {
        renderNoteItem(noteObj);
      }
    });
}
noteForm.addEventListener("submit", function () {
  event.preventDefault();
  const titleText = document.getElementById("titleText").value;
  const noteText = document.getElementById("noteText").value;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleText,
      body: noteText,
      date: logged,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      renderNoteItem(data);
    });
});

noteList.addEventListener("click", function (e) {
  radio = e.target.id;
  console.log(radio);
});

delNote.addEventListener("click", function () {
  event.preventDefault();
  fetch(url + "/" + radio, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      deletNoteItem(data);
    });
});

// editNote.addEventListener("click", function () {
//   event.preventDefault();
//   fetch(url + "/" + radio, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//         title: titleText,
//         body: noteText,
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       editNoteItem(data);
//     });
// });

editNote.addEventListener("click", function () {
  document.getElementById(
    radio
  ).childNodes[1].innerHTML = `<input type="text" value ="${
    document.getElementById(radio).childNodes[1].innerHTML
  }">`;
  document.getElementById(
    radio
  ).childNodes[2].innerHTML = `<input type="text" value ="${
    document.getElementById(radio).childNodes[2].innerHTML
  }">`;
});

function renderNoteItem(noteObj) {
  const noteEl = document.createElement("li");
  noteEl.id = noteObj.id;
  noteEl.classList.add("noted");
  noteEl.innerHTML = `<input type="radio" name="note" id="${noteObj.id}" class="radio"><span class="title">${noteObj.title}</span><span class= "body">${noteObj.body}</span><span>${noteObj.date}</span>`;
  noteList.appendChild(noteEl);
}
function deletNoteItem() {
  document.getElementById(radio).remove();
}

listNotes();

saveEdit.addEventListener("click", function () {
  event.preventDefault();
  const titled =
    document.getElementById(radio).childNodes[1].childNodes[0].value;
  const noted =
    document.getElementById(radio).childNodes[2].childNodes[0].value;
  console.log("clicked");
  fetch(url + "/" + radio, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titled,
      body: noted,
      date: logged,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(radio).childNodes[1].innerHTML = titled;
      document.getElementById(radio).childNodes[2].innerHTML = noted;
    });
});
