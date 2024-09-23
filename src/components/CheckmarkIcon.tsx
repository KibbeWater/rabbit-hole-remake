import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function CheckmarkIcon(props: IconProps): JSX.Element {
    return (
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
            <path
                d='M8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5ZM10.415 5.7275L7.0625 9.08L5.585 7.6025C5.47837 7.50314 5.33733 7.44905 5.19161 7.45162C5.04588 7.45419 4.90684 7.51322 4.80378 7.61628C4.70072 7.71934 4.64169 7.85838 4.63912 8.00411C4.63655 8.14984 4.69064 8.29087 4.79 8.3975L6.665 10.2725C6.77047 10.3778 6.91344 10.437 7.0625 10.437C7.21156 10.437 7.35453 10.3778 7.46 10.2725L11.21 6.5225C11.2653 6.471 11.3096 6.4089 11.3403 6.3399C11.3711 6.2709 11.3876 6.19642 11.3889 6.12089C11.3903 6.04536 11.3764 5.97034 11.3481 5.9003C11.3198 5.83026 11.2777 5.76664 11.2243 5.71322C11.1709 5.65981 11.1072 5.6177 11.0372 5.58941C10.9672 5.56112 10.8921 5.54722 10.8166 5.54856C10.7411 5.54989 10.6666 5.56642 10.5976 5.59716C10.5286 5.62791 10.4665 5.67224 10.415 5.7275Z'
                fill='currentColor'
            />
        </svg>
    );
}

export default CheckmarkIcon;
