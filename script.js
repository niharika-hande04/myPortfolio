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
    description:'Student Attentive Analysis uses live camera feeds to evaluate students’ attentiveness during lectures. Facial detection and eye-gaze tracking classify attention levels and visualize results for instructors.',
    tags:['Python','OpenCV','CNN model(pyTorch)'],
    link:'https://github.com/niharika-hande04/Student-attentive-analysis',
    img:'images/student attentive.jpg' },
  { id:3, title:'Movie recommendation',
    subtitle:'Suggests top movies using IMDb ratings and genre filters ★★★☆☆ ',
    description:'Movie Recommendation System recommends top films using IMDb ratings and genre/year filters. Built with Python, Pandas, and scikit-learn.',
    tags:['Pandas','scikit-learn'],
    link:'https://github.com/niharika-hande04/movie-recommendation.git',
    img:'images/movie-reel-.jpg' },
];

document.getElementById('year').textContent = new Date().getFullYear();

function renderSkills(){
  const grid = document.querySelector('.skills-grid');
  grid.innerHTML = '';
  skills.forEach(s=>{
    const el = document.createElement('div'); el.className='skill';
    el.innerHTML = `<div class="label"><span>${s.name}</span><span>${s.level}%</span></div><div class="bar"><div class="fill"></div></div>`;
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

// Open project modal
document.addEventListener('click', e=>{
  if(e.target.matches('[data-id]')){
    const id = +e.target.getAttribute('data-id');
    const p = projects.find(x=>x.id===id);
    if(p) openModal(p);
  }
  if(e.target === backdrop || e.target.id === 'modal-close') closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  })
});

// Intersection observer
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      entry.target.querySelectorAll('.skill').forEach(s=>{
        const level = s.dataset.level || s.querySelector('.label span:last-child')?.textContent.replace('%','') || 0;
        const fill = s.querySelector('.fill');
        if(fill) setTimeout(()=> fill.style.width = level + '%', 150);
      })
    }
  })
},{threshold:0.15});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Theme toggle
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
const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);

// Logo NH click -> profile modal
const logoClick = document.getElementById('logo-click');
logoClick.addEventListener('click', ()=>{
  modalTitle.textContent = "Niharika Hande";
  modalSub.textContent = "Frontend Developer";
  modalBody.innerHTML = `
    <div class="profile-card">
      <img src="images/Niharika1.jpg" alt="Niharika Hande" class="modal-avatar">
      <div class="profile-info">
        <p><strong>Age:</strong> 22</p>
        <p><strong>Email:</strong> ${YOUR_EMAIL}</p>
        <p><strong>Phone:</strong> +91 9480191976</p>
        <p><strong>Education:</strong> B.E. Information Science & Engineering</p>
        <p><strong>Institution:</strong> Sri Siddhartha Institute of Technology, Tumakuru</p>
        <p><strong>Graduation Year:</strong> 2026</p>
        <p><strong>Address:</strong> Chamundeshwari Nagara, SiraGate, Tumakuru</p>
        <p><strong>Location:</strong> Karnataka, India</p>
        <p><strong>Languages:</strong> English, Kannada</p>
        <p><strong>Hobies:</strong> Reading Stories, Travelling, Cooking</p>
        <p><strong>Area of Intrests:</strong> Machine Learning, AI, CNN, Web Development, Data Analytics</p>
      </div>
    </div>
  `;
  modalLinks.innerHTML = `<a class="btn" href="files/Niharika_Hande_Resume.pdf" download>Download Resume</a>`;
  backdrop.style.display = 'flex';
  backdrop.setAttribute('aria-hidden','false');
});

const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when clicking a nav link (mobile)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
});

// Init
renderSkills();
renderProjects();
