import { useState, useEffect } from 'react';
import { Plus, Search, ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { Card, CardInsert } from './lib/supabase';
import { CardForm } from './components/CardForm';
import { DeleteConfirm } from './components/DeleteConfirm';

// --- カード表示（デザイン固定版） ---
function CardDisplay({ card, onEdit, onDelete }: { card: Card, onEdit: (c: Card) => void, onDelete: (c: Card) => void }) {
  const profit = (card.psa10_price || 0) - (card.raw_price || 0);

  return (
    <div style={{
      backgroundColor: '#0f172a', // 深い紺色
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }}>
      {/* 画像エリア：64x88pxで完全固定 */}
      <div style={{
        width: '64px',
        height: '88px',
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {card.image_url ? (
          <img
            src={card.image_url}
            alt={card.name}
            referrerPolicy="no-referrer"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: '10px', color: '#475569' }}>{card.number}</span>
        )}
      </div>

      {/* テキスト情報 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace' }}>{card.number}</div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.name}</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '11px', marginTop: '4px' }}>
          <div style={{ color: '#94a3b8' }}>素体: <span style={{ color: 'white' }}>¥{(card.raw_price || 0).toLocaleString()}</span></div>
          <div style={{ color: '#94a3b8', textAlign: 'right' }}>PSA10: <span style={{ color: '#7dd3fc', fontWeight: 'bold' }}>¥{(card.psa10_price || 0).toLocaleString()}</span></div>
        </div>

        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', color: '#64748b' }}>期待利益</span>
          <span style={{ fontSize: '16px', fontWeight: '900', color: 'white' }}>¥{profit.toLocaleString()}</span>
        </div>
      </div>

      {/* ボタン */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={() => onEdit(card)} style={{ padding: '8px', backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer' }}><Pencil size={14} /></button>
        <button onClick={() => onDelete(card)} style={{ padding: '8px', backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
      </div>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editCard, setEditCard] = useState<Card | null>(null);
  const [deleteCard, setDeleteCard] = useState<Card | null>(null);

  useEffect(() => { fetchCards(); }, []);

  async function fetchCards() {
    setLoading(true);
    const { data } = await supabase.from('cards').select('*').order('psa10_price', { ascending: false });
    setCards(data ?? []);
    setLoading(false);
  }

  async function handleAdd(card: CardInsert) {
    const { data, error } = await supabase.from('cards').insert(card).select().maybeSingle();
    if (!error && data) { fetchCards(); setMode('list'); }
  }

  async function handleUpdate(card: CardInsert) {
    if (!editCard) return;
    const { error } = await supabase.from('cards').update(card).eq('id', editCard.id);
    if (!error) { fetchCards(); setMode('list'); setEditCard(null); }
  }

  async function handleDelete() {
    if (!deleteCard) return;
    await supabase.from('cards').delete().eq('id', deleteCard.id);
    setCards((prev) => prev.filter((c) => c.id !== deleteCard.id));
    setDeleteCard(null);
  }

  if (mode === 'add' || (mode === 'edit' && editCard)) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: 'white', padding: '16px' }}>
        <button onClick={() => setMode('list')} style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#1e293b', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer' }}><ArrowLeft size={20} /></button>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <CardForm onSubmit={mode === 'add' ? handleAdd : handleUpdate} onClose={() => setMode('list')} initial={editCard} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: 'white', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#020617', borderBottom: '1px solid #1e293b', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '900', margin: 0 }}>PSA10 利益チェッカー</h1>
        <button onClick={() => setMode('add')} style={{ backgroundColor: '#0284c7', border: 'none', padding: '8px 16px', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Plus size={18} /> 追加
        </button>
      </header>

      <main style={{ maxWidth: '500px', margin: '0 auto', padding: '16px' }}>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="カード名、型番で検索..."
            style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '40px' }}>読み込み中...</div>
        ) : (
          <div>
            {cards
              .filter(c => c.name.includes(search) || (c.number && c.number.includes(search)))
              .map(card => (
                <CardDisplay key={card.id} card={card} onEdit={(c) => { setEditCard(c); setMode('edit'); }} onDelete={setDeleteCard} />
              ))
            }
          </div>
        )}
      </main>

      {deleteCard && (
        <DeleteConfirm card={deleteCard} onConfirm={handleDelete} onClose={() => setDeleteCard(null)} />
      )}
    </div>
  );
}