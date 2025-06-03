import {createElement} from "./componant.js"
import {DATA,COLORS,tabGroupes,contacts} from "./counter.js"
import {
  listDesContactes,
  ajouterContact,
  nouveauContacte,
  formulaire,
  nomDuContact,
  numeroDuContact,
  Diffussion,
  messages,
  parantlisteDeMesGoupe,
  listeDeMesGoupe,
  groupes,
  creerGroupe,
  titre,
  formLabel1,
  formLabel2,
  btnListeArchiver,
  btnPourArchiver,
  listDesArchive,
  zoneAffichage,
  Deconnection,
  parantMessage,
  zoneMessages,
  btnEnvoyer,
  inputMessage,
  inputRecherche,
  popupMembres,
  btnAjouterMembre,
  listContact,
  mesMessage,
  menuToggle,
  dropdownMenu,
  btnMembresGroupe,
} from './domElements.js'; // Ajuste le chemin si nécessaire

import {
  afficherContacts,
  afficherAllContacts,
  afficherListArchive,
  contactItem,
  groupeItem,
  afficherMessage,
  styler,
  afficher,
  getInitiales,
  afficherGroupes2,
  afficherContactsFiltre,
  afficherMessages,
  jouerAudio,
} from './ui.js'; // 🔁 chemin relatif selon l'emplacement du fichier


//   loding spiner









Deconnection.addEventListener('click', () => {
  window.location.href = 'index.html';
})

let groupeActif = null;
let indexGroupeActif = null;
let contactActif = null;
let indexContactActif = null;

listDesArchive.style.display = 'none'
formulaire.style.display = 'none'
parantlisteDeMesGoupe.style.display = 'none'
// listDesContactes.style.display = 'none'





afficherContacts(contacts,listDesContactes);
afficherGroupes2(tabGroupes, listeDeMesGoupe);



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

nouveauContacte.addEventListener('click',()=>{
  styler(nouveauContacte,Diffussion,groupes,btnListeArchiver)
  afficher(formulaire,listDesContactes,parantlisteDeMesGoupe,listDesArchive)
  titre.innerHTML = 'Ajouter un Contact'
  formLabel1.innerHTML = 'Nom '
  formLabel2.innerHTML = 'Numero'
  ajouterContact.innerHTML = 'Creer un Contact'
})

messages.addEventListener('click',()=>{

  afficherAllContacts(contacts,listDesContactes) 
  styler(messages,Diffussion,nouveauContacte,groupes,btnListeArchiver)
  afficher(listDesContactes,formulaire,parantlisteDeMesGoupe,listDesArchive)
})

Diffussion.addEventListener('click',()=>{
  afficherContacts(contacts,listDesContactes) 
  styler(Diffussion,nouveauContacte,groupes,btnListeArchiver,messages)
  afficher(listDesContactes,formulaire,parantlisteDeMesGoupe,listDesArchive)
})

groupes.addEventListener('click',() => {
  afficherGroupes2(tabGroupes, listeDeMesGoupe);

  styler(groupes,nouveauContacte,Diffussion,btnListeArchiver,messages)
  afficher(parantlisteDeMesGoupe,listDesContactes,formulaire,listDesArchive)
})

btnListeArchiver.addEventListener('click',()=>{
  afficherListArchive(contacts,listDesArchive) 
  afficherMessage('warning', 'double click pour desarchiver');

  styler(btnListeArchiver,nouveauContacte,Diffussion,groupes,messages)
  afficher(listDesArchive,parantlisteDeMesGoupe,listDesContactes,formulaire)
})

