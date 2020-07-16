import Post, { IPost } from './PostModel';
import Dataloader from 'dataloader';


const postDataLoader = new Dataloader((keys: string[]) => Post.find({_id: {$in: keys}}));
const postByCommentDataLoader = new Dataloader((keys: string[]) => Post.find({comments: {$in: keys}}));

export const postLoader = async (id: string) => {

    console.log('postloader call');

    const postFounded = await postDataLoader.load(id);
    console.log('post founded by dataloader: ', postFounded);
    return postFounded;
};

export const postLoaderByComment = async (commentId: string) => {

    console.log('postloader by comments call');

    const postFounded = await postByCommentDataLoader.load(commentId);
    return postFounded;
}

// TODO implement dataloader for this database call
export const postsLoaderByAuthors = async (ids: string[]) => {

    const postList = await Post.findByAuthorIdList(ids);
    return postList;
}

// TODO implement dataloader for multiple post for one author if is logical
export const authorPostsLoader = async (id: string) => {

    console.log('postloader by author call');

    const authorPosts = await Post.findAuthorPosts(id);
    return authorPosts
};

export const loggedUserPosts = async (token: string) => {

    console.log('postloader by loggeduser call');

    const posts = await Post.findLoggedUserPosts(token);
    return posts;
};