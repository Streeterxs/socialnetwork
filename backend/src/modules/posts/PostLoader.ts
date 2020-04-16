import Post, { IPost } from './PostModel';

export const postLoader = (post: IPost, field: keyof IPost) => {
    return post[field];
}

export const authorPostsLoader = (token: string) => {
    const authorPosts = Post.findAuthorPosts(token);
    console.log(authorPosts);
    return authorPosts
}