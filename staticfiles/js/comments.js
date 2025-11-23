document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.getElementsByClassName("btn-edit");
  const deleteButtons = document.getElementsByClassName("btn-delete");
  const commentText = document.getElementById("id_body");
  const commentForm = document.getElementById("commentForm");
  const submitButton = document.getElementById("submitButton");

  // -----------------------------
  // ✏️ Edit Comment
  // -----------------------------
  if (editButtons.length && commentForm && commentText && submitButton) {
    for (let button of editButtons) {
      button.addEventListener("click", (e) => {
        const commentId = e.target.getAttribute("comment_id");
        const slug = e.target.getAttribute("data-slug");
        const commentContent = document.getElementById(`comment${commentId}`).innerText;

        commentText.value = commentContent;
        submitButton.innerText = "Update";
        commentForm.setAttribute("action", `/recipes/${e.target.dataset.slug}/edit_comment/${commentId}/`);
const url = `/recipes/${slug}/delete_comment/${commentId}/`;

      });
    }
  }

  // -----------------------------
  // 🗑️ Delete Comment
  // -----------------------------
  if (deleteButtons.length) {
    for (let button of deleteButtons) {
      button.addEventListener("click", async (e) => {
        const commentId = e.target.getAttribute("comment_id");
        const slug = e.target.getAttribute("data-slug");

        if (!confirm("Are you sure you want to delete this comment?")) return;

        const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
        const url = `/delete_comment/${slug}/${commentId}/`;

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "X-CSRFToken": csrftoken,
              "X-Requested-With": "XMLHttpRequest"
            }
          });

          const data = await response.json();
          if (data.success) {
            const commentElement = document.getElementById(`comment${commentId}`);
            if (commentElement) commentElement.remove();
          } else {
            console.error(data.error || "Failed to delete comment");
          }
        } catch (err) {
          console.error("Error deleting comment:", err);
        }
      });
    }
  }
});
