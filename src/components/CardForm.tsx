import { useState } from 'react';
import { Search, Save, ImageIcon, Link } from 'lucide-react';
import type { Card, CardInsert } from '../lib/supabase';

export function CardForm({
  onSubmit,
  onClose,
  initial,
}: {
  onSubmit: (card: CardInsert) => void;
  onClose: () => void;
  initial?: Card | null;
}) {
  const [form, setForm] = useState<CardInsert>({
    name: initial?.name ?? '',
    set_name: initial?.set_name ?? '',
    card_number: initial?.card_number ?? '',
    raw_price: initial?.raw_price ?? 0,
    psa10_price: initial?.psa10_price ?? 0,
    psa10_population: initial?.psa10_population ?? 0,
    image_url: initial?.image_url ?? '',
  });

  return (
    <div className="max-w-md mx-auto pb-24 text-white">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <div className="flex justify-center bg-slate-900 border border-slate-800 rounded-3xl p-4 h-[260px] items-center overflow-hidden">
          {form.image_url ? (
            <img
              src={form.image_url}
              alt="preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) =>
                (e.currentTarget.src =
                  'https://placehold.jp/24/1e293b/ffffff/200x280.png?text=ERROR')
              }
            />
          ) : (
            <div className="text-slate-600 flex flex-col items-center gap-2">
              <ImageIcon size={48} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                No Image
              </p>
            </div>
          )}
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <input
            placeholder="カード名"
            className="w-full bg-slate-800 border-none rounded-xl p-4 text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="画像URLを貼り付け"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] text-slate-300"
            value={form.image_url ?? ''}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="SET (例: OP07)"
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-white uppercase"
              value={form.set_name}
              onChange={(e) => setForm({ ...form, set_name: e.target.value })}
            />
            <input
              placeholder="NO (例: 051)"
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-white"
              value={form.card_number}
              onChange={(e) =>
                setForm({ ...form, card_number: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="素体価格"
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-white text-center"
              value={form.raw_price}
              onChange={(e) =>
                setForm({ ...form, raw_price: Number(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="PSA10価格"
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-emerald-400 text-center"
              value={form.psa10_price}
              onChange={(e) =>
                setForm({ ...form, psa10_price: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={`https://jp.mercari.com/search?keyword=${form.name} PSA10&status=on_sale`}
            target="_blank"
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3.5 rounded-2xl"
          >
            <Search size={18} /> メルカリ実売検索
          </a>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 bg-sky-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <Save size={20} />
            保存する
          </button>
        </div>
      </form>
    </div>
  );
}
