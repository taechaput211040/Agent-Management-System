export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (!store.state.auth.key) {
    return redirect('/login')
  }
  if (store.state.auth.groups) {
    let permission = store.state.auth.groups
    const mainmenu = store.state.menu
    let currentRoutes = route.name
    let isClone = store.state.account.profile?.isClone
    console.log(isClone, 'isClone')
    let listMenu = mainmenu.filter((menu) => {
      return permission.includes(menu.permission)
    })
    if (isClone) {
      let path = currentRoutes
      if (currentRoutes.includes('-')) {
        path = currentRoutes.split('-')[0]
      }
      // listMenu.find((x)=>x.to === `/${path}`
      if (listMenu.find((x) => x.to === `/${path}`) || path === 'index') {
      } else {
        return redirect('/')
      }
    }
  }
  // if (localStorage.getItem("key")) {
  //   return redirect("/login");
  // }
}
