import { Edit2, Trash2 } from 'lucide-react';
import type { Card } from '../lib/supabase';

interface CardCardProps {
  card: Card & { profit?: number };
  onEdit: () => void;
  onDelete: () => void;
}

export function CardCard({ card, onEdit, onDelete }: CardCardProps) {
  const profitColor = (card.profit || 0) > 0 ? '#4ade80' : '#f87171';

  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '16px', display: 'flex', gap: '16px', border: '1px solid #334155' }}>
      <div style={{ width: '80px', height: '112px', backgroundColor: '#0f172a', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
        {card.image_url ? (
          <img src={card.image_url} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '10px' }}>No Image</div>
        )}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* ↓ここを card.card_number に修正しました */}
            <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 'bold', marginBottom: '2px' }}>{card.card_number}</div>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{card.name}</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
            <button onClick={onEdit} style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '4px', cursor: 'pointer' }}><Edit2 size={16} /></button>
            <button onClick={onDelete} style={{ background: 'none', border: 'none', color: '#ef4444', padding: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', borderTop: '1px solid #334155', paddingTop: '8px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center' }}>素体</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>¥{card.raw_price.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center' }}>PSA10</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#4ade80', textAlign: 'center' }}>¥{card.psa10_price.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 'bold', color: profitColor }}>
          📈 利益: ¥{(card.profit || 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}