const config = {
  baseUrl: 'https://nomoreparties.co/v1/',
  groupName: 'wff-cohort-6',
  headers: {
    authorization: '593ec951-2f3c-459c-800a-b2838867b518',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
    return fetch(config.baseUrl + config.groupName + '/cards', {
      headers: {
        authorization: config.headers.authorization,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
    });
}

export const getUser = () => {
    return fetch(config.baseUrl + config.groupName + '/users/me', {
      headers: {
        authorization: config.headers.authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
    });
} 

export const setUser = (name, about) => {
  return fetch(config.baseUrl + config.groupName + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name: name.value,
      about: about.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  });
}

export const setCard = (name, link) => {
  return fetch(config.baseUrl + config.groupName + '/cards', {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
} 

export const deleteCardRequest = (id) => {
  return fetch(config.baseUrl + config.groupName + '/cards/' + id, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

export const setLike = (id) => {
  return fetch(config.baseUrl + config.groupName + '/cards/likes/' + id, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  });
} 

export const deleteLike = (id) => {
  return fetch(config.baseUrl + config.groupName + '/cards/likes/' + id, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  });
}
 
export const setAvatar = (src) => {
  return fetch(config.baseUrl + config.groupName + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      avatar: src,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
  });
} 