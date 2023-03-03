import React from 'react';

type ButtonPropsType = {
    className: string
    // disabled: boolean
    handleClick: () => void
    children: string
}

const Button: React.FC<ButtonPropsType> = ({
                                               className,
                                               // disabled,
                                               handleClick,
                                               children,
                                           }) => {
    return (
        <button
            onClick={handleClick}
            className={className}
            // disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;