ajouterContact.addEventListener('click', () => {

if (
      nomDuContact.value !== '' &&
      numeroDuContact.value !== '' &&
      ajouterContact.innerHTML !== 'Créer un Groupe'
  ) {
    const nomOriginal = nomDuContact.value.trim();
    const numero = numeroDuContact.value.trim();
  
    // Vérifier si le numéro existe déjà
    const contactExistant = contacts.find(c => c.numero === numero);

    if (contactExistant) {
      afficherMessage('error', `Ce numéro existe déjà ! Il appartient à : <span class="text-yellow-900" style=" font-weight:bold">${contactExistant.nom}</span>`);
      return;
    }
  
    // Vérifier les doublons de nom
    let nom = nomOriginal;
    let suffixe = 2;
    while (contacts.some(c => c.nom === nom)) {
      nom = nomOriginal + suffixe;
      suffixe++;
    }
  
    // Création du contact
    const contact = {
      id: Date.now(), // ID unique
      nom,
      numero,
      archive: false,
      chatMessages : []
    };
  
    // Ajout dans le tableau
    contacts.push(contact);
    // Affichage dans le DOM
    const div = contactItem(contact);
    listDesContactes.appendChild(div);
  
    // Réinitialiser les champs
    nomDuContact.value = '';
    numeroDuContact.value = '';
  
    afficherMessage('success', 'Contact ajouté !');
  } else if(nomDuContact.value === '' || numeroDuContact.value === '' ) { 
    afficherMessage('error', 'les Champs sont obligatoire');

  } else if(ajouterContact.innerHTML === 'Créer un Groupe'){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const unContactEstCoche = Array.from(checkboxes).some(checkbox => checkbox.checked);
    console.log(unContactEstCoche);
    
    if (!unContactEstCoche) {
      afficherMessage('error', 'Selectionner un contact');
      return; 
    } 
    const contactsCoches = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => {
        const id = parseInt(checkbox.id.replace('check', ''), 10);
        return contacts.find(c => c.id === id);
      })
      .filter(c => c !== undefined);
  
    if (contactsCoches.length === 0) {
      afficherMessage('error', 'Sélectionnez au moins un contact');
      return;
    }
  
    const nom = nomDuContact.value.trim();
    const sousTitre = numeroDuContact.value.trim();
  
    const tabGroupe = {
      id: Date.now(), // ID unique
      nom,
      sousTitre,
      membres: contactsCoches, // ✅ Ajout des membres cochés
      chatMessages:[]
    };
  
    tabGroupes.push(tabGroupe); // ⬅️ Enregistre le nouveau groupe
  
    afficherMessage('success', 'Groupe créé avec succès');
  }

  nomDuContact.value = ''
  numeroDuContact.value = ''
})

creerGroupe.addEventListener('click', () => {
  // Vérifie si au moins un contact est coché
  listDesContactes.style.display = 'block';
  afficherAllContacts(contacts,listDesContactes)
  // Mise à jour des labels et titres
  titre.innerHTML = 'Ajouter un groupe';
  formLabel1.innerHTML = 'Nom du groupe';
  formLabel2.innerHTML = 'Sous titre du groupe';
  ajouterContact.innerHTML = 'Créer un Groupe';
  
  formulaire.style.display = 'block';
  parantlisteDeMesGoupe.style.display = 'none';
});

btnPourArchiver.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let unContactEstCoche = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      unContactEstCoche = true;

      const idString = checkbox.id.replace('check', ''); // Ex: 'check1673827' => '1673827'
      const contactId = parseInt(idString, 10);

      // Trouver le contact correspondant
      const contactIndex = contacts.findIndex(c => c.id === contactId);
      if (contactIndex !== -1) {
        // Ajouter dans contactAchiver
        contacts[contactIndex].archive = true
        console.log(contacts[contactIndex]);
      }

      // Supprimer aussi du DOM
      checkbox.parentElement.remove();
    }
  });

  if (unContactEstCoche) {
    afficherMessage('success', 'Contact archivé !');
  } else {
    afficherMessage('error', 'Aucun contact sélectionné.');
  }
});

// const contactArchive = (contact) => {
//   return createElement('div', { class: 'contact flex items-center justify-between p-3 border-b' }, [
//     createElement('label', { class: 'flex-1 cursor-pointer' }, [contact.nom]),
//     createElement('button', {
//       type: 'button',
//       id: 'archive' + contact.id,
//       class: 'archive-btn text-gray-500 hover:text-red-600 transition-colors duration-200 p-2',
//       onclick: () => archiverContact(contact.id),
//       title: 'Archiver ce contact'
//     }, '🗃️') // Icône archive
//   ]);
// }

listDesArchive.addEventListener('dblclick', (event) => {
  const cible = event.target;
  
  // Pour dblclick, il faut cibler le bon élément
  let element = cible;
  
  // Si on clique sur le label, remonter au parent pour trouver l'input
  if (!element.id || !element.id.startsWith('check')) {
    const input = element.closest('.contact')?.querySelector('input[id^="check"]');
    if (input) element = input;
  }
  
  if (element && element.id && element.id.startsWith('check')) {
    const idString = element.id.replace('check', '');
    const contactId = parseInt(idString, 10);
    
    if (!isNaN(contactId)) {
      const contactIndex = contacts.findIndex(c => c.id === contactId);
      
      if (contactIndex !== -1) {
        // Action différente pour double-clic (suppression définitive ?)
        // contacts.splice(contactIndex, 1);
        contacts[contactIndex].archive = false;
        console.log('Contact supprimé définitivement');
        element.parentElement.remove();
      }
    }
  }
});

