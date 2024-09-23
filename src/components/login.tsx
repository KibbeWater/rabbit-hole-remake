import { useState, useEffect, useCallback, useRef } from 'react';

const classNames = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

const NavigationTabs = () => {
    const pathname = '/teach-mode/replay/1/login';
    const currentTab = pathname.split('/').pop();

    return (
        <div className='flex h-[50px] w-full items-center justify-between border-b border-gray-700 text-lg text-gray-600'>
            <TabLink
                disabled={false}
                href='/rabbit-hole-remake/teach-mode/login'
                label='login'
                isActive={currentTab === 'login'}
            />
            <TabLink
                href='/rabbit-hole-remake/teach-mode/record'
                label='teach'
                isActive={currentTab === 'record'}
                disabled={false}
            />
            <TabLink
                href='/rabbit-hole-remake/teach-mode/replay'
                label='replay'
                isActive={currentTab === 'replay'}
                disabled={!true}
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

const LoadingSpinner = ({ className, text }: { className: string; text: string }) => {
    const ballClass = 'bg-white h-[0.15em] w-[0.15em] rounded-full relative';

    return (
        <div className={classNames('relative flex items-center justify-center', className || '')}>
            <div className='mr-[0.2em] text-[1em] font-normal'>{text || 'loading'}</div>
            <div className='flex h-[0.65em] flex-row items-end justify-start gap-[0.15em]'>
                <div className={classNames(ballClass, 'ball', 'ball1')} />
                <div className={classNames(ballClass, 'ball', 'ball2')} />
                <div className={classNames(ballClass, 'ball', 'ball3')} />
            </div>
        </div>
    );
};

const LessonLogin = ({
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
    //const router = useRouter();
    const [lesson, setLesson] = useState<
        { recordingStatus: string; name: string; description: string; domain: string; recordId: string } | undefined
    >();
    //const { vncContainerRef, viewportConfig, initialViewportConfig } = useViewportConfig();

    // Fetch lesson data
    const fetchLessonData = useCallback(async () => {
        //const lesson = await fetchLesson({ accessToken, lessonId });
        //if (!lesson) return;
        //const { name, description, domain, records } = lesson;
        //const record = records?.[0];
        //if (!record) {
        //    console.error(`Lesson with id ${lessonId} is missing a record`);
        //    return;
        //}
        //const { recordId, status: recordingStatus } = record;
        //setLesson({ name, description, domain, recordId, recordingStatus });
    }, [accessToken, lessonId]);

    // Update lesson data
    const updateLessonData = useCallback(async () => {
        //const updated = await updateLesson({ accessToken, lessonId, lesson: updatedLesson });
        //if (!updated) {
        //  console.error(`Could not update lesson with id ${lessonId}`);
        //  return;
        //}
        //setLesson(updatedLesson);
    }, [accessToken, lessonId]);

    // Save session
    const onSessionSave = useCallback(
        () => {
            //if (typeof sendClientMsg === 'function') {
            //  sendClientMsg({ saveSession: {} });
            //}
        },
        [
            /*sendClientMsg*/
        ],
    );

    // Save session success handler
    //const handleSessionSaveSuccess = useCallback(() => {
    //    router.push('./record');
    //}, [router]);

    // Auto-refresh lesson based on recording status
    useEffect(() => {
        if (lesson?.recordingStatus && ['raw_data', 'processing'].includes('processing')) {
            const interval = setInterval(fetchLessonData, 10000);
            return () => clearInterval(interval);
        }
    }, [lesson, fetchLessonData]);

    // Fetch lesson data on mount
    useEffect(() => {
        fetchLessonData();
    }, [accessToken, lessonId]);

    // Error handling & conditional rendering
    let displayContent;
    displayContent = <LoadingSpinner className='' text='Loading a web page' />;

    return (
        <div className='relative flex w-full'>
            {/* Left Column */}
            <div className='mr-8 flex w-[25%] flex-col'>
                <NavigationTabs />
                <div className='flex flex-1 flex-col mt-3'>
                    <p className='mt-1 text-base'>
                        If this lesson requires you to be logged in, log in to the window to the right. When you're
                        done, click below.
                    </p>
                    <div className='mt-2'>
                        <p className='mt-1 text-base'>If not, you can skip this step.</p>
                    </div>
                </div>
                <div className='h-[100px]'>
                    <button onClick={onSessionSave} className='w-full rounded-lg bg-gray-700 py-4'>
                        I logged in
                    </button>
                    <button onClick={() => console.log('./record')} className='mt-3 h-[32px] w-full rounded-lg'>
                        I don't need to log in
                    </button>
                </div>
            </div>

            {/* Right Column */}
            <div className='flex w-[75%] flex-col'>
                <div className='flex h-[50px] items-center justify-between'>
                    <div className='text-white'>{lesson?.name}</div>
                    <div className='text-gray-600'>{lesson?.domain}</div>
                </div>
                <div className='flex-1 rounded-xl border border-white'>{displayContent}</div>
            </div>
        </div>
    );
};

export default LessonLogin;
