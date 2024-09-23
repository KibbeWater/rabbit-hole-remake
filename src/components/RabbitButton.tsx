import React from 'react';

const classNames = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

interface ButtonProps {
    onClick: () => void;
    styles?: string;
    text: string;
    disabled?: boolean;
}

export default function RabbitButton({ onClick, styles, text, disabled }: ButtonProps): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-full rounded-xl py-4 transition-all duration-100',
                disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-70 active:opacity-40',
                styles,
            )}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
