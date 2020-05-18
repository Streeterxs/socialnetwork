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
            <input
                type="text"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={event => replyContentChange(event.target.value)}/>
            <button hidden type="submit" disabled={isPending}></button>
            {isPending ? 'loading...' : null}
        </form>
    );
};

export default ReplyCreation;