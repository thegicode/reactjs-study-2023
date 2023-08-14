import { InputHTMLAttributes, forwardRef, ForwardedRef } from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const MyInput = (props: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { label, ...otherProps } = props;
    return (
        <label>
            {label}
            <input {...otherProps} ref={ref} />
        </label>
    );
};

export default forwardRef<HTMLInputElement, MyInputProps>(MyInput);
