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
const exitElem = document.querySelector('.exit-link')
const editElem = document.querySelector('.edit-info')
const editContainer = document.querySelector('.edit-container')
const editUserName = document.querySelector('.edit-username')
const editPhotoURL = document.querySelector('.edit-photo')
const userAvatarElem = document.querySelector('.user-photo')
const postsWrapper = document.querySelector('.posts')
// добавляет \ удаляет класс visible
const toggleVisibleClass = elem => elem.classList.toggle('visible')

// выбирает строку до @
const getUserNameFromEmail = email => email.slice(0, email.indexOf('@'))

// валидация email
const regValid = email => (/[-.\w]+@([\w-]+\.)+[\w-]+/g).test(email)

// создание HTML элементов на основе массива с тэгами
const tagsElemMaker = tags => tags.map(tag => `<a href="#" class="post-tag">${tag}</a>`).join("")

// количество прошедших минут после размещения поста
const timePassedForPost = postData => (Math.floor((Date.now() - postData) / 60000))

const showAllPosts = () => {
    let postsHTML = '';
    setPosts.posts.forEach(({title, text, tags, likes, commentsNumber, date, authorEmail}) => {
            let tagsElem = tagsElemMaker(tags) //получаем массив тегов
            let currentUser = setUsers.getUser(authorEmail) // получаем автора поста
            let authorDisplayName = currentUser.displayName // читаем его имя
            let photo = currentUser.photoURL ? currentUser.photoURL : ' https://sun9-67.userapi.com/c850220/v850220479/353a/ZQH71jFzfPk.jpg?ava=1'

            postsHTML += ` <section class="post">
            <div class="post-body">
                <h2 class="post-title">${title}</h2>
                <p class="post-text">
                    ${text}
                </p>
                <div class="post-tags">
                  ${tagsElem}
                </div>
            </div>
            <div class="post-footer">
                <div class="post-buttons">
                    <button class="post-button likes">
                        <svg height="20" width="20" class="icon icon-like">
                            <use xlink:href="./assets/img/post-icons.svg#likes"></use>
                        </svg>
                        <span class="likes-counter">${likes}</span>
                    </button>
                    <button class="post-button comments">
                        <svg height="22" width="22" class="icon icon-comments">
                            <use xlink:href="./assets/img/post-icons.svg#comments"></use>
                        </svg>
                        <span class="comments-counter">${commentsNumber}</span>
                    </button>
                    <button class="post-button save">
                        <svg height="20" width="20" class="icon icon-save">
                            <use xlink:href="./assets/img/post-icons.svg#save"></use>
                        </svg>
                    </button>
                    <button class="post-button share">
                        <svg height="18" width="20" class="icon icon-share">
                            <use xlink:href="./assets/img/post-icons.svg#share"></use>
                        </svg>
                    </button>
                </div>
                <div class="post-author">
                    <div class="author-about">
                        <a href="#" class="author-link">${authorDisplayName}</a>
                        <span class="post-time">${timePassedForPost(date)} мин. назад</span>
                    </div>
                    <a href="#" class="avatar-link"></a> <img src="${photo}" width="34" height="34"
                                                              class="post-avatar" alt="avatar">
                </div>
            </div>
        </section>`
        }
    )

    postsWrapper.innerHTML = postsHTML

}


