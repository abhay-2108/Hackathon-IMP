export function Header() {
    return (
        <header className="gradient-bg text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
                <i className="fas fa-heartbeat text-3xl md:text-4xl"></i>
                <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                    Chronic Care Risk Prediction
                </h1>
            </div>
            <div className="mt-4 md:mt-0 text-right">
                <p className="text-sm opacity-80">
                    Dashboard for Proactive Patient Care
                </p>
            </div>
        </header>
    );
}
