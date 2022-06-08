/*
export function someGetter (state) {
}
*/

export function permission(state, permission_name) {
  const permissionList = LocalStorage.getItem('permissions') || {}
  const permissions = permissionList[permission_name]
  if (permissions) {
    return (type) => {
      return permissions.includes(`${type}_${permission_name}`)
    }
  }
  return () => false
}

export function token(state) {
  return state.key
}

export function isRoleLevel(state) {
  let level = -1
  if (state.role === 'ADMIN') {
    level = 0
  } else if (state.role === 'STAFF') {
    level = 1
  } else if (state.role === 'OWNER') {
    level = 2
  } else if (state.role === 'SHAREHOLDER') {
    level = 3
  } else if (state.role === 'SENIOR') {
    level = 4
  } else if (state.role === 'AGENT') {
    level = 5
  } else if (state.role === 'MEMBER') {
    level = 6
  }
  return level
}
