import { useState } from 'react';
import type { Card, CardInsert } from '../lib/supabase';

interface CardFormProps {
  onSubmit: (data: CardInsert) => void;
  onClose: () => void;
  initial?: Card | null;
}

export function CardForm({ onSubmit, initial }: CardFormProps) {
  const [formData, setFormData] = useState<CardInsert>({
    name: initial?.name ?? '',
    set_name: initial?.set_name ?? '',
    card_number: initial?.card_number ?? '',
    raw_price: initial?.raw_price ?? 0,
    psa10_price: initial?.psa10_price ?? 0,
    psa10_population: initial?.psa10_population ?? 0,
    image_url: initial?.image_url ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>カード名</label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>型番</label>
          <input
            type="text"
            value={formData.card_number}
            onChange={(e) => setFormData({ ...formData, card_number: e.target.value })}
            style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>セット名</label>
          <input
            type="text"
            value={formData.set_name}
            onChange={(e) => setFormData({ ...formData, set_name: e.target.value })}
            style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>素体価格</label>
          <input
            required
            type="number"
            value={formData.raw_price}
            onChange={(e) => setFormData({ ...formData, raw_price: Number(e.target.value) })}
            style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>PSA10価格</label>
          <input
            required
            type="number"
            value={formData.psa10_price}
            onChange={(e) => setFormData({ ...formData, psa10_price: Number(e.target.value) })}
            style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>画像URL</label>
        <input
          type="text"
          value={formData.image_url || ''}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', boxSizing: 'border-box' }}
        />
      </div>

      <button
        type="submit"
        style={{ marginTop: '12px', backgroundColor: '#0284c7', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {initial ? '更新する' : '保存する'}
      </button>
    </form>
  );
}