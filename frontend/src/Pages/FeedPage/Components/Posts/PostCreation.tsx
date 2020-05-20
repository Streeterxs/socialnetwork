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
        <form onSubmit={postSubmitTransition} className="w-full border rounded shadow-md px-4 py-2">
            <textarea
                onChange={(event) => contentChange(event.target.value)}
                className="mb-3 placeholder-gray w-full appearance-none block bg-transparent text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Share your thoughts"/>
            <button disabled={isPending} className="bg-teal-700 hover:bg-teal-600 px-3 py-2 ml-auto text-white block rounded" type="submit">Share</button>
            {isPending ? 'loading...' : null}
        </form>
    );
};

export default PostCreation;