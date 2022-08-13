let firstNames = [];
let lastNames = [];
let phoneNumbers = [];
loadArrayfromLocalStorage();


/**
 * Display my contacts.
 * 
 */
function render() {
    let content = document.getElementById("content");
    content.innerHTML = "";
    content.innerHTML += generateContentHTML();
    for (let i = 0; i < firstNames.length; i++) {
        const firstName = firstNames[i];
        const lastName = lastNames[i];
        const phoneNumber = phoneNumbers[i];

        content.innerHTML += generateContactHTML(firstName, lastName, phoneNumber, i);
    }
}


/**
 * generate the HTML-Content
 * @returns 
 * 
 */
function generateContentHTML() {
    return /*html*/ `
    <h1 class="headlineForm">My Contacts</h1>
    <div class="inputs">
        <input type="text" id="firstName" placeholder="Your firstname..">
        <input type="text" id="lastName" placeholder="Your lastname..">
        <input type="text" id="phoneNumber" placeholder="Your number..">
    </div>
    <div class="inputs">
        <button class="btnStyle" onclick="add()"><b>Add</b></button>
    </div>`;
}


/**
 * generate the contact-content
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {number} phoneNumber 
 * @param {number} i 
 * @returns 
 * 
 */
function generateContactHTML(firstName, lastName, phoneNumber, i) {
    return /*html*/ `
    <div class="box">
        <div class="outline"></div>
        <span><b>Firstname:</b> ${firstName}</span> <br> 
        <span><b>Lastname:</b> ${lastName}</span> <br>
        <span><b>Number:</b> ${phoneNumber}</span> <br>
        <div><button onclick="deleteContact(${i})" class="btnStyle" id="deleteBtn"><b>Delete contact</b></button></div>
    </div>`;
}


/**
 * add new contact to board.
 * 
 */
function add() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;

    if (firstName == "" || lastName == "" || phoneNumber == "") {
        alert("Um einen Kontakt hinzufügen zu können, müssen Sie alle Daten eingeben.")
    } else {
        firstNames.push(firstName);
        lastNames.push(lastName);
        phoneNumbers.push(phoneNumber);
        render();
        saveArrayToLocalStorage();
    }
}


/**
 * delete contact from board.
 * @param {number} i
 * 
 */
function deleteContact(i) {
    firstNames.splice(i, 1);
    lastNames.splice(i, 1);
    phoneNumbers.splice(i, 1);

    render();
    saveArrayToLocalStorage();
}


/**
 * save contact to localstorage
 * 
 */
function saveArrayToLocalStorage() {
    let firstNameAsText = JSON.stringify(firstNames);
    let lastNameAsText = JSON.stringify(lastNames);
    let phoneNumberAsText = JSON.stringify(phoneNumbers);

    localStorage.setItem("firstName", firstNameAsText);
    localStorage.setItem("lastName", lastNameAsText);
    localStorage.setItem("phoneNumber", phoneNumberAsText);
}


/**
 * load contact from localstorage
 * 
 */
function loadArrayfromLocalStorage() {
    let firstNameAsText = localStorage.getItem("firstName");
    let lastNameAsText = localStorage.getItem("lastName");
    let phoneNumberAsText = localStorage.getItem("phoneNumber");

    if (firstNameAsText && lastNameAsText && phoneNumberAsText) {
        firstNames = JSON.parse(firstNameAsText);
        lastNames = JSON.parse(lastNameAsText);
        phoneNumbers = JSON.parse(phoneNumberAsText);
    }
}