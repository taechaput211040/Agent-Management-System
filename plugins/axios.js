export default function({ $axios, redirect, store }) {
  // export default function(config) {
  $axios.onRequest(config => {
    config.headers["Authorization"] = `${store.getters["auth/token"]}`;
  });
  $axios.onError(error => {
    if (error.response.status === 401) {
      redirect("/login");
    }
  });
}
