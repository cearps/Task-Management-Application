import Joyride from "react-joyride";

export function BaseTutorial({ steps }: { steps: any }) {
  const firstLogin = localStorage.getItem("firstLogin");
  return firstLogin === "true" ? <Joyride steps={steps} /> : null;
}
