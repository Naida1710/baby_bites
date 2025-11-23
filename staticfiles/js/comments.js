document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".btn-edit");
  const deleteButtons = document.querySelectorAll(".btn-delete");
  const commentText = document.getElementById("id_body"); // main textarea
  const commentForm = document.getElementById("commentForm");
  const submitButton = document.getElementById("submitButton");

  // -----------------------------
  // ✏️ Edit Comment (inline toggle)
  // -----------------------------
  editButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const commentId = button.dataset.commentId;
      const commentCard = document.getElementById(`comment${commentId}`);
      const commentBody = commentCard.querySelector(".comment-body");
      const slug = commentCard.dataset.slug;

      if (button.innerText === "Edit") {
        // Switch to edit mode
        commentBody.contentEditable = "true";
        commentBody.focus();
        commentBody.style.backgroundColor = "#fff9c4"; // highlight editable
        button.innerText = "Submit";
      } else {
        // Submit updated comment via POST
        const updatedBody = commentBody.innerText.trim();
        if (!updatedBody) {
          alert("Comment cannot be empty.");
          return;
        }

        const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

        try {
          const response = await fetch(`/recipes/${slug}/edit_comment/${commentId}/`, {
            method: "POST",
            headers: {
              "X-CSRFToken": csrftoken,
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ body: updatedBody })
          });

          if (response.ok) {
            commentBody.contentEditable = "false";
            commentBody.style.backgroundColor = "";
            button.innerText = "Edit";
          } else {
            alert("Error updating comment.");
          }
        } catch (err) {
          console.error(err);
          alert("An error occurred while updating the comment.");
        }
      }
    });
  });

  // -----------------------------
  // 📝 Edit Comment via Main Form (optional fallback)
  // -----------------------------
  if (editButtons.length && commentForm && commentText) {
    editButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const commentId = button.dataset.commentId;
        const commentBodyElement = document.querySelector(`#comment${commentId} .comment-body`);
        if (!commentBodyElement) return;

        // Fill main textarea with comment text
        commentText.value = commentBodyElement.innerText.trim();
        commentText.focus();

        // Set form action to the edit URL
        const slug = button.closest(".comment-card").dataset.slug;
        commentForm.setAttribute("action", `/recipes/${slug}/edit_comment/${commentId}/`);
        submitButton.innerText = "Update"; // optional: indicate update mode
      });
    });
  }

  // -----------------------------
  // 🗑️ Delete Comment
  // -----------------------------
  deleteButtons.forEach(button => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const commentId = button.dataset.commentId;
      const slug = button.closest(".comment-card").dataset.slug;

      if (!confirm("Are you sure you want to delete this comment?")) return;

      const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
      const url = `/recipes/${slug}/delete_comment/${commentId}/`;

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
          alert("Failed to delete comment.");
        }
      } catch (err) {
        console.error("Error deleting comment:", err);
        alert("An error occurred while deleting the comment.");
      }
    });
  });
});