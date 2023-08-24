import { Link } from "react-router-dom";

export default function Hooks() {
    return (
        <>
            <Link to="./products">Products</Link>
            <Link to="./addtocart">AddToCart</Link>
        </>
    );
}
