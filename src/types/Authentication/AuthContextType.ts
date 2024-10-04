import User from '../User/UserInterface';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

export default AuthContextType;