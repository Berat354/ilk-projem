body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7ff, #eef5ff);
  color: #1f2937;
}

* {
  box-sizing: border-box;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  background: #0f172a;
  color: white;
  padding: 24px 30px;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
}

.topbar h1 {
  margin: 0;
  font-size: 2rem;
}

.role-switch {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.role-btn, .tab-btn, .action-btn, .submit-btn, .cancel-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.role-btn {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.role-btn.active {
  background: #60a5fa;
  color: white;
}

.dashboard {
  margin-top: 22px;
  background: white;
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  gap: 12px;
  flex-wrap: wrap;
}

.dashboard-header h2 {
  margin: 0;
  font-size: 1.7rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.tab-btn {
  background: #e2e8f0;
  color: #1e293b;
}

.tab-btn.active {
  background: #2563eb;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: 1.1fr 1.9fr;
  gap: 22px;
}

.card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 0.9rem;
  color: #475569;
  font-weight: 600;
}

.field input, .field select {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.96rem;
  background: white;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.submit-btn {
  background: #16a34a;
  color: white;
}

.cancel-btn {
  background: #e2e8f0;
  color: #0f172a;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

th, td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f1f5f9;
  color: #334155;
}

tbody tr:hover {
  background: #f8fafc;
}

.action-btn {
  font-size: 0.8rem;
  margin-right: 8px;
  padding: 8px 12px;
}

.edit-btn {
  background: #dbeafe;
  color: #1d4ed8;
}

.delete-btn {
  background: #fee2e2;
  color: #b91c1c;
}

.empty-state {
  text-align: center;
  color: #64748b;
  padding: 18px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
