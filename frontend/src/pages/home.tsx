import Base from "../components/sections/base";

export default function Home() {
  return (
    <Base pageTitle="Home">
      <div>
        <h1>Home</h1>
        <p>{process.env.REACT_APP_API_URL}</p>
      </div>
    </Base>
  );
}
