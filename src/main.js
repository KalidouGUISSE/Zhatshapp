import {createElement} from "./componant.js"
import {DATA,COLORS} from "./counter.js"

const listDesContactes = document.querySelector('#listDesContactes')
const ajouterContact = document.querySelector('#ajouterContact')
const nouveauContacte = document.querySelector('#nouveauContacte')
const formulaire = document.querySelector('#formulaire')
const nomDuContact = document.querySelector('#nomDuContact')
const numeroDuContact = document.querySelector('#numeroDuContact')
const Diffussion = document.querySelector('#Diffussion')
const parantlisteDeMesGoupe = document.querySelector('#parantlisteDeMesGoupe')
const groupes = document.querySelector('#groupes')
const creerGroupe = document.querySelector('#creerGroupe')

const titre = document.querySelector('#formulaire h3');
const formLabel1 = document.querySelector('#formLabel1')
const formLabel2 = document.querySelector('#formLabel2')

const btnPourArchiver = document.querySelector('#btnPourArchiver')

const contacts = [
  {
    id: 1,
    nom: 'Ali Ndiaye',
    numero: '770000000'
  },
  {
    id: 2,
    nom: 'Fatou Diop',
    numero: '780000000'
  }
];
const tabGroupes = [
  {
    id: 101,
    nom: 'Famille',
    sousTitre: 'Parents et cousins'
  },
  {
    id: 102,
    nom: 'Travail',
    sousTitre: 'Collègues bureau'
  }
]
const contactAchiver = [
  {
    id: 1,
    nom: 'Ali Ndiaye',
    numero: '770000000'
  }
];

listDesContactes.style.display = 'none'
formulaire.style.display = 'none'
parantlisteDeMesGoupe.style.display = 'none'

function afficherContacts() {
  listDesContactes.innerHTML = ''; // Vider d'abord la liste
  contacts.forEach(contact => {
    const div = createElement('div', {
      class: 'contact'
    }, [
      createElement('label', { for: 'check' + contact.id }, contact.nom),
      createElement('input', {
        type: 'checkbox',
        id: 'check' + contact.id,
        class: 'check'
      }),
    ]);
    listDesContactes.appendChild(div);
  });
}

function afficherGroupes() {
  const liste = document.querySelector('#listeDeMesGoupe');
  liste.innerHTML = ''; // Vider la liste des groupes

  tabGroupes.forEach(groupe => {
    const item = groupeItem(groupe.nom, groupe.sousTitre, 'date', groupe.id);
    liste.appendChild(item);
  });
}


function styler(n,...args) {
  for (const arg of args) {
    arg.classList.remove('bg-yellow-600');
  }
  n.classList.add('bg-yellow-600');
}

