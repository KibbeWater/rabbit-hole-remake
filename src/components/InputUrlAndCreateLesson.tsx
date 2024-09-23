import React, { useState } from 'react';

export function InputUrlAndCreateLesson(/*{ accessToken }: { accessToken: string }*/) {
    const [url, setUrl] = useState('https://');
    const [isValid, setIsValid] = useState(true);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        if (!isValid) {
            setIsValid(true);
        }
    };

    const handleSubmit = async () => {
        const isRootDomain = (inputUrl: string) => {
            let parsedUrl;
            try {
                parsedUrl = new URL(inputUrl);
            } catch {
                return false;
            }
            return parsedUrl.pathname === '/';
        };

        if (!isRootDomain(url)) {
            setIsValid(false);
        } else {
            try {
                //const { lesson } = await fetchHoleClient().post_createLesson.fetch({
                //    accessToken,
                //lesson: {
                //    domain: url,
                //    name: "new lesson",
                //    description: "N/A",
                //},
                //});
                //
                //const lessonId = lesson._id;
                // router.push(`/teach-mode/lessons/${lessonId}/login`);
            } catch (error) {
                console.error('Error creating lesson:', error);
            }
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                borderRadius: '10px',
                backgroundColor: '#1B1B1B',
                marginTop: '10px',
                marginBottom: '10px',
                paddingTop: '30px',
                paddingBottom: '30px',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    flexGrow: 5,
                    margin: '5px 5px 5px 25px',
                }}
            >
                <div
                    style={{
                        fontSize: '32px',
                    }}
                >
                    Teach a New Lesson
                </div>
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: 'lighter',
                    }}
                >
                    Enter a URL to teach rabbit a lesson on a new service.
                    <br />
                    The correct URL should start with "https://".
                </div>
            </div>
            <div style={{ flexGrow: 2 }}>
                {!isValid && <p>It is not valid or it is not the root domain. Please re-enter the correct one.</p>}
            </div>
            <input
                placeholder='Enter URL here'
                value={url}
                style={{
                    borderRadius: '15px',
                    backgroundColor: '#414141',
                    fontWeight: 'lighter',
                    flexGrow: 4,
                    marginTop: '5px',
                    marginBottom: '5px',
                    padding: '2px 20px',
                    height: '36px',
                }}
                onChange={handleUrlChange}
            />
            <button
                style={{
                    borderRadius: '15px',
                    backgroundColor: '#FF4D06',
                    color: 'black',
                    fontWeight: 'lighter',
                    flexGrow: 1,
                    margin: '5px 20px 5px 10px',
                    padding: '2px 20px',
                    height: '36px',
                }}
                onClick={handleSubmit}
            >
                Start Teaching
            </button>
        </div>
    );
}
