const getReplies = (replies, currentUser) => {
  let output = "";
  replies.forEach((reply) => {
    output += `${
      currentUser.username == reply.user.username
        ? `
        <div class="reply-comment">
            <div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span id="number-upvotes"><b>${reply.score}</b></span>
                <button id="down-vote">
                <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="${reply.user.image.png}" alt="User Img" class="user-img">
                    <span id="user-name"><b>${reply.user.username}</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">${reply.createdAt}</p>
                    <button id="delete">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                    <i class="bi bi-pencil-fill" id="edit"> Edit</i>
                </div>
                <p id="user-comment">
                    <b style="color: hsl(238, 40%, 52%);">@${reply.replyingTo}</b> ${reply.content}
                </p>
            </div>
        </div>`
        : `<div class="reply-comment" style="margin-left: 75px;width:40%">
            <div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span id="number-upvotes"><b>${reply.score}</b></span>
                <button id="down-vote">
                    <i class="bi bi-dash"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="${reply.user.image.png} "alt="User Img" class="user-img">
                    <span id="user-name"><b>${reply.user.username}</b></span>
                    <p id="time-comment">${reply.createdAt}</p>
                    <button id="reply">
                        <i class="bi bi-reply-fill"></i> Reply
                    </button>
                </div>
                <p id="user-comment">
                <b style="color: hsl(238, 40%, 52%);">@${reply.replyingTo}</b> ${reply.content}
                </p>
            </div>
        </div>`
    }
    `;
  });
  return output;
};

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const voteComment = () => {
  const upBtn = document.querySelectorAll("#up-vote");
  const downBtn = document.querySelectorAll("#down-vote");
  upBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const voteContainer = e.target.parentElement.parentElement;
      let votes = +voteContainer.children[1].textContent;
      votes++;
      voteContainer.children[1].innerHTML = `<b>${votes}</b>`;
      voteContainer.children[0].setAttribute("disabled", true);
      voteContainer.children[2].removeAttribute("disabled");
    });
  });

  downBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const voteContainer = e.target.parentElement.parentElement;
      let votes = +voteContainer.children[1].textContent;
      votes--;
      voteContainer.children[1].innerHTML = `<b>${votes}</b>`;
      voteContainer.children[2].setAttribute("disabled", true);
      voteContainer.children[0].removeAttribute("disabled");
    });
  });
};

const replyToComment = () => {
  const replyImg = document.querySelectorAll("#reply");
  replyImg.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.setAttribute("disabled", "disabled");
      const commentContainer =
        e.target.parentElement.parentElement.parentElement;
      console.log(commentContainer);
      let output = `
            <img src="../images/avatars/image-juliusomo.png" alt="User Img">
            <textarea placeholder="Add a comment.." id="comment" cols="30" rows="5" style="width: 400px;"></textarea>
            <button id="post-btn">Reply</button>`;
      const div = document.createElement("div");
      div.classList.add("add-comment-container");
      div.innerHTML = output;
      insertAfter(div, commentContainer);
      const inputField = commentContainer.nextElementSibling.children[1];
      const username = `@${commentContainer.children[1].children[0].children[1].textContent}`;
      inputField.value = username;
      const replyBtn = commentContainer.nextElementSibling.children[2];
      replyBtn.addEventListener("click", (e) => {
        const addCommentContainer = e.target.parentElement;
        const textareaContainer = addCommentContainer.children[1];
        let output = "";
        output += `
            <div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span id="number-upvotes"><b>0</b></span>
                <button id="down-vote">
                <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                    <button id="delete">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                    <i class="bi bi-pencil-fill" id="edit"> Edit</i>
                </div>
                <p id="user-comment">
                    ${textareaContainer.value}
                </p>
        </div>`;
        commentContainer.nextElementSibling.style.display = "none";
        var doc = document.createElement("div");
        doc.classList.add("reply-comment");
        doc.innerHTML = output;
        insertAfter(doc, commentContainer);
        deleteComment();
        editComment();
        btn.removeAttribute("disabled");
      });
    });
  });
};

const postComment = () => {
  const sendBtn = document.getElementById("post-btn-me");
  sendBtn.addEventListener("click", (e) => {
    const addCommentContainer = e.target.parentElement;
    const textareaContainer = addCommentContainer.children[1];
    if (textareaContainer.value == "") {
      return;
    } else {
      let output = `<div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span id="number-upvotes"><b>0</b></span>
                <button id="down-vote">
                <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                    <button id="delete">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                        <i class="bi bi-pencil-fill" id="edit"> Edit</i>
                </div>
                <p id="user-comment">
                    ${textareaContainer.value}
                </p>
        </div>`;
      var doc = document.createElement("div");
      doc.classList.add("comment");
      doc.innerHTML = output;
      document
        .querySelector("main")
        .insertBefore(doc, document.querySelector("main").firstElementChild);
      deleteComment();
      editComment();
      /*       const local = JSON.parse(localStorage.getItem("data"));
      postDatas.content = textareaContainer.value;
      local.comments.push(postDatas);
      localStorage.setItem("data", JSON.stringify(local)); */
      textareaContainer.value = "";
    }
  });
};

