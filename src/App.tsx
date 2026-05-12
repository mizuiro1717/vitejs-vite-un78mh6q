<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '100px' }}>
        {processedCards.map(card => (
          <div key={card.id} style={{ 
            backgroundColor: '#1e293b', 
            borderRadius: '16px', 
            padding: '16px',
            paddingBottom: '32px', // 下側に余白を作って重なりを防止
            position: 'relative',
            border: '1px solid #334155'
          }}>
            <CardCard
              card={card}
              onEdit={() => { setEditingCard(card); setShowForm(true); }}
              onDelete={() => handleDelete(card.id)}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '8px', 
              right: '16px', 
              fontSize: '10px', 
              color: '#64748b' 
            }}>
              ※鑑定料¥{GRADING_FEE.toLocaleString()}・手数料10%込
            </div>
          </div>
        ))}
      </div>