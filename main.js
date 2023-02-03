const startApp = () => {
  //Array used to store input students and the values created by the sorting system
  const students = [];
  //for easy reference the datastructure is like below:
  // id: id,
  // name: name.value,
  // house: house(),
  // expelled: false

  //script to show or hide the add students form. Default behavior is hide
  const showFormButton = document.querySelector("#showForm");

  showFormButton.addEventListener("click", () => {
    const form = document.getElementById("form");
    if (form.style.visibility === "collapse") {
      form.style.visibility = "visible";
    } else {
      form.style.visibility = "collapse";
    }
  });

  //Primary dynamic HTML rendering function
  const renderToDom = (divID, htmlToRender) => {
    const selectedDiv = document.querySelector(divID);
    selectedDiv.innerHTML = htmlToRender;
  };

  //used to determine card color for a student in "cardsOnDom"
  const backgroundColor = (house) => {
    if (house == 'Gryffindor') {
      return 'red';
    } else if (house == 'Ravenclaw') {
      return 'blue';
    } else if (house == 'Hufflepuff') {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  //generates HTML based on the input array, which will always be "students"
  const cardsOnDom = (array) => {
    let goodString = "";
    let badString = "";

    for (let i = 0; i < array.length; i++) {
      if (array[i].expelled == false) {
        goodString += `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${array[i].name}</h5>
          <div class="card-body">
            <p class="card-text" style="background-color: ${backgroundColor(array[i].house)}; color: white;">${array[i].house}</p>
            <button class="btn btn-danger" id="expel--${array[i].id}">Expel</button>
          </div>
        </div>`;
      }
      else {
        badString += `<div class="card" style="width: 18rem;">
        <h5 class="card-title">${array[i].name}</h5>
          <div class="card-body">
            <p class="card-text" style="background-color: black; color: white;">EVIL!!!</p>
          </div>
        </div>`;
      }
    }

    renderToDom("#good", goodString);
    renderToDom("#bad", badString);
  }

  //how students are added to the array and the information that is added procedurally
  const addStudent = (event) => {
    //event.preventdefault();
    //above code seemed to break everything stating that preventDefault didn't exist
  

    const house = () => {
      const randomNumber = Math.floor(Math.random() * 4);

      if (randomNumber == 0) {
        return 'Gryffindor';
      } else if (randomNumber == 1) {
        return 'Ravenclaw';
      } else if (randomNumber == 2) {
        return 'Hufflepuff';
      } else {
        return 'Slytherin';
      }
    }

    const name = document.querySelector("#name");
    const id = students.length + 1;

    if (name.value) {
      const newStudent = {
        id: id,
        name: name.value,
        house: house(),
        expelled: false
      }
    
      students.push(newStudent);
      cardsOnDom(students);
      renderToDom("#error", "");
    } else {
      renderToDom("#error", "<div>THE NAME CANNOT BE BLANK</div>");
    }

  }

  //logic to listen to button and run the addStudent function
  const submitButton = document.querySelector("#submitForm");
  submitButton.addEventListener("click", addStudent);

  //functionality for expel button. All it does is flip the expelled key pair to true on the corresponding ID. Logic for what that does when set to true is in "cardsOnDom"
  const appDiv = document.querySelector("#good");

  appDiv.addEventListener("click", (event) => {

    if (event.target.id.includes("expel")) {

      const [throwAway, memberId] = event.target.id.split("--");

      const indexOfMember = students.findIndex(
        (object) => object.id === Number(memberId)
      );

      students[indexOfMember].expelled = true;
    }
    const reset = () =>

    cardsOnDom(students);
  });

  const filter = (array, house) => {
    const typeArray = [];

    let i = 0;
    while (i < array.length) {
      if(array[i].house == house) {
        typeArray.push(array[i]);
      }
      i++
    } 

    return typeArray;
  };

  const showGryffindorButton = document.querySelector("#showGryffindor");
  const showRavenclawButton = document.querySelector("#showRavenclaw");
  const showHufflepuffButton = document.querySelector("#showHufflepuff");
  const showSlytherinButton = document.querySelector("#showSlytherin");
  const showAllButton = document.querySelector("#showAll");

  showGryffindorButton.addEventListener("click", () => {
    const gryffindorMembers = filter(students, "Gryffindor");
    cardsOnDom(gryffindorMembers);
  });

  showRavenclawButton.addEventListener("click", () => {
    const ravenclawMembers = filter(students, "Ravenclaw");
    cardsOnDom(ravenclawMembers);
  });

  showHufflepuffButton.addEventListener("click", () => {
    const hufflepuffMembers = filter(students, "Hufflepuff");
    cardsOnDom(hufflepuffMembers);
  });

  showSlytherinButton.addEventListener("click", () => {
    const slytherinMembers = filter(students, "Slytherin");
    cardsOnDom(slytherinMembers);
  });

  showAllButton.addEventListener("click", () => {
    cardsOnDom(students);
  });
}

startApp();
