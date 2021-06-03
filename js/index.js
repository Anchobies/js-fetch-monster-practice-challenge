
let page = 1;

function init() {
    const form = document.createElement("form");
    const nameInput = document.createElement("input");
    const ageInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const create = document.createElement("button");
    
    form.id = "create-form";
    nameInput.id = "name";
    ageInput.id = "age";
    descriptionInput.id = "description";
    nameInput.placeholder = "name..."
    ageInput.placeholder = "age..."
    descriptionInput.placeholder = "description...";
    create.textContent = "Create";
    create.id = "create-button";
    
    form.append(nameInput, ageInput, descriptionInput, create);
    document.getElementById("create-monster").appendChild(form);
}

function getMonsters() {
    document.getElementById("monster-container").innerHTML = "";

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(renderMonster));
}

function renderMonster(monster) {
    const div = document.createElement("div");
    const name = document.createElement("h2");
    const age = document.createElement("h4");
    const description = document.createElement("p");

    name.textContent = monster.name;
    age.textContent = monster.age;
    description.textContent = monster.description;

    div.append(name, age, description);
    document.getElementById("monster-container").appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    getMonsters();

    
    document.getElementById("create-form").addEventListener("submit", e => {
        e.preventDefault();

        newMonster = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newMonster)
        })
            .then(res => res.json())
            .then(monster => renderMonster(monster));

        return false;
    })

    document.getElementById("back").addEventListener("click", () => {
        if (page ===1) {
            console.alert("There ain't no more monsters.")
        } else {
            page--;
            getMonsters();
        }
    })

    document.getElementById("forward").addEventListener("click", () => {
        console.log(page);
        page++;
        getMonsters();
    })
})

