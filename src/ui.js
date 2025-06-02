import {createElement} from "./componant.js"
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


function afficherContacts(contacts,listDesContactes) {
    listDesContactes.innerHTML = ''; // Vider d'abord la liste
    contacts.forEach(contact => {
        const item = contactItem(contact);
        if (!contact.archive) {
        listDesContactes.appendChild(item);
        }
    });
}

function afficherAllContacts(contacts,listDesContactes) {
    listDesContactes.innerHTML = ''; // Vider d'abord la liste
    contacts.forEach(contact => {
        const item = contactItem(contact);
    
        listDesContactes.appendChild(item);
        
    });
}

function afficherListArchive(contacts,listDesContactes) {
  listDesContactes.innerHTML = ''; // Vider d'abord la liste

    contacts.forEach(contact => {
        // const item = contactArchive(contact);
        const item = contactItem(contact);
        if (contact.archive) {
            console.log(contact);
        
            listDesContactes.appendChild(item);
        }
    });
}


// Fonction utilitaire pour afficher les messages
function afficherMessage(type, texte, parant = parantMessage ,duree = 3000) {

    // Supprimer message existant
    const ancien = parant.querySelector('.message-temp');
    if (ancien) ancien.remove();
    
    // Styles selon le type
    const styles = {
        success: ' message-temp bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded flex items-center',
        error: ' message-temp bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded flex items-center',
        warning: ' message-temp bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded flex items-center'
    };
    
    const icones = { success: '✓', error: '✗', warning: '⚠' };
    
    // Créer message
    const message = createElement('div', { class: styles[type] });
    message.innerHTML = `<span class="mr-2 font-bold">${icones[type]}</span><span>${texte}</span>`;
    
    parant.insertBefore(message, parant.firstChild);
    
    // Suppression automatique
    setTimeout(() => {
      if (parant.contains(message)) message.remove();
    }, duree);
}
const contactItem = (contact) => {
    return createElement('div', { class: 'contact' }, [
        createElement('label', { for: 'check' + contact.id }, [contact.nom]),
        createElement('input', {
            type: 'checkbox',
            id: 'check' + contact.id,
            class: 'check'
    
        })
    ]);
}
const groupeItem = (groupe) => {

    return createElement('div', {
        class: 'w-full h-20 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition',
        'data-id': groupe.id
        }, [
        createElement('div', { class: 'w-16 h-16 rounded-full ml-2 flex justify-center items-center text-white text-2xl font-semibold bg-gradient-to-br from-blue-500 to-blue-700 shadow-md', id : 'pr'+groupe.id }),
        createElement('div', { class: 'w-2/3 h-14' }, [
            createElement('h4', { class: 'text-xl' }, groupe.nom),
            createElement('span', {}, groupe.sousTitre)
        ]),
        createElement('div', { class: 'w-16 h-14 text-green-700' }, [
            createElement('div', {}, 'Date'),
            createElement('span', { class: 'text-2xl' }, '.')
        ])
        ]);
};







function styler(n, ...args) {
    for (const arg of args) {
        arg.classList.remove('bg-yellow-600', 'hover:bg-yellow-400');
    }
    n.classList.add('bg-yellow-600', 'hover:bg-yellow-400');
}

function afficher(n,...args) {
    for (const arg of args) {
        arg.style.display = 'none' ;
    }
    n.style.display = 'block';
}

function getInitiales(nom) {
    return nom
        .split(' ')
        .map(mot => mot[0]?.toUpperCase())
        .join('')
        .slice(0, 2); // max 2 lettres
}




function afficherGroupes2(groupes, container) {
    container.innerHTML = ''; 
    groupes.forEach(groupe => {
        container.appendChild(groupeItem(groupe));
        setTimeout(() => {
            const initiales = getInitiales(groupe.nom);
            document.getElementById( 'pr'+groupe.id).textContent = initiales;
        }, 0);
    });
}







function afficherContactsFiltre(liste) {
    listDesContactes.innerHTML = ''; // Vider la liste

    if (liste.length === 0) {
        listDesContactes.textContent = 'Aucun contact trouvé.';
        return;
    }

    liste.forEach(contact => {
        const div = contactItem(contact); // Utilise ta fonction existante
        listDesContactes.appendChild(div);
    });
}



