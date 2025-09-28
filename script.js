// Particle Animation
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [];
for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 360},100%,70%)`,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// Search Functionality
document.getElementById('searchBtn').addEventListener('click', function() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  // Define search mappings
  const searchMappings = {
    'technical quiz': 'events/technicalquiz.html',
    'paper presentation': 'events/paperpresentation.html',
    'poster presentation': 'events/posterpresentation.html',
    'project expo': 'events/projectexpo.html'
  };
  
  // Check if search term matches any event
  if (searchTerm in searchMappings) {
    alert(`Redirecting to ${searchTerm} page`);
    window.location.href = searchMappings[searchTerm];
  } else {
    alert('Event not found. Please try "Technical Quiz", "Paper Presentation", "Poster Presentation", or "Project Expo".');
  }
});

// Allow pressing Enter to search
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('searchBtn').click();
  }
});

// Button hover effects
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Navigation Functions
function scrollToEvents() {
  document.getElementById('events').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function showRegistration() {
  alert('Registration will open on January 20, 2025. Please check back later!');
}

function showMoreAbout() {
  alert('More information about KHIT College will be available soon!');
}

// Make dropdown work on click for mobile
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const dropbtn = document.querySelector('.dropbtn');
  
  dropbtn.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      document.querySelector('.dropdown-content').style.display = 'none';
    }
  });
});
