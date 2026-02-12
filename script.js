import { getUserIds, getData, setData, clearData } from "./storage.js";

const userSelect = document.querySelector("#user-select");
const bookmarksList = document.querySelector("#bookmarks-list");
const validationMessage = document.querySelector("#validation-message");
const bookmarkForm = document.querySelector("#bookmark-form");
const bookmarkUrl = document.querySelector("#bookmark-url");
const bookmarkTitle = document.querySelector("#bookmark-title");
const bookmarkDescription = document.querySelector("#bookmark-description");
