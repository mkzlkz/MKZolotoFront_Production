// const getToken = () => {
//     if (localStorage.getItem('token')) {
//         return localStorage.getItem('token')
//     }
// }

// const getAuthData = () => {
//     if (localStorage.getItem('token')) {
//         return atob(getToken().split(" ")[1]).split(":")
//     }
// }

// const saveToken = (token) => {
//     localStorage.setItem('token', token)
// }

// const saveUser = (user) => {
//     localStorage.setItem('user', JSON.stringify(user))
// }

// const getUser = () => {
//     if (localStorage.getItem('user')) {
//         return JSON.parse(localStorage.getItem('user'))
//     }
// }

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

// const isLoggedIn = () => {
//     const user = getUser()
//     if (user) {
//         return true
//     } else {
//         return false
//     }
// }

// const logout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
// }

// const verifiedUser = () => {
//     if (isLoggedIn()) {
//         if (getUser().roles) {
//             if (getUser().roles.name === 'shop') {
//                 if (_.isObject(getUser().shop_data)) {
//                     if (getUser().shop_data.confirmed !== 'confirmed') {
//                         return '/moderation'
//                     } else {
//                         return null
//                     }
//                 } else {
//                     return '/step3'
//                 }
//             } else {
//                 return null
//             }
//         }
//         else if (getUser().is_manager === true) {
//             if (_.isObject(getUser().shop_data)) {
//                 if (getUser().shop_data.confirmed !== 'confirmed') {
//                     return '/moderation'
//                 } else {
//                     return null
//                 }
//             } else {
//                 return '/step3'
//             }

//         }
//         else {
//             return '/step2'
//         }
//     } else {
//         return '/authorization'
//     }
// }

export default () => {
    return {
        // getToken,
        // getAuthData,
        // saveToken,
        // saveUser,
        // getUser,
        // logout,
        // isLoggedIn,
        setLanguage,
        getLanguage,
        // verifiedUser
    }
}
