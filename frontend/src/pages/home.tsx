import Base from "../components/sections/base";
import WelcomeDisplay from "../components/user/welcome-display";

export default function Home() {
  return (
    <Base pageTitle="Home">
      <>
        <WelcomeDisplay />
      </>
    </Base>
  );
}
