import Post, { IPost } from './PostModel';

export const postLoader = (id: string) => {
    return Post.findById(id);
};

export const authorPostsLoader = async (id: string) => {
    const authorPosts = await Post.findAuthorPosts(id);
    return authorPosts
};

export const loggedUserPosts = async (token: string) => {
    const posts = await Post.findLoggedUserPosts(token);
    return posts;
};