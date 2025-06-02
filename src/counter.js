// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }


const DATA = [
  {
      id:0,
      title: "dklgjsl",
      content: "Losdflkgjibero",
      pts: 20,
      done:true,
      deleted: true
  },
  {
      id:1,
      title: "Un titre 1",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, unde libero",
      pts: 20,
      done:false,
      deleted: true
  },
  {
      id:2,
      title: "Un titre 2",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, unde libero? Ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ex ipsum,",
      pts: 10,
      done:true,
      deleted: false
  },
  {
      id:3,
      title: "Un titre 3",
      content: "Nulla, unde libero? Ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ex ipsum,",
      pts: '8',
      done:true,
      deleted: true
  }
];

const COLORS = {
  deleted : "red",
  done: "blue",
  done_deleted: "orange",
  other : "#f4f4f4"
}

const tabGroupes = [
  {
    id: 101,
    nom: 'Famille',
    sousTitre: 'Parents et cousins',
    membres: [
      { id: 1, nom: 'Amadou Diallo', numero: '771234567' , statut : 'admin'  },
      { id: 2, nom: 'Awa Ba',  numero: '778765432' },
      { id: 3, nom: 'Moussa Sow',  numero: '770112233' },
      { id: 4, nom: 'Diallo', numero: '774434567'},
    ],
    chatMessages :[
      { id: 2, auteur: 'Bob', texte: 'Je vais bien, merci ! Et toi ?' },
      { id: 3, auteur: 'Alice', texte: 'Super, merci !' }
    ]
  },
  {
    id: 102,
    nom: 'Travail',
    sousTitre: 'Collègues bureau',
    membres: [
      { id: 4, nom: 'Fatou Ndoye', numero: '761234567' },
      { id: 5, nom: 'Cheikh Fall', numero: '765432198' },
      { id: 1, nom: 'Amadou Diallo', numero: '774234567', statut : 'admin'  },
      { id: 4, nom: 'Awa Ba',  numero: '773765432' },
      { id: 5, nom: 'Sow',  numero: '770112243' }
    ],
    chatMessages :[
      { id: 1, auteur: 'Alice', texte: 'Salut, comment ça va ?' },
    ]
  }
];


const contacts = [
  {
    id: 1,
    nom: 'Ali Ndiaye',
    numero: '770000000',
    archive : false,
    chatMessages :[
      { id: 1, auteur: 'Alice', texte: 'Salut, comment ça va ?' },
    ]
  },
  {
    id: 2,
    nom: 'Fatou Diop',
    numero: '780000000',
    archive : false,
    chatMessages :[
      { id: 1, auteur: 'Alice', texte: 'Salut, comment ça va ?' },
    ]
  }
];


export {DATA, COLORS, tabGroupes,contacts}
