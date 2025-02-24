document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("noteInput");
    const saveNote = document.getElementById("saveNote");
    const noteList = document.getElementById("noteList");

    // Load saved notes on popup open
    chrome.storage.local.get({ notes: [] }, function (data) {
        data.notes.forEach((note) => addNoteToList(note));
    });

    // Save note when button is clicked
    saveNote.addEventListener("click", function () {
        let noteText = noteInput.value.trim();
        if (noteText === "") return;

        chrome.storage.local.get({ notes: [] }, function (data) {
            let updatedNotes = [...data.notes, noteText];
            chrome.storage.local.set({ notes: updatedNotes }, function () {
                addNoteToList(noteText);
                noteInput.value = "";
            });
        });
    });

    // Function to add note to the UI
    function addNoteToList(note) {
        let li = document.createElement("li");
        li.textContent = note;
        noteList.appendChild(li);
    }
});
