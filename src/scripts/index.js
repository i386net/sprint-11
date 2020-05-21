(function() {
  // ------ API --------
  const api = new API({
    baseURL: 'https://praktikum.tk/cohort10',
    headers: {
      authorization: 'ed07cd80-4544-47d3-a056-c6d267d55093',
      'Content-Type': 'application/json',
    },
  });
  const userData = { id: '2a18ff32c35a20e7bc13004b' };
  //--------
  const cardsContainer = document.querySelector('.places-list');
  const placeForm = document.querySelector('.popup__form_place');
  const profileForm = document.querySelector('.popup__form_profile');
  const avatarForm = document.querySelector('.popup__form_avatar');
  const placeValidity = new FormValidator(placeForm);
  const profileValidity = new FormValidator(profileForm);
  const avatarValidity = new FormValidator(avatarForm);

  //----- Popups -----

  //----- Add place -----
  const addCardPopup = new Popup(
    document.querySelector('.popup_type_place'),
    resetForm
  );
  const addCardPopupButton = document.querySelector('.user-info__button');
  const submitCardButton = document.querySelector('.place-card__submit');

  //----- Profile and Avatar------
  const editProfilePopup = new Popup(
    document.querySelector('.popup_type_profile'),
    resetForm
  );
  const avatarPopup = new Popup(
    document.querySelector('.popup_type_avatar'),
    resetForm
  );
  const editProfilePopupButton = document.querySelector(
    '.user-info__edit-button'
  );
  const userDomElements = {
    name: document.querySelector('.user-info__name'),
    job: document.querySelector('.user-info__job'),
    avatar: document.querySelector('.user-info__photo'),
    profilePopup: editProfilePopup,
    submitButton: document.querySelector('.profile__submit'),
  };
  const userProfile = new UserInfo({ userDomElements, api, saveButtonState });

  //----- Popup image -----
  const imagePopup = new Popup(document.querySelector('.popup_type_image'));
  function openImagePopup(imageLink) {
    document.querySelector('.popup__image').setAttribute('src', imageLink);
    imagePopup.open();
  }

  //----- Create cards -----
  const createCard = (cardData) => {
    const card = new Card({ cardData, openImagePopup, api, userData });
    return card.create();
  };
  const cardList = new CardList({
    cardsContainer,
    createCard,
    api,
    addCardPopup,
    submitCardButton,
    saveButtonState,
  });

  // ----- Reset Form -----
  function resetForm(popup) {
    if (popup.querySelector('.popup__form')) {
      const form = popup.querySelector('.popup__form');
      const inputs = Array.from(form.elements);
      inputs.forEach((element) => {
        if (!element.classList.contains('button')) {
          const errorElement = form.querySelector(`#error-${element.id}`);
          errorElement.classList.remove('popup__error-message');
          errorElement.textContent = '';
        }
      });
      form.reset();
    }
  }

  function saveButtonState(buttonState, button, buttonText) {
    if (buttonState) {
      button.textContent = 'Загрузка...';
      button.style.border = '3px solid #60f542';
    } else {
      button.textContent = buttonText;
      button.style.border = '';
    }
  }
  //----- run -----
  userProfile.setUserInfo();
  cardList.render();

  //----- Listeners -----
  addCardPopupButton.addEventListener('click', () => {
    placeValidity.setSubmitButtonState(false);
    addCardPopup.open();
  });
  userDomElements.avatar.addEventListener('click', () => {
    avatarValidity.setSubmitButtonState(false);
    avatarPopup.open();
  });
  editProfilePopupButton.addEventListener('click', () => {
    editProfilePopup.open();
    profileForm.elements.username.value = userDomElements.name.textContent;
    profileForm.elements.job.value = userDomElements.job.textContent;
    profileValidity.setSubmitButtonState(true);
  });
  placeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const link = event.currentTarget.elements.link.value;
    cardList.postCard({ name, link });
  });
  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.currentTarget.elements.username.value;
    const job = event.currentTarget.elements.job.value;
    userProfile.updateUserInfo({ name, job });
  });
  avatarForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const avatarLink = event.currentTarget.elements.avatar.value;
    userProfile.changeAvatar(avatarLink);
    avatarPopup.close(event);
    avatarValidity.setSubmitButtonState(false);
  });
})();