// FONCTION MISE À JOUR POUR AFFICHER LES MESSAGES VOCAUX
// Assurez-vous que cette fonction remplace ou complète votre fonction existante
function afficherMessages(listeMessages) {
    if (!zoneMessages) {
        console.error('zoneMessages non trouvé');
        return;
    }
    
    zoneMessages.innerHTML = ''; // vider la zone
    
    listeMessages.forEach(msg => {
        const divMsg = document.createElement('div');
        const estMoi = msg.auteur === 'Moi';
        
        divMsg.className = `
            mb-3 p-3 rounded-xl max-w-xs text-sm break-words shadow
            ${estMoi ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-900 self-start'}
        `;

        if (msg.type === 'audio') {
            // Message vocal
            divMsg.innerHTML = `
                <p class="font-semibold ${estMoi ? 'text-white' : 'text-gray-700'} mb-2">${msg.auteur}</p>
                <div class="flex items-center space-x-2">
                    <button onclick="jouerAudio('${msg.audioUrl}')" 
                            class="${estMoi ? 'bg-white bg-opacity-20 hover:bg-opacity-30' : 'bg-blue-500 hover:bg-blue-600'} 
                                    rounded-full p-2 transition-colors text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5,3 19,12 5,21"></polygon>
                        </svg>
                    </button>
                    <div class="flex-1">
                        <div class="flex items-center space-x-1 mb-1">
                            <div class="h-1 bg-current opacity-30 rounded-full flex-1"></div>
                            <div class="h-2 w-1 bg-current opacity-50 rounded"></div>
                            <div class="h-3 w-1 bg-current opacity-70 rounded"></div>
                            <div class="h-2 w-1 bg-current opacity-50 rounded"></div>
                            <div class="h-1 w-1 bg-current opacity-30 rounded"></div>
                        </div>
                        <p class="text-xs opacity-75">🎤 ${msg.duree || '0:05'}</p>
                    </div>
                </div>
            `;
        } else {
            // Message texte (votre code existant)
            divMsg.innerHTML = `
                <p class="font-semibold ${estMoi ? 'text-white' : 'text-gray-700'} mb-1">${msg.auteur}</p>
                <p>${msg.texte || msg.message || ''}</p>
            `;
        }
        
        zoneMessages.appendChild(divMsg);
    });

    // Scroll vers le bas
    zoneMessages.scrollTop = zoneMessages.scrollHeight;
}



// Fonction pour jouer un message audio
function jouerAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(e => {
        console.log('Erreur lecture audio:', e);
        alert('Impossible de lire le message vocal');
    });
}


export {
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
};



















































// function afficherMessages(listeMessages) {
//   zoneMessages.innerHTML = ''; // vider la zone

//   listeMessages.forEach(msg => {
//     const divMsg = document.createElement('div');

//     const estMoi = msg.auteur === 'Moi';

//     divMsg.className = `
//       mb-3 p-3 rounded-xl max-w-xs text-sm break-words shadow 
//       ${estMoi ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-900 self-start'}
//     `;

//     divMsg.innerHTML = `
//       <p class="font-semibold ${estMoi ? 'text-white' : 'text-gray-700'} mb-1">${msg.auteur}</p>
//       <p>${msg.texte}</p>
//     `;

//     zoneMessages.appendChild(divMsg);
//   });

//   // Scroll vers le bas
//   zoneMessages.scrollTop = zoneMessages.scrollHeight;
// }





// function afficherGroupes() {
//   // const liste = document.querySelector('#listeDeMesGoupe');
//   listeDeMesGoupe.innerHTML = ''; // Vider la liste des groupes

//   tabGroupes.forEach(groupe => {
//     const item = groupeItem(groupe.nom, groupe.sousTitre, 'date', groupe.id);
//     listeDeMesGoupe.appendChild(item);
//   });
// }


// function afficherMembresDuGroupe(groupe) {
//   if (!zoneAffichage) return;

//   zoneAffichage.innerHTML = ''; // Reset

//   const titre = createElement('h2', {
//     class: 'text-xl font-bold mb-2'
//   }, groupe.nom);

//   const liste = createElement('ul', {
//     class: 'space-y-1',
//     vFor: {
//       each: groupe.membres,
//       render: (membre) =>
//         createElement('li', {
//           class: 'border p-2 rounded bg-white shadow-sm'
//         }, `${membre.nom} - ${membre.numero}`)
//     }
//   });

//   zoneAffichage.appendChild(titre);
//   zoneAffichage.appendChild(liste);
//   document.getElementById('popupMembres').classList.remove('hidden');
// }

// function afficherMembresDuGroupeV2(groupe) {
//   if (!zoneAffichage) return;

//   zoneAffichage.innerHTML = ''; // Reset

//   const titre = createElement('h2', {
//     class: 'text-xl font-bold mb-2'
//   }, groupe.nom);

//   const liste = createElement('ul', {
//     class: 'space-y-1'
//   });

