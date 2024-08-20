import Header from "./header";
import Footer from "./footer";
import { useEffect } from "react";

interface baseProps {
  pageTitle: string;
  children: JSX.Element;
}

export default function Base({ pageTitle, children }: baseProps) {
  useEffect(() => {
    document.title = pageTitle + " | Task Management Application";
  }, [pageTitle]);

  return (
    <div className="base flex flex-col min-h-screen">
      <Header />
      <div className="base__container flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
