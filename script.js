import { getUserIds, getData, setData, clearData } from "./storage.js";

const userSelect = document.querySelector("#user-select");
const bookmarksList = document.querySelector("#bookmarks-list");
const validationMessage = document.querySelector("#validation-message");
const bookmarkForm = document.querySelector("#bookmark-form");
const bookmarkUrl = document.querySelector("#bookmark-url");
const bookmarkTitle = document.querySelector("#bookmark-title");
const bookmarkDescription = document.querySelector("#bookmark-description");
const bookmarkSubmit = document.querySelector("#bookmark-submit");

let selectedUserId = "";

function setStatus(message) {
  validationMessage.textContent = message;
}

function setFormEnabled(isEnabled) {
  bookmarkUrl.disabled = !isEnabled;
  bookmarkTitle.disabled = !isEnabled;
  bookmarkDescription.disabled = !isEnabled;
  bookmarkSubmit.disabled = !isEnabled;
}

function addUserDropdown() {
  const ids = getUserIds();

  ids.forEach((id) => {
    const option = document.createElement("option");

    option.value = id;
    option.textContent = `User ${id}`;

    userSelect.appendChild(option);
  });
}

addUserDropdown();

userSelect.addEventListener("change", (event) => {
  //clearing the UI before anything else
  bookmarksList.innerHTML = "";
  validationMessage.textContent = "";

  const selectedId = event.target.value;

  if (!selectedId) return;

  //fetching data for the new selection.
  const bookmarks = getData(selectedId) || [];

  //validation message to show in the UI

  if (bookmarks.length === 0) {
    validationMessage.textContent = "No bookmarks for this User.";
  } else {
    //Reversing the list so the newest is on top/chronological order.
    const reversedBookmarks = [...bookmarks].reverse(); //creating a new copy to avoid mutating the original data.

    reversedBookmarks.forEach((bookmark) => {
      //creating a list for each bookmark.
      const li = document.createElement("li");

      //formating with the timestamp
      const dateString = new Date(bookmark.timestamp).toLocaleString();

      li.innerHTML = `
          <div>
            <h3>${bookmark.title}</h3>
            <p>${bookmark.description}</p>
            <a href="${bookmark.url}" target="_blank">View Link</a>
            <br>
            <small>Created: ${dateString}</small>
          </div>
        `;
      bookmarksList.appendChild(li);
    });
  }
});
