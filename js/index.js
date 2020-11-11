let menuToggleButton = document.querySelector('#menu-toggle')
let sidebarBody = document.querySelector('.sidebar')
let sidebarMenu = document.querySelector('.sidebar-nav')
const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const registrationButton = document.querySelector('.login-signup')
const userElem = document.querySelector('.user-info')
const userName = document.querySelector('.user-name')
const newPostButton = document.querySelector('.button-new-post')

// добавляет \ удаляет класс visible
const toggleVisibleClass = (elem) => elem.classList.toggle('visible')

// выбирает строку до @
const getUserNameFromEmail = email => email.slice(0, email.indexOf('@'))


menuToggleButton.addEventListener("click", e => {
    e.preventDefault()
    toggleVisibleClass(sidebarBody)
})


const listUsers = [
    {
        id: 1,
        email: 'aaa@gras.com',
        password: '123321',
        displayName: 'Artem'
    },
    {
        id: 2,
        email: 'bbb@gras.com',
        password: '12332231',
        displayName: 'Balet'
    }
]
const setUsers = {
    user: null,
    logIn(email, password, handler) {
        const user = this.getUser(email)
        if (user && user.password === password) {
            this.authorizedUser(user)
            handler()
        } else {
            alert('Пользователь с таким e-mail не найден')
        }
    },
    logOut() {
        console.log('logout');
    },
    signUp(email, password, handler) {
        if (!this.getUser(email)) {
            const user = {id: listUsers.length + 1, email, password, displayName: email}
            listUsers.push(user)
            this.authorizedUser(user)
            handler()
        } else {
            alert('Пользователь с таким email уже зарегистрирован')
        }

    },
    getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
        this.user = user
    }
}
const toggleAuthDom = () => {
    const user = setUsers.user
    const toggleHTMLElem = () => {
        toggleVisibleClass(loginElem)
        toggleVisibleClass(userElem)
        toggleVisibleClass(sidebarMenu)
        toggleVisibleClass(newPostButton)
    }
    if (user) {
        toggleHTMLElem()
        user.displayName = getUserNameFromEmail(user.email)
        userName.textContent = user.displayName
    } else {
        toggleHTMLElem()
    }

}
loginForm.addEventListener('submit', e => {
    e.preventDefault()
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
})
registrationButton.addEventListener('click', e => {
    e.preventDefault()
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
})

