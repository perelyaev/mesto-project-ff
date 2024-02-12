const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6/cards',
  headers: {
    authorization: '593ec951-2f3c-459c-800a-b2838867b518',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = (renderCard) => {
    return fetch(config.baseUrl, {
      headers: {
        authorization: config.headers.authorization,
      }
    })
    .then(res => res.json())
    .then((result) => {
      result.forEach((card) => {
        renderCard(card, config.userId);
      });
    })
    .catch(() => {
      console.log('Ошибка. Запрос не выполнен');
    }); 
}

// export const getUser = (profileTitle, profileDescription, profileImage) => {
export const getUser = (profileTitle, profileDescription, profileImage) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
      headers: {
        authorization: config.headers.authorization
      }
    })
    .then(res => res.json())
    .then((result) => {
      config.userId = result._id
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileImage.style.cssText = 'background-image: url(' + result.avatar + ')';
    })
    .catch(() => {
      console.log('Ошибка. Запрос не выполнен');
    });
} 

export const setUser = (name, about, profileTitle, profileDescription) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
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
  .then(res => res.json())
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });
}

export const setCard = (name, link) => {
  return fetch(config.baseUrl, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => res.json())
  .then((result) => {
    console.log(name)
    console.log(link)
    console.log(result)
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });
} 

export const delCard = (id) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/cards/' + id, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });
}

export const setLike = (evt, id) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/cards/likes/' + id, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => res.json())
  .then((result) => {
    evt.target.classList.add('card__like-button_is-active');
    evt.target.textContent = result.likes.length;
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });
} 

export const deleteLike = (evt, id) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/cards/likes/' + id, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
  })
  .then(res => res.json())
  .then((result) => {
    evt.target.classList.remove('card__like-button_is-active');
    evt.target.textContent = result.likes.length;
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });
}
 
export const setAvatar = (src, profileImage) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      avatar: src,
    })
  })
  .then(res => res.json())
  .then((result) => {
    profileImage.style.cssText = 'background-image: url(' + result.avatar + ')';
  })
  .catch(() => {
    console.log('Ошибка. Запрос не выполнен');
  });
} 