//   groupe.membres.forEach((membre, index) => {
//     const item = createElement('li', {
//       class: 'border p-2 rounded bg-white shadow-sm cursor-pointer hover:bg-red-50',
//       onclick: () => {
//         // Confirmer la suppression
//         if (confirm(`Retirer ${membre.nom} du groupe ?`)) {
//           // Supprimer du tableau
//           const groupeIndex = tabGroupes.findIndex(g => g.id === groupe.id);
//           if (groupeIndex !== -1) {
//             tabGroupes[groupeIndex].membres = tabGroupes[groupeIndex].membres.filter(m => m.id !== membre.id);
//             // Recharger les membres mis à jour
//             afficherMembresDuGroupeV2(tabGroupes[groupeIndex]);
//           }
//         }
//       }
//     }, `${membre.nom} - ${membre.numero}`);

//     liste.appendChild(item);
//   });

//   zoneAffichage.appendChild(titre);
//   zoneAffichage.appendChild(liste);
//   document.getElementById('popupMembres').classList.remove('hidden');
// }



// const groupeItem = (titre, sousTitre, date, id = null) => {
//   return createElement("div", {
//       class: "w-full h-20 flex justify-between items-center border-b pb-2 mb-2",
//       'data-id': id
//   }, [
//       createElement("div", {
//           class: "border w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center"
//       }, [
//           createElement("span", {
//               class: "text-lg font-bold text-gray-600"
//           }, titre.charAt(0).toUpperCase())
//       ]),
//       createElement("div", {
//           class: "w-2/3 h-14"
//       }, [
//           createElement("h4", {
//               class: "text-xl font-medium"
//           }, titre),
//           createElement("span", {
//               class: "text-gray-600"
//           }, sousTitre)
//       ]),
//       createElement("div", {
//           class: "w-20 h-14 text-green-700 flex flex-col items-end"
//       }, [
//           createElement("div", {
//               class: "text-sm"
//           }, date),
//           // id ? createElement("button", {
//           //     class: "text-red-500 hover:text-red-700 text-xs mt-1",
//           //     onclick: () => deleteGroupe(id)
//           // }, "Supprimer") : createElement("span", {
//           //     class: "text-2xl"
//           // }, ".")
//       ])
//   ]);
// };












// function afficherMembresDuGroupeV2(groupe) {
//   if (!zoneAffichage) return;
//   zoneAffichage.innerHTML = ''; // Reset

//   const titre = createElement('h2', {
//     class: 'text-xl font-bold mb-2'
//   }, groupe.nom);

//   const liste = createElement('ul', {
//     class: 'space-y-1'
//   });

//   groupe.membres.forEach((membre) => {
//     const item = createElement('li', {
//       class: 'relative border p-2 rounded bg-white shadow-sm cursor-pointer hover:bg-gray-50',
//     });

//     const label = createElement('span', {
//       class: 'block'
//     }, `${membre.nom} - ${membre.numero}`);

//     // Bouton pour ouvrir le menu
//     const btnOptions = createElement('button', {
//       class: 'absolute top-2 right-2 text-sm text-blue-600 underline',
//       onclick: (e) => {
//         e.stopPropagation(); // éviter que d'autres événements cliquent
//         menu.classList.toggle('hidden');
//       }
//     }, '⋮');

//     // Menu déroulant d’options
//     const menu = createElement('div', {
//       class: 'hidden absolute right-2 top-8 bg-white border rounded shadow-md z-10'
//     }, [
//       createElement('div', {
//         class: 'p-2 hover:bg-red-100 cursor-pointer',
//         onclick: () => {
//           if (confirm(`Retirer ${membre.nom} du groupe ?`)) {
//             const groupeIndex = tabGroupes.findIndex(g => g.id === groupe.id);
//             if (groupeIndex !== -1) {
//               tabGroupes[groupeIndex].membres = tabGroupes[groupeIndex].membres.filter(m => m.id !== membre.id);
//               afficherMembresDuGroupeV2(tabGroupes[groupeIndex]);
//             }
//           }
//         }
//       }, 'Retirer'),

//       createElement('div', {
//         class: 'p-2 hover:bg-green-100 cursor-pointer',
//         onclick: () => {
//           alert(`${membre.nom} est maintenant admin (simulation)`);
//           // Ici, tu peux ajouter une logique pour définir ce membre comme admin
//         }
//       }, 'Définir comme admin'),

//       createElement('div', {
//         class: 'p-2 hover:bg-gray-100 cursor-pointer',
//         onclick: () => {
//           menu.classList.add('hidden'); // Fermer le menu
//         }
//       }, 'Fermer')
//     ]);

//     item.appendChild(label);
//     item.appendChild(btnOptions);
//     item.appendChild(menu);
//     liste.appendChild(item);
//   });

//   zoneAffichage.appendChild(titre);
//   zoneAffichage.appendChild(liste);
//   document.getElementById('popupMembres').classList.remove('hidden');
// }




