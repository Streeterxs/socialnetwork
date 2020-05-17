import React, { unstable_useTransition as useTransition } from 'react';

const ReplyCreation = ({formSubmit, replyContentChange}: {
    formSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    replyContentChange: (event: string) => void
}) => {
    const [startTransition, isPending] = useTransition({
        timeoutMs: 10000
    });

    const replyCreationSubmitTransition = (event: React.FormEvent<HTMLFormElement>) => {
        startTransition(() => {
            formSubmit(event);
        })
    };
    return(
        <form onSubmit={replyCreationSubmitTransition}>
            <input type="text" onChange={event => replyContentChange(event.target.value)}/>
            <button hidden type="submit" disabled={isPending}></button>
            {isPending ? 'loading...' : null}
        </form>
    );
};

export default ReplyCreation;