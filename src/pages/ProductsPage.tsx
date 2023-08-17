import "../css/productsPage.css";
import "../css/modal.css";
import Products1 from "../contents/products/Products1";
// import Products2 from "../contents/products/products2/index";
import Products3 from "../contents/products/Products3";
import Products2 from "../contents/products/Products2";

export default function memoPage() {
    return (
        <section className="productsPage">
            <h1>Prodcuts</h1>

            <h2>Products 1 : props drilling(미완성)</h2>
            <p>data 참조 위해 남겨 줌</p>
            <Products1 />

            <h2>Products 2 : props drilling</h2>
            <Products2 />

            <h2>Products 3 : forwardRef</h2>
            <Products3 />
        </section>
    );
}
