import Post, { IPost } from './PostModel';

export const postLoader = (id: string) => {
    return Post.findById(id);
};

export const postsLoaderByAuthors = async (ids: string[]) => {
    const postList = await Post.findByIdList(ids);
    console.log(postList);
    return postList
}

export const authorPostsLoader = async (id: string) => {
    const authorPosts = await Post.findAuthorPosts(id);
    return authorPosts
};

export const loggedUserPosts = async (token: string) => {
    const posts = await Post.findLoggedUserPosts(token);
    return posts;
};