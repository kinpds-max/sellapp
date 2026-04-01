// Cell App - Premium Interaction Suite

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const ideaCards = document.querySelectorAll('.idea-card');
  const tabBtns = document.querySelectorAll('.tab-btn');

  // 0. Category Filtering Logic
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update UI
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter Cards
      ideaCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // 1. Scroll-triggered Header transformation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Height of scrolled header
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Intersection Observer for Idea Cards (Scroll Revealing)
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  ideaCards.forEach((card, index) => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;
    
    revealObserver.observe(card);
  });

  // 4. Subtle Parallax for the Hero blobs
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.05;
      const moveX = (clientX - centerX) * speed;
      const moveY = (clientY - centerY) * speed;
      blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  console.log('Cell App Premium Interactions Loaded Successfully.');
});
