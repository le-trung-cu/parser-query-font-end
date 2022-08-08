import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth"
import { checkPermission } from "./check-permission";

export const Permission = ({children, noAccess = null, roles = [], type = 'one-of'}) => {
    const {user} = useAuth();
    const [hasAccess, setHasAccess] = useState(user.authenticated? checkPermission(user, roles, {type}): false);

    useEffect(() => {
        if(!user.authenticated) {
            setHasAccess(false);
            return;
        }
        const doesHaveAccess = checkPermission(user, roles, {type});
        setHasAccess(doesHaveAccess);
    }, [user.id, user.roles, roles, type])

    const renderNoAccess = () => {
        if(typeof noAccess === 'function') {
            return noAccess({user, hasAccess});
        }
        return noAccess;
    }

    return hasAccess ? children : renderNoAccess() || null;
}