const db = require('mongoose');
db.connect('mongodb://shadkill:LmM6fm4H0kGa5sY5@ac-k2etkhy-shard-00-00.o0yn5uy.mongodb.net:27017,ac-k2etkhy-shard-00-01.o0yn5uy.mongodb.net:27017,ac-k2etkhy-shard-00-02.o0yn5uy.mongodb.net:27017/praktika_project?ssl=true&replicaSet=atlas-bv3bwv-shard-0&authSource=admin&appName=Cluster0');
module.exports =db;
