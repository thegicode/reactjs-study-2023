import "../css/productsPage.css";
import "../css/modal.css";
import Products1 from "../contents/products/Products1";
import Products2 from "../contents/products/Products2";
import Products3 from "../contents/products/Products3";
import Products3Memo from "../contents/products/Products3Memo";
import Products4 from "../contents/products/Products4";
import Products5 from "../contents/products/Products5";
// import Products6 from "../contents/products/Products6";

export default function memoPage() {
    return (
        <section className="productsPage">
            <h1>Prodcuts</h1>
            <h2>Products 1 : props drilling(미완성)</h2>
            <p>data 참조 위해 남겨 줌</p>
            <Products1 />
            <h2>Products 2 : props drilling</h2>
            <Products2 />
            <p>
                onAmountChange는 이 코드에서의 key concept 중 하나입니다. 이
                함수는 Item 컴포넌트에서 수량이 변경될 때마다 호출되며, Modal
                컴포넌트에게 변경된 수량을 전달하는 역할을 합니다.
            </p>

            <h2>Products 3 : forwardRef</h2>
            <Products3 />

            <h2>Products 3 : forwardRef, 메모리 기능 추가</h2>
            <Products3Memo />

            <h2>Products 4 : useReducer</h2>
            <Products4 />

            <h2>Products 5 : forwardRef + useReducer(Item 기준)</h2>
            <p>
                - useReducer를 추가한후 Item input value가 변경될 때마다,
                Modal이 닫힐 때마다 모든 Item이 리렌더링 된다.
            </p>
            <Products5 />
        </section>
    );
}
