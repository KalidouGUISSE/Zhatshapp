// Fonction utilitaire pour afficher les messages
function afficherMessage(type, texte, duree = 3000) {
  const parantMessage = document.querySelector('#section2');
  
  // Supprimer message existant
  const ancien = parantMessage.querySelector('.message-temp');
  if (ancien) ancien.remove();
  
  // Styles selon le type
  const styles = {
    success: 'message-temp bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded flex items-center',
    error: 'message-temp bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded flex items-center',
    warning: 'message-temp bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded flex items-center'
  };
  
  const icones = { success: '✓', error: '✗', warning: '⚠' };
  
  // Créer message
  const message = createElement('div', { class: styles[type] });
  message.innerHTML = `<span class="mr-2 font-bold">${icones[type]}</span><span>${texte}</span>`;
  
  parantMessage.insertBefore(message, parantMessage.firstChild);
  
  // Suppression automatique
  setTimeout(() => {
    if (parantMessage.contains(message)) message.remove();
  }, duree);
}




// numeroDuContact = document.querySelector('#numeroDuContact');
numeroDuContact.addEventListener('keydown', (e) => {
  if (ajouterContact.innerHTML !== 'Créer un Groupe') {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
      'Home', 'End'
    ];
  
    // Autoriser les touches spéciales et les chiffres
    if (
      allowedKeys.includes(e.key) ||
      /^[0-9\s\-\+\(\)]$/.test(e.key)
    ) {
      return; // on laisse passer
    }
    e.preventDefault();
  }
});
