// forwardRef + useReducer (MOdal)

import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    useReducer,
} from "react";

interface DataProps {
    id: string;
    title: string;
    amount: number;
}

const Data: DataProps[] = [
    { id: "1", title: "title", amount: 1 },
    { id: "2", title: "title", amount: 2 },
    { id: "3", title: "title", amount: 3 },
];

// 모달을 열 때 필요한 기능을 정의하는 인터페이스
interface ModalHandles {
    openModal: (
        id: string,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

export default function App() {
    console.log("App");
    const modalRef = useRef<ModalHandles | null>(null);

    // 아이템을 클릭할 때 실행되는 함수
    const handleItemClick = (
        id: string,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => {
        modalRef.current?.openModal(id, title, amount, onAmountChange);
    };

    return (
        <section className="products">
            <Parent data={Data} onItemClicked={handleItemClick} />
            <Modal ref={modalRef} />
        </section>
    );
}

interface ParentProps {
    data: DataProps[];
    onItemClicked: (
        id: string,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

// Parent 컴포넌트는 데이터를 받아 각각의 Item 컴포넌트를 렌더링
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
    onItemClicked: (
        id: string,
        title: string,
        amount: number,
        onAmountChange: (newAmount: number) => void
    ) => void;
}

function Item({ data, onItemClicked }: ItemProps) {
    console.log("Item", data.id);

    const { id, title, amount } = data;
    const [currentAmount, setCurrentAmount] = useState<number>(amount);

    // 버튼을 클릭하면 모달을 연다.
    const handleClick = () => {
        onItemClicked(id, title, currentAmount, setCurrentAmount);
    };

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

const Modal = forwardRef<ModalHandles, {}>((props, ref) => {
    console.log("Modal");

    const OPEN_MODAL = "OPEN_MODAL";
    const CLOSE_MODAL = "CLOSE_MODAL";
    const SET_AMOUNT = "SET_AMOUNT";

    type State = {
        isVisible: boolean;
        id: string | null;
        title: string;
        amount: number;
        onAmountChange: ((newAmount: number) => void) | null;
    };

    // 모달의 상태와 액션을 정의
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

    const [state, dispatch] = useReducer(reducer, initialState);

    useImperativeHandle(ref, () => ({
        openModal: (id, title, amount, onAmountChange) => {
            dispatch({
                type: OPEN_MODAL,
                id,
                title,
                amount,
                onAmountChange,
            });
        },
    }));

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_AMOUNT, amount: Number(e.target.value) });
    };

    const handleClose = () => {
        if (state.onAmountChange) {
            state.onAmountChange(state.amount);
        }

        dispatch({ type: CLOSE_MODAL });
    };

    return state.isVisible ? (
        <div className="modal">
            <div className="modal-container">
                <h3>Modal</h3>
                <h4>id: {state.id}</h4>
                <h4>title: {state.title}</h4>
                <p>amount: {state.amount}</p>
                <input
                    type="number"
                    value={state.amount}
                    onChange={handleAmountChange}
                />
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    ) : null;
});
