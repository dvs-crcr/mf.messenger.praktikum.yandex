const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((item) => {
  let toggler = item.querySelector('.dropdown__toggle');
  toggler.addEventListener('click', () => {
    item.classList.toggle('dropdown_opened');
    toggler.classList.toggle('dropdown__toggle_active');
  }, false);
});

let Chat = {

  submitForm(event) {
    event.preventDefault();
    let formdata = new FormData(event.target);
    let result = {
      message: formdata.get('message')
    }
    console.log(result);
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
  }


}