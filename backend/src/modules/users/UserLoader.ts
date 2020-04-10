import userModel, { IUser } from './UserModel';

const loadUser = (user: IUser, field: keyof IUser) => {
    console.log('loadUser entrou');
    console.log('user in loggeduser: ', user);
    return user[field];
}

const userLoader = (user: IUser, field: keyof IUser) => {
    return field === 'tokens' ? user.tokens[0].token : user[field];
}

const loadLoggedUser = async (token: string) => {
    console.log('entrou aqui load logged user');
    console.log(token);
    try {
        const user = await userModel.find({tokens: [{token}]});
        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
    }
}

export { loadUser, loadLoggedUser, userLoader };