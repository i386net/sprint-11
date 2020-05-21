class API {
  constructor(options) {
    this.options = options;
  }

  resParse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  }

  getInitialCards() {
    return fetch(`${this.options.baseURL}/cards`, {
      method: 'GET',
      headers: this.options.headers,
    }).then((res) => this.resParse(res));
  }

  getUserData() {
    return fetch(`${this.options.baseURL}/users/me`, {
      method: 'GET',
      headers: this.options.headers,
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  patchUserData(userData) {
    return fetch(`${this.options.baseURL}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.job,
      }),
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  postCardToServer(cardData) {
    return fetch(`${this.options.baseURL}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  deleteCard(id) {
    return fetch(`${this.options.baseURL}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  likeCard(id) {
    return fetch(`${this.options.baseURL}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.options.headers,
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  dislikeCard(id) {
    return fetch(`${this.options.baseURL}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }

  changeAvatar(avatarLink) {
    return fetch(`${this.options.baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
      .then((res) => this.resParse(res))
      .catch((err) => Promise.reject(new Error(err)));
  }
}
