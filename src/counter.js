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

export {DATA, COLORS}