listeDeMesGoupe.addEventListener('click', (e) => {
  let element = e.target;
  while (element && !element.dataset.id) {
    element = element.parentElement;
  }

  if (element) {
    const id = parseInt(element.dataset.id, 10);
    const groupe = tabGroupes.find(g => g.id === id);
    if (groupe) {
      contactActif = ''
      groupeActif = groupe; 
      indexGroupeActif = tabGroupes.findIndex(g => g.id === id); 
      // Met à jour l'interface du profil
      document.getElementById('nomGroupe').textContent = groupe.nom;
      document.getElementById('sousTitreGroupe').textContent = groupe.sousTitre;

      const initiales = getInitiales(groupe.nom);
      document.getElementById('initialesGroupe').textContent = initiales;

      const chatMessages = groupe.chatMessages

      afficherMessages(chatMessages);
      
    }
  }
});

listDesContactes.addEventListener('click', (e) => {
  let element = e.target;

  // On vérifie si l'utilisateur a cliqué sur un input checkbox
  if (element.tagName === 'INPUT' && element.type === 'checkbox') {
    const idStr = element.id.replace('check', ''); // "check12345678" → "12345678"
    const id = parseInt(idStr, 10);

    const contact = contacts.find(c => c.id === id);
    const index = contacts.findIndex(c => c.id === id);

    //decocher les reste
    // document.querySelectorAll('.check').forEach(checkbox => {
    //   if (checkbox !== element) checkbox.checked = false;
    // });
    

    if (contact) {
      contactActif = contact;
      indexContactActif = index;
      groupeActif = ''
      
      // Met à jour l'interface du profil
      document.getElementById('nomGroupe').textContent = contactActif.nom;
      document.getElementById('sousTitreGroupe').textContent = '';
      const initiales = getInitiales(contactActif.nom);
      document.getElementById('initialesGroupe').textContent = initiales;

      const chatMessages = contactActif.chatMessages

      afficherMessages(chatMessages);
    }
  }
});




btnEnvoyer.addEventListener('click', () => {
  const texte = inputMessage.value.trim();
  if (texte === '' || (contactActif && groupeActif)) return;
  let chatMessages = null
  if (groupeActif) {
    chatMessages = groupeActif.chatMessages
    tabGroupes[indexGroupeActif].chatMessages.push({ id: Date.now(), auteur: 'Moi', texte });

  } else {
    chatMessages = contactActif.chatMessages
    contacts[indexContactActif].chatMessages.push({ id: Date.now(), auteur: 'Moi', texte });
  }
  afficherMessages(chatMessages);
  inputMessage.value = '';

});

menuToggle.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});

const btnlisteMembres = document.querySelector('#btnlisteMembres')

btnlisteMembres.addEventListener('click', () => {
  listDesContactes.innerHTML = ''; 
  if (groupeActif) {
    afficherMembresDuGroupeV2(groupeActif);
  } else {
    afficherMessage('warning', 'Aucun groupe sélectionné.');

  }

  // Optionnel : Fermer le menu déroulant après clic
  document.getElementById('dropdownMenu').classList.add('hidden');

  // ⚠️ Tu modifies le DOM ici :
  setTimeout(() => {
    afficher(listDesContactes, formulaire, parantlisteDeMesGoupe, listDesArchive);
    afficherAllContacts(contacts, zoneAffichage); 
    
  }, 0);
})

// listContact.addEventListener('click', () => {
//   listDesContactes.innerHTML = ''; 
//   // ⚠️ Tu modifies le DOM ici :
//   afficher(listDesContactes, formulaire, parantlisteDeMesGoupe, listDesArchive);
//   afficherAllContacts(contacts, zoneAffichage); 

// });

