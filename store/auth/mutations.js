export function set_login(
  state,
  {
    groups = {},
    isStaff = false,
    key = '',
    role = 'NONE',
    supervisor = 'NONE',
    username = 'UnAuthorizeUser',
    workspace = 'workspace',
  }
) {
  localStorage.clear()

  state.groups = groups
  state.isStaff = isStaff
  state.key = key
  state.role = role
  state.supervisor = supervisor
  state.username = username
  state.workspace = workspace

  localStorage.setItem('groups', state.groups)
  localStorage.setItem('key', state.key)
  localStorage.setItem('role', state.role)
  localStorage.setItem('supervisor', JSON.stringify(state.supervisor))
  localStorage.setItem('username', state.username)
  localStorage.setItem('workspace', state.workspace)
}

export function set_website(state, payload) {
  state.website = payload
  localStorage.setItem('website', payload)
}
export function set_logout(state) {
  localStorage.clear()
  state.credit = 0
  state.key = ''
  state.role = -1
  state.username = ''
  state.user_permissions = []
}
export function set_user(state, { credit = 0, key = '', role = -1, user_permissions = {}, username = 'unknown' }) {
  localStorage.clear()
  state.credit = credit
  state.key = key
  state.role = role
  state.username = username
  state.user_permissions = user_permissions
  localStorage.setItem('credit', state.credit)
  localStorage.setItem('key', state.key)
  localStorage.setItem('role', state.role)
  localStorage.setItem('username', state.username)
  localStorage.setItem('user_permissions', state.user_permissions)
}
