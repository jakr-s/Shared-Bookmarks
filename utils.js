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
