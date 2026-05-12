import React from 'react';
import { Edit2, Trash2, TrendingUp } from 'lucide-react';
import type { Card } from '../lib/supabase';

interface CardCardProps {
  card: Card & { profit?: number }; // profitをApp.tsxから受け取れるように
  onEdit: () => void;
  onDelete: () => void;
}

export function CardCard({ card, onEdit, onDelete }: CardCardProps) {
  // App.tsxで計算された利益（profit）を優先し、なければ簡易計算
  const profit = card.profit ?? (card.psa10_price - card.raw_price);
  const ROI = card.raw_price > 0 ? (profit / card.raw_price) * 100 : 0;

  return (
    <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      gap: '16px',
      border: '1px solid #334155'
    }}>
      <div style={{ width: '80px', height: '110px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#0f172a' }}>
        {card.image_url ? (
          <img src={card.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '10px' }}>No Image</div>
        )}
      </div>

      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 'bold', marginBottom: '2px' }}>{card.number}</div>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>{card.name}</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onEdit} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}><Edit2 size={16} /></button>
            <button onClick={onDelete} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><Trash2 size={16} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', backgroundColor: '#0f172a', padding: '8px', borderRadius: '8px', marginTop: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>素体</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>¥{card.raw_price.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>PSA10</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4ade80' }}>¥{card.psa10_price.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: '#4ade80' }}>
          <TrendingUp size={16} />
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
            利益: ¥{profit.toLocaleString()} ({ROI.toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
}