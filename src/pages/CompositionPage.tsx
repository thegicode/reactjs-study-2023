import "../css/compositionPage.css";

import Composition1 from "../contents/compositon/Composition1";
import Composition2 from "../contents/compositon/Composition2";
import Composition3 from "../contents/compositon/Composition3";
import Composition4 from "../contents/compositon/Composition4";
import Composition5 from "../contents/compositon/Composition5";

function CompositonPage() {
    return (
        <div className="compositionPage">
            <h1>CompositonPage</h1>

            <h2>1</h2>
            <Composition1 />

            <h2>2</h2>
            <Composition2 />
            {/* <Composition21 /> */}

            <h2>3. context</h2>
            <Composition3 />

            <h2>4. forwardRef</h2>
            <Composition4 />

            <h2>5. useReducer</h2>
            <Composition5 />
        </div>
    );
}

export default CompositonPage;
