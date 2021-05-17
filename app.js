// array utilities

Array.prototype.shuffle = function() {
    let i = this.length, j, temp;
    if ( i == 0 ) return this;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

// Create Dino Constructor

function Dino(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
}

// Create Dino Objects

const dinosRawData = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": 372,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Jurassic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbivore",
        "where": "North America, Europe, Asia",
        "when": "Late Jurassic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 separate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbivore",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
];

let dinos = dinosRawData.map(dinosaur =>
    new Dino(dinosaur.species, dinosaur.weight, dinosaur.height, dinosaur.diet,
        dinosaur.where, dinosaur.when, dinosaur.fact, './' + dinosaur.species.toLowerCase() + '.png')
)


// Create Human Object

function Human(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}

// Use IIFE to get human data from form

let getHuman = (function () {
    function getName() {
        return document.getElementById('name').value;
    }

    function getHeight() {
        let feet = document.getElementById('feet').value;
        let inches = document.getElementById('inches').value;

        return feet * 12 + inches;
    }

    function getWeight() {
        return document.getElementById('weight').value;
    }

    function getDiet() {
        return document.getElementById('diet').value;
    }

    return function () {
        return new Human(getName(), getHeight(), getWeight(), getDiet());
    }
})();


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight(dino, human) {
    let comparisonResult = '';

    if (dino.height === human.height) {
        comparisonResult = `you and ${dino.species} are the same height`;
    } else if (dino.height > human.height) {
        comparisonResult = `${dino.species} is ${dino.height - human.height} feet taller than you!`;
    } else {
        comparisonResult = `${dino.species} is ${human.height - dino.height} feet shorter than you!`;
    }

    return comparisonResult;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

function compareWeight(dino, human) {
    let comparisonResult = '';

    if (dino.weight === human.weight) {
        comparisonResult = `you and ${dino.species} are the same weight`;
    } else if (dino.weight > human.weight) {
        comparisonResult = `${dino.species} has ${dino.weight - human.weight} lbs more than you!`;
    } else {
        comparisonResult = `${dino.species} has ${human.weight - dino.weight} lbs less than you!`;
    }

    return comparisonResult;
}

let comparisonMethods = [compareHeight, compareWeight, compareDiet];
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

function compareDiet(dino, human) {
    let comparisonResult = '';

    if (dino.diet === human.diet) {
        comparisonResult = `you and ${dino.species} have the same diet`;
    } else if (dino.diet !== human.weight) {
        comparisonResult = `${dino.species} is a ${dino.diet}, while you are a ${human.diet}!`;
    }

    return comparisonResult;
}

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

const tileTypes = {
    DINOSAUR: 1,
    HUMAN:2,
    PIGEON: 3
}

function AppTile(tileType, title, image, description, fact) {
    this.tileType = tileType;
    this.title = title;
    this.image = image;
    this.description = description;
    this.fact = fact;
}

AppTile.prototype.getHtml = function (appTileType) {
    let template = '';
    switch (this.tileType) {
        case tileTypes.DINOSAUR:
            template = `<div class="grid-item">
                        <h3>${this.title}</h3>
                        <img src="images/${this.image}">
                        <p>${this.fact}</p>
                        </div>`;
            break;
        case tileTypes.HUMAN:
            template = `<div class="grid-item">
                        <h3>${this.title}</h3>
                        </div>`;
            break;
        case tileTypes.PIGEON:
            template = `<div class="grid-item">
                        <h3>${this.title}</h3>
                        <p>All birds are Dinosaurs.</p>
                        </div>`;
    }
    return template;
}

function showComparisonPage() {
    function hideHumanDataForm() {
        let currentPageForm = document.getElementById('dino-compare');
        currentPageForm.style.display = 'none';
    }

    function generateComparisonTiles(dinos, human) {
        let tiles = [];

        let humanTile = new AppTile(tileTypes.HUMAN, human.name, '', '', '');

        dinos.forEach(dino => {
            if(dino.species === 'Pigeon') {
                tiles.push(new AppTile(tileTypes.PIGEON, dino.species, dino.image, dino.description, ''));
            } else {
                let comparisonMethod = comparisonMethods.shuffle();
                let fact = comparisonMethod[0](dino, human);
                tiles.push(new AppTile(tileTypes.DINOSAUR, dino.species, dino.image, dino.description, fact));
            }
        });

        tiles.shuffle();
        tiles.splice(4, 0, humanTile);

        return tiles;
    }

    function addTilesToPage(tiles) {
        let tilesHtml = '';

        tiles.forEach(tile => {
            tilesHtml += tile.getHtml();
        });

        let grid = document.getElementById('grid');
        grid.innerHTML = tilesHtml;
    }

    hideHumanDataForm();

    let human = getHuman();
    let tiles = generateComparisonTiles(dinos, human);
    addTilesToPage(tiles);
}

let compareMeButton = document.getElementById('btn');
compareMeButton.addEventListener("click", showComparisonPage, false)
