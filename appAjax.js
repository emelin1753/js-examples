const btnGet = document.querySelector(".btn-get");
const btnAdd = document.querySelector(".btn-add");
const container = document.querySelector(".container");

function getPosts(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts"); // объявления запроса
  //теперь нужно подписаться на события с сервера (их несколько)
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText); // наш запрос с сервера только в обработчике события, т.к. мы не знаем кодга сервер нам ответит
    //преобразуем в массив и вернем в нашу функцию
    callback(response);
  });
  //можем подписаться на ошибку
  xhr.addEventListener("error", () => {
    console.log("error"); //ошибка в адресе запроса, в маршруте и др.
  });

  xhr.send(); //получаем данные с сервера
}

function createPost(body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    callback(response);
  });

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send(JSON.stringify(body));
}

function cardTemplate(post) {
  const card = document.createElement("div");
  card.classList.add("card");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = post.title;
  const article = document.createElement("p");
  article.classList.add("card-text");
  article.textContent = post.body;
  cardBody.appendChild(title);
  cardBody.appendChild(article);
  card.appendChild(cardBody);
  return card;
}

function renderPosts(response) {
  const fragment = document.createDocumentFragment();
  response.forEach((post) => {
    const card = cardTemplate(post);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}

btnGet.addEventListener("click", (e) =>
  getPosts((response) => renderPosts(response))
);

btnAdd.addEventListener("click", (e) => {
  const newPost = {
    title: "foo1",
    body: "bar1",
    userId: 1,
  };
  createPost(newPost, (response) => {
    const card = cardTemplate(response);
    container.insertAdjacentElement("afterbegin", card);
  });
});

//*CORS
function getGmail(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://gmail.com"); //gmail не дает нам доступ и ругается на CORS
  xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
  });
  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send();
}

//*Тема универсальных функций и обработки ошибок
function myHTttpRequest({ method, url } = {}, callback) {
  // попытка/исключение
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("load", () => {
      if (Math.floor(xhr.status / 100) !== 2) {
        // проверяем, чтобы статус ответа был 2хх (т.е. успешный)
        callback(`Error. Status code: ${xhr.status}`, xhr); //некое соглашение для callback (первый параметр - ошибка, второй - ответ с сервера)
        return;
      }
      const response = JSON.parse(xhr.responseText); //здесь тоже может быть ошибка, например proxy вернет другой ответ не JSON
      callback(null, response);
    });

    xhr.addEventListener("error", () => {
      callback(`Error. Status code: ${xhr.status}`, xhr); // другие ошибки
    });

    xhr.send();
  } catch (error) {
    callback(error);
  }
}

// myHTttpRequest(
//   {
//     method: "GET",
//     url: "https://jsonplaceholder.typicode.com/postsf",
//   },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(res);
//   }
// );

// универсальный объект для GET и POST запросов
function http() {
  return {
    get(url, callback) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            // проверяем, чтобы статус ответа был 2хх (т.е. успешный)
            callback(`Error. Status code: ${xhr.status}`, xhr); //некое соглашение для callback (первый параметр - ошибка, второй - ответ с сервера)
            return;
          }
          const response = JSON.parse(xhr.responseText); //здесь тоже может быть ошибка, например proxy вернет другой ответ не JSON
          callback(null, response);
        });

        xhr.addEventListener("error", () => {
          callback(`Error. Status code: ${xhr.status}`, xhr); // другие ошибки
        });

        xhr.send();
      } catch (error) {
        callback(error);
      }
    },
    post(url, body, headers, callback) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            // проверяем, чтобы статус ответа был 2хх (т.е. успешный)
            callback(`Error. Status code: ${xhr.status}`, xhr); //некое соглашение для callback (первый параметр - ошибка, второй - ответ с сервера)
            return;
          }
          const response = JSON.parse(xhr.responseText); //здесь тоже может быть ошибка, например proxy вернет другой ответ не JSON
          callback(null, response);
        });

        xhr.addEventListener("error", () => {
          callback(`Error. Status code: ${xhr.status}`, xhr); // другие ошибки
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        callback(error);
      }
    },
  };
}

const myHttp = http(); //объект с методами
myHttp.post(
  "https://jsonplaceholder.typicode.com/posts",
  {
    title: "foo1",
    body: "bar1",
    userId: 1,
  },
  { "Content-type": "application/json; charset=UTF-8" }, //может быть несколько заголовков
  (err, res) => {
    //console.log(err, res);
  }
);

//*Promise часть 2
function getPost(id) {
  return new Promise((resolve, reject) => {
    myHttp.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      (err, res) => {
        if (err) {
          reject(err); // отмена promise
        }
        resolve(res);
      }
    );
  }); //возвращаем promise
}

function getPostComments(post) {
  const { id } = post;
  return new Promise((resolve, reject) => {
    myHttp.get(
      `https://jsonplaceholder.typicode.com/comments?postsId=${id}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve({ post, comments: res });
      }
    );
  });
}

function getUserCreatedPost(data) {
  const {
    post: { userId },
  } = data;

  return new Promise((resolve, reject) => {
    myHttp.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve({ ...data, user: res });
      }
    );
  });
}

getPost(50)
  .then((post) => getPostComments(post))
  .then((data) => getUserCreatedPost(data))
  .then((fullData) => console.log(fullData))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally"));

//promise all выполнение несольких promise и получение результатов в одном then (зная все id)

function getPost2(id) {
  return new Promise((resolve, reject) => {
    myHttp.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
}

function getPostComments2(id) {
  return new Promise((resolve, reject) => {
    myHttp.get(
      `https://jsonplaceholder.typicode.com/comments?postsId=${id}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
}

function getUserCreatedPost2(userId) {
  return new Promise((resolve, reject) => {
    myHttp.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
}

Promise.all([getPost2(1), getPostComments2(1), getUserCreatedPost2(1)])
  .then(([post, comments, user]) => {
    console.log(post, comments, user);
  })
  .catch((err) => console.log(err));
