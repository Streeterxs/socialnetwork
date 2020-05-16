import User from "./modules/users/UserModel";


const getUser = async (token: string) => {
    try {
        const user = await User.findByToken(token);
        if (user) {
            user.verifyAuthToken();
            return user;
        }
    } catch(err) {
        throw new Error(err);
    }
}

export default getUser;