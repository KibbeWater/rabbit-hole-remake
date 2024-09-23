import { useState, useEffect } from 'react';

function differenceInYears(date1: number, date2: number) {
    return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24 * 365));
}

function differenceInDays(date1: number, date2: number) {
    return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
}

function differenceInHours(date1: number, date2: number) {
    return Math.floor((date1 - date2) / (1000 * 60 * 60));
}

function formatDistanceToNow(date: number, options: { addSuffix: boolean }) {
    return `${date} ${options.addSuffix ? 'ago' : ''}`;
}

type SessionValue = string;
type Lesson = {
    _id: string;
    domain: string;
    description: string;
    externalUserId: string;
    createdAt: Date;
};

// Utility function to format time difference
const formatTimeDifference = (date: number) => {
    const now = Date.now();
    const years = differenceInYears(now, date);
    const days = differenceInDays(now, date);
    const hours = differenceInHours(now, date);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return formatDistanceToNow(date, { addSuffix: false });
};

function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
    };
}

// Pagination component
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div
            className='pagination'
            style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                fontWeight: 'lighter',
            }}
        >
            <button
                style={{ marginRight: '5px' }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    style={{ marginLeft: '5px', marginRight: '5px' }}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}
            <button
                style={{ marginLeft: '5px' }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

// ThreeDotMenu component
const ThreeDotMenu = ({ children }: { children: JSX.Element }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ width: '28px', height: '28px' }}>
            <button
                className='three-dot-button'
                style={{
                    backgroundColor: isOpen ? '#FFFFFF' : '#414141',
                    borderRadius: '50%',
                    padding: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '25px',
                    height: '25px',
                    cursor: 'pointer',
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {[...Array(3)].map((_, index) => (
                    <span
                        key={index}
                        className='dot'
                        style={{
                            backgroundColor: 'black',
                            borderRadius: '50%',
                            width: '3px',
                            height: '3px',
                        }}
                    />
                ))}
            </button>
            {isOpen && (
                <div
                    style={{
                        position: 'relative',
                        right: '125px',
                        padding: '5px',
                        zIndex: 1,
                        width: '250px',
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

// Session component
const Session = ({
    session,
    onDeleteSessionClick,
    onSessionLoginClick,
}: {
    session: SessionValue;
    onDeleteSessionClick: (session: SessionValue) => void;
    onSessionLoginClick: (session: SessionValue) => void;
}) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: '5px',
                paddingTop: '30px',
            }}
        >
            <div style={{ fontSize: '22px', fontWeight: 'lighter' }}>https://www.{session}</div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <button
                    style={{
                        borderRadius: '12px',
                        backgroundColor: '#FF0606',
                        fontWeight: 'lighter',
                        margin: '5px 10px 5px 5px',
                        padding: '5px 15px 5px 15px',
                    }}
                    onClick={() => onDeleteSessionClick(session)}
                >
                    remove this session
                </button>
                <button
                    style={{
                        borderRadius: '12px',
                        backgroundColor: '#414141',
                        fontWeight: 'lighter',
                        margin: '5px 5px 5px 5px',
                        padding: '5px 15px 5px 15px',
                    }}
                    onClick={() => onSessionLoginClick(session)}
                >
                    session login
                </button>
            </div>
        </div>
    );
};

// MySessions component
const MySessions = ({ accessToken }: { accessToken: string }) => {
    const [sessions, setSessions] = useState([]);
    //const router = useRouter();

    const handleDeleteSession = (domain: string) => {
        console.log(domain);
    };

    useEffect(() => {
        // Fetch sessions logic here
    }, [accessToken]);

    const { currentPage, totalPages, currentData, handlePageChange } = usePagination(sessions, 50);

    return (
        <div style={{ position: 'relative', height: '500px' }}>
            <div style={{ height: '450px', overflowY: 'auto' }}>
                {currentData.map((session) => (
                    <Session
                        key={session}
                        session={session}
                        onDeleteSessionClick={handleDeleteSession}
                        onSessionLoginClick={(domain) =>
                            //router.push(`teach-mode/login?domain=${encodeURIComponent(`https://www.${domain}`)}`)
                            console.log
                        }
                    />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

// Lesson component
const Lesson = ({
    lesson,
    starred,
    onStarLessonClick,
    onReplayClick,
}: {
    lesson: Lesson;
    starred: boolean;
    onStarLessonClick: (lessonId: string) => void;
    onReplayClick: (lessonId: string) => void;
}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '5px',
                    paddingTop: '30px',
                }}
            >
                <ul style={{ fontSize: '16px', fontWeight: 'lighter' }}>{lesson.domain}</ul>
                <ul
                    style={{
                        fontSize: '20px',
                        fontWeight: 'normal',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '800px',
                    }}
                >
                    {lesson.description}
                </ul>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        margin: '5px 10px 5px 5px',
                        fontWeight: 'lighter',
                        color: '#AAAAAA',
                    }}
                >
                    created by <span style={{ color: 'white' }}>{lesson.externalUserId}</span>{' '}
                    {lesson.createdAt.toISOString()} ago
                </div>
                <ThreeDotMenu>
                    <button
                        style={{
                            borderRadius: '12px',
                            backgroundColor: starred ? '#414141' : '#FF0606',
                            fontWeight: 'lighter',
                            margin: '5px 10px 5px 5px',
                            padding: '5px 15px 5px 15px',
                        }}
                        disabled={starred}
                        onClick={starred ? () => {} : () => onStarLessonClick(lesson._id)}
                    >
                        {starred ? 'already saved' : 'save to my lessons'}
                    </button>
                </ThreeDotMenu>
                <a
                    style={{
                        borderRadius: '12px',
                        backgroundColor: '#414141',
                        fontWeight: 'lighter',
                        margin: '5px 5px 5px 5px',
                        padding: '5px 15px 5px 15px',
                    }}
                    href={`/rabbit-hole-remake/teach-mode/replay`}
                >
                    Replay
                </a>
            </div>
        </div>
    );
};

// PublicLessons component
const PublicLessons = ({ accessToken }: { accessToken: string }) => {
    const [lessons, setLessons] = useState([]);
    const [starredLessons, setStarredLessons] = useState<Lesson[]>([]);
    //const router = useRouter();

    const handleStarLesson = (lessonId: string) => {
        // Implement star lesson logic here
        console.log(lessonId);
    };

    useEffect(() => {
        // Fetch public lessons logic here
    }, [accessToken]);

    useEffect(() => {
        // Fetch starred lessons logic here
    }, [accessToken]);

    const { currentPage, totalPages, currentData, handlePageChange } = usePagination(lessons, 50);

    return (
        <div style={{ position: 'relative', height: '500px' }}>
            <div style={{ height: '450px', overflowY: 'auto' }}>
                {currentData.map((lesson: Lesson) => (
                    <Lesson
                        key={lesson._id}
                        lesson={lesson}
                        starred={starredLessons.some((starredLesson) => starredLesson._id === lesson._id)}
                        onStarLessonClick={handleStarLesson}
                        //onReplayClick={(lessonId) => router.push(`teach-mode/lessons/${lessonId}/replay`)}
                        onReplayClick={console.log}
                    />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

// MyLessons component
const MyLessons = ({ accessToken }: { accessToken: string }) => {
    const [lessons, setLessons] = useState([]);
    //const router = useRouter();

    const handleDeleteLesson = (lessonId: string) => {
        console.log(lessonId);
        // Implement delete lesson logic here
    };

    useEffect(() => {
        // Fetch my lessons logic here
    }, [accessToken]);

    const { currentPage, totalPages, currentData, handlePageChange } = usePagination(lessons, 50);
    const _currentData: Lesson[] = [
        {
            _id: '1',
            domain: 'https://google.com',
            description: 'Search for anything on Google',
            externalUserId: '.Justin',
            createdAt: new Date(),
        },
        {
            _id: '2',
            domain: 'https://x.com',
            description: 'Post a tweet on Twitter',
            externalUserId: 'Jesse',
            createdAt: new Date(),
        },
        {
            _id: '3',
            domain: 'https://ebay.com',
            description: 'Search for items on eBay',
            externalUserId: 'Simon',
            createdAt: new Date(),
        },
    ];

    return (
        <div style={{ position: 'relative', height: '500px' }}>
            <div style={{ height: '450px', overflowY: 'auto' }}>
                {_currentData.map((lesson: Lesson) => (
                    <Lesson
                        key={lesson._id}
                        lesson={lesson}
                        //onDeleteLessonClick={handleDeleteLesson}
                        //onTeachClick={() => router.push(`teach-mode/lessons/${lesson._id}/record`)}
                        //onReteachClick={() => router.push(`teach-mode/lessons/${lesson._id}/record`)}
                        //onReplayClick={() => router.push(`teach-mode/lessons/${lesson._id}/replay`)}
                        //onDeleteLessonClick={console.log}
                        //onTeachClick={console.log}
                        //onReteachClick={console.log}
                        starred={false}
                        onStarLessonClick={console.log}
                        onReplayClick={console.log}
                    />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

// StarredLessons component
const StarredLessons = ({ accessToken }: { accessToken: string }) => {
    const [starredLessons, setStarredLessons] = useState([]);
    //const router = useRouter();

    const handleUnstarLesson = (lessonId: string) => {
        console.log(lessonId);
        // Implement unstar lesson logic here
    };

    useEffect(() => {
        // Fetch starred lessons logic here
    }, [accessToken]);

    const { currentPage, totalPages, currentData, handlePageChange } = usePagination(starredLessons, 50);
    const _currentData: Lesson[] = [
        {
            _id: '1',
            domain: 'www.google.com',
            description: 'Google search engine',
            externalUserId: 'google',
            createdAt: new Date(),
        },
        {
            _id: '2',
            domain: 'www.facebook.com',
            description: 'Facebook social media',
            externalUserId: 'facebook',
            createdAt: new Date(),
        },
        {
            _id: '3',
            domain: 'www.youtube.com',
            description: 'Youtube video platform',
            externalUserId: 'youtube',
            createdAt: new Date(),
        },
    ];

    return (
        <div style={{ position: 'relative', height: '500px' }}>
            <div style={{ height: '450px', overflowY: 'auto' }}>
                {_currentData.map((lesson: Lesson) => (
                    <Lesson
                        key={lesson._id}
                        lesson={lesson}
                        //onUnstarLessonClick={handleUnstarLesson}
                        //onReplayClick={(lessonId) => router.push(`teach-mode/lessons/${lessonId}/replay`)}
                        //onUnstarLessonClick={console.log}
                        starred={true}
                        onStarLessonClick={console.log}
                        onReplayClick={console.log}
                    />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

// Main LessonsSessionsSection component
const LessonsSessionsSection = ({ accessToken }: { accessToken: string }) => {
    const [activeTab, setActiveTab] = useState('myLessons');

    return (
        <div style={{ margin: '50px 30px 10px 30px' }}>
            <div onClick={() => console.log('test')} style={{ display: 'flex' }}>
                <TabButton
                    label='community lessons'
                    isActive={activeTab === 'publicLessons'}
                    onClick={() => setActiveTab('publicLessons')}
                />
                <TabButton
                    label='my lessons'
                    isActive={activeTab === 'myLessons'}
                    onClick={() => setActiveTab('myLessons')}
                />
                <TabButton
                    label='my sessions'
                    isActive={activeTab === 'mySessions'}
                    onClick={() => setActiveTab('mySessions')}
                />
            </div>
            <div className='line' style={{ height: '1px', background: '#AAAAAA' }} />
            {activeTab === 'publicLessons' && <PublicLessons accessToken={accessToken} />}
            {activeTab === 'myLessons' && <MyLessons accessToken={accessToken} />}
            {activeTab === 'mySessions' && <MySessions accessToken={accessToken} />}
        </div>
    );
};

// TabButton component
const TabButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
    <button
        style={{
            marginLeft: '5px',
            marginRight: '25px',
            fontSize: '22px',
            fontWeight: 'lighter',
            color: isActive ? 'white' : '#AAAAAA',
            borderBottom: isActive ? '1px solid white' : '#AAAAAA',
        }}
        onClick={() => {
            console.log('sss');
            onClick();
        }}
    >
        {label}
    </button>
);

export default LessonsSessionsSection;
