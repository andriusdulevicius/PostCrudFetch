export default class Comments {
  constructor(kurPadeti, commentsData) {
    this.parentEl = kurPadeti;
    this.commentsData = commentsData;
    this.makeMeComments();
  }
  makeMeComments() {
    const sectionEl = document.createElement("section");
    sectionEl.className = "py-4";
    sectionEl.innerHTML = "<h3>Comments</h3>";
    this.commentsData.forEach((oneComment) => {
      sectionEl.innerHTML += this.createComment(oneComment);
    });
    this.parentEl.append(sectionEl);
  }
  createComment(commentObj) {
    const { name, email, body } = commentObj;
    return `
    <div class="card border-dark mb-3">
          <div class="card-header">${email}</div>
          <div class="card-body text-dark">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
              ${body}
            </p>
          </div>
    </div>
    `;
  }
}
