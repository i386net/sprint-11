export default class Popup {
  constructor(popup, resetFormCallback = () => {}) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector('.popup__close');
    this.resetForm = resetFormCallback;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this.close);
    this.popup.addEventListener('click', this.close);
  }

  closeHandling() {
    this.reset();
    this.popup.classList.remove('popup_is-opened');
    if (this.popup.classList.contains('popup_type_image')) {
      this.popup.querySelector('.popup__image').removeAttribute('src');
    }
    document.removeEventListener('keydown', this.close);
    this.popup.removeEventListener('click', this.close);
  }

  close(event) {
    if (event.type === 'keydown' && event.key === 'Escape') {
      this.closeHandling();
    }
    if (event.type === 'click') {
      if (
        event.target.classList.contains('popup_is-opened') ||
        event.target === this.closeButton
      ) {
        this.closeHandling();
      }
    }
    if (event.type === 'submit') {
      this.closeHandling();
    }
  }

  reset() {
    if (this.resetForm) {
      this.resetForm(this.popup);
    }
  }
}
