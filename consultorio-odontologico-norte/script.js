// Interacciones mínimas: menú móvil y tracking CTA
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show');
    });
  }

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if(targetId.length > 1){
        e.preventDefault();
        const el = document.querySelector(targetId);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        // cerrar menú móvil si está abierto
        if(navLinks.classList.contains('show')) navLinks.classList.remove('show');
      }
    });
  });

  // CTA tracking (simple)
  const ctas = document.querySelectorAll('.cta');
  ctas.forEach(btn=>btn.addEventListener('click', ()=>{
    // aquí se puede añadir tracking o localStorage si se desea
    console.log('CTA WhatsApp clickeado');
  }));
});
