import Reply, {IReply} from './ReplyModel';

export const replyLoader = async (id: string) => {
    return await Reply.findOne({_id: id});
}