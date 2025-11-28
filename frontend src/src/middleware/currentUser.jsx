import { useAuth } from "../contexts/AuthContext.jsx";

export function currentUser()
    {
        const { accessToken } = useAuth();
        const { user } = useAuth();

        let currentUser = "Guest";
        if(accessToken)
        {
            const currentUserWithQuotes = JSON.stringify(user.username);
            const currentUserWithoutQuotes = currentUserWithQuotes.split('"').join('');
            return currentUserWithoutQuotes;
        }
        return currentUser
    }