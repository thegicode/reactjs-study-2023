import "../css/createContextPage.css";

function CreateContextPage() {
    return (
        <section className="createContextPage">
            <h1>CreateContextPage</h1>
            <p>
                createContext를 사용하면 components가 제공하거나 읽을 수 있는
                context를 만들 수 있다. <br />
                useContext 같이 사용.
            </p>

            <code className="code-reference">createContext(defaultValue)</code>

            <p>컴포넌트 밖에서 createContext를 호출하여 context를 만든다.</p>
        </section>
    );
}

export default CreateContextPage;
