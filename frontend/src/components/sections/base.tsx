import Header from "./header";
import Footer from "./footer";

export default function Base({ children }: { children: JSX.Element }) {
  return (
    <div className="base">
      <Header />
      <div className="base__container">{children}</div>
      <Footer />
    </div>
  );
}
