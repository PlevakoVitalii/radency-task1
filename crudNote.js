
// Create new notes
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
  const newNote = { id, name, created, category, content }
  activeNotes = [...activeNotes, newNote];
  newNotesForm.reset();

  showActiveNotesTable()
  showInfoTable()
});

// Update notes
function updateNote(id) {
  updateNotes = activeNotes.find(note => note.id == id);
  let updateNoteForm = document.getElementById('update-note-form');
  updateNoteForm.classList.remove("collapse")
  updateNoteForm.innerHTML = '';

  let html = "";

  html += `<div class="d-flex justify-content-end">
    <form id="updateNoteForm" class="col-10">

      <label for="name">Name</label>
      <input type="text" class="form-control mb-3" id="update-name" value="${updateNotes.name}">


      <label for="created">Created</label>
      <input type="date" class="form-control mb-3" id="update-created" value="${updateNotes.created}">

      <label class="d-block" for="category">Category</label>
      <select class="form-select mb-3" aria-label="Default select example" id="update-category">
        <option value="Idea" select>Idea</option>
        <option value="Task">Task</option>
        <option value="RandomThought">Random Thought</option>
      </select>

      <label for="content">Content</label>
      <input type="text" class="form-control mb-3" id="update-content" value="${updateNotes.content}">

      <div class="d-flex justify-content-end mb-2">
        <button type="submit" class="btn btn-primary" form="updateNoteForm" id="submit-update-form-btn">Update
          note</button>
      </div>
    </form>
  </div>`;
  updateNoteForm.innerHTML = html;

  updateNoteForm.addEventListener("submit", e => {
    e.preventDefault();
    updateNotes.name = document.getElementById('update-name').value;
    updateNotes.created = document.getElementById('update-created').value;
    updateNotes.category = document.getElementById('update-category').value;
    updateNotes.content = document.getElementById('update-content').value;
    activeNotes = activeNotes.filter(note => note.id != id);
    activeNotes = [...activeNotes, updateNotes];
    newNotesForm.reset();
    updateNoteForm.classList.add("collapse")
    showActiveNotesTable()
    showInfoTable()
  })
}
// Delete notes
function deleteNote(id) {
  if (window.confirm("Are you sure you want to delete this note?")) {
    activeNotes = activeNotes.filter(note => note.id != id);
    showActiveNotesTable();
    showInfoTable();
  }
}

// Archive notes
function archiveNote(id) {
  if (window.confirm("Are you sure you want to archive this note?")) {
    let archivedNote = activeNotes.find(note => note.id == id);
    archivedNotes = [...archivedNotes, archivedNote];
    activeNotes = activeNotes.filter(note => note.id != id);
    showActiveNotesTable(activeNotes);
    showInfoTable();
  }
}

// Unarchive notes
function unarchiveNote(id) {
  if (window.confirm("Are you sure you want to unarchive this note?")) {
    let unarchivedNote = archivedNotes.find(note => note.id == id);
    archivedNotes = archivedNotes.filter(note => note.id != id);
    activeNotes = [...activeNotes, unarchivedNote];
    showArchivedNotesTable(unarchivedNote.category)
    showActiveNotesTable();
    showInfoTable();
  }
}
