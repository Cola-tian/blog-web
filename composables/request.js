// /composables/useHttp.ts


import { hash } from 'ohash'




function handleError (
  _method,
  _response,
) {
  // Handle the error
}

function checkRef (obj) {
  return Object.keys(obj).some(key => isRef(obj[key]))
}

function fetch (url, opts) {
  // Check the `key` option 
  const { key, params, watch } = opts
  // if (!key && ((params && checkRef(params)) || (watch && checkRef(watch))))
  //   console.error('\x1B[31m%s\x1B[0m %s', '[useHttp] [error]', 'The `key` option is required when `params` or `watch` has ref properties, please set a unique key for the current request.')

  const options = opts
  options.lazy = options.lazy ?? true

  const { baseURL } = useRuntimeConfig().public

  return useFetch(url, {
    // 设置请求头
    onRequest ({ options }) {
      // Set the base URL
      // options.baseURL = apiBaseUrl
      // Set the request headers

      // options.headers = new Headers(options.headers)
      // options.headers.set('Content-Language', locale)
    },
    // Response interception
    onResponse (_context) {
      // Handle the response
    },
    // Error interception
    onResponseError ({ response, options: { method } }) {
      handleError(method, response)
    },
    baseURL,
    // // Set the cache key
    // key: key ?? hash(['api-fetch', url, JSON.stringify(options)]),
    // Merge the options
    ...options,
  })
}

export const useHttp = {
  get: (url, params, option) => {
    return fetch(url, { method: 'get', params, ...option })
  },

  post: (url, body, option) => {
    return fetch(url, { method: 'post', body, ...option })
  },

  put: (url, body, option) => {
    return fetch(url, { method: 'put', body, ...option })
  },

  delete: (url, body, option) => {
    return fetch(url, { method: 'delete', body, ...option })
  },
}