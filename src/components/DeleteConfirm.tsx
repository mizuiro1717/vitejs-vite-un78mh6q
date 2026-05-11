import { AlertTriangle, Trash2, X } from 'lucide-react';
import type { Card } from '../lib/supabase';

interface Props {
  card: Card;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirm({ card, onConfirm, onClose }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-center">
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-slate-900 border-2 border-red-800 rounded-3xl p-6 shadow-2xl w-full max-w-sm">
        <div className="flex items-center gap-3 mb-4 text-red-500">
          <div className="p-2 bg-red-950 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-lg font-bold text-white">本当に削除しますか？</h2>
        </div>
        <p className="text-slate-300 text-sm mb-6 bg-slate-800 p-3 rounded-xl">
          「<span className="font-bold text-white">{card.name}</span>
          」を削除します。
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-slate-300 py-3 rounded-xl font-bold"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-bold"
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
}
