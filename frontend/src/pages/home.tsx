import Base from "../components/sections/base";

export default function Home() {
  return (
    <Base pageTitle="Home">
      <h1>Home {window.api_url}</h1>
    </Base>
  );
}
