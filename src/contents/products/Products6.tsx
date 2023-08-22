// forwardRef와 useReducer를 사용하여 모달 컴포넌트를 만들고 상태를 관리하는 예제

import {
    ChangeEvent,
    forwardRef,
    // memo,
    // useEffect,
    useImperativeHandle,
    useReducer,
    useRef,
    useState,
} from "react";

// 아이템 데이터에 대한 인터페이스 정의
interface DataProps {
    id: string;
    title: string;
    amount: number;
}

// 아이템 데이터 예시
const Data: DataProps[] = [
    { id: "1", title: "title", amount: 1 },
    { id: "2", title: "title", amount: 2 },
    { id: "3", title: "title", amount: 3 },
];

// 모달 열기 시 필요한 속성을 정의한 인터페이스
interface OpenModalProps {
    id: string;
    title: string;
    amount: number;
    onAmountChange: (newAmount: number) => void;
}

// 모달을 열 때 필요한 기능을 정의하는 인터페이스
interface ModalHandles {
    openModal: (props: OpenModalProps) => void;
}

export default function App() {
    console.log("App");

    const modalRef = useRef<ModalHandles | null>(null);

    // 아이템 클릭 시 실행되는 함수. 모달을 열어준다.
    const handleItemClick = (props: OpenModalProps) => {
        modalRef.current?.openModal(props);
    };

    // useEffect(() => {
    //     console.log("handleItemClick 변경");
    // }, [handleItemClick]);

    return (
        <section className="products">
            <Parent data={Data} onItemClicked={handleItemClick} />
            <Modal ref={modalRef} />
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (props: OpenModalProps) => void;
}

// 부모 컴포넌트. 데이터를 받아 Item 컴포넌트를 렌더링한다.
function Parent({ data, onItemClicked }: ParentProps) {
    console.log("Parent");
    return (
        <ul>
            {data.map((item, index) => (
                <Item key={index} data={item} onItemClicked={onItemClicked} />
            ))}
        </ul>
    );
}

interface ItemProps {
    data: DataProps;
    onItemClicked: (props: OpenModalProps) => void;
}

// 아이템 컴포넌트. 각 아이템을 렌더링하고 클릭 시 모달을 열어준다.
function Item({ data, onItemClicked }: ItemProps) {
    console.log("Item", data.id);

    const { id, title, amount } = data;
    const [currentAmount, setCurrentAmount] = useState<number>(amount);

    // 버튼을 클릭하면 모달을 연다.
    const handleClick = () => {
        onItemClicked({
            id,
            title,
            amount: currentAmount,
            onAmountChange: setCurrentAmount,
        });
    };

    // useEffect(() => {
    //     console.log("handleClick 변경");
    // }, [handleClick]);

    return (
        <li>
            <p>
                [{id}] {title}, amount: {currentAmount}
            </p>
            <input
                type="number"
                value={currentAmount}
                min="0"
                onChange={(e) => setCurrentAmount(Number(e.target.value))}
            />
            <button onClick={handleClick}>button</button>
        </li>
    );
}

// 리듀서의 액션 타입 정의
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const SET_AMOUNT = "SET_AMOUNT";

// 모달 상태 정의
type State = {
    isVisible: boolean;
    id: string | null;
    title: string;
    amount: number;
    onAmountChange: ((newAmount: number) => void) | null;
};

// 모달의 액션을 정의
type Action =
    | {
          type: typeof OPEN_MODAL;
          id: string | null;
          title: string;
          amount: number;
          onAmountChange: ((newAmount: number) => void) | null;
      }
    | { type: typeof CLOSE_MODAL }
    | { type: typeof SET_AMOUNT; amount: number };

// 모달의 초기 상태를 정의
const initialState = {
    isVisible: false,
    id: null,
    title: "",
    amount: 0,
    onAmountChange: null,
};

// 리듀서를 사용하여 모달의 상태를 관리
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case OPEN_MODAL:
            const { id, title, amount, onAmountChange } = action;
            return {
                isVisible: true,
                id,
                title,
                amount,
                onAmountChange,
            };
        case CLOSE_MODAL:
            return initialState;
        case SET_AMOUNT:
            return {
                ...state,
                amount: action.amount,
            };
        default:
            return state;
    }
};

// 모달 컴포넌트. forwardRef를 사용하여 모달을 제어할 수 있는 메서드를 노출

const Modal = forwardRef<ModalHandles, {}>((props, ref) => {
    console.log("Modal");

    const [state, dispatch] = useReducer(reducer, initialState);
    const { isVisible, id, title, amount, onAmountChange } = state;

    useImperativeHandle(ref, () => ({
        openModal: ({ id, title, amount, onAmountChange }: OpenModalProps) => {
            dispatch({
                type: OPEN_MODAL,
                id,
                title,
                amount,
                onAmountChange,
            });
        },
    }));

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_AMOUNT, amount: Number(e.target.value) });
    };

    const handleClose = () => {
        if (onAmountChange) {
            onAmountChange(amount);
        }

        dispatch({ type: CLOSE_MODAL });
    };

    if (!isVisible) return null;

    return (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {id}</h4>
                <h4>title: {title}</h4>
                <p>amount: {amount}</p>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    );
});
