export default class SinglePost {
  constructor(parentEl, postObj) {
    this.parentEl = parentEl;
    this.postObj = postObj;
    this.makeMeAPost();
  }
  makeMeAPost() {
    const { id, title, body } = this.postObj;
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerHTML = `
        <img src="https://picsum.photos/seed/${id}/1000/500" class="card-img-top" alt="Loading" />
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
                ${body}
            </p>
            <a href="/pages/posts.html" class="btn btn-primary">Go back</a>
            <button id="delete" class="btn btn-danger">Delete Post</button>
        </div>
      `;
    this.parentEl.firstElementChild.after(cardEl);
  }
}
