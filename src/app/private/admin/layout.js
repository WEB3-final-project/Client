import Header from "@/components/private/layout/Header";

function adminLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default adminLayout;