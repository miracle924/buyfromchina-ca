'use client';

type Item = {
  id: string;
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="space-y-4" role="list">
      {items.map((item) => {
        return (
          <div key={item.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm" role="listitem">
            <h3 className="px-5 py-4 text-left text-base font-semibold text-gray-900">{item.question}</h3>
            <div className="px-5 pb-5 text-sm text-gray-600">
              <p className="pt-1">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
