tailwind.config = {
    theme: {
        extend: {
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'slide-up': 'slideUp 0.8s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
                    '50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '1' }
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)' },
                    '100%': { boxShadow: '0 0 30px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.3)' }
                }
            }
        }
    }
}






const btn = document.getElementById('fuyantBtn');
let isRight = true;

btn.addEventListener('mouseenter', bouger);

function bouger() {
    const nom = document.getElementById('nom').value.trim();
    const numero = document.getElementById('numero').value.trim();

    if (!nom || !numero) {
        // Si au moins un champ est vide, on déplace le bouton
        if (isRight) {
            btn.style.transform = 'translateX(100%)'; // va à droite
        } else {
            btn.style.transform = 'translateX(-180%)'; // va à gauche
        }
        isRight = !isRight;
    } else {
        // Si les champs sont remplis, on remet le bouton au centre
        btn.style.transform = 'translateX(0)';
    }
}

const numeroInput = document.getElementById('numeroInput');


// numeroDuContact = document.querySelector('#numeroDuContact');
// numeroInput.addEventListener('keydown', (e) => {
//     if (ajouterContact.innerHTML !== 'Créer un Groupe') {
//         const allowedKeys = [
//             'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
//             'Home', 'End'
//         ];
        
//         // Autoriser les touches spéciales et les chiffres
//         if (
//             allowedKeys.includes(e.key) ||
//             /^[0-9\s\-\+\(\)]$/.test(e.key)
//         ) {
//             return; // on laisse passer
//         }
//         e.preventDefault();
//     }
// });








document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value.trim();
    const numero = document.getElementById('numero').value.trim();

    const messageDiv = document.getElementById('message');
    const loading = document.getElementById('loading');
    const btnText = document.getElementById('btn-text');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Reset message
    hideMessage();


    if (!nom || !numero) {
        showMessage('Veuillez remplir tous les champs.', 'error');
        return;
    }
    
    // Validation du numéro
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(numero)) {
        showMessage('Veuillez entrer un numéro de téléphone valide.', 'error');
        return;
    }
    
    // Show loading state
    loading.classList.remove('hidden');
    btnText.textContent = 'Connexion...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-80');
    
    // Simulate login process
    setTimeout(() => {
        loading.classList.add('hidden');
        btnText.textContent = 'Se connecter';
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-80');
        
        showMessage('Connexion réussie! Redirection en cours...', 'success');
        
        // Redirect after success message
        setTimeout(() => {
            window.location.href = 'h.html';
            console.log('Redirection vers home.html');
            showMessage('Redirection simulée (décommentez window.location.href)', 'info');
        }, 2000);
    }, 1500);
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    
    // Remove existing classes
    messageDiv.className = 'mt-6 p-3 rounded-lg text-center text-sm font-medium transition-all duration-300';
    
    // Add type-specific classes
    switch(type) {
        case 'success':
            messageDiv.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-200');
            break;
        case 'error':
            messageDiv.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-200');
            break;
        case 'info':
            messageDiv.classList.add('bg-yellow-100', 'text-yellow-800', 'border', 'border-yellow-200');
            break;
    }
    
    // Show with animation
    setTimeout(() => {
        messageDiv.classList.remove('opacity-0', 'translate-y-2');
        messageDiv.classList.add('opacity-100', 'translate-y-0');
    }, 10);
}

function hideMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.classList.remove('opacity-100', 'translate-y-0');
    messageDiv.classList.add('opacity-0', 'translate-y-2');
}

// Add floating animation to inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('transform', 'scale-105');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('transform', 'scale-105');
    });
});

// Add ripple effect to button
document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('absolute', 'bg-white', 'rounded-full', 'opacity-30', 'animate-ping');
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.left = (e.clientX - e.target.offsetLeft - 50) + 'px';
    ripple.style.top = (e.clientY - e.target.offsetTop - 50) + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});












const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// Conteneur de messages (optionnel)
const messages = [];

function ajouterMessage(texte, emetteur = 'utilisateur') {
  const msg = document.createElement('div');
  msg.className = emetteur === 'utilisateur' 
    ? 'text-right mb-2 text-blue-600'
    : 'text-left mb-2 text-gray-700';
  msg.textContent = texte;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll automatique
}

sendBtn.addEventListener('click', () => {
  const texte = chatInput.value.trim();
  if (texte === '') return;

  // Ajoute le message de l'utilisateur
  ajouterMessage(texte, 'utilisateur');
  messages.push({ auteur: 'utilisateur', texte });

  chatInput.value = '';

  // Réponse automatique simulée
  setTimeout(() => {
    const reponse = `Tu as dit : "${texte}"`; // Exemple simple
    ajouterMessage(reponse, 'bot');
    messages.push({ auteur: 'bot', texte: reponse });
  }, 800);
});
