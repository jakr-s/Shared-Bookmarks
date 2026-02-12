import { getData, setData } from "./storage.js";

export function sortBookmarksByCreatedAtDesc(bookmarks) {
  return [...bookmarks].sort((a, b) => b.createdAt - a.createdAt);
}

export function sanitizeStoredBookmarks(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter((bookmark) => {
    return (
      bookmark && // Truthy check
      typeof bookmark === "object" &&
      typeof bookmark.id === "string" &&
      typeof bookmark.url === "string" &&
      bookmark.url.trim() !== "" &&
      typeof bookmark.title === "string" &&
      bookmark.title.trim() !== "" &&
      typeof bookmark.description === "string" &&
      bookmark.description.trim() !== "" &&
      typeof bookmark.createdAt === "number" &&
      typeof bookmark.likes === "number"
    );
  });
}

export function readUserBookmarks(userId) {
  return sanitizeStoredBookmarks(getData(userId));
}

export function saveUserBookmarks(userId, bookmarks) {
  setData(userId, bookmarks);
}

export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleString();
}

export function validateFormValues(url, title, description) {
  if (!url || !title || !description) {
    return "URL, title, and description are required.";
  }

  try {
    new URL(url);
  } catch {
    return "Please enter a valid URL.";
  }

  return "";
}

export function createBookmark(url, title, description) {
  return {
    id: crypto.randomUUID(),
    url,
    title,
    description,
    createdAt: Date.now(),
    likes: 0,
  };
}
