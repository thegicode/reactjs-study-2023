import Composition1 from "../contents/compositon/Composition1";
import Composition2 from "../contents/compositon/Composition2";
import Composition3 from "../contents/compositon/Composition3";

import styles from "../css/CompositionPage.module.css";

function CompositonPage() {
    return (
        <div className={styles.compositionPage}>
            <h1>CompositonPage</h1>

            <h2>1</h2>
            <Composition1 />

            <h2>2</h2>
            <Composition2 />
            {/* <Composition21 /> */}

            <h2>3. context</h2>
            <Composition3 />
        </div>
    );
}

export default CompositonPage;
