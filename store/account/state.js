export default function () {
  return {
    profile: JSON.parse(localStorage.getItem('profile')) || null,
    credit: null,
  }
}
