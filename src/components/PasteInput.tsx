import { useState } from 'react';
import IconButton from './IconButton';
import RefreshIcon from './RefreshIcon';

export default function PasteInput({ onPaste }: { onPaste: (value: string) => void }) {
    const [isPasting, setIsPasting] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onPaste(inputValue);
        setInputValue('');
        setIsPasting(false);
    };

    const handleCancel = () => {
        setInputValue('');
        setIsPasting(false);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: '1024px',
                maxWidth: 1280,
                maxHeight: 1024,
            }}
        >
            <div
                //ref={initNoVnc}
                style={{
                    display: /*isConnected ? undefined :*/ 'none',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                }}
                className='rabbit-novnc-container'
            />
            <div
                style={{
                    position: 'fixed',
                    top: '20%',
                    right: 0,
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgb(0, 0, 0)',
                        padding: '13px 8px',
                        borderTopLeftRadius: '5px',
                        borderBottomLeftRadius: '5px',
                        border: '1px solid #dce3e5',
                        borderRight: 'none',
                    }}
                >
                    <IconButton
                        ariaLabel='paste'
                        iconType={RefreshIcon}
                        size='25px'
                        onClick={() => setIsPasting(!isPasting)}
                    />
                    {isPasting && (
                        <form
                            onSubmit={handleSubmit}
                            style={{ marginTop: '5px', display: 'flex', alignItems: 'center' }}
                        >
                            <input
                                autoComplete='off'
                                style={{
                                    backgroundColor: '#000',
                                    fontSize: '18px',
                                    outline: 'none',
                                    border: 'none',
                                    borderBottom: '1px solid #fff',
                                    textAlign: 'center',
                                    color: '#dce3e5',
                                    marginRight: '3px',
                                }}
                                placeholder='paste here'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Escape' && handleCancel()}
                            />
                            <IconButton ariaLabel='send' iconType={RefreshIcon} size='18px' onClick={handleSubmit} />
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
