import assert from "node:assert";
import test from "node:test";
import {
  sanitizeStoredBookmarks,
  sortBookmarksByCreatedAtDesc,
} from "./utils.js";

test("sanitizeStoredBookmarks removes invalid bookmark objects", () => {
  const input = [
    {
      id: "1",
      url: "https://example.com",
      title: "Example",
      description: "Test",
      createdAt: 100,
      likes: 0,
    },
    {
      id: "2",
      url: "",
      title: "Bad",
      description: "Missing URL",
      createdAt: 200,
      likes: 0,
    },
    null,
  ];

  const result = sanitizeStoredBookmarks(input);

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "1");
});

test("sortBookmarksByCreatedAtDesc sorts newest first", () => {
  const bookmarks = [
    {
      id: "old",
      url: "https://old.com",
      title: "Old",
      description: "Old",
      createdAt: 100,
      likes: 1,
    },
    {
      id: "new",
      url: "https://new.com",
      title: "New",
      description: "New",
      createdAt: 300,
      likes: 2,
    },
  ];

  const result = sortBookmarksByCreatedAtDesc(bookmarks);

  assert.deepEqual(
    result.map((bookmark) => bookmark.id),
    ["new", "old"]
  );
});
