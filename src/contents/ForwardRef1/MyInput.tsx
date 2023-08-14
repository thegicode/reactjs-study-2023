import { forwardRef, InputHTMLAttributes } from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
    return (
        <label>
            {props.label}
            <input {...props} ref={ref} />
        </label>
    );
});

export default MyInput;