btnAjouterMembre.addEventListener('click', () => {
  if (btnAjouterMembre.innerHTML === "Retirer") {
    alert('retirer le contacte dans le groupe')
    return false
  }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let unContactEstCoche = false;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        unContactEstCoche = true;

        const idString = checkbox.id.replace('check', '');
        const contactId = parseInt(idString, 10);

        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex !== -1) {
          const contact = contacts[contactIndex];

          const dejaMembre = tabGroupes[indexGroupeActif].membres.some(
            m => m.id === contact.id
          );

          if (!dejaMembre) {
            tabGroupes[indexGroupeActif].membres.push(contact);
            // alert('Membre ajouté au groupe.');
            afficherMessage('success', 'Membre ajouté au groupe.',mesMessage);
          } else {
            afficherMessage('warning', 'Ce membre est déjà dans le groupe',mesMessage);

          }

        }
      }
    });
})

btnMembresGroupe.addEventListener('click', () => {
  // btnAjouterMembre.innerHTML = "Retirer"
  // listContact.style.display = 'none'
  if (groupeActif) {
    afficherMembresDuGroupeV2(groupeActif);
  } else {
    afficherMessage('warning', 'Aucun groupe sélectionné.');

  }

  // Optionnel : Fermer le menu déroulant après clic
  document.getElementById('dropdownMenu').classList.add('hidden');
});

inputRecherche.addEventListener('input', () => {
  const recherche = inputRecherche.value.trim().toLowerCase();

  let contactsFiltres;

  if (recherche === '*') {
    // Trier tous les contacts par ordre alphabétique
    contactsFiltres = [...contacts].sort((a, b) => a.nom.localeCompare(b.nom));
  } else {
    contactsFiltres = contacts.filter(contact =>
      contact.nom.toLowerCase().includes(recherche) ||
      contact.numero.includes(recherche)
    ).sort((a, b) => a.nom.localeCompare(b.nom)); // Tri aussi les résultats filtrés
  }

  afficherContactsFiltre(contactsFiltres);
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add('hidden');
  }
});

document.getElementById('btnFermerPopup').addEventListener('click', () => {
  popupMembres.classList.add('hidden');
});















function afficherMembresDuGroupeV2(groupe) {
  if (!zoneAffichage) return;
  zoneAffichage.innerHTML = ''; // Nettoyer la zone

  const listeMembres = groupe.membres.map(membre => creerItemMembre(groupe, membre));
  listeMembres.forEach(item => zoneAffichage.appendChild(item));

  document.getElementById('popupMembres').classList.remove('hidden');
}

function creerItemMembre(groupe, membre) {
  const menu = creerMenuDeroulant(groupe, membre); // Menu caché à l'avance

  return createElement('div', {
    class: 'relative border p-3 rounded bg-white shadow hover:bg-gray-50'
  }, [
    createElement('span', {
      class: 'block font-medium text-gray-800'
    }, `${membre.nom} - ${membre.numero}`),

    createElement('button', {
      class: 'absolute top-2 right-2 text-blue-600 text-lg',
      onclick: (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
      }
    }, '⋮'),

    menu
  ]);
}

function creerMenuDeroulant(groupe, membre) {
  return createElement('div', {
    class: 'hidden absolute right-2 top-8 bg-white border rounded shadow-md z-20 w-40',
  }, [
    creerOptionMenu('Retirer', 'hover:bg-red-100 text-red-700', () => retirerMembre(groupe, membre)),
    creerOptionMenu('Définir comme admin', 'hover:bg-green-100 text-green-700', () => definirCommeAdmin(membre)),
    creerOptionMenu('Fermer', 'hover:bg-gray-100', function () {
      this.parentElement.classList.add('hidden');
    })
  ]);
}

function creerOptionMenu(label, className, action) {
  return createElement('div', {
    class: `p-2 cursor-pointer text-sm ${className}`,
    onclick: function (e) {
      e.stopPropagation();
      action.call(this, e);
    }
  }, label);
}

function retirerMembre(groupe, membre) {
  if (confirm(`Retirer ${membre.nom} du groupe ?`)) {
    const groupeIndex = tabGroupes.findIndex(g => g.id === groupe.id);
    if (groupeIndex !== -1) {
      tabGroupes[groupeIndex].membres = tabGroupes[groupeIndex].membres.filter(m => m.id !== membre.id);
      afficherMembresDuGroupeV2(tabGroupes[groupeIndex]);
    }
  }
}

