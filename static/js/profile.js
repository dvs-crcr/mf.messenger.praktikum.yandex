const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
  let modalBg = modal.querySelector('.modal__background');
  modalBg.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      modal.classList.remove('modal_open');
    }
  }, false);
});

let Profile = {

  goBack() {
    window.history.go(-1);
    return false;
  },

  submitForm(event) {
    event.preventDefault();
    let formdata = new FormData(event.target);
    let result = {
      email: formdata.get('email'),
      login: formdata.get('login'),
      first_name: formdata.get('first_name'),
      second_name: formdata.get('second_name'),
      display_name: formdata.get('display_name'),
      phone: formdata.get('phone')
    }
    console.log(result)
  },

  submitFormPassword(event) {
    event.preventDefault();
    let formdata = new FormData(event.target);
    let result = {
      newPassword: formdata.get('newPassword'),
      oldPassword: formdata.get('oldPassword')
    }
    console.log(result)
  },

  uploadAvatar(event) {
    event.preventDefault();
    let uploadBtn = event.target.querySelector('.upload-avatar-btn');
    if (event.submitter === uploadBtn) {
      let formdata = new FormData(event.target);
      let avatar = formdata.get('avatar')
      let result = {
        avatar
      }
      if (typeof avatar.size !== 'undefined' && avatar.size !== 0) {
        console.log(result)
      } else {
        this.showError();
      }
    }
    
  },

  showError() {
    let errorContainer = document.querySelector('.modal__error');
    errorContainer.classList.remove('hidden');
  },

  showModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('modal_open')
    }
  },

  closeModal(event) {
    event.preventDefault();
    modals.forEach((modal) => {
      modal.classList.remove('modal_open');
    });
  },

  selectAvatar() {
    document.getElementById('avatarFile').click()
  }

}