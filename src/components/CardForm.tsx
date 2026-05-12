import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Card, CardInsert } from '../lib/supabase';

interface CardFormProps {
  onSubmit: (card: CardInsert) => void;
  onClose: () => void;
  initial?: Card | null;
}

export function CardForm({ onSubmit, onClose, initial }: CardFormProps) {
  const [formData, setFormData] = useState<CardInsert>({
    name: initial?.name ?? '',
    number: initial?.number ?? '',
    image_url: initial?.image_url ?? '',
    raw_price: initial?.raw_price ?? 0,
    psa10_price: initial?.psa10_price ?? 0,
  });

  // 保存ボタンがクリックされた時の処理
  const handleFinalSave = () => {
    console.log("【保存実行】", formData);
    // カード名が空なら日付を名前にする
    const name = formData.name.trim() || `新規カード(${new Date().toLocaleTimeString()})`;
    onSubmit({ ...formData, name });
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '10px'
  };

  return (
    <div style={{ color: 'white', paddingBottom: '40px' }}>
      
      {/* プレビュー表示 */}
      <div style={{
        width: '160px',
        height: '220px',
        margin: '0 auto 20px',
        backgroundColor: '#0f172a',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #38bdf8'
      }}>
        {formData.image_url ? (
          <img
            src={formData.image_url}
            referrerPolicy="no-referrer"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ color: '#475569', fontSize: '10px' }}>画像URLを入力</div>
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>カード名</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={inputStyle}
          placeholder="カード名"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>型番</label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            style={inputStyle}
            placeholder="型番"
          />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>画像URL</label>
          <input
            type="text"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value.trim() })}
            style={inputStyle}
            placeholder="https://..."
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>素体(¥)</label>
          <input
            type="number"
            value={formData.raw_price}
            onChange={(e) => setFormData({ ...formData, raw_price: Number(e.target.value) })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>PSA10(¥)</label>
          <input
            type="number"
            value={formData.psa10_price}
            onChange={(e) => setFormData({ ...formData, psa10_price: Number(e.target.value) })}
            style={inputStyle}
          />
        </div>
      </div>

      {/* 最強の保存ボタン: 
        formタグを使わず、divをボタンとして扱うことで
        ブラウザの「必須入力チェック」などの制限をすべて無効化しています。
      */}
      <div
        onClick={handleFinalSave}
        style={{
          width: '100%',
          backgroundColor: '#0284c7',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '18px',
          marginTop: '10px',
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)',
          userSelect: 'none' // 連打防止用
        }}
      >
        <Save size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        保存する
      </div>
    </div>
  );
}