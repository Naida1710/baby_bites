/* jshint esversion: 6 */

const editButtons = document.getElementsByClassName("btn-edit");
const commentText = document.getElementById("id_body");
const commentForm = document.getElementById("commentForm");
const submitButton = document.getElementById("submitButton");
const deleteButtons = document.getElementsByClassName("btn-delete");

// -----------------------------
// ✏️ Edit Comment
// -----------------------------
for (let button of editButtons) {
  button.addEventListener("click", (e) => {
    let commentId = e.target.getAttribute("comment_id");
    let commentContent = document.getElementById(`comment${commentId}`).innerText;
    commentText.value = commentContent;
    submitButton.innerText = "Update";
    commentForm.setAttribute("action", `edit_comment/${commentId}`);
  });
}

// -----------------------------
// 🗑️ Delete Comment via AJAX
// -----------------------------
for (let button of deleteButtons) {
  button.addEventListener("click", async (e) => {
    let commentId = e.target.getAttribute("comment_id");

    if (!confirm("Are you sure you want to delete this comment?")) return;

    const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    const url = `delete_comment/${commentId}`; // your endpoint

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const commentElement = document.getElementById(`comment${commentId}`);
          if (commentElement) commentElement.remove();
        } else {
          console.error("Failed to delete comment");
        }
      } else {
        console.error("Server returned an error");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  });
}
