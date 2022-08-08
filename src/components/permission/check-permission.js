const permissionCheckTypeMethods = {
    'one-of': (roles = []) => roles.some,
    'all-of': (roles = []) => roles.every,
}

export const checkPermission = (user, roles = [], config = {}) => {
    const { type = 'on-of' } = config;

    const checkMethod = permissionCheckTypeMethods[type] ?? permissionCheckTypeMethods['one-of'];
    const userRoles = user?.roles ?? [];

    const hasAccess = checkMethod(roles).bind(roles)((role) => {
        if(role === 'logged-in'){
            return Boolean(user?.id);
        }
        return userRoles.includes(role);
    })

    return hasAccess;
}