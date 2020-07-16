import Reply, {IReply} from './ReplyModel';
import Dataloader from 'dataloader';

const replyDataLoader = new Dataloader((keys: string[]) => Reply.find({_id: {$in: keys}}));

export const replyLoader = async (id: string) => {
    return await replyDataLoader.load(id);
}