const deleteComment = () => {
  const deleteBtn = document.querySelectorAll("#delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = document.querySelector(".modal");
      document.querySelector("main").classList.add("blur");
      modal.style.display = "block";
      const deleteContainer =
        e.target.parentElement.parentElement.parentElement;
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) {
          deleteContainer.remove();
          modal.style.display = "none";
          document.querySelector("main").classList.remove("blur");
        } else if (e.target.classList.contains("cancel-del")) {
          modal.style.display = "none";
          document.querySelector("main").classList.remove("blur");
        }
      });
    });
  });
};

const editComment = () => {
  const editBtn = document.querySelectorAll("#edit");
  editBtn.forEach((btn) => {
    deleteComment();
    btn.addEventListener("click", (e) => {
      const commentContainer =
        e.target.parentElement.parentElement.parentElement;
      commentContainer.innerHTML = `<div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span id="number-upvotes"><b>0</b></span>
                <button id="down-vote">
                <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                    <button id="delete">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                        <i class="bi bi-pencil-fill" id="edit"> Edit</i>
                </div>
                <textarea placeholder="Add a comment.." id="comment" cols="30" rows="5" style="width:480px"></textarea>
                <button id="update-btn">Update</button>
        </div>`;
      const updateBtn = commentContainer.children[1].children[2];
      updateBtn.addEventListener("click", (e) => {
        const textareaContainer = e.target.parentElement.children[1];
        commentContainer.innerHTML = `<div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span id="number-upvotes"><b>0</b></span>
                <button id="down-vote">
                <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                    <button id="delete">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                    <i class="bi bi-pencil-fill" id="edit"> Edit</i>
                </div>
                <p id="user-comment">
                   ${textareaContainer.value}
                </p>
            </div>`;
        deleteComment();
      });
    });
  });
};

const getData = async () => {
  const res = await fetch("data.json");
  const data = await res.json();
  const comments = data.comments;
  const currentUser = data.currentUser;
  let output = "";
  for (i = 0; i < comments.length; i++) {
    output += `
    <div class="comment">
            <div class="votes-container">
                <button id="up-vote">
                    <i class="bi bi-plus-lg"></i>
                </button>
                <span class="number-upvotes"><b>${comments[i].score}</b></span>
                <button id="down-vote">
                    <i class="bi bi-dash"></i>
                </button>
            </div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="${
                      comments[i].user.image.png
                    }" alt="User Img" class="user-img">
                    <span id="user-name"><b>${
                      comments[i].user.username
                    }</b></span>
                    <p id="time-comment">${comments[i].createdAt}</p>
                    <button id="reply">
                        <i class="bi bi-reply-fill"></i> Reply
                    </button>
                </div>
                <p id="user-comment">
                    ${comments[i].content}
                </p>
            </div>
        </div>
        ${
          comments[i].replies.length > 0
            ? getReplies(comments[i].replies, currentUser)
            : ""
        }`;
  }
  output += `<div class="add-comment-container">
            <img src=".${currentUser.image.png}" alt="User Img">
            <textarea placeholder="Add a comment..." id="comment" cols="30" rows="5"></textarea>
            <button id="post-btn-me">Send</button>
        </div>`;
  document.querySelector(".comments-container").innerHTML = output;
  deleteComment();
  postComment();
  replyToComment();
  voteComment();
  editComment();
};

const postCommentM = () => {
  const sendBtn = document.getElementById("post-btn-me");
  sendBtn.addEventListener("click", (e) => {
    const addCommentContainer = e.target.parentElement.parentElement;
    const textareaContainer = addCommentContainer.children[0];
    if (textareaContainer.value == "") {
      return;
    } else {
      let output = `
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                </div>
                <p id="user-comment">
                    ${textareaContainer.value}
                </p>
                </div>
                <div class="buttons">
                <div class="votes-container">
               
                    <i class="bi bi-plus-lg" id="up-vote"></i>
                
                <span id="number-upvotes"><b>0</b></span>
              
                <i class="bi bi-dash-lg" id="down-vote"></i>
                
                </div>
                        <button id="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                    <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6" />
                </svg> Edit
            </button>
            <button id="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14">
                            <path
                                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                fill="#ED6368" />
                        </svg> Delete
                    </button>
            </div>
        </div>`;
      var doc = document.createElement("div");
      doc.classList.add("comment");
      doc.innerHTML = output;
      document
        .querySelector(".mobile")
        .insertBefore(doc, document.querySelector(".mobile").firstElementChild);
      textareaContainer.value = "";
      editCommentM();
      deleteCommentM();
    }
  });
};

