import { useState } from 'react';
import CheckmarkIcon from './CheckmarkIcon';
import RabbitButton from './RabbitButton';

const classNames = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

function Checkbox({ className, ...props }: { className?: string; [key: string]: any }) {
    return (
        <div className='flex px-3'>
            <input
                className={classNames(
                    'checked:border-leuchtorange disabled:border-steel-400 disabled:bg-steel-400 peer relative',
                    'h-6 w-6 shrink-0 appearance-none rounded-full border-2 border-black bg-transparent',
                    'checked:border-2 checked:bg-transparent focus:outline-none',
                    className,
                )}
                type='checkbox'
                onChange={(e) => props.onChange(e.target.checked)}
                {...props}
            />
            <div className='text-leuchtorange pointer-events-none absolute hidden h-6 w-6 outline-none peer-checked:block'>
                <CheckmarkIcon width={24} height={24} />
            </div>
        </div>
    );
}

function TermsAndConditions({ onAcceptToS }: { onAcceptToS: () => void }) {
    const [checkedCount, setCheckedCount] = useState(0);

    return (
        <div className='flex w-1/2 flex-col rounded-xl bg-gray-900 p-6'>
            <div className='flex place-content-center pb-6 text-xl'>welcome to teach mode</div>
            <div className='flex flex-row place-items-start items-start pb-3'>
                <Checkbox
                    id='terms_1'
                    defaultChecked={false}
                    onChange={(e: boolean) => setCheckedCount(e ? checkedCount + 1 : checkedCount - 1)}
                    className='border-leuchtorange'
                />
                <div>
                    I understand that every lesson I create in the teach mode alpha will be made immediately public to
                    the rabbit team and all other members of the alpha program. The lesson name, lesson description, and
                    my username will all be publicly visible. By checking this box I acknowledge I understand this and
                    will not create any lessons with private or sensitive information I do not want to be seen by the
                    members of this alpha testers program.
                </div>
            </div>
            <div className='flex flex-row place-items-start items-start pb-3'>
                <Checkbox
                    id='terms_2'
                    defaultChecked={false}
                    onChange={(e: boolean) => setCheckedCount(e ? checkedCount + 1 : checkedCount - 1)}
                    className='border-leuchtorange'
                />
                <div>I understand that teach mode will be taking actions on my behalf on third-party services.</div>
            </div>
            <div className='flex flex-row place-items-start items-start pb-3'>
                <Checkbox
                    id='terms_3'
                    defaultChecked={false}
                    onChange={(e: boolean) => setCheckedCount(e ? checkedCount + 1 : checkedCount - 1)}
                    className='border-leuchtorange'
                />
                <div>
                    rabbit reserves the right to review and delete your lessons and remove you from the alpha testers
                    program should you violate the terms of service. I acknowledge I have read through the terms and
                    understand what types of material are not appropriate for teach mode.
                </div>
            </div>
            <div className='flex flex-row place-items-start items-start'>
                <Checkbox
                    id='terms_4'
                    defaultChecked={false}
                    onChange={(e: boolean) => setCheckedCount(e ? checkedCount + 1 : checkedCount - 1)}
                    className='border-leuchtorange'
                />
                <div>
                    I agree to teach mode's{' '}
                    <a
                        href='https://www.rabbit.tech/terms-of-use'
                        className='text-leuchtorange cursor-pointer hover:opacity-70'
                        target='_blank'
                    >
                        terms of service
                    </a>
                    , acknowledge the{' '}
                    <a
                        href='https://www.rabbit.tech/rabbit-os#privacy'
                        className='text-leuchtorange cursor-pointer hover:opacity-70'
                        target='_blank'
                    >
                        privacy policy
                    </a>
                    , and accept{' '}
                    <a
                        href='https://www.rabbit.tech/cookie-policy'
                        className='text-leuchtorange cursor-pointer hover:opacity-70'
                        target='_blank'
                    >
                        cookies
                    </a>
                    .
                </div>
            </div>
            <div className='w-full pt-4'>
                <RabbitButton
                    text='continue'
                    styles='bg-leuchtorange !py-2 text-gray-900'
                    disabled={checkedCount !== 4}
                    onClick={onAcceptToS}
                />
            </div>
            <div className='flex place-content-center'>
                <a href='/api/auth/logout' className='text-leuchtorange cursor-pointer pt-4 hover:opacity-70'>
                    log out
                </a>
            </div>
        </div>
    );
}

// Wrapper Component for Terms Acceptance
function AcceptTermsWrapper() {
    return (
        <div className='flex w-screen flex-col items-center py-10'>
            <TermsAndConditions onAcceptToS={() => console.log('accepted')} />
        </div>
    );
}

export default AcceptTermsWrapper;
