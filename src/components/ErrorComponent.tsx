export default function ErrorComponent({
    message,
    statusCode,
    path,
    button,
    buttonText,
}: {
    message?: string;
    statusCode?: number;
    path?: string;
    button?: JSX.Element;
    buttonText?: string;
}) {
    return (
        <div className='mx-auto my-auto flex h-full w-[75%] flex-col items-center justify-center gap-[10px]'>
            <div className='flex w-full items-center justify-center'>
                <img src='/error/lost-rabbit.png' alt='lost rabbit' width={154} height={154} />
                {statusCode && statusCode !== 404 && <div className='pr-[37px] text-[47px]'>{statusCode}</div>}
            </div>
            <div className='text-center text-base'>{message || 'Internal Server Error. Please try again later.'}</div>
            {button || (
                <a
                    href={path ?? '/'}
                    className='cursor-pointer text-base text-orange-400 transition-opacity hover:opacity-40'
                >
                    {buttonText || 'go back'}
                </a>
            )}
        </div>
    );
}
