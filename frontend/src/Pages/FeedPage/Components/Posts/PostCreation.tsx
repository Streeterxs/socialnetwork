import React, { unstable_useTransition as useTransition } from 'react';

const PostCreation = ({contentChange, formSubmit}: 
    {
        contentChange: (content: string) => void,
        formSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    }
    ) => {
    const [startTransition, isPending] = useTransition({
            timeoutMs: 10000
        });

    const postSubmitTransition = (event: React.FormEvent<HTMLFormElement>) => {
        startTransition(() => {
            formSubmit(event);
        })
    }

    return (
        <form onSubmit={postSubmitTransition}>
            <input
                onChange={(event) => contentChange(event.target.value)}
                type="text"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""/>
            <button hidden disabled={isPending} type="submit"></button>
            {isPending ? 'loading...' : null}
        </form>
    );
};

export default PostCreation;