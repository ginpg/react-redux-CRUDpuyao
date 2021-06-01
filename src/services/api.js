const BASE_URL = 'https://sgp-api-stg.shokworks.io/'

class API {
  headers = {
    Accept: 'application/json'
  }

  getHeader(formData = false) {
    if (localStorage.getItem('access_token'))
      this.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    if (!formData) {
      this.headers['Content-Type'] = 'application/json'
    } else {
      delete this.headers['Content-Type']
    }
    return this.headers
  }

  get(url, query = null, blob = false) {
    let params = {
      method: 'get',
      headers: this.getHeader()
    }

    if (query && query.filters) query.filters = btoa(JSON.stringify(query.filters))
    return this.invoke(url, params, query, blob)
  }

  put(url, body, query, isFormData = false) {
    let params = {
      method: 'put',
      headers: this.getHeader(),
      body: isFormData ? body : JSON.stringify(body)
    }
    if (query && query.filters) query.filters = btoa(JSON.stringify(query.filters))

    return this.invoke(url, params, query)
  }

  patch(url, body, isFormData = false) {
    let params = {
      method: 'PATCH',
      headers: this.getHeader(isFormData),
      body: isFormData ? body : JSON.stringify(body)
    }

    return this.invoke(url, params)
  }

  post(url, body, query, isFormData = false, blob = false ) {
    //body={email, password, remember}
    let params = {
      method: 'post',
      headers: this.getHeader(isFormData),
      body: isFormData ? body : JSON.stringify(body)
    }
    if (query && query.filters) query.filters = btoa(JSON.stringify(query.filters))

    return this.invoke(url, params, query, blob)
  }

  delete(url, body) {
    let params = {
      method: 'delete',
      headers: this.getHeader()
    }

    if (body) params.body = JSON.stringify(body)

    return this.invoke(url, params)
  }

  invoke(url, params, query = null, blob = false) {
    //-- Prepare URL
    let apiUrl = new URL(`${BASE_URL}${url}`)
    if (query) apiUrl.search = new URLSearchParams(query).toString()

    //-- Prepare abort signal
    const controller = new AbortController()
    const { signal } = controller

    //-- Prepare params
    const fetchParams = {
      ...params,
      signal // extendemos los parámetros proporcionados con la señal AbortController
    }
    const promise = new Promise((resolve, reject) => {
      fetch(apiUrl, fetchParams)
        .then(response => {
          return {
            status: response.status,                          // status = 201 (exitoso)
            data: blob ? response.blob() : response.json()
          }
        })
        .catch(error => {
          return reject(error)
        })
        .then(response => {
          if (!response || !response.status) return reject({ response: true })
          if (response.status >= 200 && response.status < 300) return resolve(response.data)
          else return reject(response.data)
        })
    })

    return [promise, controller]
  }
}

export default new API()
