// Define a type for the user object
interface User {
    id: number;
    name: string;
    role: 'resident' | 'admin';
    avatar: string;
}

export default User;