let Auth = {

  showError() {
    let errorContainer = document.querySelector('.auth__error');
    errorContainer.classList.remove('hidden');
    let inputList = document.querySelectorAll('.form__input');
    inputList.forEach((input) => {
      input.classList.add('form__input_error');
    })
  },

  submitForm(event) {
    event.preventDefault();
    let formdata = new FormData(event.target);
    let result = {
      login: formdata.get('login'),
      password: formdata.get('password')
    }
    console.log(result)
    this.showError();
  }

}