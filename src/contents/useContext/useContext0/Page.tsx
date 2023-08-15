import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

interface PageProps {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Page: React.FC<PageProps> = ({ isDark, setIsDark }) => {
    return (
        <div className="useContext1">
            <Header isDark={isDark} />
            <Content isDark={isDark} />
            <Footer isDark={isDark} setIsDark={setIsDark} />
        </div>
    );
};

export default Page;
