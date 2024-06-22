export default function Faq() {
    return (
        <div className="flex flex-col justify-center items-center mx-auto gap-4 md:mt-64 max-md:mt-12 text-center">
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <div className="max-w-xl gap-2 flex flex-col px-8 py-2 rounded-xl mt-12">
                <p className="text-lg">How do I cancel my subscription?</p>
                <p className="text-white/60">You can cancel your subscription anytime by logging into your account and navigating to the subscription settings. Follow the prompts to cancel your plan. Your subscription will remain active until the end of the current billing period.</p>
            </div>
            <div className="bg-white/10 rounded-xl w-full h-0.5"/>
            <div className="max-w-xl gap-2 flex flex-col px-8 py-2 rounded-xl">
                <p className="text-lg">Is my payment information secure?</p>
                <p className="text-white/60">Yes, we never store your payment information, and we do not share it with third parties.</p>
            </div>
            <div className="bg-white/10 rounded-xl w-full h-0.5"/>
            <div className="max-w-xl gap-2 flex flex-col px-8 py-2 rounded-xl">
                <p className="text-lg">What payment methods do you accept?</p>
                <p className="text-white/60">You can easily use Google Pay. We also have support for any credit card in the world.</p>
            </div>
            <div className="bg-white/10 rounded-xl w-full h-0.5"/>
            <div className="max-w-xl gap-2 flex flex-col px-8 py-2 rounded-xl">
                <p className="text-lg">Will I be notified before my subscription renews?</p>
                <p className="text-white/60">Yes, you will get an email with a &quot;Strip&quot; address that will notify you of your next payment.</p>
            </div>
            <div className="bg-white/10 rounded-xl w-full h-0.5"/>
            <div className="max-w-xl gap-2 flex flex-col px-8 py-2 rounded-xl">
                <p className="text-lg">What happens if my payment fails?</p>
                <p className="text-white/60">If your payment fails, if there is no money in your account, Applio Premium will be automatically cancelled. Otherwise, we will contact you in order to resolve this error.</p>
            </div>
            <div className="bg-white/10 rounded-xl w-full h-0.5"/>
            <div className="max-w-xl gap-2 flex flex-col px-8 py-2 rounded-xl">
                <p className="text-lg">Can I get a refund?</p>
                <p className="text-white/60">You will be able to get a refund as long as no more than 24 hours have passed since you purchased any Applio Premium plan, when requesting a refund your plan will be automatically cancelled.</p>
            </div>
            <div className="bg-white/10 rounded-xl w-full h-0.5"/>
        </div>
    )
}