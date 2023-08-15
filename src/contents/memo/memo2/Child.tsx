import { memo } from "react";

interface DataProps {
    a: string;
    b: string;
}

interface ChildProps {
    data: DataProps;
}

function Child({ data }: ChildProps) {
    console.log("자식 컴포넌트");

    return (
        <div className="child">
            <h4>Child Component</h4>
            <p>{data.a}</p>
            <p>{data.b}</p>
        </div>
    );
}

export default memo(Child);
