import { useEffect, useState } from 'react';
import RefreshIcon from '../components/RefreshIcon';
import PasteInput from '../components/PasteInput';
import ErrorComponent from '../components/ErrorComponent';

const classes = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

function PromptMessage({ message, className }: { message: string; className?: string }) {
    return (
        <div
            className={classes(
                'mb-4 max-w-[75%] rounded-l-[12px] rounded-tr-[12px] bg-gray-700 px-4 py-2 text-white',
                className,
            )}
        >
            <p className='text-right text-sm'>{message}</p>
        </div>
    );
}

function PromptList({
    examplePrompts,
    onPromptClicked,
}: {
    examplePrompts: string[];
    onPromptClicked: (prompt: string) => void;
}) {
    return (
        <div className='mt-12 flex w-full flex-col items-start justify-start gap-8 text-[16px] text-white'>
            {/* Title Section */}
            <div className='flex flex-row items-center justify-start gap-2'>
                <div className='text-[30px] text-white'>LAM</div>
                <div className='ml-2 inline-block rounded-full border border-orange-400 px-2 py-1 text-[12px] font-light leading-none text-orange-400'>
                    playground
                </div>
            </div>

            {/* Instruction Section */}
            <div>
                Describe the task you’d like LAM to perform for you on any website. Make sure to include the URL in your
                request. Here are a few examples for inspiration:
            </div>

            {/* Example Prompts Section */}
            <div className='flex w-full flex-col items-end justify-start gap-2'>
                {examplePrompts.map((prompt, index) => (
                    <div
                        key={`example-prompt-${index}`}
                        onClick={() => onPromptClicked(prompt)}
                        className='flex justify-end'
                    >
                        <PromptMessage
                            message={prompt}
                            className='cursor-pointer border-[1px] border-white bg-transparent text-[16px] hover:opacity-80'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TitleComponent({
    title,
    titleBadge,
    className,
    children,
}: {
    title: string;
    titleBadge?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={classes(
                'flex h-full flex-col justify-start overflow-hidden rounded-2xl bg-[linear-gradient(40.1deg,#141414_0%,#252525_100.84%)]',
                className,
            )}
        >
            <h1 className='bg-gray-850 flex h-[50px] w-full flex-row items-center justify-center text-sm'>
                {title}
                {titleBadge && (
                    <div className='ml-2 inline-block rounded-full border border-orange-400 px-1 py-0.5 text-[10px] font-light leading-none text-orange-400'>
                        {titleBadge}
                    </div>
                )}
            </h1>
            <div className='grow'>{children}</div>
        </div>
    );
}

export default function LAM({}) {
    const accessToken = '123';

    const [noVncUrl /*setNoVncUrl*/] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    const fetchLAMSession = async () => {
        setIsLoading(true);
        try {
            if (!accessToken) {
                setErrorMessage("The page you're looking for could not be found.");
                setIsLoading(false);
                return;
            }

            // Assuming `getHoleClient` and other utilities are defined elsewhere.
            //const response = await getHoleClient().get_fetchActiveLAMSession.fetch({
            //    accessToken,
            //});
            //
            //if (response.hasActiveSession) {
            //    setNoVncUrl(response.noVNCUrl ?? '');
            //}
        } catch (error) {
            setErrorMessage('An error occurred while fetching the session.');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchLAMSession();
    }, [accessToken]);

    //const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //};

    const handleSubmit = () => {
        if (inputValue && accessToken) {
            setChatHistory([...chatHistory, inputValue]);
            setInputValue('');
            fetchLAMSession();
        }
    };

    if (errorMessage) {
        return <ErrorComponent message={errorMessage} statusCode={404} />;
    }

    return (
        <div className='flex w-full flex-row gap-5'>
            {/* Left Section */}
            <div className='w-[33%]'>
                <TitleComponent title='LAM' titleBadge='playground'>
                    <div className='flex h-full flex-col items-end justify-end p-6'>
                        {chatHistory.length === 0 && (
                            <PromptList
                                examplePrompts={[
                                    'go to amazon.com and add a purple chair to my cart',
                                    'go to kayak.com and find the cheapest flight from San Francisco to New York that leaves next week',
                                    'go to rabbit.tech and add a rabbit r1 to my cart',
                                ]}
                                onPromptClicked={(e) => setInputValue(e)}
                            />
                        )}
                        {chatHistory.map((message, index) => (
                            <PromptMessage message={message} key={`chat-message-${index}`} />
                        ))}
                        <div className='mt-8 flex w-full flex-row gap-2'>
                            <div className='grow'>
                                <input
                                    className='w-full rounded-l-xl rounded-t-[10px] bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-0 disabled:opacity-50'
                                    placeholder='describe your task here'
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }}
                                    value={inputValue}
                                    disabled={!!noVncUrl || isLoading}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className='shrink-0 rounded-[10px] bg-orange-400 px-6 py-2 text-white disabled:opacity-50'
                                disabled={!!noVncUrl || isLoading || !inputValue}
                            >
                                {noVncUrl || isLoading ? 'loading...' : 'do it'}
                            </button>
                        </div>
                    </div>
                </TitleComponent>
            </div>

            {/* Right Section */}
            <div className='relative w-[67%]'>
                {noVncUrl ? (
                    <div className='flex h-full w-full items-center justify-center'>
                        <PasteInput onPaste={console.log} />
                    </div>
                ) : (
                    <div className='flex h-full w-full flex-col items-center justify-center text-center text-[30px] text-gray-600'>
                        describe your task in the <br /> window to the left.
                    </div>
                )}
                <div className='absolute right-2 top-2'>
                    <button
                        className='rounded-lg bg-transparent p-3 text-white opacity-70 transition-opacity hover:opacity-100'
                        onClick={fetchLAMSession}
                        disabled={isLoading}
                    >
                        {isLoading ? 'loading...' : <RefreshIcon className='h-4 w-4 text-white' />}
                    </button>
                </div>
            </div>
        </div>
    );
}
