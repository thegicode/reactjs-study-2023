import "../css/productsPage.css";
import "../css/modal.css";
import Products1 from "../contents/products/Products1";
import Products2 from "../contents/products/Products2";
import Products3 from "../contents/products/Products3";
import Products3Memo from "../contents/products/Products3Memo";
import Products4 from "../contents/products/Products4";
import Products5 from "../contents/products/Products5";
import Products6 from "../contents/products/Products6";
import Products7 from "../contents/products/Products7";
import Products8 from "../contents/products/Products8";

export default function memoPage() {
    return (
        <section className="productsPage">
            <h1>Prodcuts</h1>

            <h2>Products 1 : props drilling(미완성)</h2>
            <p>data 참조 위해 남겨 줌</p>
            <Products1 />

            <h2>Products 2 : props drilling, only useState *****</h2>
            <Products2 />
            <p>
                onAmountChange는 이 코드에서의 key concept 중 하나입니다. 이
                함수는 Item 컴포넌트에서 수량이 변경될 때마다 호출되며, Modal
                컴포넌트에게 변경된 수량을 전달하는 역할을 합니다.
            </p>

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
            <Products8 />
        </section>
    );
}
