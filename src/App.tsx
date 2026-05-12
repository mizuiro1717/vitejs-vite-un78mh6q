import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { supabase, type Card } from './lib/supabase';
import { CardCard } from './components/CardCard';
import { CardForm } from './components/CardForm';

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const GRADING_FEE = 5000; 
  const FEE_RATE = 0.1;     

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    setLoading(true);
    const { data, error } = await supabase
      .from('cards')
      .select('*');
    
    if (error) console.error('Error:', error);
    else setCards(data || []);
    setLoading(false);
  }

  const handleAdd = async (cardData: any) => {
    if (editingCard) {
      const { error } = await supabase
        .from('cards')
        .update(cardData)
        .eq('id', editingCard.id);
      if (error) alert('更新に失敗しました');
    } else {
      const { error } = await supabase
        .from('cards')
        .insert([cardData]);
      if (error) alert('保存に失敗しました');
    }
    setShowForm(false);
    setEditingCard(null);
    fetchCards();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('cards').delete().eq('id', id);
    if (error) alert('削除に失敗しました');
    else fetchCards();
  };

  // 表示用のデータを作成（利益を計算して並び替え）
  const processedCards = cards
    .map(card => {
      const afterFeePrice = card.psa10_price * (1 - FEE_RATE);
      const netProfit = Math.floor(afterFeePrice - card.raw_price - GRADING_FEE);
      return { ...card, profit: netProfit };
    })
    // 利益（profit）が大きい順に並び替え
    .sort((a, b) => b.profit - a.profit)
    // 検索ワードで絞り込み
    .filter(c => c.name.includes(searchTerm) || (c.number && c.number.includes(searchTerm)));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>PSA10利益チェッカー</h1>
        <button
          onClick={() => setShowForm(true)}
          style={{ backgroundColor: '#0284c7', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
        >
          <Plus size={24} />
        </button>
      </header>

      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
        <input
          type="text"
          placeholder="カード名、型番で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '100px' }}>
        {processedCards.map(card => (
          <div key={card.id} style={{ position: 'relative' }}>
            <CardCard
              card={card}
              onEdit={() => { setEditingCard(card); setShowForm(true); }}
              onDelete={() => handleDelete(card.id)}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '12px', 
              right: '60px', 
              fontSize: '10px', 
              color: '#64748b' 
            }}>
              ※鑑定料¥{GRADING_FEE.toLocaleString()}・手数料10%込
            </div>
          </div>
        ))}
        {processedCards.length === 0 && !loading && (
          <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>
            カードが登録されていないか、検索結果がありません。
          </div>
        )}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', width: '100%', maxWidth: '400px', borderRadius: '20px', padding: '24px', position: 'relative' }}>
            <button onClick={() => { setShowForm(false); setEditingCard(null); }} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center' }}>{editingCard ? '編集' : 'カード追加'}</h2>
            <CardForm 
              onSubmit={handleAdd} 
              onClose={() => setShowForm(false)} 
              initial={editingCard} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;