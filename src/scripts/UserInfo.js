class UserInfo {
  constructor({ userDomElements, api, saveButtonState }) {
    this.nameElenement = userDomElements.name;
    this.jobElement = userDomElements.job;
    this.avatarElement = userDomElements.avatar;
    this.api = api;
    this.userPopup = userDomElements.profilePopup;
    this.saveButtonState = saveButtonState;
    this.saveButton = userDomElements.submitButton;
    this.saveButtonText = this.saveButton.textContent;
  }

  setUserInfo() {
    this.api
      .getUserData()
      .then((userData) => {
        this.nameElenement.textContent = userData.name;
        this.jobElement.textContent = userData.about;
        this.avatarElement.style.backgroundImage = `url(${userData.avatar})`;
      })
      .catch((err) => console.warn(`Не могу загрузить информацию о пользователе ${err}`));
  }

  updateUserInfo({ ...userData }) {
    this.saveButtonState(true, this.saveButton, this.saveButtonText);
    this.api
      .patchUserData(userData)
      .then((res) => {
        this.nameElenement.textContent = res.name;
        this.jobElement.textContent = res.about;
      })
      .then(() => this.userPopup.closeHandling())
      .catch((err) => console.warn(`Не могу обновить данные пользователя ${err}`))
      .finally(() => this.saveButtonState(false, this.saveButton, this.saveButtonText));
  }

  changeAvatar(avatarLink) {
    this.api
      .changeAvatar(avatarLink)
      .then((res) => {
        this.avatarElement.style.backgroundImage = `url(${res.avatar})`;
      })
      .catch((err) => console.warn(`Не могу обновить аватар ${err}`));
  }
}
