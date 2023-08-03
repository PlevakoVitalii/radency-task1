let activeNotes = [
  {
    id: 1,
    name: 'Shopping list',
    created: '2021-04-20',
    category: 'Task',
    content: "Tomatoes, bread 07/03/2022"
  },
  {
    id: 2,
    name: 'The theory of evolut...',
    created: '2021-04-27',
    category: 'RandomThought',
    content: "The evolution...",
  },
  {
    id: 3,
    name: 'New Feature',
    created: '2021-05-05',
    category: 'Idea',
    content: "Implement new todo 19/09/2016, 19/09/2016",
  },
  {
    id: 4,
    name: 'William Gaddis',
    created: '2021-05-07',
    category: 'RandomThought',
    content: "Power doesn't co...",
  },
  {
    id: 5,
    name: 'Books',
    created: '2021-05-21',
    category: 'Task',
    content: "The Lean Startup",
  },
  {
    id: 6,
    name: 'Open own business',
    created: '2023-07-27',
    category: 'Idea',
    content: "Open IT company 5/8/2023, 31/12/2023",
  },
  {
    id: 7,
    name: 'Learn MERN stack',
    created: '2019-05-03',
    category: 'Task',
    content: "MongoDB, Express, Rect, Node",
  },
  {
    id: 8,
    name: 'Change work',
    created: '2021-11-07',
    category: 'Task',
    content: "Tomatoes, bread",
  },

];
let archivedNotes = [];
let categories = ['Idea', 'Task', 'RandomThought']

const countElements = (arr, category) => {
  return arr.filter(note => note.category === category).length;
}

function findDateInNoteContent(content) {
  let dataRegex = (/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g);
  let dates = content.match(dataRegex);
  if (dates) {
    return dates
  } else {
    dates = []
    return dates
  }

}

showActiveNotesTable()
showInfoTable()

// Render notes

function showActiveNotesTable() {
  try {
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
      } else if (note.category === 'RandomThought') {
        icon = '<i class="bi bi-person"></i>'
      }
      td1.innerHTML = icon;
      tr.appendChild(td1);

      let td2 = document.createElement('td');
      td2.textContent = note.name;
      tr.appendChild(td2);

      let td3 = document.createElement('td');
      let createdDate = new Date(note.created)
      td3.innerHTML = `${createdDate.toLocaleString("en-US", { month: 'long', day: "numeric", year: "numeric" })}`;
      tr.appendChild(td3);

      let td4 = document.createElement('td');
      td4.textContent = note.category;
      tr.appendChild(td4);

      let td5 = document.createElement('td');
      td5.textContent = note.content;
      tr.appendChild(td5);

      let td6 = document.createElement('td');
      let dates = findDateInNoteContent(note.content)
      if (dates.length) {
        td6.textContent = dates.join("\r\n");
      } else {
        td6.innerHTML = '';
      }
      tr.appendChild(td6);

      let td7 = document.createElement('td');
      td7.innerHTML = `<i class="bi bi-pencil-fill"  onclick="updateNote('${note.id}')" ></i>`
      tr.appendChild(td7);

      let td8 = document.createElement('td');
      td8.innerHTML = `<i class="bi bi-file-earmark-arrow-down-fill" id="archive-${note.id}" onclick="archiveNote(${note.id})"></i>`;
      tr.appendChild(td8);

      let td9 = document.createElement('td');
      td9.innerHTML = `<i class="bi bi-trash3-fill" id="delete-${note.id}" onclick="deleteNote(${note.id})"></i>`;
      tr.appendChild(td9);

      bodyNoteTable.appendChild(tr);
    }
  } catch (err) {
    alert(err.message);
  }
}

function showInfoTable() {
  try {
    let countActiveNoteIdea = countElements(activeNotes, 'Idea')
    let countActiveNoteTask = countElements(activeNotes, 'Task')
    let countActiveNoteRandomThought = countElements(activeNotes, 'RandomThought')
    let countArchiveNoteIdea = countElements(archivedNotes, 'Idea')
    let countArchiveNoteTask = countElements(archivedNotes, 'Task')
    let countArchiveNoteRandomThought = countElements(archivedNotes, 'RandomThought')

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
      } else if (category === 'RandomThought') {
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
      } else if (category === 'RandomThought') {
        countActiveNotes = countActiveNoteRandomThought
      }
      td3.textContent = countActiveNotes;
      tr.appendChild(td3);

      let countArchiveNotes;
      if (category === 'Idea') {
        countArchiveNotes = countArchiveNoteIdea
      } else if (category === 'Task') {
        countArchiveNotes = countArchiveNoteTask
      } else if (category === 'RandomThought') {
        countArchiveNotes = countArchiveNoteRandomThought
      }
      let td4 = document.createElement('td');
      td4.innerHTML = `${countArchiveNotes} &nbsp;  &nbsp;
    <button class="btn btn-primary" type="button" >
    <i class="bi bi-eye" onclick="showArchivedNotesTable('${category}')"></i>
  </button>`


      tr.appendChild(td4);

      bodyInfoTable.appendChild(tr);
    }

  } catch (err) {
    alert(err.message);
  }
}

function showArchivedNotesTable(category) {
  try {
    let archivedNotesTable = document.getElementById('archivedNotesTable');
    archivedNotesTable.classList.remove("collapse")
    let bodyArchivedNotesTable = document.getElementById('body-archived-notes-table');
    bodyArchivedNotesTable.innerHTML = '';
    archiveCategoryNotes = archivedNotes.filter(note => note.category == category)
    if (archiveCategoryNotes.length) {
      for (let note of archiveCategoryNotes) {
        let tr = document.createElement('tr');
        tr.classList.add('table-primary');

        let td1 = document.createElement('td');
        let icon;
        if (note.category === 'Idea') {
          icon = '<i class="bi bi-lightbulb"></i>'
        } else if (note.category === 'Task') {
          icon = '<i class="bi bi-cart2"></i>'
        } else if (note.category === 'RandomThought') {
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
        td7.innerHTML = ` <i class="bi bi-file-earmark-arrow-up" onclick="unarchiveNote(${note.id})"></i>`;
        tr.appendChild(td7);

        let td8 = document.createElement('td');
        td8.innerHTML = '';
        tr.appendChild(td8);

        bodyArchivedNotesTable.appendChild(tr);
      }
    } else {
      let tr = document.createElement('tr');
      tr.classList.add('table-primary');

      let td = document.createElement('td');
      td.setAttribute("colspan", "8")
      td.textContent = `Not found archived note with category "${category}"`;
      tr.appendChild(td)

      bodyArchivedNotesTable.appendChild(tr);
    }
  } catch (err) {
    alert(err.message);
  }
}

