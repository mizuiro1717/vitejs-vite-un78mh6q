import {
  Edit2,
  Trash2,
  TrendingUp,
  TrendingDown,
  ImageIcon,
} from 'lucide-react';
import type { Card } from '../lib/supabase';
import { calculateProfit, formatCurrency } from '../lib/profit';

export function CardCard({
  card,
  onEdit,
  onDelete,
}: {
  card: Card;
  onEdit: (c: Card) => void;
  onDelete: (c: Card) => void;
}) {
  const { profit, roi, isProfit } = calculateProfit(card);

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '12px',
        gap: '16px',
        alignItems: 'center',
        border: '1px solid #334155',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      {/* 画像エリア：サイズをしっかり固定 */}
      <div
        style={{
          width: '80px',
          height: '110px',
          backgroundColor: '#0f172a',
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #475569',
        }}
      >
        {card.image_url ? (
          <img
            src={card.image_url}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <ImageIcon style={{ color: '#475569' }} size={32} />
        )}
      </div>

      {/* テキスト情報エリア */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {card.name}
            </h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
              {card.set_name} / {card.card_number}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit(card)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8',
              }}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(card)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444',
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            padding: '8px',
            borderRadius: '8px',
            marginTop: '8px',
          }}
        >
          <div>
            <span
              style={{ fontSize: '10px', color: '#64748b', display: 'block' }}
            >
              素体
            </span>
            <span
              style={{ fontSize: '12px', fontWeight: 'bold', color: '#e2e8f0' }}
            >
              {formatCurrency(card.raw_price)}
            </span>
          </div>
          <div>
            <span
              style={{ fontSize: '10px', color: '#64748b', display: 'block' }}
            >
              PSA10
            </span>
            <span
              style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}
            >
              {formatCurrency(card.psa10_price)}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: '8px',
            fontSize: '13px',
            fontWeight: '900',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: isProfit ? '#10b981' : '#ef4444',
          }}
        >
          {isProfit ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          利益: {formatCurrency(profit)} ({roi.toFixed(1)}%)
        </div>
      </div>
    </div>
  );
}