function definirCommeAdmin(membre) {
  if (!groupeActif) return;

  const groupeIndex = tabGroupes.findIndex(g => g.id === groupeActif.id);
  if (groupeIndex === -1) return;

  const membreIndex = tabGroupes[groupeIndex].membres.findIndex(m => m.id === membre.id);
  if (membreIndex === -1) return;

  const membreGroupe = tabGroupes[groupeIndex].membres[membreIndex];

  // Si déjà admin
  if (membreGroupe.statut === 'admin') {
    alert(`${membreGroupe.nom} est déjà admin.`);
    return;
  }

  // Attribuer le statut
  membreGroupe.statut = 'admin';
  // alert(`${membreGroupe.nom} est maintenant administrateur du groupe "${groupeActif.nom}".`);
  afficherMessage('success', `${membreGroupe.nom} est maintenant administrateur du groupe "${groupeActif.nom}".`);
  console.log(groupeActif);
  
  // Mettre à jour l’affichage
  afficherMembresDuGroupeV2(tabGroupes[groupeIndex]);

  
}

function afficherAdminsDuGroupeDansPopup(groupe) {
  if (!groupe) return;

  // Afficher le popup
  document.getElementById('popupMembres').classList.remove('hidden');

  zoneAffichage.innerHTML = ''; // Nettoyer la zone

  const admins = groupe.membres.filter(m => m.statut === 'admin');

  if (admins.length === 0) {
    zoneAffichage.innerHTML = '<p class="text-center text-gray-500">Aucun administrateur dans ce groupe.</p>';
    return;
  }

  admins.forEach(admin => {
    const adminCard = createElement('div', {
      class: 'relative border p-4 rounded-lg bg-white shadow hover:bg-gray-50 mb-2'
    }, [
      createElement('span', {
        class: 'block font-semibold text-gray-800'
      }, `👑 ${admin.nom} - ${admin.numero}`),

      createElement('span', {
        class: 'absolute top-2 right-2 text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full'
      }, 'ADMIN')
    ]);

    zoneAffichage.appendChild(adminCard);
  });
}

const btnVoirAdmins = document.getElementById('btnVoirAdmins');
btnVoirAdmins.addEventListener('click', () => {
  if (groupeActif) {
    afficherAdminsDuGroupeDansPopup(groupeActif);
  } else {
    afficherMessage('warning', 'Aucun groupe sélectionné.');
  }

  document.getElementById('dropdownMenu')?.classList.add('hidden');
});








// SOLUTION CORRIGÉE POUR LE PROBLÈME MEDIARECORDER
// Remplacez tout votre code d'enregistrement vocal par celui-ci

// Variables pour l'enregistrement vocal
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentStream = null; // Nouvelle variable pour garder le stream actif

// Éléments DOM (assurez-vous qu'ils existent)
const btnMicro = document.getElementById('btnMicro');
const indicateurEnregistrement = document.getElementById('indicateurEnregistrement');


// Rendre accessible globalement
window.jouerAudio = jouerAudio;











// Fonction pour arrêter complètement le stream
function stopCurrentStream() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
        currentStream = null;
    }
    mediaRecorder = null;
}

