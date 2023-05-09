export default function ({ $axios, redirect, store, app }) {
  // export default function(config) {
  $axios.onRequest((config) => {
    config.headers.common['Authorization'] = `Bearer ${store.getters['auth/token']}`
  })
  $axios.onError((error) => {
    if (error.response.status === 401) {
      localStorage.clear()
      redirect('/login')
    }
  })
  $axios.onError((error) => {
    if (error.response.status) {
      app.$swal({
        icon: 'error',
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  })
}
