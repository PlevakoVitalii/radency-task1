let activeNotes = [
  {
    id: 1,
    name: 'Shopping list',
    created: 'April 20, 2021',
    category: 'Task',
    content: "Tomatoes, bread",
    dates: '',
  },
  {
    id: 2,
    name: 'The theory of evolut...',
    created: 'April 27, 2021',
    category: 'Random Thought',
    content: "The evolution...",
    dates: '',
  },
  {
    id: 3,
    name: 'New Feature',
    created: 'May 05, 2021',
    category: 'Idea',
    content: "Implement new...",
    dates: '3/5/2021, 5/5/2021',
  },
  {
    id: 4,
    name: 'William Gaddis',
    created: 'May 07, 2021',
    category: 'Random Thought',
    content: "Power doesn't co...",
    dates: '',
  },
  {
    id: 5,
    name: 'Books',
    created: 'May 15, 2021',
    category: 'Task',
    content: "The Lean Startup",
    dates: '',
  },
  {
    id: 6,
    name: 'Open own business',
    created: 'July 27, 2023',
    category: 'Idea',
    content: "Open IT company",
    dates: '5/8/2023, 31/12/2023',
  },
  {
    id: 7,
    name: 'Learn MERN stack',
    created: 'May 03, 2019',
    category: 'Task',
    content: "MongoDB, Express, Rect, Node",
    dates: '15/8/2023',
  },
  {
    id: 8,
    name: 'Change work',
    created: 'May 03, 2021',
    category: 'Task',
    content: "Tomatoes, bread",
    dates: '15/8/2023',
  },

];

let archivedNotes = [];

let categories = ['Idea', 'Task', 'Random Thought']

let countActiveNoteIdea;
let countActiveNoteTask;
let countActiveNoteRandomThought;

let countArchiveNoteIdea;
let countArchiveNoteTask;
let countArchiveNoteRandomThought;

const countElements = (arr, category) => {
  return arr.filter(note => note.category === category).length;
}



showNotesTable()
showInfoTable()
// Display notes


function showNotesTable() {
  let bodyNoteTable = document.getElementById('body-note-table');
  bodyNoteTable.innerHTML = '';
  for (let note of activeNotes) {
    let tr = document.createElement('tr');
    tr.classList.add('table-primary');

    let td1 = document.createElement('td');
    let icon;
    if (note.category === 'Idea') {
      icon = '<i class="bi bi-lightbulb"></i>'
    } else if (note.category === 'Task') {
      icon = '<i class="bi bi-cart2"></i>'
    } else if (note.category === 'Random Thought') {
      icon = '<i class="bi bi-person"></i>'
    }
    td1.innerHTML = icon;
    tr.appendChild(td1);

    let td2 = document.createElement('td');
    td2.textContent = note.name;
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    td3.textContent = note.created;
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    td4.textContent = note.category;
    tr.appendChild(td4);

    let td5 = document.createElement('td');
    td5.textContent = note.content;
    tr.appendChild(td5);

    let td6 = document.createElement('td');
    td6.textContent = note.dates;
    tr.appendChild(td6);

    let td7 = document.createElement('td');
    td7.innerHTML = `<i class="bi bi-pencil-fill"></i>`
    tr.appendChild(td7);

    let td8 = document.createElement('td');
    td8.innerHTML = `<i class="bi bi-file-earmark-arrow-down-fill" id="archive-${note.id}" onclick="archiveNote(${note.id})"></i>`;
    tr.appendChild(td8);

    let td9 = document.createElement('td');
    td9.innerHTML = `<i class="bi bi-trash3-fill" id="delete-${note.id}" onclick="deleteNote(${note.id})""></i>`;
    tr.appendChild(td9);

    bodyNoteTable.appendChild(tr);
  }
}

function showInfoTable() {

  countActiveNoteIdea = countElements(activeNotes, 'Idea')
  countActiveNoteTask = countElements(activeNotes, 'Task')
  countActiveNoteRandomThought = countElements(activeNotes, 'Random Thought')
  countArchiveNoteIdea = countElements(archivedNotes, 'Idea')
  countArchiveNoteTask = countElements(archivedNotes, 'Task')
  countArchiveNoteRandomThought = countElements(archivedNotes, 'Random Thought')

  let bodyInfoTable = document.getElementById('body-info-table');
  bodyInfoTable.innerHTML = '';
  for (let category of categories) {
    let tr = document.createElement('tr');
    tr.classList.add('table-primary');

    let td1 = document.createElement('td');
    let icon;
    if (category === 'Idea') {
      icon = '<i class="bi bi-lightbulb"></i>'
    } else if (category === 'Task') {
      icon = '<i class="bi bi-cart2"></i>'
    } else if (category === 'Random Thought') {
      icon = '<i class="bi bi-person"></i>'
    }
    td1.innerHTML = icon;
    tr.appendChild(td1);

    let td2 = document.createElement('td');
    td2.textContent = category;
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    let countActiveNotes;
    if (category === 'Idea') {
      countActiveNotes = countActiveNoteIdea
    } else if (category === 'Task') {
      countActiveNotes = countActiveNoteTask
    } else if (category === 'Random Thought') {
      countActiveNotes = countActiveNoteRandomThought
    }
    td3.textContent = countActiveNotes;
    tr.appendChild(td3);

    let countArchiveNotes;
    if (category === 'Idea') {
      countArchiveNotes = countArchiveNoteIdea
    } else if (category === 'Task') {
      countArchiveNotes = countArchiveNoteTask
    } else if (category === 'Random Thought') {
      countArchiveNotes = countArchiveNoteRandomThought
    }
    let td4 = document.createElement('td');
    td4.textContent = countArchiveNotes;
    tr.appendChild(td4);

    bodyInfoTable.appendChild(tr);
  }
}

// Create notes
const openCloseFormBtn = document.getElementById("open-close-form-btn");
openCloseFormBtn.addEventListener("click",
  () => {
    openCloseFormBtn.innerText == "Create note" ?
      openCloseFormBtn.innerText = "Close form" :
      openCloseFormBtn.innerText = "Create note"
  }
);

const newNotesForm = document.getElementById("newNotesForm");
newNotesForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = activeNotes.length + 1;
  const name = document.getElementById('name').value;
  const created = document.getElementById('created').value;
  const category = document.getElementById('category').value;
  const content = document.getElementById('content').value;
  const dates = document.getElementById('dates').value;
  const newNote = { id, name, created, category, content, dates }
  activeNotes = [...activeNotes, newNote];
  newNotesForm.reset();

  showNotesTable()
  showInfoTable()
});

// Update notes


// Delete notes
function deleteNote(id) {
  if (window.confirm("Are you sure you want to delete this note?")) {
    activeNotes = activeNotes.filter(note => note.id != id);
    showNotesTable();
    showInfoTable();
  }
}

// Archive notes
function archiveNote(id) {
  if (window.confirm("Are you sure you want to archive this note?")) {
    let archivedNote = activeNotes.find(note => note.id == id);
    archivedNotes = [...archivedNotes, archivedNote];
    activeNotes = activeNotes.filter(note => note.id != id);
    showNotesTable();
    showInfoTable();
  }
}

// Unarchive notes
function unarchive(id) {
  if (window.confirm("Are you sure you want to unarchive this note?")) {
    let unarchivedNote = archivedNotes.find(note => note.id == id);
    archivedNotes = archivedNotes.filter(note => note.id != id);
    activeNotes = [...activeNotes, archivedNote];
    showNotesTable();
    showInfoTable();
  }
}

