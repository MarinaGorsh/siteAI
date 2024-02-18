//log in wondow
document.getElementById("open-modal-btn").addEventListener("click", function(){
    document.getElementById("my-modal").classList.add("open")
})
document.getElementById("close-modal-btn").addEventListener("click", function(){
    document.getElementById("my-modal").classList.remove("open")
})
//sign in wondow
document.getElementById("open-modal-btn_sign").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("my-modal_sign").classList.add("open");
});
document.getElementById("close-modal-btn_sign").addEventListener("click", function(){
    document.getElementById("my-modal_sign").classList.remove("open")
})
let isAuthenticated = false;

function authenticateUser(username, password) {
    return username === "user" && password === "user";
}
window.onload = function() {
    isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    updateLoginButton();
};
// Log in
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("fname").value;
    const password = document.getElementById("password").value;

    if (authenticateUser(username, password)) {
        document.getElementById("my-modal").classList.remove("open");
        isAuthenticated = true;
        localStorage.setItem('isAuthenticated', true);
        updateLoginButton();
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

// Log out
document.getElementById("open-modal-btn").addEventListener("click", function () {
    if (isAuthenticated) {
        isAuthenticated = false;
        localStorage.setItem('isAuthenticated', false);
        updateLoginButton();
    } else {
        document.getElementById("my-modal").classList.add("open");
    }
});

function updateLoginButton() {
    const loginButton = document.getElementById("open-modal-btn");
    loginButton.innerText = isAuthenticated ? "Log out" : "Log in";
}

let languageFormsCount = 1;
let selectedLevels = {};

function addLanguageForm() {
    const languageFormsContainer = document.getElementById('languageFormsContainer');
    const newLanguageForm = document.createElement('div');
    newLanguageForm.className = 'language-form';
    const lang = document.createElement('input');
    lang.type = "text";
    lang.className = "lang-input"
    newLanguageForm.appendChild(lang);
    for (let i = 1; i <= 5; i++) {
        const oval = document.createElement('div');
        oval.className = 'rectangle';
        oval.onclick = () => setLanguageLevel(i, newLanguageForm);
        newLanguageForm.appendChild(oval);
    }

    languageFormsContainer.appendChild(newLanguageForm);
    selectedLevels[languageFormsCount] = 0;
    languageFormsCount++;
    colorRectangles(newLanguageForm);
}

function setLanguageLevel(level, form) {
    const formIndex = Array.from(form.parentNode.children).indexOf(form) + 1;
    selectedLevels[formIndex] = level;
    colorRectangles(form);
}

function colorRectangles(form) {
    const formIndex = Array.from(form.parentNode.children).indexOf(form) + 1;
    const selectedLevel = selectedLevels[formIndex];
    const rectangles = form.querySelectorAll('.rectangle');

    rectangles.forEach((rectangle, index) => {
        if (index < selectedLevel) {
            rectangle.style.backgroundColor = 'green';
        } else {
            rectangle.style.backgroundColor = 'lightgray';
        }
    });
}

function readUrl(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let imgName = input.files[0].name;
            input.setAttribute("data-title", imgName);
            console.log(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    } 
}



function loadPage(pageUrl) {
    var contentContainer = document.getElementById('content');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                contentContainer.innerHTML = xhr.responseText;
            } else {
                console.error('Ошибка загрузки страницы: ' + xhr.status);
            }
        }
    };
    xhr.open('GET', pageUrl, true);
    xhr.send();
}
var mainBtn = document.getElementById('main-btn');
var aboutBtn = document.getElementById('about-btn');
var contactsBtn = document.getElementById('contacts-btn');
var createBtn = document.getElementById('create-btn');
var userBtn = document.getElementById('user-btn');
var seeBtn = document.getElementById('see-btn');
var editBtn = document.getElementById('edit-btn');
var shareBtn = document.getElementById('share-btn');

mainBtn.addEventListener('click', function() {
    window.location.href = 'http://localhost:8000/';
});
aboutBtn.addEventListener('click', function() {
    loadPage('about.html');
});
contactsBtn.addEventListener('click', function() {
   loadPage('contacts.html');
});
createBtn.addEventListener('click', function() {
    loadPage('create.html');
});
userBtn.addEventListener('click', function() {
   loadPage('profile.html');
});
seeBtn.addEventListener('click', function() {
    loadPage('see.html');
});
editBtn.addEventListener('click', function() {
   loadPage('edit.html');
});
shareBtn.addEventListener('click', function() {
    loadPage('share.html');
});
