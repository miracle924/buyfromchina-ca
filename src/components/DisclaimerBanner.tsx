type DisclaimerBannerProps = {
  className?: string;
};

export default function DisclaimerBanner({ className = '' }: DisclaimerBannerProps) {
  return (
    <div
      role="note"
      aria-label="Disclaimer"
      className={`rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 ${className}`}
    >
      <p>
        <strong>Disclaimer:</strong> BuyFromChina.ca is a purchasing agent for direct shipment from Taobao/Tmall. We do not
        manufacture, sell, or warrant the products. All sales are final and no returns or exchanges are offered.
      </p>
    </div>
  );
}
