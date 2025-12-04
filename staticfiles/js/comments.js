/* jshint esversion: 6 */
/* jshint esversion: 8 */

document.addEventListener("DOMContentLoaded", () => {

  const editButtons = document.querySelectorAll(".btn-edit-custom");
  const deleteButtons = document.querySelectorAll(".btn-delete");
  const commentText = document.getElementById("id_body");
  const commentForm = document.getElementById("commentForm");
  

  // ---------------------------------------------------
  // ⭐ 1. POST NEW COMMENT WITHOUT PAGE RELOAD (AJAX)
  // ---------------------------------------------------
  if (commentForm) {
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop page reload

      const body = commentText.value.trim();
      if (!body) return alert("Comment cannot be empty.");

      const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

      try {
        const response = await fetch(commentForm.action, {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({ body })
        });

        const data = await response.json();

        if (data.success) {
          // Insert comment into the DOM
          const container = document.querySelector(".comment-grid");
          const newComment = document.createElement("div");

          newComment.id = `comment${data.comment.id}`;
          newComment.className = "comment-card mb-3 p-3 border rounded bg-light";
          newComment.dataset.slug = data.comment.slug;

          newComment.innerHTML = `
            <p class="mb-1"><strong>${data.comment.author}</strong></p>
            <p class="mb-1 comment-body">${data.comment.body}</p>
            <small class="text-muted">${data.comment.created_on}</small>
          `;

          container.prepend(newComment);

          // Clear the input field
          commentText.value = "";

          // Scroll smoothly to the new comment
          newComment.scrollIntoView({ behavior: "smooth", block: "center" });
        }

      } catch (err) {
        console.error("Error posting comment:", err);
        alert("Could not post your comment.");
      }
    });
  }

  // ---------------------------------------------------
  // ✏️ 2. INLINE EDIT COMMENT
  // ---------------------------------------------------
  editButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const commentId = button.dataset.commentId;
      const commentCard = document.getElementById(`comment${commentId}`);
      const commentBody = commentCard.querySelector(".comment-body");
      const editedBadge = commentCard.querySelector(".edited-badge");
      const slug = commentCard.dataset.slug;

      if (button.innerText === "Edit") {
        // Enable editing
        commentBody.contentEditable = "true";
        commentBody.focus();
        commentBody.style.backgroundColor = "#fff9c4";
        button.innerText = "Submit";
      } else {
        // Submit edited comment
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
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ body: updatedBody })
          });

          const data = await response.json();

          if (data.success) {
            // Update the comment text
            commentBody.textContent = data.body;

            // Update or add edited badge
            if (editedBadge) {
              editedBadge.textContent = `(Edited on ${data.edited_on})`;
            } else {
              const span = document.createElement("span");
              span.className = "text-muted small edited-badge";
              span.textContent = `(Edited on ${data.edited_on})`;
              commentBody.insertAdjacentElement("afterend", span);
            }

            // Reset edit mode
            commentBody.contentEditable = "false";
            commentBody.style.backgroundColor = "";
            button.innerText = "Edit";
          } else {
            alert(data.message || "Error updating comment.");
          }
        } catch (err) {
          console.error(err);
          alert("An error occurred while updating the comment.");
        }
      }
    });
  });

  // ---------------------------------------------------
  // 🗑️ 3. DELETE COMMENT VIA AJAX
  // ---------------------------------------------------
  deleteButtons.forEach(button => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!confirm("Delete this comment?")) return;

      const commentId = button.dataset.commentId;
      const slug = button.closest(".comment-card").dataset.slug;

      const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

      try {
        const response = await fetch(`/recipes/${slug}/delete_comment/${commentId}/`, {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "X-Requested-With": "XMLHttpRequest"
          }
        });

        const data = await response.json();

        if (data.success) {
          document.getElementById(`comment${commentId}`).remove();
        }

      } catch (err) {
        console.error("Error deleting comment:", err);
        alert("Could not delete comment.");
      }
    });
  });
  
});

