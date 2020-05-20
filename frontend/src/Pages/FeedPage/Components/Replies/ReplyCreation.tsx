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
        <form className="w-full" onSubmit={replyCreationSubmitTransition}>
            <input
                type="text"
                className="placeholder-white w-full appearance-none block bg-gray-500 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                placeholder="Reply..."
                onChange={event => replyContentChange(event.target.value)}/>
            <button hidden type="submit" disabled={isPending}></button>
            {isPending ? 'loading...' : null}
        </form>
    );
};

export default ReplyCreation;