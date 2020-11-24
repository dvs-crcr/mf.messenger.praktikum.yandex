let Registration = {

  checkPasswords(password, password_confirm) {
    if (password !== password_confirm) {
      return false;
    }
    return true;
  },

  showError() {
    let inputErrorMsg = document.querySelector('.form__input-error-msg');
    inputErrorMsg.classList.remove('hidden')
    let inputList = document.querySelectorAll('.form__input[type="password"]');
    inputList.forEach((input) => {
      input.classList.add('form__input_error');
    })
  },

  submitForm(event) {
    event.preventDefault();
    let formdata = new FormData(event.target);
    if (!this.checkPasswords(formdata.get('password'), formdata.get('password_confirm'))) {
      this.showError();
    }
    let result = {
      email: formdata.get('email'),
      login: formdata.get('login'),
      first_name: formdata.get('first_name'),
      second_name: formdata.get('second_name'),
      phone: formdata.get('phone'),
      password: formdata.get('password')
    }
    console.log(result);
  }

}