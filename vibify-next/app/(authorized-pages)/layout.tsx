'use server';
import { Suspense, type PropsWithChildren } from 'react';
import Navbar from '../(components)/Navbar';
export default async function Layout({ children }: PropsWithChildren<unknown>) {


    return (
        <Suspense>
            <div className="flex ">
                <Navbar/>
                <main className={`md:mt-[var(--nav-height)] h-full`}>
                    {children}
                </main>
            </div>
        </Suspense>
    );
}
