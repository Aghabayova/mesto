export default class Api {
    
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    //получить изначальный массив карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            }
        });
    }
    
    //получить данные пользователя
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            }
        });
    }

    //обновить данные юзера
    editUserInfo(userData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            });
    }

    //Редактирование аватара
    editUserAvatar(userData) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: userData.link
        })
      })
        .then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
      }

    //Добавление новой карточки на сервер
    addNewCard(photoData) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: photoData.name,
                link: photoData.link

            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    }

    //Удаление Карточки
    deleteCard(card) {
        return fetch(`${this._url}/cards/${card._id}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
      }

    //Добавление Лайков
    addLike(card) {
        return fetch(`${this._url}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    }

    //Удаление Лайков
    deleteLike(card) {
        return fetch(`${this._url}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    } 
    

}


