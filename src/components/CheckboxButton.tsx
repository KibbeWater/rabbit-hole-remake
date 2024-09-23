import React from 'react';
import Icon from './CheckmarkIcon'; // Assuming the Icon component is in the same directory

const classes = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Checkbox({ className, label, ...props }: CheckboxProps): JSX.Element {
    return (
        <div className='flex w-full items-center gap-2'>
            <input
                className={classes(
                    'checked:border-leuchtorange disabled:border-steel-400 disabled:bg-steel-400 peer relative',
                    'h-6 w-6 shrink-0 appearance-none rounded-full',
                    'border-2',
                    'border-black bg-transparent checked:border-2',
                    'checked:bg-transparent focus:outline-none',
                    className,
                )}
                type='checkbox'
                {...props}
            />
            <div className='text-leuchtorange pointer-events-none absolute hidden h-6 w-6 outline-none peer-checked:block'>
                <Icon width={24} height={24} />
            </div>
            {label && <label htmlFor={props.id}>{label}</label>}
        </div>
    );
}

export function SimpleCheckbox({ className, ...props }: CheckboxProps): JSX.Element {
    return (
        <div className='flex px-3'>
            <input
                className={classes(
                    'checked:border-leuchtorange disabled:border-steel-400 disabled:bg-steel-400 peer relative',
                    'h-6 w-6 shrink-0 appearance-none rounded-full',
                    'border-2',
                    'border-black bg-transparent checked:border-2',
                    'checked:bg-transparent focus:outline-none',
                    className,
                )}
                type='checkbox'
                {...props}
            />
            <div className='text-leuchtorange pointer-events-none absolute hidden h-6 w-6 outline-none peer-checked:block'>
                <Icon width={24} height={24} />
            </div>
        </div>
    );
}
