import Reply, {IReply} from './ReplyModel';

export const replyLoader = (reply: IReply, field: keyof IReply) => {
    return reply[field];
}