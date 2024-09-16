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
    <div className="base">
      <Header />
      <div className="base__container mt-24">{children}</div>
      <Footer />
    </div>
  );
}
