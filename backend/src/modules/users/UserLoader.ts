import userModel, { IUser } from './UserModel';
import Dataloader from 'dataloader';

console.log('load user module');

const userLoader = new Dataloader((keys: string[]) => userModel.find({_id: {$in: keys}}));

const loadUser = async (id: string) => {

    console.log('loaduser id: ', id);
    const user = await userLoader.load(id);

    console.log('user by dataloader: ', user);
    return user;
}

const userIdLoader = (user: IUser, field: keyof IUser) => {
    return field === 'tokens' ? user.tokens[0].token : user[field];
}

const loadLoggedUser = async (token: string) => {
    console.log('loggeduser token: ', token);

    const user = await userModel.find({tokens: [{token}]});

    console.log('logged user by dataloader: ', user);
    return user;
}

export { loadUser, loadLoggedUser, userLoader, userIdLoader };