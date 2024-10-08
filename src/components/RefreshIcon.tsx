import type { FC, SVGProps } from 'react';

export default function RefreshIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <path
                d='M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z'
                stroke='currentColor'
                strokeWidth='2'
            />
        </svg>
    );
}
