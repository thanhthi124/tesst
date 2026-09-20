// Parse file .env đơn giản
async function loadEnv() {
  try {
    const res = await fetch('./.env');
    if (!res.ok) throw new Error('Không tìm thấy .env');
    const text = await res.text();
    const env = {};
    text.split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;
      const idx = line.indexOf('=');
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      env[key] = val;
    });
    return env;
  } catch (e) {
    console.warn('Không đọc được .env, dùng giá trị mặc định:', e);
    return {};
  }
}

// Gán vào DOM
function applyEnv(env) {
  const $ = id => document.getElementById(id);

  $('name').textContent    = env.PROFILE_NAME    || 'LMF';
  $('tagline').textContent = env.PROFILE_TAGLINE || '';
  $('bio').textContent     = env.PROFILE_BIO     || '';
  $('avatar').src          = env.PROFILE_AVATAR  || 'https://i.pravatar.cc/300';

  $('stat-exp').textContent          = env.STAT_EXPERIENCE   || '';
  $('stat-projects').textContent     = env.STAT_PROJECTS     || '';
  $('stat-satisfaction').textContent = env.STAT_SATISFACTION || '';
  $('stat-coffee').textContent       = env.STAT_COFFEE       || '';

  // Email
  const email = env.CONTACT_EMAIL || '';
  $('email').textContent = email;
  $('email-link').href   = email ? `mailto:${email}` : '#';

  // Social
  $('link-github').href    = env.SOCIAL_GITHUB    || '#';
  $('link-linkedin').href  = env.SOCIAL_LINKEDIN  || '#';
  $('link-twitter').href   = env.SOCIAL_TWITTER   || '#';
  $('link-instagram').href = env.SOCIAL_INSTAGRAM || '#';
}

// Kích hoạt animation cho thanh kỹ năng
function animateSkills() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach((bar, i) => {
    const w = bar.style.getPropertyValue('--w') || '0%';
    setTimeout(() => {
      bar.style.width = w;
    }, 200 + i * 150);
  });
}

// Khởi chạy
(async () => {
  const env = await loadEnv();
  applyEnv(env);
  animateSkills();
})();