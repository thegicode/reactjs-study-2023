import React from "react";

interface DataProps {
    a: number;
    b: number;
}

const Data = [
    { a: 1, b: 1 },
    { a: 2, b: 2 },
    { a: 3, b: 3 },
];

export default function App() {
    return <Parent data={Data} />;
}

interface ParentProps {
    data: DataProps[];
}
function Parent({ data }: ParentProps) {
    return (
        <List>
            {data.map((item, index) => (
                <Item key={index} data={item} />
            ))}
        </List>
    );
}

interface ListProps {
    children: React.ReactNode;
}
function List({ children }: ListProps) {
    return <ul>{children}</ul>;
}

interface ItemProps {
    data: DataProps;
}
function Item({ data }: ItemProps) {
    return (
        <li>
            {data.a} {data.b}
        </li>
    );
}
