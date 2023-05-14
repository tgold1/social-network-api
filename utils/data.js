const seedName = [
    {
       "username": "pennyhofstadter",
       "email": "penny@pennymail.com"
    },
    {
       "username": "leonardhofstadter",
       "email": "leonard@pennymail.com" 
    },
    {
        "username": "sheldoncooper",
        "email": "sheldon@pennymail.com" 
    },
    {
        "username": "howardwolowitz",
        "email": "howard@pennymail.com" 
    },
    {
        "username": "amyfarrahfowler",
        "email": "amyfarfow@pennymail.com" 
    },
    {
        "username": "rajkoothrappali",
        "email": "rajk@pennymail.com" 
    },
    {
        "username": "bernadetterostenkowski",
        "email": "bernadette@pennymail.com" 
    },
    {
        "username": "stuartbloom",
        "email": "stuart@pennymail.com" 
    },

];

const seedThoughts = [
    {
        "thoughtText": "Our robot will be Kripkes any day",
        "username": "rajkoothrappali"
    },
    {
        "thoughtText": "Do you think Penny really likes me",
        "username": "leonardhofstadter"
    },
    {
        "thoughtText": "Leonard is just a little to needy sometimes",
        "username": "pennyhofstadter"
    },
    {
        "thoughtText": "It is Tuesday and we have Pizza on Tuesday",
        "username": "sheldoncooper"
    },
    {
        "thoughtText": "Did I ever tell you that I went into space",
        "username": "howardwolowitz"
    },
    {
        "thoughtText": "Penny is my friend she likes the picture of me",
        "username": "amyfarrahfowler"
    },
    {
        "thoughtText": "I have a phd and my husband does not",
        "username": "bernadetterostenkowski"
    },
    {
        "thoughtText": "Why is my comic bookstore never busy",
        "username": "stuartbloom"
    },
    
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () => 
`${getRandomArrItem(seedName)}`;

const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtName: getRandomArrItem(seedThoughts),
        });
    }
    return results;
};

module.exports = { getRandomName, getRandomThoughts};