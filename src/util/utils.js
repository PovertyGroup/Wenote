let store = {
    set jwt(value) {
        window.localStorage.setItem('jwt', value)
    },
    get jwt() {
        if(window.isEmulated)
            return window.jwt
        return window.localStorage.getItem('jwt')
    },
    set info(value) {
        window.localStorage.setItem('id', value)
    },
    get info() {
        if(window.isEmulated)
            return window.userId
        return window.localStorage.getItem('id')
    }
}
let getAuthorizedHeader = function() {
    if (localStorage.getItem('jwt'))
        return {
            Authorization: 'Bearer ' + store.jwt,
        }
    return {};
}

let composeUrl = function(serverUrl, path) {
    if (serverUrl.endsWith('/') && !path.startsWith('/'))
        return serverUrl + path
    else if (serverUrl.endsWith('/') && path.startsWith('/'))
        return serverUrl.substring(0, serverUrl.length - 1) + path
    else if (!serverUrl.endsWith('/') && path.startsWith('/'))
        return serverUrl + path
    else
        return serverUrl + '/' + path
}

module.exports = {
    store,
    composeUrl,
    getAuthorizedHeader
}