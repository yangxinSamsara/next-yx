import SignIn from "./sign-in";
import { useSession } from "next-auth/react";

export default function GithubButton() {
  const { data: session } = useSession();
  if (!session?.user) {
    return <SignIn />;
  }
  return <h1>Hello {session.user?.name}</h1>;
}
