import { getUserIds } from "./storage.js";
import {
  createBookmark,
  formatDate,
  readUserBookmarks,
  saveUserBookmarks,
  sortBookmarksByCreatedAtDesc,
  validateFormValues,
} from "./utils.js";

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

function createBookmarkListItem(bookmark, userId) {
  const li = document.createElement("li");

  const title = document.createElement("a");
  title.href = bookmark.url;
  title.target = "_blank";
  title.rel = "noreferrer noopener";
  title.textContent = bookmark.title;

  const description = document.createElement("p");
  description.textContent = bookmark.description;

  const createdAt = document.createElement("p");
  createdAt.textContent = `Created: ${formatDate(bookmark.createdAt)}`;

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy URL";
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url);
      setStatus("Copied URL to clipboard.");
    } catch {
      setStatus("Clipboard copy failed.");
    }
  });

  const likeButton = document.createElement("button");
  likeButton.type = "button";
  likeButton.textContent = `Like (${bookmark.likes})`;
  likeButton.addEventListener("click", () => {
    const currentBookmarks = readUserBookmarks(userId);
    const updatedBookmarks = currentBookmarks.map((currentBookmark) => {
      if (currentBookmark.id !== bookmark.id) {
        return currentBookmark;
      }

      return {
        ...currentBookmark,
        likes: currentBookmark.likes + 1,
      };
    });

    saveUserBookmarks(userId, updatedBookmarks);
    renderBookmarks(userId);
  });

  li.appendChild(title);
  li.appendChild(description);
  li.appendChild(createdAt);
  li.appendChild(copyButton);
  li.appendChild(likeButton);

  return li;
}

function renderBookmarks(userId) {
  bookmarksList.innerHTML = "";

  if (!userId) {
    setStatus("Select a user to view bookmarks.");
    return;
  }

  const bookmarks = sortBookmarksByCreatedAtDesc(readUserBookmarks(userId));

  if (bookmarks.length === 0) {
    setStatus("No bookmarks for this user.");
    return;
  }

  setStatus("");

  bookmarks.forEach((bookmark) => {
    bookmarksList.appendChild(createBookmarkListItem(bookmark, userId));
  });
}

addUserDropdown();
setFormEnabled(false);
setStatus("Select a user to view bookmarks.");

userSelect.addEventListener("change", (event) => {
  selectedUserId = event.target.value;
  setFormEnabled(Boolean(selectedUserId));
  renderBookmarks(selectedUserId);
});

bookmarkForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const url = bookmarkUrl.value.trim();
  const title = bookmarkTitle.value.trim();
  const description = bookmarkDescription.value.trim();

  const validationError = validateFormValues(url, title, description);

  if (validationError) {
    setStatus(validationError);
    return;
  }

  const newBookmark = createBookmark(url, title, description);
  const existingBookmarks = readUserBookmarks(selectedUserId);

  saveUserBookmarks(selectedUserId, [...existingBookmarks, newBookmark]);

  bookmarkForm.reset();
  setStatus("Bookmark added.");
  renderBookmarks(selectedUserId);
});
