export default class Api {
  static postUrl = "https://jsonplaceholder.typicode.com/";
  static chuckUrl = "https://api.chucknorris.io/jokes/random";

  static async getRandomNorisJoke() {
    const resp = await fetch(Api.chuckUrl);
    const jokeObj = await resp.json();
    return jokeObj;
  }

  static getPosts(howMany, successCallback) {
    fetch(Api.postUrl + "posts")
      .then((resp) => resp.json())
      .then((data) => successCallback(data.slice(0, howMany)))
      .catch((err) => console.warn(err));
  }

  static getSinglePost(id, successCallback) {
    fetch(Api.postUrl + "posts/" + id)
      .then((resp) => resp.json())
      .then((data) => successCallback(data))
      .catch((err) => console.warn(err));
  }

  static getSingleComment(userId, successCallback) {
    fetch(Api.postUrl + "posts/" + userId + "/comments")
      .then((resp) => resp.json())
      .then((data) => successCallback(data))
      .catch((err) => console.warn(err));
  }

  static sendPost(objToBeSent, successCallback) {
    fetch(Api.postUrl + "posts", {
      method: "POST",
      body: JSON.stringify(objToBeSent),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        successCallback(data);
      })
      .catch((err) => console.log(err));
  }

  static async deletePost(postId) {
    const resp = await fetch(`${Api.postUrl}posts/${postId}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    console.log("delete", data, "deletedId", postId);
  }

  static getWeaterData(successCallback) {
    fetch(
      "http://www.7timer.info/bin/api.pl?lon=55.316702&lat=22.408877&unit=Metric&product=astro&output=json"
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((err) => console.warn(err));
  }
}
