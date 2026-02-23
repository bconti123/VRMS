export function authLevelRedirect(user) {
  let loginRedirect;
  const userAccessLevel = user.accessLevel;

  switch (userAccessLevel) {
    case 'superadmin':
      loginRedirect = '/welcome';
    case 'admin':
      loginRedirect = '/welcome';
      break;
    case 'user':
      loginRedirect = '/welcome';
      break;
    default:
    // Do nothing (harder than you think).
  }

  return loginRedirect;
}
