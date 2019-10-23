const getToken = () => {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token')
    }
}

const getAuthData = () => {
    if (localStorage.getItem('token')) {
        return atob(getToken().split(" ")[1]).split(":")
    }
}

const saveToken = (token) => {
    localStorage.setItem('token', token)
}

const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const getUser = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
    }
}

const setLanguage = (lang) => {
    localStorage.setItem('app_lang', lang)
}

const getLanguage = () => {
    if (localStorage.getItem('app_lang')) {
        return localStorage.getItem('app_lang')
    }
    else {
        return 'ru'
    }
}

const isTokenIn = () => {
    const token = getToken()
    if (token) {
        return true
    } else {
        return false
    }
}

const isLoggedIn = () => {
    const user = getUser()
    if (user) {
        return true
    } else {
        return false
    }
}

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

const verifiedUser = () => {
    if (isTokenIn()) {
        return true
    } else {
        return '/'
    }
}

export default () => {
    return {
        setLanguage,
        getLanguage,
        getToken,
        getAuthData,
        saveToken,
        saveUser,
        getUser,
        logout,
        isLoggedIn,
        verifiedUser,
        isTokenIn
    }
}