// Fonction pour initialiser et démarrer l'enregistrement en une fois
async function startRecording() {
  // Si on est déjà en train d'enregistrer, on ignore
  if (isRecording) return;
  
  try {
      // Arrêter le stream précédent s'il existe
      stopCurrentStream();
      
      // Demander l'accès au microphone
      console.log('Demande accès microphone...');
      currentStream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
              echoCancellation: true,
              noiseSuppression: true,
              sampleRate: 44100
          }
      });
      
      console.log('Microphone accessible, création MediaRecorder...');
      
      // Vérifier les types MIME supportés
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/wav')) {
          mimeType = 'audio/wav';
      }
      
      // Créer le MediaRecorder
      mediaRecorder = new MediaRecorder(currentStream, {
          mimeType: mimeType
      });
      
      // Réinitialiser les chunks
      audioChunks = [];
      
      // Gestionnaires d'événements
      mediaRecorder.ondataavailable = (event) => {
          console.log('Données audio reçues:', event.data.size);
          if (event.data && event.data.size > 0) {
              audioChunks.push(event.data);
          }
      };

      mediaRecorder.onstop = () => {
          console.log('Enregistrement arrêté, traitement...');
          
          if (audioChunks.length === 0) {
              console.error('Aucune donnée audio enregistrée');
              alert('Aucun audio enregistré. Essayez de parler plus fort.');
              stopCurrentStream();
              return;
          }
          
          // Créer le blob audio
          const audioBlob = new Blob(audioChunks, { type: mimeType });
          const audioUrl = URL.createObjectURL(audioBlob);
          
          console.log('Audio créé:', audioUrl);
          
          // Calculer la durée approximative (basée sur la taille)
          const dureeApprox = Math.max(1, Math.floor(audioBlob.size / 8000)); // Approximation
          const dureeFormatee = `0:${dureeApprox.toString().padStart(2, '0')}`;
          
          // Ajouter le message vocal
          const messageVocal = {
              id: Date.now(),
              auteur: 'Moi',
              type: 'audio',
              audioUrl: audioUrl,
              duree: dureeFormatee,
              timestamp: new Date().toLocaleTimeString()
          };
          
          // Utiliser votre logique existante pour ajouter le message
          try {
              if (groupeActif && typeof indexGroupeActif !== 'undefined' && tabGroupes[indexGroupeActif]) {
                  tabGroupes[indexGroupeActif].chatMessages.push(messageVocal);
                  afficherMessages(groupeActif.chatMessages);
              } else if (contactActif && typeof indexContactActif !== 'undefined' && contacts[indexContactActif]) {
                  contacts[indexContactActif].chatMessages.push(messageVocal);
                  afficherMessages(contactActif.chatMessages);
              } else {
                  console.error('Aucun contact ou groupe actif');
                  alert('Erreur: aucune conversation active');
              }
          } catch (error) {
              console.error('Erreur ajout message:', error);
              alert('Erreur lors de l\'ajout du message vocal');
          }
          
          // Nettoyer
          audioChunks = [];
          stopCurrentStream();
      };

      mediaRecorder.onerror = (event) => {
          console.error('Erreur MediaRecorder:', event);
          alert('Erreur lors de l\'enregistrement: ' + event.error);
          stopCurrentStream();
      };

      mediaRecorder.onstart = () => {
          console.log('Enregistrement démarré');
          isRecording = true;
          
          // Interface utilisateur
          btnMicro.classList.remove('bg-red-500');
          btnMicro.classList.add('bg-red-700', 'scale-110');
          if (indicateurEnregistrement) {
              indicateurEnregistrement.classList.remove('hidden');
          }
          
          // Vibration sur mobile si disponible
          if (navigator.vibrate) {
              navigator.vibrate(50);
          }
      };
      
      // Démarrer l'enregistrement immédiatement après la création
      console.log('Démarrage enregistrement...');
      mediaRecorder.start(100);
      
  } catch (error) {
      console.error('Erreur complète:', error);
      stopCurrentStream();
      
      if (error.name === 'NotAllowedError') {
          alert('Permission microphone refusée. Autorisez l\'accès au microphone dans les paramètres de votre navigateur.');
      } else if (error.name === 'NotFoundError') {
          alert('Aucun microphone trouvé. Vérifiez qu\'un microphone est connecté.');
      } else {
          alert('Erreur microphone: ' + error.message);
      }
  }
}

// Fonction pour arrêter l'enregistrement
function stopRecording() {
    console.log('Arrêt enregistrement demandé...');
    
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        console.log('Arrêt du MediaRecorder...');
        mediaRecorder.stop();
    }
    
    // Interface utilisateur
    isRecording = false;
    btnMicro.classList.remove('bg-red-700', 'scale-110');
    btnMicro.classList.add('bg-red-500');
    if (indicateurEnregistrement) {
        indicateurEnregistrement.classList.add('hidden');
    }
    
    // Vibration sur mobile si disponible
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Vérification de la compatibilité au chargement
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia non supporté');
    alert('Votre navigateur ne supporte pas l\'enregistrement audio');
} else if (!window.MediaRecorder) {
    console.error('MediaRecorder non supporté');
    alert('Votre navigateur ne supporte pas MediaRecorder');
} else {
    console.log('Fonctionnalités audio supportées');
}

// Events pour le bouton micro - VERSION SIMPLIFIÉE ET ROBUSTE
if (btnMicro) {
  btnMicro.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
  });
} else {
    console.error('Bouton micro non trouvé dans le DOM');
}

// Fonction de nettoyage pour libérer les ressources
window.addEventListener('beforeunload', () => {
    stopCurrentStream();
});







