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
        <form className="w-full" onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            concurrentFormSubmit(event);
        }}>
            <input
                type="text"
                name="commentContent"
                className="placeholder-white appearance-none block w-full bg-gray-500 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Comment..."
                onChange={(event) => commentContentChange(event.target.value)}/>
            <button hidden disabled={isPending} type="submit"></button>
            {isPending ? 'loading' : null}
        </form>
    );
};

export default CommentCreation;