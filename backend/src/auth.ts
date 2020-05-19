import User from "./modules/users/UserModel";


const getUser = async (token: string) => {
    try {
        const user = await User.findByToken(token);
        if (user) {
            user.verifyAuthToken();
            return user;
        }
    } catch(err) {
        console.log(err);
    }
}

export default getUser;