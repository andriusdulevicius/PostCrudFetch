"use strict"; // here we go again
console.log("app.js");

import Api from "./class/Api.js";
import Post from "./class/Posts.js";
import SinglePost from "./class/SinglePost.js";
import Comments from "./class/Comments.js";
import { loadNav, getPostIdFromUrl, showChuckJoke } from "./functions.js";

loadNav();

// nuorodos
const postsContainer = document.querySelector(".post-container");
const singlePostsPage = document.querySelector(".single-posts-page");
// console.log("singlePostsPage", singlePostsPage);
const homePage = document.querySelector(".home-page");
const addPostPage = document.querySelector(".add-posts-page");

// Api.getWeaterData();

if (homePage) {
  console.log("homePage");
  const jokeEl = document.querySelector(".joke");
  // tutuliniame puslapyje parsiusti ir atvaizduoti random CHuck noris juokeli is
  // gavau konsoleje homePage
  // zinau kokiu adresu kreiptis gauti random juokeli
  // i konsole gavau chuck noris juokeli
  // Api.getRandomNorisJoke()
  //   .then((joke) => {
  //     showChuckJoke(jokeEl, joke);
  //     // console.log(joke);
  //   })
  //   .catch((err) => console.warn(err.message));
  //https://api.chucknorris.io/
  // naudojant asyc await
}

if (postsContainer) {
  console.log("Posts page");

  Api.getPosts(10, function (postsArr) {
    postsContainer.innerHTML = null;
    console.log(postsArr);
    postsArr.forEach((postObj) => new Post(postsContainer, postObj));
  });
} // post container pabaiga

if (singlePostsPage) {
  console.log("sigle post page");

  const postIdFromGet = getPostIdFromUrl();

  Api.getSinglePost(postIdFromGet, (userObj) => {
    console.log("makingPost");
    new SinglePost(singlePostsPage, userObj);
    const deleteBtn = singlePostsPage.querySelector("#delete");
    console.log("deleteBTN", deleteBtn);
    // .bind(thisReiskme, naujiArgumentai) - budas paduoti argumentus i funkcija kuri naudojama
    // kaip argumentas
    deleteBtn.addEventListener("click", Api.deletePost.bind(null, postIdFromGet));
  });

  Api.getSingleComment(postIdFromGet, (comments) => {
    console.log("comments", comments);
    if (comments.length > 0) {
      new Comments(singlePostsPage, comments);
    }
  });
} //singlePostsPage Pabaiga

if (addPostPage) {
  console.log("we are on add post page, right?");
  const formEl = document.getElementById("add-post-form");
  const formPartEl = document.querySelector(".form-part");
  const formSuccessEl = document.querySelector(".form-success");
  const titleEl = document.getElementById("title");
  const bodyEl = document.getElementById("body");
  const restartFormBtn = document.querySelector(".another-post-btn");

  restartFormBtn.addEventListener("click", handleFormSent);

  function handleFormSent() {
    formPartEl.classList.toggle("d-none");
    formSuccessEl.classList.toggle("d-none");
  }

  formEl.addEventListener("submit", (event) => {
    // sustabdom forma nuo puslapio perkrovimo
    event.preventDefault();
    console.log("issiusta");
    // gauti ivesties lauku reiksmes // jas isloginti kai forma yra submitinama
    // console.log(bodyEl.value);
    // console.log(titleEl.value);
    // suformuoti reiksmes objekto pavidalu
    const postToCreateData = {
      title: titleEl.value,
      body: bodyEl.value,
      userId: 1,
    };
    // console.log("naujas el irasymui ", postToCreateData);
    Api.sendPost(postToCreateData, handleFormSent);
    titleEl.value = "";
    bodyEl.value = "";
  });
} // add post page pabaiga
