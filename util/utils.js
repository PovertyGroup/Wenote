const composeUrl = function (serverUrl, path) {
  if (serverUrl.endsWith('/') && !path.startsWith('/')) { return serverUrl + path } else if (serverUrl.endsWith('/') && path.startsWith('/')) { return serverUrl.substring(0, serverUrl.length - 1) + path } else if (!serverUrl.endsWith('/') && path.startsWith('/')) { return serverUrl + path } else { return serverUrl + '/' + path }
}

export default {
  composeUrl
}
