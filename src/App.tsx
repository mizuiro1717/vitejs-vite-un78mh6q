import { useState, useEffect } from 'react';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { Card, CardInsert } from './lib/supabase';
import { CardCard } from './components/CardCard';
import { CardForm } from './components/CardForm';
import { DeleteConfirm } from './components/DeleteConfirm';

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editCard, setEditCard] = useState<Card | null>(null);
  const [deleteCard, setDeleteCard] = useState<Card | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    setLoading(true);
    const { data } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false });
    setCards(data ?? []);
    setLoading(false);
  }

  async function handleAdd(card: CardInsert) {
    const { data, error } = await supabase
      .from('cards')
      .insert(card)
      .select()
      .maybeSingle();
    if (!error && data) {
      setCards((prev) => [data, ...prev]);
      setMode('list');
    }
  }

  async function handleUpdate(card: CardInsert) {
    if (!editCard) return;
    const { data, error } = await supabase
      .from('cards')
      .update(card)
      .eq('id', editCard.id)
      .select()
      .maybeSingle();
    if (!error && data) {
      setCards((prev) => prev.map((c) => (c.id === editCard.id ? data : c)));
      setMode('list');
      setEditCard(null);
    }
  }

  async function handleDelete() {
    if (!deleteCard) return;
    await supabase.from('cards').delete().eq('id', deleteCard.id);
    setCards((prev) => prev.filter((c) => c.id !== deleteCard.id));
    setDeleteCard(null);
  }

  if (mode === 'add' || (mode === 'edit' && editCard)) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4">
        <header className="max-w-md mx-auto mb-6 flex items-center gap-3">
          <button
            onClick={() => setMode('list')}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {mode === 'add' ? '追加' : '編集'}
          </h1>
        </header>
        <CardForm
          onSubmit={mode === 'add' ? handleAdd : handleUpdate}
          onClose={() => setMode('list')}
          initial={editCard}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-black pl-2">PSA10 利益チェッカー</h1>
        <button
          onClick={() => setMode('add')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 font-bold text-sm shadow-lg"
        >
          <Plus size={18} />
          追加
        </button>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="カード名で検索..."
          className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6"
        />
        {loading ? (
          <div className="text-center py-20 opacity-50">読み込み中...</div>
        ) : (
          <div className="grid gap-3">
            {cards
              .filter((c) => c.name.includes(search))
              .map((card) => (
                <CardCard
                  key={card.id}
                  card={card}
                  onEdit={(c) => {
                    setEditCard(c);
                    setMode('edit');
                  }}
                  onDelete={setDeleteCard}
                />
              ))}
          </div>
        )}
      </main>
      {deleteCard && (
        <DeleteConfirm
          card={deleteCard}
          onConfirm={handleDelete}
          onClose={() => setDeleteCard(null)}
        />
      )}
    </div>
  );
}
