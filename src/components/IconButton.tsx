import { useState } from 'react';

export default function IconButton({
    ariaLabel,
    iconType,
    size,
    onClick,
}: {
    ariaLabel: string;
    iconType: (props: { color: string; size: string }) => JSX.Element;
    size: string;
    onClick: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const icon = iconType({
        color: isHovered ? '#fff' : '#dce3e5',
        size,
    });

    return (
        <button
            aria-label={ariaLabel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
