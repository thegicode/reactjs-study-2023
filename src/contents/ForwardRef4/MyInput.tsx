import {
    forwardRef,
    useRef,
    useImperativeHandle,
    InputHTMLAttributes,
    // useState,
    // useEffect,
} from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

interface MyInputRef {
    focus: () => void;
    scrollIntoView: () => void;
    // state: number;
    // setValue: (value: number) => void;
}

const MyInput = forwardRef<MyInputRef, MyInputProps>((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // const [state, setState] = useState<number>(1);

    useImperativeHandle(
        ref,
        () => ({
            focus() {
                inputRef.current?.focus();
            },
            scrollIntoView() {
                inputRef.current?.scrollIntoView();
            },
            // setValue(idx: number) {
            //     setState(idx);
            // },
        }),
        []
    );

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.value = state.toString();
    //     }
    // }, [state]);

    return <input {...props} ref={inputRef} />;
});

export default MyInput;

// useImperativeHandle
// 때로는 부모 컴포넌트가 자식 컴포넌트의 특정 메서드나 값을 직접 액세스하고 싶을 때가 있다.
// useImperativeHandle을 사용하면 자식 컴포넌트의 내부 ref를 커스터마이징하여 부모 컴포넌트로부터 특정 메서드나 값을 제공할 수 있습니다.
