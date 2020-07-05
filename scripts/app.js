$(() => {
  const $bodyTableContact = $('#bodyContact');
  const $btnCreateUser = $('#create-user');
  const $dialogForm = $('#dialog-form');
  const $nameInput = $('#name');
  const $emailInput = $('#email');
  const $surnameInput = $('#surname');
  const $phoneInput = $('#phone');
  const $inputsList = [$nameInput, $surnameInput, $phoneInput, $emailInput];
  const $form = $('form');

  new ContactList($bodyTableContact, $btnCreateUser, $dialogForm, $form, $inputsList);
});
