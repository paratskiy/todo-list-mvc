'use strict';

function edit(elem){

    const editForm = elem.parentNode.querySelector('form.edit');
    const editInput = editForm.querySelector('input.edit');
    const editableLabel = elem.parentNode.querySelector('label.title');

    editForm.classList.toggle('hide');
    editableLabel.classList.toggle('hide');

    editInput.focus();
    editInput.selectionStart = editInput.value.length;

    console.log(editInput);



}