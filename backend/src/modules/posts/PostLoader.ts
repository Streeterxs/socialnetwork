import Post, { IPost } from './PostModel';

export const postLoader = (post: IPost, field: keyof IPost) => {
    return post[field];
};

export const authorPostsLoader = async (id: string) => {
    const authorPosts = await Post.findAuthorPosts(id);
    return authorPosts
};

export const loggedUserPosts = async (token: string) => {
    const posts = await Post.findLoggedUserPosts(token);
    return posts;
};