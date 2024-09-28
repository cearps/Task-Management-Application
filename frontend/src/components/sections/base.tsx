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
    <div className="base m-h-full">
      <Header />
      <div className="base__container min-h-screen flex items-center justify-center">
        <div
          className="w-full max-w-xlg bg-white shadow-lg rounded-lg p-6 overflow-y-auto"
          style={{ height: "84vh" }}
        >
          <div className="space-y-4 h-full">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
