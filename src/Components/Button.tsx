import React, {memo} from 'react';

type ButtonPropsType = {
    className: string
    disabled?: boolean
    handleClick: () => void
    title: string
}

const Button: React.FC<ButtonPropsType> = memo(({
                                               className,
                                               disabled,
                                               handleClick,
                                               title,
                                           }) => {
    return (
        <button
            onClick={handleClick}
            className={className}
            disabled={disabled}
        >
            {title}
        </button>
    );
})

export default Button;