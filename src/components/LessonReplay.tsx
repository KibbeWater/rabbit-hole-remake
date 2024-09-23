import { useState, useEffect, useCallback, useRef } from 'react';

type Lesson = {
    name: string;
    recordId: string;
    recordingStatus: string;
    description: string;
    domain: string;
};

const LessonReplay = ({
    accessToken,
    lessonId,
    recordIsAvailable,
    replayIsAvailable,
}: {
    accessToken: string;
    lessonId: string;
    recordIsAvailable: boolean;
    replayIsAvailable: boolean;
}) => {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [replayState, setReplayState] = useState('replay-loading');
    const [replayedActions, setReplayedActions] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [noVncUrl, setNoVncUrl] = useState('');

    const vncContainerRef = useRef(null);

    const fetchLesson = useCallback(() => {
        // Simulating API call
        setTimeout(() => {
            setLesson({
                name: 'Sample Lesson',
                description: 'This is a sample lesson description',
                domain: 'example.com',
                recordId: 'sample-record-id',
                recordingStatus: 'completed',
            });
        }, 1000);
    }, [lessonId, accessToken]);

    useEffect(() => {
        fetchLesson();
    }, [fetchLesson]);

    useEffect(() => {
        if (lesson && ['raw_data', 'processing'].includes(lesson.recordingStatus)) {
            const timer = setTimeout(fetchLesson, 10000);
            return () => clearTimeout(timer);
        }
    }, [lesson, fetchLesson]);

    const handleReplayStart = useCallback(() => {
        setReplayState('replay-start');
        setReplayedActions((prev) => [...prev, 'Starting replay...']);
        // Simulating replay start
        setTimeout(() => {
            setReplayState('replay-ready');
            setNoVncUrl('https://example.com/vnc');
        }, 2000);
    }, []);

    const handleReplayCancel = useCallback(() => {
        setReplayState('replay-ready');
        setReplayedActions((prev) => [...prev, 'Replay cancelled']);
    }, []);

    const ReplayedActions = ({ actions }: { actions: string[] }) => (
        <div className='flex w-full flex-col rounded-lg p-4 text-white'>
            {actions.map((action, index) => (
                <div key={index} className='mb-2'>
                    <span className='mr-2'>{index + 1}</span>
                    <span>{action}</span>
                </div>
            ))}
        </div>
    );

    const NavigationTabs = () => {
        const pathname = '/teach-mode/replay/1/replay';
        const currentTab = pathname.split('/').pop();

        return (
            <div className='flex h-[50px] w-full items-center justify-between border-b border-gray-700 text-lg text-gray-600'>
                <TabLink disabled={false} href='./login' label='login' isActive={currentTab === 'login'} />
                <TabLink
                    href='./record'
                    label='teach'
                    isActive={currentTab === 'record'}
                    disabled={!recordIsAvailable}
                />
                <TabLink
                    href='./replay'
                    label='replay'
                    isActive={currentTab === 'replay'}
                    disabled={!replayIsAvailable}
                />
            </div>
        );
    };

    const TabLink = ({
        href,
        label,
        isActive,
        disabled,
    }: {
        href: string;
        label: string;
        isActive: boolean;
        disabled: boolean;
    }) => (
        <div className={`flex h-full items-center p-2 ${isActive ? 'border-b-2 border-white text-white' : ''}`}>
            <a
                href={href}
                style={{
                    pointerEvents: disabled ? 'none' : 'auto',
                    color: disabled ? 'gray' : undefined,
                }}
            >
                {label}
            </a>
        </div>
    );

    return (
        <div className='relative flex w-full'>
            <div className='mr-8 flex w-[25%] flex-col'>
                <NavigationTabs />
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='flex flex-col'>
                        <div className='mt-3'>
                            <p className='font-light text-[22px]'>new task description</p>
                            <p className='mt-1 font-extralight text-[16px]'>
                                describe what you'd like rabbit to do. Make sure it's similar to what you taught it to
                                do in the original lesson
                            </p>
                            <div className='mt-2'>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='w-full rounded-lg bg-[#1B1B1B] font-light'
                                    name='description'
                                    rows={5}
                                />
                            </div>
                        </div>
                    </div>
                    {replayedActions.length > 0 && (
                        <div className='my-4 shrink grow basis-0 overflow-y-auto rounded-xl border border-white'>
                            <ReplayedActions actions={replayedActions} />
                        </div>
                    )}
                    <div>
                        {replayState === 'replay-start' && (
                            <button
                                onClick={handleReplayCancel}
                                disabled={!description}
                                className='w-full rounded-lg bg-gray-500 py-4'
                            >
                                cancel
                            </button>
                        )}
                        {replayState === 'replay-ready' && (
                            <button
                                onClick={handleReplayStart}
                                disabled={!description}
                                className='w-full rounded-lg bg-gray-600 py-4'
                            >
                                replay
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex w-[75%] flex-col'>
                <div className='flex h-[50px] items-center justify-between'>
                    <div className='text-lg font-light text-white'>
                        <span>{lesson?.name}</span>
                        <span className='ml-2'>Status: {lesson?.recordingStatus}</span>
                    </div>
                    <div className='text-lg font-light text-gray-600'>{lesson?.domain}</div>
                </div>
                <div
                    ref={vncContainerRef}
                    className='flex-1 shrink grow basis-0 overflow-y-auto rounded-xl border border-white'
                    style={{ pointerEvents: 'none' }}
                >
                    {errorMsg ? (
                        <div className='my-auto h-full w-full text-lg'>Error: {errorMsg}</div>
                    ) : noVncUrl ? (
                        <iframe src={noVncUrl} className='h-full w-full' />
                    ) : (
                        <div className='my-auto h-full w-full text-lg'>Loading a web page</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonReplay;
