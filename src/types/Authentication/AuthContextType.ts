import User from '../user/User';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

export default AuthContextType;