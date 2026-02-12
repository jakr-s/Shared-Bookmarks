- The website must contain a drop-down which lists five users
  - Tested by loading the page and confirming the user select has five options labeled User 1-5.

- Selecting a user must display the list of bookmarks for the relevant user
  - Tested by selecting User 1 and User 2 in the dropdown and confirming the list changes to the stored bookmarks for each.

- If there are no bookmarks for the selected user, a message is displayed to explain this
  - Tested by selecting a user with no stored bookmarks and confirming the "No bookmarks for this user." message appears.

- The list of bookmarks must be shown in reverse chronological order
  - Unit tests in ./utils.test.js

- Each bookmark has a title, description and created at timestamp displayed
  - Tested by creating a bookmark and confirming all three fields are visible in the list item.

- Each bookmark's title is a link to the bookmark's URL
  - Tested by creating a bookmark and clicking the title to confirm it opens the correct URL in a new tab.

- Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark
  - Tested by clicking the copy button and pasting into a text field to confirm the URL matches.

- Each bookmark's like counter works independently, and persists data across sessions
  - Tested by liking one bookmark twice, another once, reloading the page, and confirming the counts persist and remain distinct.

- The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.
  - Tested by inspecting the form and confirming the three inputs and submit button are present and enabled after user selection.

- Submitting the form adds a new bookmark for the relevant user only
  - Tested by adding a bookmark for User 1, switching to User 2, and confirming it does not appear there.

- After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark
  - Tested by submitting the form and confirming the list updates immediately with the new entry.

- The website must score 100 for accessibility in Lighthouse
  - Tested by running a Lighthouse Accessibility audit in Chrome DevTools and confirming the score is 100.

- Unit tests must be written for at least one non-trivial function
  - Unit tests in ./utils.test.js
