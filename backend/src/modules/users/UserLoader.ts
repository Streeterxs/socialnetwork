import userModel, { IUser } from './UserModel';

const loadUser = (user: IUser, field: keyof IUser) => {
    return user[field];
}

const userLoader = (user: IUser, field: keyof IUser) => {
    return field === 'tokens' ? user.tokens[0].token : user[field];
}

const loadLoggedUser = async (token: string) => {
    try {
        const user = await userModel.find({tokens: [{token}]});
        return user;
    } catch (err) {
        console.log(err);
    }
}

export { loadUser, loadLoggedUser, userLoader };