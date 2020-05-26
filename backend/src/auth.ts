import User, { IUser } from "./modules/users/UserModel";


const getUser = async (token: string): Promise<IUser | {user: null}> => {
    try {
        const user = await User.findByToken(token);
        if (user) {
            user.verifyAuthToken();
            return user;
        }
    } catch(err) {
        return { user: null };
    }
}

export default getUser;