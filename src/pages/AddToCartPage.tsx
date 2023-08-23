import "../css/productsPage.css";
import "../css/modal.css";
import AddToCart1 from "../contents/addToCart/AddToCart1";
import AddToCart2 from "../contents/addToCart/AddToCart2";

export default function memoPage() {
    return (
        <section className="productsPage">
            <h1>AddToCart</h1>

            <h2>AddToCart 1 : only useState(중단)</h2>
            <p>
                - data를 가지고 있어야 하는 구조로 다시 변경하기로 개선, 2번으로
                다른 버전
            </p>
            <AddToCart1 />

            <h2>AddToCart 2 : forwardRef + useReducer(Item 기준)</h2>
            <p></p>
            <AddToCart2 />

            {/* 

            <h2>Products 3 : forwardRef *****</h2>
            <Products3 />

            <h2>Products 3 : forwardRef, 메모리 기능 추가</h2>
            <Products3Memo />

            <h2>Products 4 : useReducer</h2>
            <p>
                - 모달 열릴 때 Parent, 모든 Item이 리렌더링, memo 추가해야 한다.
            </p>
            <p>- 모달 열릴 때 App이 리렌더링</p>
            <Products4 />

            <h2>Products 5 : forwardRef + useReducer(Item 기준)</h2>
            <p>
                - useReducer를 추가한후 Item input value가 변경될 때마다,
                Modal이 닫힐 때마다 모든 Item이 리렌더링 된다.
            </p>
            <Products5 />

            <h2>Products 6 : forwardRef + useReducer(Modal 기준) *****</h2>
            <p>
                - Modal에 useReducer를 적용하니 이전 코드에 비해 코드가 눈에 더
                잘 들어오고 관리도 편한 것 같다.
            </p>
            <Products6 />

            <h2>
                Products 7 : useReducer(Modal 기준), Products 6 에서 forwardRef
                제거
            </h2>
            <p>- 모달이 변경될 때 App, Parent, 모든 Item이 리렌더링된다. </p>
            <Products7 />

            <h2>Products 8 : Products2 의 리렌더링 개선</h2>
            <p></p>
            <Products8 /> */}
        </section>
    );
}
