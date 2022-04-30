/*
export function someGetter (state) {
}
*/

export function permission(state, permission_name) {
  const permissionList = LocalStorage.getItem("permissions") || {};
  const permissions = permissionList[permission_name];
  if (permissions) {
    return type => {
      return permissions.includes(`${type}_${permission_name}`);
    };
  }
  return () => false;
}

export function token(state) {
  return state.key;
}
