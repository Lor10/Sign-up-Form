//sets form message for if login/create account was succesful or not
function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success", "form-message-error");
    messageElement.classList.add(`form-message-${type}`);
};

//creates form error message
function setInputError(inputElement, message){
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;
};

//clears form error message
function clearInputError(inputElement) {
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#create-account");

    //hides login form and shows create account form
    document.querySelector("#link-create-account").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
        document.querySelectorAll(".form-input").forEach(inputElement => {
            inputElement.value="";
            clearInputError(inputElement);
        });
    });

    //hides create account form and shows login form
    document.querySelector("#link-login").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
        document.querySelectorAll(".form-input").forEach(inputElement => {
            inputElement.value="";
            clearInputError(inputElement);
        });
    });

    loginForm.addEventListener("submit", e =>{
        e.preventDefault();

        setFormMessage(loginForm, "error", "invalid Username/Password")
    });

    //checks if create account form values are correct
    document.querySelectorAll(".form-input").forEach(inputElement => {
        inputElement.addEventListener("blur", e =>{
            if (e.target.id === "signup-username" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Username must be at least 8 characters in length");
            };
            if (e.target.id === "signup-email" && e.target.value.length > 0 && !e.target.value.includes("@")) {
                setInputError(inputElement, "Incorrect email format: example@gmail.com");
            };
            if (e.target.id === "signup-password" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Password too short: minimum 6 characters");
            };
            if (e.target.id === "signup-password-confirmation" && e.target.value.length > 0 && e.target.value !== document.getElementById("signup-password").value) {
                setInputError(inputElement, "Password does not match");
            };
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    //Check if all forms in create account are filled out and correct
    createAccountForm.addEventListener("submit", e =>{
        e.preventDefault();
        let err = 0;
        document.querySelectorAll(".form-input").forEach(inputElement => {
            if (inputElement.id === "signup-username" && inputElement.value.length === 0){
                setInputError(inputElement, "Please Enter Username");
                err = 1;
            };
            if (inputElement.id === "signup-email" && inputElement.value.length === 0){
                setInputError(inputElement, "Please Enter Email");
                err = 1;
            };
            if (inputElement.id === "signup-password" && inputElement.value.length === 0){
                setInputError(inputElement, "Please Enter Password");
                err = 1;
            };
            if (inputElement.id === "signup-password-confirmation" && inputElement.value.length === 0){
                setInputError(inputElement, "Please Enter Password");
                err = 1;
            };
        });
        if (err === 0){
            setFormMessage(createAccountForm, "success", "Succesfully created account");
            document.querySelectorAll(".form-input").forEach(inputElement => {
                inputElement.value="";
            });
        } else {
            setFormMessage(createAccountForm, "error", "Could not create account");
        }
    });
});