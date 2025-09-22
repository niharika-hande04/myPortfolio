const YOUR_EMAIL = 'niharikahande04@gmail.com'; 

const skills = [
  {name:'HTML and CSS', level:90},
  {name:'Machine Learning', level:80},
  {name:'SQL', level:65},
  {name:'Python', level:85},
];

const projects = [
  { id:1, title:'Portfolio Website', subtitle:'Interactive front-end portfolio showcasing projects, skills, and certificates.',
    description:'A responsive portfolio to show projects and contact. Built with semantic HTML, CSS and JS. Includes modals and smooth-scroll.',
    tags:['HTML','CSS','JS'], link:'https://github.com/niharika-hande04/myPortfolio',
  img:'images/portfolio.jpg' },
  { id:2, title:'Student attentive analysis',
    subtitle:'Real-time classroom attention monitoring with computer vision',
    description:'Student Attentive Analysis is a machine-learning application that uses live camera feeds to evaluate students’ attentiveness during lectures. It applies facial detection and eye-gaze tracking to classify attention levels, then visualizes the results as easy-to-read graphs for instructors.',
    tags:['Python','OpenCV','CNN model(pyTorch)'],
    link:'https://github.com/niharika-hande04/Student-attentive-analysis',
    img:'images/student attentive.jpg' },
  { id:3, title:'Movie recommendation',
    subtitle:'Suggests top movies using IMDb ratings and genre filters ★★★☆☆ ',
    description:'Movie Recommendation System recommends top films using IMDb ratings and genre/year filters. Built with Python, Pandas, and scikit-learn, it delivers quick, high-quality suggestions without requiring a login.',
    tags:['Pandas','scikit-learn'],
    link:'https://github.com/niharika-hande04/movie-recommendation.git',img:'images/movie-reel-.jpg' },
];

/* ---------- Utilities & Render ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

function renderSkills(){
  const grid = document.querySelector('.skills-grid');
  grid.innerHTML = '';
  skills.forEach(s=>{
    const el = document.createElement('div'); el.className='skill';
    el.innerHTML = `<div class="label"><span>${s.name}</span><span>${s.level}%</span></div><div class="bar"><div class="fill"></div></div>`;
    el.querySelector('.fill').style.background = `linear-gradient(90deg,var(--accent),#06b6d4)`;
    el.dataset.level = s.level;
    grid.appendChild(el);
  })
}

function renderProjects(){
  const grid = document.querySelector('.projects-grid');
  grid.innerHTML = '';
  projects.forEach(p=>{
    const card = document.createElement('article'); 
    card.className='card';
    card.innerHTML = `
      <div class="thumb">
        <img src="${p.img}" alt="${p.title}" class="project-img">
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-sub">${p.subtitle}</div>
      <p class="project-desc">${p.description}</p>
      <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="card-actions">
        <button class="btn" data-id="${p.id}">Details</button>
        <a class="btn" href="${p.link}" target="_blank" rel="noopener noreferrer">Open</a>
      </div>
    `;
    grid.appendChild(card);
  });
}


/* ---------- Modal behavior ---------- */
const backdrop = document.getElementById('modal-backdrop');
const modalTitle = document.getElementById('modal-title');
const modalSub = document.getElementById('modal-sub');
const modalBody = document.getElementById('modal-body');
const modalLinks = document.getElementById('modal-links');
function openModal(project){
  modalTitle.textContent = project.title;
  modalSub.textContent = project.subtitle;
  modalBody.textContent = project.description;
  modalLinks.innerHTML = `<a class="btn" href="${project.link}" target="_blank">Open project</a>`;
  backdrop.style.display = 'flex';
  backdrop.setAttribute('aria-hidden','false');
}
function closeModal(){
  backdrop.style.display = 'none';
  backdrop.setAttribute('aria-hidden','true');
}

document.addEventListener('click', e=>{
  if(e.target.matches('[data-id]')){
    const id = +e.target.getAttribute('data-id');
    const p = projects.find(x=>x.id===id);
    if(p) openModal(p);
  }
  if(e.target === backdrop || e.target.id === 'modal-close') closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* ---------- Smooth scroll for internal links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  })
})

/* ---------- Intersection Observer for reveals & skill bars ---------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      // animate skill fills
      entry.target.querySelectorAll('.skill').forEach(s=>{
        const level = s.dataset.level || s.querySelector('.label span:last-child')?.textContent.replace('%','') || 0;
        const fill = s.querySelector('.fill');
        if(fill) setTimeout(()=> fill.style.width = level + '%', 150);
      })
    }
  })
},{threshold:0.15});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- Theme toggle (light/dark) ---------- */
const themeToggle = document.getElementById('theme-toggle');
function setTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', t);
}
themeToggle.addEventListener('click', ()=>{
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(cur === 'dark' ? 'light' : 'dark');
})
// load
const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);

/* ---------- Init ---------- */
renderSkills();
renderProjects();
