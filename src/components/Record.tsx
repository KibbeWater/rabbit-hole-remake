import { useState, useCallback, useEffect, useMemo, useRef } from 'react';

const RecordProcessingMessages = ({ recordProcessingMessages }: { recordProcessingMessages: string[] }) => {
    return (
        <div className='flex w-full flex-col rounded-lg p-4 text-white'>
            {recordProcessingMessages.map((message, index) => (
                <div className='mb-2' key={index}>
                    {message}
                </div>
            ))}
        </div>
    );
};

const NavBar = ({
    recordIsAvailable,
    replayIsAvailable,
}: {
    recordIsAvailable: boolean;
    replayIsAvailable: boolean;
}) => {
    const currentPath = 'lol/record'.split('/').pop();

    return (
        <div className='flex h-[50px] w-full items-center justify-between border-b border-gray-700 text-lg text-gray-600'>
            {/* Login Link */}
            <div
                className={`flex h-full items-center p-2 ${currentPath === 'login' ? 'border-b-2 border-white text-white' : ''}`}
            >
                <a href='/rabbit-hole-remake/teach-mode/login'>login</a>
            </div>

            {/* Teach Link */}
            <div
                className={`flex h-full items-center p-2 ${currentPath === 'record' ? 'border-b-2 border-white text-white' : ''}`}
            >
                <a
                    href='/rabbit-hole-remake/teach-mode/record'
                    style={{
                        pointerEvents: recordIsAvailable ? 'auto' : 'none',
                        color: recordIsAvailable ? 'undefined' : 'gray',
                    }}
                >
                    teach
                </a>
            </div>

            {/* Replay Link */}
            <div
                className={`flex h-full items-center p-2 ${currentPath === 'replay' ? 'border-b-2 border-white text-white' : ''}`}
            >
                <a
                    href='/rabbit-hole-remake/teach-mode/replay'
                    style={{
                        pointerEvents: replayIsAvailable ? 'auto' : 'none',
                        color: replayIsAvailable ? 'undefined' : 'gray',
                    }}
                >
                    replay
                </a>
            </div>
        </div>
    );
};

const Record = ({
    accessToken,
    lessonId,
}: {
    accessToken: string;
    lessonId: string;
    recordIsAvailable: boolean;
    replayIsAvailable: boolean;
}) => {
    const [state, setState] = useState({
        recordState: 'record-loading',
        recordProcessingMessages: [],
        errorMsg: '',
    });

    const { recordProcessingMessages, recordState, errorMsg } = state;
    const [lessonData, setLessonData] = useState<{ name: string | undefined; description: string | undefined }>({
        name: undefined,
        description: undefined,
    });

    const vncContainerRef = useRef(null);

    const handleServerMessage = useCallback((msg: string) => {
        // Handle server message logic here
    }, []);

    const onRecordStart = useCallback((description: string) => {
        // Start recording logic
    }, []);

    const onRecordCancel = useCallback(() => {
        // Cancel recording logic
    }, []);

    const onRecordProcess = useCallback(() => {
        // Process recording logic
    }, []);

    useEffect(() => {
        // Fetch lesson or other initial data logic
    }, [lessonId]);

    const renderProcessingContent = () => {
        switch (state.recordState) {
            case 'prepare_for_processing':
                return recordProcessingMessages.length > 0 ? (
                    <RecordProcessingMessages recordProcessingMessages={recordProcessingMessages} />
                ) : (
                    <div className='my-auto h-full w-full text-lg'>Preparing record for processing</div>
                );
            case 'processing':
                return recordProcessingMessages.length > 0 ? (
                    <RecordProcessingMessages recordProcessingMessages={recordProcessingMessages} />
                ) : (
                    <div className='my-auto h-full w-full text-lg'>Starting processing</div>
                );
            case 'processing_finished':
                return <RecordProcessingMessages recordProcessingMessages={recordProcessingMessages} />;
            case 'record-loading':
                return errorMsg ? (
                    <div className='my-auto h-full w-full text-lg'>{errorMsg}</div>
                ) : (
                    <div className='my-auto h-full w-full text-lg'>Loading a web page</div>
                );
            default:
                if (errorMsg) {
                    return <div className='my-auto h-full w-full text-lg'>{errorMsg}</div>;
                }
                return <div>{/* Display VNC URL-related content here */}</div>;
        }
    };

    return (
        <div className='relative flex w-full'>
            <div className='mr-8 flex w-[25%] flex-col'>
                <NavBar recordIsAvailable={true} replayIsAvailable={true} />
                <div className='mt-6'>
                    <p className='font-light' style={{ fontSize: '22px' }}>
                        Lesson Name
                    </p>
                    <input
                        value={lessonData.name}
                        name='name'
                        onChange={(e) => setLessonData({ ...lessonData, name: e.target.value })}
                        className='w-full rounded-lg bg-gray-600 font-light text-gray-400'
                        style={{ fontSize: '16px', backgroundColor: '#1B1B1B', padding: '10px' }}
                    />
                </div>
                <div className='mt-6'>
                    <p className='font-light' style={{ fontSize: '22px' }}>
                        Task Description
                    </p>
                    <textarea
                        value={lessonData.description}
                        onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                        className='w-full rounded-lg bg-gray-600 font-light text-gray-400'
                        style={{ fontSize: '16px', backgroundColor: '#1B1B1B', padding: '10px' }}
                        name='description'
                        rows={5}
                        disabled={['processing', 'processing_finished'].includes(state.recordState)}
                    />
                </div>
            </div>
            <div className='flex h-full w-[75%] flex-col'>
                <div className='flex h-[50px] items-center justify-between'>
                    <div className='text-lg font-light text-white'>
                        <span>{lessonData.name}</span>
                        <span className='ml-2'>Status: {state.recordState}</span>
                    </div>
                </div>
                <div
                    ref={vncContainerRef}
                    className='shrink grow basis-0 overflow-y-auto rounded-xl border border-white'
                    style={{ pointerEvents: state.recordState === 'record-start' ? 'auto' : 'none' }}
                >
                    {renderProcessingContent()}
                </div>
            </div>
        </div>
    );
};