const replyToCommentM = () => {
  const replyImg = document.querySelectorAll("#reply");
  replyImg.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.setAttribute("disabled", "disabled");
      const commentContainer =
        e.target.parentElement.parentElement.parentElement;
      console.log(commentContainer);
      let output = `
            <img src="../images/avatars/image-juliusomo.png" alt="User Img">
            <textarea placeholder="Add a comment.." id="comment" cols="30" rows="5" style="width: 400px;"></textarea>
            <button id="post-btn">Reply</button>`;
      const div = document.createElement("div");
      div.classList.add("add-comment-container");
      div.innerHTML = output;
      insertAfter(div, commentContainer);
      console.log(commentContainer.nextElementSibling);
      const inputField = commentContainer.nextElementSibling.children[1];
      const username = `@${
        commentContainer.children[0].classList.contains("border-left")
          ? commentContainer.children[1].children[0].children[1].textContent
          : commentContainer.children[0].children[0].children[1].textContent
      }`;
      inputField.value = username;
      const replyBtn = commentContainer.nextElementSibling.children[2];
      replyBtn.addEventListener("click", (e) => {
        const addCommentContainer = e.target.parentElement;
        const textareaContainer = addCommentContainer.children[1];
        let output = "";
        output += `
      <div class="border-left"></div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                </div>
                <p id="user-comment">
                    ${textareaContainer.value}
                </p>
                </div>
                <div class="buttons">
                <div class="votes-container">
                    <i class="bi bi-plus-lg" id="up-vote"></i>
                <span id="number-upvotes"><b>0</b></span>
                <i class="bi bi-dash-lg" id="down-vote"></i>
            </div>
                        <button id="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                    <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6" />
                </svg> Edit
            </button>
            <button id="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14">
                    <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368" />
                </svg> Delete
            </button>
                </div>
        </div>`;
        commentContainer.nextElementSibling.style.display = "none";
        var doc = document.createElement("div");
        doc.classList.add("reply-comment");
        doc.innerHTML = output;
        insertAfter(doc, commentContainer);
        deleteCommentM();
        editCommentM();
        btn.removeAttribute("disabled");
      });
    });
  });
};

const mobileFunc = async () => {
  const res = await fetch("data.json");
  const data = await res.json();
  const comments = data.comments;
  const currentUser = data.currentUser;
  let output = "";
  for (i = 0; i < comments.length; i++) {
    output += `
    <div class="comment">
            <div class="comment-body">
                <div class="user-info">
                    <img src="${
                      comments[i].user.image.png
                    }" alt="User Img" class="user-img">
                    <span id="user-name"><b>${
                      comments[i].user.username
                    }</b></span>
                    <p id="time-comment">${comments[i].createdAt}</p>
                </div>
                <p id="user-comment">
                    ${comments[i].content}
                </p>
            </div>
            <div class="buttons">
            <div class="votes-container">
                <i class="bi bi-plus-lg" id="up-vote"></i>
                <span id="number-upvotes"><b>${comments[i].score}</b></span>
                <i class="bi bi-dash-lg" id="down-vote"></i>
            </div>
            <button>
                <i class="bi bi-reply-fill" id="reply"></i> Reply
            </button>
</div>
        </div>
        ${
          comments[i].replies.length > 0
            ? getRepliesM(comments[i].replies, currentUser)
            : ""
        }`;
  }
  output += `<div class="add-comment-container">
  <textarea placeholder="Add a comment..." id="comment" cols="30" rows="5"></textarea>
  <div class="info">
  <img src=".${currentUser.image.png}" alt="User Img">
  <button id="post-btn-me">Send</button>
  </div>
  </div>`;
  document.querySelector(".mobile").innerHTML = output;
  deleteCommentM();
  postCommentM();
  editCommentM();
  replyToCommentM();
  voteCommentM();
};

