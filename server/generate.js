var faker = require('faker');

var database = { albums: []};

for (var i = 1; i<= 300; i++) {
  database.albums.push({
    id: i,
    name: "Viceversa",
    cover: "#",
    artists: [{
      id: 1,
      name: "Francesco Gabbani"
    }],
    year: 2019,
    type: "album",
    support: "CD",
    time: 29,
    trackList: [
      {
        title: "Einstein",
        duration: 177,
         authors: [
           {
             id: 1,
             name: "Francesco Gabbani"
           }
         ]
      },
    ]
  });
}

console.log(JSON.stringify(database));