const LessonManager = ({ accessToken, lessonId }: { accessToken: string; lessonId: string }) => {
    const [lesson, setLesson] = useState(null);

    // Fetch Lesson data
    const fetchLesson = useCallback(async () => {
        try {
            //const lessonData = await getHoleClient().get_fetchLesson.fetch({
            //  accessToken,
            //  lessonId
            //}, ZR());
            //
            //const lesson = lessonData.lesson;
            //if (!lesson) return;
            //
            //const { name, description, domain, records } = lesson;
            //const record = records[0];
            //if (!record) {
            //  console.error(`Lesson with id ${lessonId} is missing a record`);
            //  return;
            //}
            //
            //const { recordId, status } = record;
            //setLesson({
            //  name,
            //  description,
            //  domain,
            //  recordId,
            //  recordingStatus: status
            //});
        } catch (error) {
            console.error('Error fetching lesson:', error);
        }
    }, [accessToken, lessonId]);

    // Update Lesson
    const updateLesson = useCallback(async () => {
        //try {
        //  const response = await getHoleClient().post_updateLesson.fetch({
        //    accessToken,
        //    lessonId,
        //    lesson: updatedLesson
        //  }, ZR());
        //
        //  if (response.failure) {
        //    console.error(`Could not update lesson with id ${lessonId} because of an error: ${response.failure.failureMsg || 'unknown'}`);
        //    return;
        //  }
        //
        //  const { lesson } = response.success;
        //  if (!lesson) {
        //    console.error(`Could not update lesson with id ${lessonId} because it does not exist`);
        //    return;
        //  }
        //
        //  const { name = '', description = '' } = lesson;
        //  setLesson((prev) => prev ? {
        //    ...prev,
        //    name,
        //    description
        //  } : {
        //    name,
        //    description,
        //    domain: "",
        //    recordId: "",
        //    recordingStatus: "empty"
        //  });
        //} catch (error) {
        //  console.error("Error updating lesson:", error);
        //}
    }, [accessToken, lessonId]);

    // Auto-refresh lesson on certain statuses
    useEffect(() => {
        const timer =
            lesson && ['raw_data', 'processing'].includes('processing') ? setTimeout(fetchLesson, 10000) : null;

        if (timer) {
            return () => clearTimeout(timer);
        }
    }, [lesson]);

    // Fetch lesson on mount
    useEffect(() => {
        fetchLesson();
    }, [fetchLesson]);

    return {
        lesson,
        refreshLesson: fetchLesson,
        updateLesson,
    };
};

export default Record;
