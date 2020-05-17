import React, { unstable_useTransition as useTransition} from 'react';

const CommentCreation = ({formSubmit, commentContentChange}: {
    formSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    commentContentChange: (event: string) => void
}) => {
    const [startTransition, isPending] = useTransition({
        timeoutMs: 10000
    });
    const concurrentFormSubmit = (event: any) => {
        startTransition(() => {
            formSubmit(event);
        })
    };
    return(
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            concurrentFormSubmit(event);
        }}>
            <input type="text" name="commentContent" onChange={(event) => commentContentChange(event.target.value)}/>
            <button hidden disabled={isPending} type="submit"></button>
            {isPending ? 'loading' : null}
        </form>
    );
};

export default CommentCreation;