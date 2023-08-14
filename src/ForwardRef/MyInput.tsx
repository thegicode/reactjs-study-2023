import React, { InputHTMLAttributes, forwardRef } from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
    const { label, ...otherProps } = props;
    return (
        <label>
            {label}
            <input {...otherProps} ref={ref} />
        </label>
    );
});

export default MyInput;
