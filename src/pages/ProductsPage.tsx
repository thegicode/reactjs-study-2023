import "../css/productsPage.css";
import Products1 from "../contents/products/products1/index";
import Products2 from "../contents/products/products2/index";
// import Products3 from "../contents/products/products3/index";

export default function memoPage() {
    return (
        <section className="productsPage">
            <h1>Prodcuts</h1>

            <h2>Products 1</h2>
            <Products1 />

            <h2>Products 2</h2>
            <Products2 />

            {/* <h2>Products 3</h2>
            <Products3 /> */}
        </section>
    );
}
