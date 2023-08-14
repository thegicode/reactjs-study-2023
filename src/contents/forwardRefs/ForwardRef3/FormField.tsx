import { forwardRef, useState, ChangeEvent } from "react";
import MyInput from "./MyInput";

interface FormFieldProps {
    label: string;
    isRequired?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    function FormField({ label, isRequired }, ref) {
        const [value, setValue] = useState("");

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <>
                <MyInput
                    ref={ref}
                    label={label}
                    value={value}
                    onChange={handleChange}
                />
                {isRequired && value === "" && <i>Required</i>}
            </>
        );
    }
);

export default FormField;
