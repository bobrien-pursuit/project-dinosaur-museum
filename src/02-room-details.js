/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) { 

  let dino = dinosaurs.find((dinosaur) => dinosaur.name == dinosaurName); //finds the dinosaur by dinosaurName
  
  if (!dino) // if it's undefined it will return an error message.
  return `Dinosaur with name \'${dinosaurName}\' cannot be found.`

  let dinoRoom = rooms.find((room) => room.dinosaurs.includes(dino.dinosaurId)); // finds the room based off of dinosaurId and sets that object to dinoRoom variable
  
  if (!dinoRoom) // if room doesn't exist it returns an error 
  return `Dinosaur with name \'${dinosaurName}\' cannot be found in any rooms.`
  
  return dinoRoom.name;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
let roomArr = [];
let connectedRoomsExists = true; // if room is not in the list of roomids this will be falsae
let roomIDs = [];
let incorrectID = '';

for (let i = 0; i < rooms.length; i++) // stores all of the ids of all of the rooms
  roomIDs.push(rooms[i].roomId);

for (let i = 0; i < rooms.length; i++)
  for (let j = 0; j < rooms[i].connectsTo.length; j++){
    if (!roomIDs.includes(rooms[i].connectsTo[j])){
      incorrectID = rooms[i].connectsTo[j]; // saves the name of the incorrectID
      connectedRoomsExists = false; // updates the flag to false
  }
}

if (connectedRoomsExists == false) // checks if the connected rooms exist
  return `Room with ID of '${incorrectID}' could not be found.`;
else if(!rooms.find(room => room.roomId === id)) // checks if the room we're seraching for doesn't exist
  return `Room with ID of '${id}' could not be found.`;
else { // gets all of the connected rooms by id
for (let i = 0; i < rooms.length; i++)
  if(rooms[i].roomId == id)
   for (let j = 0; j < rooms[i].connectsTo.length; j++)
          roomArr[j] = rooms[i].connectsTo[j];
  else
    continue;
}

if (roomArr){ // updates the roomArr array to the room names 
for (let i = 0; i < rooms.length; i++)
  for (let j = 0; j < roomArr.length; j++)
    if (roomArr[j] == rooms[i].roomId)
        roomArr[j] = rooms[i].name;
}

return roomArr;

}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};

 // console.log(getConnectedRoomNamesById(exampleRoomData, 'incorrect-id'));