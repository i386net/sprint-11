class CardList {
  constructor({ cardsContainer, createCard, api, addCardPopup, submitCardButton, saveButtonState }) {
    this.container = cardsContainer;
    this.createCard = createCard;
    this.api = api;
    this.addCardPopup = addCardPopup;
    this.submitCardButton = submitCardButton;
    this.submitCardButtonText = this.submitCardButton.textContent;
    this.saveButtonState = saveButtonState;
  }

  addCard(cardData) {
    const template = this.createCard(cardData);
    this.container.append(template);
  }

  render() {
    this.api
      .getInitialCards()
      .then((cards) => {
        for (const card of cards) {
          this.addCard(card);
        }
      })
      .catch((err) => console.warn(`Не могу загрузить карточки ${err}`));
  }

  postCard(cardData) {
    this.saveButtonState(true, this.submitCardButton, this.submitCardButtonText);
    this.api
      .postCardToServer(cardData)
      .then((res) => {
        this.addCard(res);
      })
      .then(() => {
        this.addCardPopup.closeHandling();
      })
      .catch((err) => console.warn(`Не могу загрузить карточку ${err}`))
      .finally(() => this.saveButtonState(false, this.submitCardButton, this.submitCardButtonText));
  }
}
