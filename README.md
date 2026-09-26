const ENTITY_DEFS = {
  courses: {
    label: 'Dersler',
    fields: [
      { key: 'name', label: 'Ders Adı', type: 'text' },
      { key: 'code', label: 'Ders Kodu', type: 'text' },
      { key: 'teacher', label: 'Öğretmen', type: 'text' },
      { key: 'day', label: 'Gün', type: 'text' },
      { key: 'hour', label: 'Saat', type: 'text' }
    ]
  },
  teachers: {
    label: 'Öğretmenler',
    fields: [
      { key: 'name', label: 'Ad Soyad', type: 'text' },
      { key: 'branch', label: 'Branş', type: 'text' },
      { key: 'phone', label: 'Telefon', type: 'text' },
      { key: 'email', label: 'E-posta', type: 'email' },
      { key: 'status', label: 'Durum', type: 'text' }
    ]
  },
  classes: {
    label: 'Sınıflar',
    fields: [
      { key: 'name', label: 'Sınıf Adı', type: 'text' },
      { key: 'level', label: 'Seviye', type: 'text' },
      { key: 'class_teacher', label: 'Sınıf Öğretmeni', type: 'text' },
      { key: 'student_count', label: 'Öğrenci Sayısı', type: 'number' },
      { key: 'room', label: 'Sınıf No', type: 'text' }
    ]
  }
};

const roleTitles = {
  director: 'Müdür Paneli',
  assistant: 'Müdür Yardımcısı Paneli'
};

const state = {
  role: 'director',
  entity: 'courses'
};

const titleEl = document.getElementById('roleTitle');
const formEl = document.getElementById('entityForm');
const dynamicFields = document.getElementById('dynamicFields');
const tableBody = document.getElementById('entityTableBody');
const activeEntityLabel = document.getElementById('activeEntityLabel');
const entityIdInput = document.getElementById('entityId');

function renderRoleButtons() {
  document.querySelectorAll('.role-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.role === state.role);
  });
  titleEl.textContent = roleTitles[state.role];
}

function renderTabButtons() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.entity === state.entity);
  });
  activeEntityLabel.textContent = ENTITY_DEFS[state.entity].label;
  renderForm();
  loadEntityData();
}

function renderForm() {
  const fields = ENTITY_DEFS[state.entity].fields;
  dynamicFields.innerHTML = '';

  fields.forEach((field) => {
    const wrap = document.createElement('div');
    wrap.className = 'field';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.setAttribute('for', `field_${field.key}`);

    const input = document.createElement('input');
    input.id = `field_${field.key}`;
    input.name = field.key;
    input.type = field.type || 'text';

    wrap.appendChild(label);
    wrap.appendChild(input);
    dynamicFields.appendChild(wrap);
  });

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = 'id';
  hidden.id = 'entityId';

  formEl.reset();
  entityIdInput.value = '';
}

function setFormValues(data) {
  Object.entries(data).forEach(([key, value]) => {
    const input = document.getElementById(`field_${key}`);
    if (input) {
      input.value = value ?? '';
    }
  });
}

async function loadEntityData() {
  try {
    const res = await fetch(`/api/${state.role}/${state.entity}`);
    const data = await res.json();

    tableBody.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="100%" class="empty-state">Henüz kayıt yok.</td></tr>';
      return;
    }

    const columns = ENTITY_DEFS[state.entity].fields.map((field) => field.key);
    const headerCells = columns.map((header) => `<th>${ENTITY_DEFS[state.entity].fields.find((f) => f.key === header).label}</th>`).join('');

    tableBody.innerHTML = data.map((item) => {
      const cells = columns
        .map((key) => `<td>${escapeHtml(item[key] ?? '')}</td>`)
        .join('');

      return `
        <tr>
          ${cells}
          <td>
            <button class="action-btn edit-btn" data-action="edit" data-id="${item.id}">Düzenle</button>
            <button class="action-btn delete-btn" data-action="delete" data-id="${item.id}">Sil</button>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('[data-action="edit"]').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.dataset.id;
        const item = data.find((row) => String(row.id) === String(id));
        if (item) {
          entityIdInput.value = item.id;
          setFormValues(item);
        }
      });
    });

    document.querySelectorAll('[data-action="delete"]').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.dataset.id;
        if (confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
          await deleteItem(id);
        }
      });
    });
  } catch (error) {
    console.error(error);
    tableBody.innerHTML = '<tr><td colspan="100%" class="empty-state">Veri yüklenirken hata oluştu.</td></tr>';
  }
}

async function deleteItem(id) {
  const res = await fetch(`/api/${state.role}/${state.entity}/${id}`, {
    method: 'DELETE'
  });

  const result = await res.json();
  if (!res.ok) {
    alert(result.message || 'Silme işlemi başarısız oldu.');
    return;
  }

  alert(result.message || 'Kayıt silindi.');
  loadEntityData();
  formEl.reset();
  entityIdInput.value = '';
}

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const payload = Object.fromEntries(formData.entries());
  const id = entityIdInput.value;

  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/${state.role}/${state.entity}/${id}` : `/api/${state.role}/${state.entity}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message || 'İşlem başarısız oldu.');
    return;
  }

  alert(id ? 'Kayıt güncellendi.' : 'Kayıt eklendi.');
  formEl.reset();
  entityIdInput.value = '';
  loadEntityData();
});

document.getElementById('cancelEdit').addEventListener('click', () => {
  formEl.reset();
  entityIdInput.value = '';
});

document.querySelectorAll('.role-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.role = btn.dataset.role;
    renderRoleButtons();
    renderTabButtons();
  });
});

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.entity = btn.dataset.entity;
    renderTabButtons();
  });
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

renderRoleButtons();
renderTabButtons();