function afficher(n,...args) {
  for (const arg of args) {
    arg.style.display = 'none' ;
  }
  n.style.display = 'block';
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

nouveauContacte.addEventListener('click',()=>{

  styler(nouveauContacte,Diffussion,groupes)
  afficher(formulaire,listDesContactes,parantlisteDeMesGoupe)
  titre.innerHTML = 'Ajouter un Contact'
  formLabel1.innerHTML = 'Nom '
  formLabel2.innerHTML = 'Numero'
  ajouterContact.innerHTML = 'Creer un Contact'

})
Diffussion.addEventListener('click',()=>{
  styler(Diffussion,nouveauContacte,groupes)
  afficher(listDesContactes,formulaire,parantlisteDeMesGoupe)
})
groupes.addEventListener('click',() => {
  styler(groupes,nouveauContacte,Diffussion)
  afficher(parantlisteDeMesGoupe,listDesContactes,formulaire)
})

ajouterContact.addEventListener('click', () => {

  if (nomDuContact.value !== '' && numeroDuContact.value !== '' && ajouterContact.innerHTML !== 'Créer un Groupe'){

    const nom = nomDuContact.value 
    const numero = numeroDuContact.value

    const contact = {
      id: Date.now(), // ID unique basé sur l'heure
      nom,
      numero
    };

    // Ajouter au tableau
    contacts.push(contact);
    console.log(contacts);
    
    // Afficher dans le DOM
    const div = createElement('div', {
      class: 'contact'
    }, [
      createElement('label', { for: 'check' + contact.id },  nom /*+ ' - ' +  numeroDuContact.value*/ ),
      createElement('input', {
        type: 'checkbox',
        id: 'check' + contact.id,
        class: 'check'
      }),
    ]);

    listDesContactes.appendChild(div);
    nomDuContact.value = ''
    numeroDuContact.value = ''
  } else if(nomDuContact.value === '' || numeroDuContact.value === '' ) {  
    const parantError = document.querySelector('#contactForm')

      const error = createElement('span',{
        class : ' text-red-500 h-12 w-full'
      },'champ obligatoir')

      parantError.appendChild(error)
        setTimeout(() => {
          if (parantError.contains(error)) {
            parantError.removeChild(error);
          }
        }, 3000);
  } else if(ajouterContact.innerHTML === 'Créer un Groupe'){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const unContactEstCoche = Array.from(checkboxes).some(checkbox => checkbox.checked);
    if (!unContactEstCoche) {
      
      const parantError = document.querySelector('#contactForm')

      const error = createElement('span',{
        class : 'text-red-500 h-12 w-full'
      },'Il faut choisir')

      parantError.appendChild(error)
        setTimeout(() => {
          if (parantError.contains(error)) {
            parantError.removeChild(error);
          }
        }, 3000);
      return; 
    } else {
      parantlisteDeMesGoupe.appendChild(groupeItem(nomDuContact.value, nomDuContact.value, "date"));
      const nom = nomDuContact.value 
      const sousTitre = numeroDuContact.value
      const tabGroupe = {
        id: Date.now(), // ID unique basé sur l'heure
        nom,
        sousTitre
      };
      tabGroupes.push(tabGroupe);
      console.log(tabGroupes);
    }
  }

  nomDuContact.value = ''
  numeroDuContact.value = ''
})

creerGroupe.addEventListener('click', () => {
  // Vérifie si au moins un contact est coché
  listDesContactes.style.display = 'block';
  
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
  const unContactEstCoche = Array.from(checkboxes).some(checkbox => checkbox.checked);
  if (unContactEstCoche){
    contactAchiver.push()
    alert('archive')
  }
})


const groupeItem = (titre, sousTitre, date, id = null) => {
  return createElement("div", {
      class: "w-full h-20 flex justify-between items-center border-b pb-2 mb-2",
      'data-id': id
  }, [
      createElement("div", {
          class: "border w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center"
      }, [
          createElement("span", {
              class: "text-lg font-bold text-gray-600"
          }, titre.charAt(0).toUpperCase())
      ]),
      createElement("div", {
          class: "w-2/3 h-14"
      }, [
          createElement("h4", {
              class: "text-xl font-medium"
          }, titre),
          createElement("span", {
              class: "text-gray-600"
          }, sousTitre)
      ]),
      createElement("div", {
          class: "w-20 h-14 text-green-700 flex flex-col items-end"
      }, [
          createElement("div", {
              class: "text-sm"
          }, date),
          // id ? createElement("button", {
          //     class: "text-red-500 hover:text-red-700 text-xs mt-1",
          //     onclick: () => deleteGroupe(id)
          // }, "Supprimer") : createElement("span", {
          //     class: "text-2xl"
          // }, ".")
      ])
  ]);
};

afficherContacts(); 
afficherGroupes();  















































































































// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1 bg class="bg-red">Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// // `

// import {createElement} from "./componant.js"
// import {DATA,COLORS} from "./counter.js"

// const nouveau = document.querySelector('#nouveau');
// const contactSaisie = document.querySelector('#contactSaisie');
// const mesContactes = document.querySelector('#mesContactes');
// const Diffussion = document.querySelector('#Diffussion');
// const listDesContactes = document.querySelector('#listDesContactes');
// const groupes = document.querySelector('#groupes');
// const mesGoupe = document.querySelector('#mesGoupe');
// mesGoupe.style.display = 'none';

// const formulaire = document.querySelector('#formulaire');
// const submitBtnCreer = formulaire.querySelector('#submitBtnCreer');

// const listeDeMesGoupe = document.querySelector('#listeDeMesGoupe')


// formulaire.style.display = 'none';








// function aa(n,...args) {
//   for (const arg of args) {
//     arg.classList.remove('bg-yellow-600');
//   }
//   n.classList.add('bg-yellow-600');
// }

// function dd(n,...args) {
//   for (const arg of args) {
//     arg.style.display = 'none' ;
//   }
//   n.style.display = 'block';
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
//           id ? createElement("button", {
//               class: "text-red-500 hover:text-red-700 text-xs mt-1",
//               onclick: () => deleteGroupe(id)
//           }, "Supprimer") : createElement("span", {
//               class: "text-2xl"
//           }, ".")
//       ])
//   ]);
// };

// // const mesGroupes = createElement("div", {
// //   id: "mesGoupe"
// // }, [
// //   groupeItem("uegw", "hvad", "date"),
// //   groupeItem("uegw", "hvad", "date"),
// //   createElement("button", {
// //     vIf: true,
// //     vShow: true,
// //     id: "creerGroupe",
// //     type: "submit",
// //     class: "w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-200"}, "Créer un Groupe")
// // ]);

// // mesGoupe.appendChild(mesGroupes);
// const creerGroupe = mesGoupe.querySelector('#creerGroupe');










// const submitBtn = formContainer.querySelector('#submitBtn');


// submitBtn.addEventListener('click', () => {

//   const nom = formContainer.querySelector('#nom').value;
//   const numero = formContainer.querySelector('#numero').value;

//   if (nom && validateNumber(numero)) {
//     const div = createElement('div',{
//       class : ' contact ',
//     },[
//       createElement('label', {for : 'check2'}, nom),
//       createElement('input', {
//         type: 'checkbox',
//         id: 'check2',
//         class: 'check'
//       }),
//     ]) 
//     listDesContactes.appendChild(div);
//     contactSaisie.value = ''
//   } else {
//     const span = createElement('span',{
//       class : 'border border-red-400 text-red-500 h-12 w-full'
//     },'champ obligatoir')

//     formContainer.appendChild(span)
//       setTimeout(() => {
//         if (formContainer.contains(span)) {
//           formContainer.removeChild(span);
//         }
//       }, 3000);

//   }
// });

// nouveau.addEventListener('click',()=>{
//   dd(mesContactes,listDesContactes,mesGoupe,formulaire);
//   aa(nouveau,Diffussion,groupes);

//   mesContactes.appendChild(formContainer);
// })

// Diffussion.addEventListener('click',()=>{
// listeDeMesGoupe.appendChild(groupeItem("uegw", "hvad", "date"));

//   dd(listDesContactes,mesGoupe,formulaire);
//   aa(Diffussion,nouveau,groupes);
//   mesContactes.removeChild(formContainer);
// })


// groupes.addEventListener('click',()=>{
//   dd(mesGoupe,mesContactes,listDesContactes,formulaire);
//   aa(groupes,nouveau,Diffussion);
//   mesContactes.removeChild(formContainer);
// })

// creerGroupe.addEventListener('click', () => {

//   formulaire.style.display = 'block';
//   mesGoupe.style.display = 'none';

// })




// // Remplacez cette partie de votre code main.js :

// submitBtnCreer.addEventListener('click', (e) => {
//   e.preventDefault(); // Empêche le rechargement de la page
  
//   // Récupération des valeurs des champs
//   const nomGroupe = document.getElementById("nomGroupe").value.trim();
//   const sousTitre = document.getElementById("sousTitreGroupe").value.trim();
  
//   // Génération de la date actuelle
//   const date = new Date().toLocaleDateString('fr-FR');
  
//   console.log('Données du groupe:', { nomGroupe, sousTitre, date });
  
//   // Validation des champs
//   if (nomGroupe !== '' && sousTitre !== '') {
//     // Création du nouvel élément groupe avec les vraies valeurs
//     const newGroupe = groupeItem(nomGroupe, sousTitre, date);
    
//     // Ajout du groupe à la liste
//     listeDeMesGoupe.appendChild(newGroupe);
    
//     // Réinitialisation du formulaire
//     document.getElementById("nomGroupe").value = '';
//     document.getElementById("sousTitreGroupe").value = '';
    
//     // Masquer le formulaire et afficher la liste des groupes
//     formulaire.style.display = 'none';
//     mesGoupe.style.display = 'block';
    
//     console.log("Groupe ajouté avec succès !");
    
//   } else {
//     // Affichage d'un message d'erreur
//     console.log("Veuillez remplir tous les champs du formulaire.");
    
//     // Optionnel : Ajouter un message d'erreur visuel
//     let errorMsg = formulaire.querySelector('.error-message');
//     if (!errorMsg) {
//       errorMsg = document.createElement('div');
//       errorMsg.className = 'error-message text-red-500 text-sm mt-2';
//       errorMsg.textContent = 'Veuillez remplir tous les champs obligatoires.';
//       formulaire.appendChild(errorMsg);
      
//       // Supprimer le message d'erreur après 3 secondes
//       setTimeout(() => {
//         if (errorMsg && errorMsg.parentNode) {
//           errorMsg.parentNode.removeChild(errorMsg);
//         }
//       }, 3000);
//     }
//   }
// });

// // Aussi, assurez-vous que le formulaire ne se soumette pas normalement
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//   contactForm.addEventListener('submit', (e) => {
//     e.preventDefault(); // Empêche la soumission normale du formulaire
//   });
// }
























































































































// // Fonction pour afficher les membres d'un groupe dans la console
// function showGroupMembers(groupeId) {
//   const groupe = groupesData.find(g => g.id === groupeId);
//   if (groupe) {
//       console.log(`Membres du groupe "${groupe.nom}":`, groupe.membres);
//       return groupe.membres;
//   }
//   return [];
// }

// // Fonction pour compter les contacts sélectionnés en temps réel
// function setupContactCounter() {
//   const listDesContactes = document.querySelector('#listDesContactes');
//   if (listDesContactes) {
//       listDesContactes.addEventListener('change', (e) => {
//           if (e.target.type === 'checkbox') {
//               const selectedCount = getSelectedContacts().length;
              
//               // Mettre à jour ou créer le compteur
//               let counter = document.querySelector('.contact-counter');
//               if (!counter) {
//                   counter = createElement('div', {
//                       class: 'contact-counter bg-green-50 p-2 rounded-lg border border-green-300 mt-2'
//                   });
                  
//                   const contactTitle = document.querySelector('.contact-selection-title');
//                   if (contactTitle) {
//                       contactTitle.appendChild(counter);
//                   }
//               }
              
//               counter.innerHTML = '';
//               counter.appendChild(
//                   createElement('p', {
//                       class: selectedCount > 0 ? 'text-green-700 font-medium' : 'text-gray-600'
//                   }, `${selectedCount} contact(s) sélectionné(s)`)
//               );
              
//               // Changer la couleur du compteur selon le nombre
//               if (selectedCount > 0) {
//                   counter.className = 'contact-counter bg-green-50 p-2 rounded-lg border border-green-300 mt-2';
//               } else {
//                   counter.className = 'contact-counter bg-gray-50 p-2 rounded-lg border border-gray-300 mt-2';
//               }
//           }
//       });
//   }
// }

// // Initialisation
// document.addEventListener('DOMContentLoaded', () => {
//   setupContactSubmission();
//   setupGroupSubmission();
//   setupNumberValidation();
//   setupContactSearch();
//   setupContactCounter();
  
//   // Afficher les données initiales
//   displayContacts();
//   displayGroupes();
// });

// // Fonctions utilitaires pour accéder aux données depuis la console
// window.getContactsData = () => contactsData;
// window.getGroupesData = () => groupesData;
// window.showGroupMembers = showGroupMembers;
// window.exportData = () => ({
//   contacts: contactsData,
//   groupes: groupesData,
//   exportDate: new Date().toISOString()
// });// Tableaux pour stocker les données
// let contactsData = [];
// let groupesData = [];

// // Fonction pour générer un ID unique
// function generateId() {
//   return Date.now() + Math.random().toString(36).substr(2, 9);
// }

// // Fonction pour valider le numéro (seulement des chiffres)
// function validateNumber(numero) {
//   const numberRegex = /^[0-9\s\-\+\(\)]+$/;
//   return numberRegex.test(numero);
// }

// // Fonction pour formater le numéro (enlever les espaces inutiles)
// function formatNumber(numero) {
//   return numero.replace(/\s+/g, ' ').trim();
// }

// // Fonction pour afficher tous les contacts
// function displayContacts() {
//   const listDesContactes = document.querySelector('#listDesContactes');
//   listDesContactes.innerHTML = '';
  
//   contactsData.forEach(contact => {
//       const contactElement = createElement('div', {
//           class: 'contact border-b pb-2 mb-2',
//           'data-id': contact.id
//       }, [
//           createElement('div', {
//               class: 'flex justify-between items-center'
//           }, [
//               createElement('div', {
//                   class: 'flex items-center space-x-3'
//               }, [
//                   createElement('input', {
//                       type: 'checkbox',
//                       id: `check-${contact.id}`,
//                       class: 'check'
//                   }),
//                   createElement('label', {
//                       for: `check-${contact.id}`,
//                       class: 'cursor-pointer'
//                   }, [
//                       createElement('div', {
//                           class: 'font-medium'
//                       }, contact.nom),
//                       createElement('div', {
//                           class: 'text-sm text-gray-600'
//                       }, contact.numero)
//                   ])
//               ]),
//               createElement('button', {
//                   class: 'text-red-500 hover:text-red-700 text-sm',
//                   onclick: () => deleteContact(contact.id)
//               }, 'Supprimer')
//           ])
//       ]);
      
//       listDesContactes.appendChild(contactElement);
//   });
// }

// // Fonction pour afficher tous les groupes
// function displayGroupes() {
//   const listeDeMesGoupe = document.querySelector('#listeDeMesGoupe');
//   listeDeMesGoupe.innerHTML = '';
  
//   groupesData.forEach(groupe => {
//       const groupeElement = groupeItem(groupe.nom, groupe.sousTitre, groupe.date, groupe.id);
//       listeDeMesGoupe.appendChild(groupeElement);
//   });
// }


// // Fonction pour supprimer un contact
// function deleteContact(id) {
//   if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
//       contactsData = contactsData.filter(contact => contact.id !== id);
//       displayContacts();
//       console.log('Contact supprimé. Contacts restants:', contactsData);
//   }
// }

// // Fonction pour supprimer un groupe
// function deleteGroupe(id) {
//   if (confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
//       groupesData = groupesData.filter(groupe => groupe.id !== id);
//       displayGroupes();
//       console.log('Groupe supprimé. Groupes restants:', groupesData);
//   }
// }

// // Validation en temps réel pour le champ numéro
// function setupNumberValidation() {
//   const numeroInput = document.getElementById('numero');
//   if (numeroInput) {
//       // Empêcher la saisie de lettres
//       numeroInput.addEventListener('keypress', (e) => {
//           const char = String.fromCharCode(e.which);
//           if (!/[0-9\s\-\+\(\)]/.test(char)) {
//               e.preventDefault();
//               showValidationMessage(numeroInput, 'Seuls les chiffres et caractères (+, -, espaces, parenthèses) sont autorisés');
//           }
//       });

//       // Validation lors de la perte de focus
//       numeroInput.addEventListener('blur', (e) => {
//           const value = e.target.value.trim();
//           if (value && !validateNumber(value)) {
//               showValidationMessage(numeroInput, 'Format de numéro invalide');
//               e.target.focus();
//           }
//       });
//   }
// }

// // Fonction pour afficher les messages de validation
// function showValidationMessage(input, message) {
//   // Supprimer ancien message s'il existe
//   const existingMessage = input.parentNode.querySelector('.validation-message');
//   if (existingMessage) {
//       existingMessage.remove();
//   }

//   // Créer nouveau message
//   const messageElement = createElement('div', {
//       class: 'validation-message text-red-500 text-xs mt-1'
//   }, message);

//   input.parentNode.appendChild(messageElement);

//   // Supprimer après 3 secondes
//   setTimeout(() => {
//       if (messageElement && messageElement.parentNode) {
//           messageElement.remove();
//       }
//   }, 3000);
// }

// // Event listener pour l'ajout de contact (version corrigée)
// function setupContactSubmission() {
//   const submitBtn = document.querySelector('#submitBtn');
//   if (submitBtn) {
//       submitBtn.addEventListener('click', (e) => {
//           e.preventDefault();
          
//           const nomInput = document.getElementById('nom');
//           const numeroInput = document.getElementById('numero');
          
//           const nom = nomInput.value.trim();
//           const numero = formatNumber(numeroInput.value.trim());
          
//           // Validation
//           if (!nom) {
//               showValidationMessage(nomInput, 'Le nom est obligatoire');
//               return;
//           }
          
//           if (!numero) {
//               showValidationMessage(numeroInput, 'Le numéro est obligatoire');
//               return;
//           }
          
//           if (!validateNumber(numero)) {
//               showValidationMessage(numeroInput, 'Le numéro ne doit contenir que des chiffres');
//               return;
//           }
          
//           // Vérifier si le contact existe déjà
//           const contactExists = contactsData.some(contact => 
//               contact.nom.toLowerCase() === nom.toLowerCase() || 
//               contact.numero === numero
//           );
          
//           if (contactExists) {
//               showValidationMessage(nomInput, 'Ce contact existe déjà');
//               return;
//           }
          
//           // Ajouter le contact
//           const newContact = {
//               id: generateId(),
//               nom: nom,
//               numero: numero,
//               dateCreation: new Date().toISOString()
//           };
          
//           contactsData.push(newContact);
          
//           // Réinitialiser le formulaire
//           nomInput.value = '';
//           numeroInput.value = '';
          
//           // Afficher les contacts
//           displayContacts();
          
//           console.log('Contact ajouté:', newContact);
//           console.log('Tous les contacts:', contactsData);
//       });
//   }
// }

// // Event listener pour l'ajout de groupe (version corrigée)
// function setupGroupSubmission() {
//   const submitBtnCreer = document.querySelector('#submitBtnCreer');
//   if (submitBtnCreer) {
//       submitBtnCreer.addEventListener('click', (e) => {
//           e.preventDefault();
          
//           const nomGroupeInput = document.getElementById("nomGroupe");
//           const sousTitreInput = document.getElementById("sousTitreGroupe");
          
//           const nomGroupe = nomGroupeInput.value.trim();
//           const sousTitre = sousTitreInput.value.trim();
          
//           // Validation des champs
//           if (!nomGroupe) {
//               showValidationMessage(nomGroupeInput, 'Le nom du groupe est obligatoire');
//               return;
//           }
          
//           if (!sousTitre) {
//               showValidationMessage(sousTitreInput, 'Le sous-titre est obligatoire');
//               return;
//           }
          
//           // Vérifier qu'au moins un contact est sélectionné
//           const selectedContacts = getSelectedContacts();
//           if (selectedContacts.length === 0) {
//               showValidationMessage(sousTitreInput, 'Vous devez sélectionner au moins un contact pour créer un groupe');
//               return;
//           }
          
//           // Vérifier si le groupe existe déjà
//           const groupeExists = groupesData.some(groupe => 
//               groupe.nom.toLowerCase() === nomGroupe.toLowerCase()
//           );
          
//           if (groupeExists) {
//               showValidationMessage(nomGroupeInput, 'Ce groupe existe déjà');
//               return;
//           }
          
//           // Ajouter le groupe avec les contacts sélectionnés
//           const newGroupe = {
//               id: generateId(),
//               nom: nomGroupe,
//               sousTitre: sousTitre,
//               date: new Date().toLocaleDateString('fr-FR'),
//               dateCreation: new Date().toISOString(),
//               membres: selectedContacts.map(contact => ({
//                   id: contact.id,
//                   nom: contact.nom,
//                   numero: contact.numero
//               }))
//           };
          
//           groupesData.push(newGroupe);
          
//           // Réinitialiser le formulaire
//           nomGroupeInput.value = '';
//           sousTitreInput.value = '';
          
//           // Décocher tous les contacts
//           const checkboxes = document.querySelectorAll('#listDesContactes input[type="checkbox"]');
//           checkboxes.forEach(checkbox => checkbox.checked = false);
          
//           // Masquer le formulaire et la liste des contacts, afficher la liste des groupes
//           document.querySelector('#formulaire').style.display = 'none';
//           document.querySelector('#listDesContactes').style.display = 'none';
//           document.querySelector('#mesGoupe').style.display = 'block';
          
//           // Afficher les groupes
//           displayGroupes();
          
//           console.log('Groupe ajouté:', newGroupe);
//           console.log('Membres du groupe:', selectedContacts);
//           console.log('Tous les groupes:', groupesData);
//       });
//   }
// }

// // Fonction pour obtenir les contacts sélectionnés
// function getSelectedContacts() {
//   const selectedContacts = [];
//   const checkboxes = document.querySelectorAll('#listDesContactes input[type="checkbox"]:checked');
  
//   checkboxes.forEach(checkbox => {
//       const contactId = checkbox.id.replace('check-', '');
//       const contact = contactsData.find(c => c.id === contactId);
//       if (contact) {
//           selectedContacts.push(contact);
//       }
//   });
  
//   return selectedContacts;
// }

// // Fonction pour rechercher des contacts
// function setupContactSearch() {
//   const contactSaisie = document.querySelector('#contactSaisie');
//   if (contactSaisie) {
//       contactSaisie.addEventListener('input', (e) => {
//           const searchTerm = e.target.value.toLowerCase().trim();
//           const contactElements = document.querySelectorAll('#listDesContactes .contact');
          
//           contactElements.forEach(element => {
//               const nom = element.querySelector('label .font-medium').textContent.toLowerCase();
//               const numero = element.querySelector('label .text-gray-600').textContent.toLowerCase();
              
//               if (nom.includes(searchTerm) || numero.includes(searchTerm)) {
//                   element.style.display = 'block';
//               } else {
//                   element.style.display = 'none';
//               }
//           });
//       });
//   }
// }

// // Modifier la gestion des événements pour les boutons de navigation
// // Remplacez vos event listeners existants par ceux-ci :

// // Event listener pour le bouton "nouveau" (ajout de contact)
// nouveau.addEventListener('click',()=>{
//   dd(mesContactes, mesGoupe, formulaire);
//   dd(listDesContactes); // Masquer la liste des contacts
//   aa(nouveau, Diffussion, groupes);
  
//   mesContactes.appendChild(formContainer);
//   setupContactSubmission();
//   setupNumberValidation();
// })

// // Event listener pour le bouton "Diffussion" 
// Diffussion.addEventListener('click',()=>{
//   dd(mesGoupe, formulaire, mesContactes);
//   listDesContactes.style.display = 'block'; // Afficher la liste des contacts
//   aa(Diffussion, nouveau, groupes);
  
//   displayContacts(); // Afficher les contacts disponibles
  
//   if (mesContactes.contains(formContainer)) {
//       mesContactes.removeChild(formContainer);
//   }
// })

// // Event listener pour le bouton "groupes"
// groupes.addEventListener('click',()=>{
//   dd(mesGoupe, mesContactes, formulaire);
//   dd(listDesContactes); // Masquer la liste des contacts
//   aa(groupes, nouveau, Diffussion);
  
//   mesGoupe.style.display = 'block';
//   displayGroupes();
  
//   if (mesContactes.contains(formContainer)) {
//       mesContactes.removeChild(formContainer);
//   }
// })

// // Event listener pour le bouton "créer groupe"
// creerGroupe.addEventListener('click', () => {
//   // Vérifier qu'il y a des contacts disponibles
//   if (contactsData.length === 0) {
//       alert('Vous devez d\'abord créer des contacts avant de pouvoir créer un groupe.');
//       return;
//   }
  
//   // Afficher le formulaire de création de groupe ET la liste des contacts
//   formulaire.style.display = 'block';
//   listDesContactes.style.display = 'block';
//   mesGoupe.style.display = 'none';
  
//   // Afficher tous les contacts pour sélection
//   displayContacts();
  
//   // Ajouter un titre pour indiquer qu'il faut sélectionner des contacts
//   const existingTitle = formulaire.querySelector('.contact-selection-title');
//   if (!existingTitle) {
//       const contactTitle = createElement('div', {
//           class: 'contact-selection-title bg-blue-50 p-3 rounded-lg border border-blue-300 mb-3'
//       }, [
//           createElement('h4', {
//               class: 'text-blue-800 font-medium mb-1'
//           }, 'Sélection des membres'),
//           createElement('p', {
//               class: 'text-blue-600 text-sm'
//           }, 'Cochez au moins un contact pour l\'ajouter au groupe')
//       ]);
      
//       formulaire.insertBefore(contactTitle, formulaire.firstChild);
//   }
// })

// // Fonctions utilitaires pour accéder aux données depuis la console
// window.getContactsData = () => contactsData;
// window.getGroupesData = () => groupesData;
// window.exportData = () => ({
//   contacts: contactsData,
//   groupes: groupesData,
//   exportDate: new Date().toISOString()
// });