const listUsers = [
    {
        id: 1,
        email: 'aaa@gras.com',
        password: '123321',
        displayName: 'Artem',
        photoURL: ''
    },
    {
        id: 2,
        email: 'regbi09@kerker.js',
        password: '123321',
        displayName: 'regbi09',
        photoURL: './assets/img/avatar.jpg'
    }
]
const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regValid(email)) {
            return alert('Не валидный адрес')
        }
        const user = this.getUser(email)
        if (user && user.password === password) {
            this.authorizedUser(user)
            handler()
        } else {
            alert('Пользователь с таким e-mail не найден')
        }
    },
    logOut(handler) {
        this.user = null
        handler()
    },
    signUp(email, password, handler) {
        if (!email.trim() || !password.trim()) {
            return alert('Введите данные')
        }
        if (!this.getUser(email)) {
            const user = {id: listUsers.length + 1, email, password, displayName: getUserNameFromEmail(email)}
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
    },
    editUser(userName, userPhoto, handler) {
        if (userName) {
            this.user.displayName = userName
        }
        if (userPhoto) {
            this.user.photoURL = userPhoto
        }
        handler()
        toggleVisibleClass(editContainer)
    }
}
const setPosts = {
    posts: [
        {
            title: 'Что такое SPA?',
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi assumenda atque culpa
                    delectus
                    dicta, dolores eaque eius enim facere harum ipsum itaque mollitia nesciunt, nisi quae, quis
                    reprehenderit similique sint temporibus ut vel voluptatem voluptates. Accusamus aliquam autem
                    dignissimos iste magni nihil nisi obcaecati officia optio quis quo, ratione rerum sint tempore unde
                    velit vero. Asperiores corporis, dolore, esse hic illo illum ipsum mollitia neque obcaecati, qui
                    quis
                    quos sequi! A ad aperiam aut autem beatae deleniti eaque earum et explicabo hic in laudantium maxime
                    neque nesciunt quia quis quo, reiciendis repudiandae saepe sit. Ab dolore numquam odit repellendus.`,


            tags: ['#свежее', '#горячее', '#рек', '#шок'],
            likes: 78,
            commentsNumber: 34,
            authorEmail: 'aaa@gras.com',
            date: '1605195204397'
        },
        {
            title: 'Продолжаем верстку',
            text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi assumenda atque culpa
                    delectus
                    dicta, dolores eaque eius enim facere harum ipsum itaque mollitia nesciunt, nisi quae, quis
                    reprehenderit similique sint temporibus ut vel voluptatem voluptates. Accusamus aliquam autem
                    dignissimos iste magni nihil nisi obcaecati officia optio quis quo, ratione rerum sint tempore unde
                    velit vero. Asperiores corporis, dolore, esse hic illo illum ipsum mollitia neque obcaecati, qui
                    quis
                    quos sequi! A ad aperiam aut autem beatae deleniti eaque earum et explicabo hic in laudantium maxime
                    neque nesciunt quia quis quo, reiciendis repudiandae saepe sit. Ab dolore numquam odit repellendus.`,


            tags: ['#ностальгия', '#учеба', '#рек'],
            likes: 100,
            commentsNumber: 32,
            authorEmail: 'regbi09@kerker.js',
            date: 1605195144157,

        }
    ],
}
const toggleHTMLElem = () => {
    toggleVisibleClass(loginElem)
    toggleVisibleClass(userElem)
    toggleVisibleClass(sidebarMenu)
    toggleVisibleClass(newPostButton)
}
const toggleAuthDom = () => {
    const user = setUsers.user
    if (user) {
        if (loginElem.classList.contains('visible')) {
            toggleVisibleClass(loginElem)
        }
        if (!userElem.classList.contains('visible')) {
            toggleVisibleClass(userElem)
        }
        if (!sidebarMenu.classList.contains('visible')) {
            toggleVisibleClass(sidebarMenu)
        }
        if (!newPostButton.classList.contains('visible')) {
            toggleVisibleClass(newPostButton)
        }
        userName.textContent = user.displayName
        userAvatarElem.src = user.photoURL || userAvatarElem.src
    } else {
        toggleHTMLElem()
    }

}
menuToggleButton.addEventListener("click", e => {
    e.preventDefault()
    toggleVisibleClass(sidebarBody)
})

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
})
registrationButton.addEventListener('click', e => {
    e.preventDefault()
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
})
exitElem.addEventListener('click', e => {
    e.preventDefault()
    setUsers.logOut(toggleAuthDom)
})
editElem.addEventListener('click', e => {
    e.preventDefault()
    toggleVisibleClass(editContainer)
    editUserName.value = setUsers.user.displayName
})
editContainer.addEventListener('submit', e => {
    e.preventDefault()
    setUsers.editUser(editUserName.value, editPhotoURL.value, toggleAuthDom)

})

document.addEventListener("DOMContentLoaded", showAllPosts);