export default function AppIntroduction() {
    return (
        <main className="max-w-5xl mx-auto py-24 px-6 text-neutral-300 leading-relaxed">
            <header className="mb-8">
                <h1 className="text-4xl font-semibold title text-white mb-4">
                    Introduction to Applio App
                </h1>
                <p className="text-sm text-neutral-200">
                    After extensive development, we are excited to present the first public Alpha version of Applio App.
                </p>
            </header>
            <div className="w-full bg-white/10 h-0.5 my-10"/>
            
            <article>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Acknowledging Our Supporters 💚</h2>
                    <p>
                        We want to express our deepest gratitude to all our <strong>Supporters</strong>. Your invaluable contributions 
                        have played a key role in making <strong>Applio App</strong> a reality. As a token of appreciation, you will be 
                        among the first to experience this Alpha version.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Current Development Status</h2>
                    <p>
                        Applio App is in its <strong>early development phase</strong>, which means:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li>The design is <strong>not final</strong>, so frequent updates and revisions are expected.</li>
                        <li>Some system errors or bugs may occur from time to time.</li>
                    </ul>
                    <p className="mt-4">
                        <em>Please note that we do not recommend using Applio App for everyday or critical tasks at this stage.</em>
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Access Requirements</h2>
                    <p>
                        To gain access to the Applio App Alpha, users must meet the following criteria:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li><strong className="text-white">Technical:</strong> You must be using Windows 10 (version 1909 or later) or Windows 11, as these are the primary platforms for development and testing. For the best performance, we recommend keeping your operating system up to date.</li>
                        <li><strong className="text-white">Registration:</strong> You must be registered on our official website.</li>
                        <li><strong className="text-white">Waitlist:</strong> You must be on the waitlist or be a verified Supporter to access the Alpha.</li>
                        <li><strong className="text-white">Discord Community:</strong> You must be a member of our official <a href="/discord" className="underline hover:text-neutral-200 text-white">IAHispano Discord</a> server.</li>
                    </ul>
                    <p className="mt-4">
                        Access will only be granted to those who meet these requirements. If you are not yet a member of the Discord, 
                        please <a href="/discord" className="underline hover:text-neutral-200 text-white">join now</a> to stay updated and secure your access.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Features Available in the Alpha Version</h2>
                    <p>
                        This initial Alpha release focuses on providing the core functionality of the app. 
                        Over time, additional features will be progressively introduced as we continue to enhance the platform.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Key Dates for Alpha Access 🗓️</h2>
                    <p>
                        Please take note of the following key dates for accessing the Alpha version:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li><strong>Supporters:</strong> Access begins on <em className="text-white font-sans font-semibold">November 29 at 00:00 CET</em>.</li>
                        <li><strong>Waitlisted Users:</strong> Access will be granted starting <em className="text-white font-sans font-semibold">November 30 at 00:00 CET</em>.</li>
                    </ul>
                    <p className="mt-4">
                        Ensure you are ready to join when your access is granted. Set a reminder and check your email for notifications.
                    </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Usage Policies</h2>
                    <p>
                        To ensure a smooth and secure experience, we ask all users to follow these guidelines:
                    </p>
                    <ul className="list-decimal list-inside mt-4 space-y-2">
                        <li><strong>Distribution Restrictions:</strong> The app should not be shared outside of official distribution channels. Each copy is linked to a unique user ID.</li>
                        <li><strong>Non-Compliance:</strong> Failure to adhere to these policies may result in removal from the waitlist or loss of Supporter status.</li>
                    </ul>
                    <p className="mt-4">
                        These policies are in place to protect both users and the development team. Your cooperation is greatly appreciated.
                    </p>
                </section>
            </article>
            <footer className="mt-16 border-t-2 border-white/10 pt-6">
                <p className="text-neutral-200">
                    Thank you for your continued support and trust. Together, we are shaping the future of Applio App. 💚
                </p>
                <p className="mt-2 text-sm">
                    For further inquiries or feedback, please join our <a className="hover:text-white underline slow text-neutral-200" href="/discord">Discord community</a> or contact us directly.
                </p>
            </footer>
        </main>
    );
}
