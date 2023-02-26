history.scrollRestoration = "manual";
window.scrollTo(0,0);

//E-mail JS
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Envoi...';

   const serviceID = 'default_service';
   const templateID = 'template_hgvg1rl';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Envoyer';
      alert('Envoyé!');
    }, (err) => {
      btn.value = 'Envoyer';
      alert(JSON.stringify(err));
    });
});