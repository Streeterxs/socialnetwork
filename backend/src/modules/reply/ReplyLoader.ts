import Reply, {IReply} from './ReplyModel';

export const replyLoader = async (id: string) => {
    return await Reply.find({_id: id});
}