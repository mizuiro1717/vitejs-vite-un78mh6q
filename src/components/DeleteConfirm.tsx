import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}

export function DeleteConfirm({ onConfirm, onCancel, title }: DeleteConfirmProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#f87171' }}>
        <AlertTriangle size={48} />
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>削除の確認</h3>
      <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
        「{title}」を削除してもよろしいですか？この操作は取り消せません。
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onCancel}
          style={{ flex: 1, padding: '12px', backgroundColor: '#334155', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
        >
          キャンセル
        </button>
        <button
          onClick={onConfirm}
          style={{ flex: 1, padding: '12px', backgroundColor: '#ef4444', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
        >
          削除する
        </button>
      </div>
    </div>
  );
}