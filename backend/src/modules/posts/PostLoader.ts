import Post, { IPost } from './PostModel';
import mongoose from 'mongoose'

export const postLoader = async (id: string) => {
    const postFounded = await Post.findById(id);
    return postFounded;
};

export const postLoaderByComment = async (commentId: string) => {
    const postFounded = await Post.findOne({comments: commentId});
    return postFounded;
}

export const postsLoaderByAuthors = async (ids: string[]) => {
    const postList = await Post.findByIdList(ids);
    Post.update({_id: postList[postList.length - 1].id}, {$set: {comments: []}});
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