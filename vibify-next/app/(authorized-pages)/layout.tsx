'use server';
import { Suspense, type PropsWithChildren } from 'react';
import Navbar from '../(components)/Navbar';
export default async function Layout({ children }: PropsWithChildren<unknown>) {


    return (
        <Suspense>
            <div className="flex md:flex-col flex-row min-w-screen">
                <Navbar/>
                <main className={`w-full md:pl-[100px]`}>
                    {children}
                </main>
            </div>
        </Suspense>
    );
}