const getRepliesM = (replies, currentUser) => {
  let output = "";
  replies.forEach((reply) => {
    output += `${
      currentUser.username == reply.user.username
        ? `
      <div class="reply-comment">
      <div class="border-left"></div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="${reply.user.image.png}" alt="User Img" class="user-img">
                    <span id="user-name"><b>${reply.user.username}</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">${reply.createdAt}</p>
                </div>
                <p id="user-comment">
                    <b style="color: hsl(238, 40%, 52%);">@${reply.replyingTo}</b> ${reply.content}
                </p>
            </div>
            <div class="buttons">
            <div class="votes-container">
                <i class="bi bi-plus-lg" id="up-vote"></i>
                <span id="number-upvotes"><b>11</b></span>
                <i class="bi bi-dash-lg" id="down-vote"></i>
            </div>
            <button id="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                    <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6" />
                </svg> Edit
            </button>
            <button id="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14">
                    <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368" />
                </svg> Delete
            </button>
            </div>
        </div>`
        : `<div class="reply-comment" style="margin-left: 75px;width:40%">
      <div class="border-left"></div>
            <div class="comment-body">
                <div class="user-info">
                    <img src="${reply.user.image.png} "alt="User Img" class="user-img">
                    <span id="user-name"><b>${reply.user.username}</b></span>
                    <p id="time-comment">${reply.createdAt}</p>
                </div>
                <p id="user-comment">
                <b style="color: hsl(238, 40%, 52%);">@${reply.replyingTo}</b> ${reply.content}
                </p>
            </div>
            <div class="buttons">
            <div class="votes-container">
                    <i class="bi bi-plus-lg" id="up-vote"></i>
                <span id="number-upvotes"><b>${reply.score}</b></span>
                    <i class="bi bi-dash-lg" id="down-vote"></i>
            </div>
            <button>
                        <i class="bi bi-reply-fill" id="reply"></i> Reply
                    </button>
            </div>
        </div>`
    }
    `;
  });
  return output;
};

const voteCommentM = () => {
  const upBtn = document.querySelectorAll("#up-vote");
  const downBtn = document.querySelectorAll("#down-vote");
  upBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const voteContainer = e.target.parentElement;
      console.log(voteContainer);
      let votes = +voteContainer.children[1].textContent;
      votes++;
      voteContainer.children[1].innerHTML = `<b>${votes}</b>`;
      voteContainer.children[0].setAttribute("disabled", "disabled");
      voteContainer.children[2].removeAttribute("disabled");
    });
  });

  downBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const voteContainer = e.target.parentElement;
      let votes = +voteContainer.children[1].textContent;
      votes--;
      voteContainer.children[1].innerHTML = `<b>${votes}</b>`;
      voteContainer.children[2].setAttribute("disabled", "disabled");
      voteContainer.children[0].removeAttribute("disabled");
    });
  });
};

const deleteCommentM = () => {
  const deleteBtn = document.querySelectorAll("#delete");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = document.querySelector(".modal");
      document.querySelector(".mobile").classList.add("blur");
      modal.style.display = "block";
      const deleteContainer = e.target.parentElement.parentElement;
      console.log(deleteContainer);
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) {
          deleteContainer.remove();
          modal.style.display = "none";
          document.querySelector(".mobile").classList.remove("blur");
        } else if (e.target.classList.contains("cancel-del")) {
          modal.style.display = "none";
          document.querySelector(".mobile").classList.remove("blur");
        }
      });
    });
  });
};

const editCommentM = () => {
  const editBtn = document.querySelectorAll("#edit");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const commentContainer = e.target.parentElement.parentElement;
      console.log(commentContainer);
      commentContainer.innerHTML = `
      
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                </div>
                <textarea placeholder="Add a comment.." id="comment" cols="20" rows="5" style="width:100%"></textarea>
                <button id="update-btn">Update</button>
          
        </div>`;
      const updateBtn = commentContainer.children[0].children[2];
      updateBtn.addEventListener("click", (e) => {
        const textareaContainer = e.target.parentElement.children[1];
        console.log(textareaContainer);
        if (textareaContainer.value == "") {
          return;
        } else {
          commentContainer.innerHTML = `
            <div class="comment-body">
                <div class="user-info">
                    <img src="./images/avatars/image-juliusomo.png" alt="User Img" class="user-img">
                    <span id="user-name"><b>juliusomo</b></span>
                    <p id="you">You</p>&nbsp;&nbsp;
                    <p id="time-comment">Just Now</p>
                </div>
                <p id="user-comment">
                   ${textareaContainer.value}
                </p>
                <div class="buttons">
                <div class="votes-container">
                <i class="bi bi-plus-lg" id="up-vote"></i>
                <span id="number-upvotes"><b>0</b></span>
                  <i class="bi bi-dash-lg" id="down-vote"></i>
                </div>
                <button id="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                    <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6" />
                </svg> Edit
            </button>
            <button id="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14">
                    <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368" />
                </svg> Delete
            </button>
            </div>
            </div>`;
          deleteCommentM();
        }
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.clientWidth > 768) {
    getData();
  } else if (document.body.clientWidth < 768) {
    mobileFunc();
  }
});
