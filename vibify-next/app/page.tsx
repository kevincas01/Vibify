import { getServerSession } from "next-auth";
import LoginScreen from "./(components)/LoginScreen";
import { authOptions } from "./utils/libs/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Vibify</h1>
        <LoginScreen />
      </div>
    </div>
  );
}
