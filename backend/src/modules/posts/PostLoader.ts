import Post, { IPost } from './PostModel';

export const postLoader = (post: IPost, field: keyof IPost) => {
    return post[field];
}