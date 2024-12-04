import { getProviders } from "next-auth/react";
import LoginScreen from "./(components)/LoginScreen";

export default async function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Vibify</h1>
        <LoginScreen />
      </div>
    </div>
  );
}
