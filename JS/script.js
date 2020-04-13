
// Profile__edit-button
function editProfile() {
    popupOpened = document.querySelector('.popup');
    popupOpened.classList.remove('popup_opened');
}

/* Add-button
function addPhoto()
*/

// Close button
function closeButton () {
    popupClosed = document.querySelector('.popup');
    popupClosed.classList.add('popup_opened');
}



//Save Profile Changes
function SaveProfileChanges() {

    // Saving inpit value
    NameInput = document.querySelector('.popup__name-field');
    var Name = NameInput.value;
    console.log('Name');
    DescriptionInput = document.querySelector('.popup__description-field');
    var Description = DescriptionInput.value;
    console.log('Description');
    
    // Closing popup
    popupClosed = document.querySelector('.popup');
    popupClosed.classList.add('popup_opened');

    // If there are changes then save in HTML
    if (Name != '') {
    ProfileName = document.querySelector('.profile__name');
    ProfileName.innerHTML= Name;
    }
    else {
        ProfileName.innerHTML= 'Жак-Ив Кусто';
    }   

    if (Description != '') {
    ProfileDescription = document.querySelector('.profile__description');
    ProfileDescription.innerHTML = Description;
    }
    else {
        ProfileDescription.innerHTML = 'Исследователь океана';
    }

}