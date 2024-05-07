export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
            {children}
        </main>
        </div>
    );
    }