
import { saveTraineeData, loadTraineeData } from './storage.js';

function addTrainee(args) {
  if (!args || args.length < 2) {
    console.log("ERROR: Must provide first and last name");
    return;
  }

  const firstName = args[0];
  const lastName = args[1];
  const trainees = loadTraineeData();
  const id = Math.floor(Math.random() * 100000);
  const newTrainee = {
    id,
    firstName,
    lastName
  };

  trainees.push(newTrainee);
  saveTraineeData(trainees);
  console.log(`CREATED: ${id} ${firstName} ${lastName}`);
}

  function updateTrainee(args) {
  if (!args || args.length < 3) {
    console.log("ERROR: Must provide ID, first name and last name");
    return;
  }

  const id = Number(args[0]);
  const firstName = args[1];
  const lastName = args[2];
  const trainees = loadTraineeData();

  const trainee = trainees.find(t => t.id === id);

  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${id} does not exist`);
    return;
  }

  trainee.firstName = firstName;
  trainee.lastName = lastName;
  saveTraineeData(trainees);

  console.log(`UPDATED: ${id} ${firstName} ${lastName}`);
}

function deleteTrainee(args) {
  if (!args || args.length < 1) {
    console.log("ERROR: Must provide ID");
    return;
  }

  const id = Number(args[0]);
  const trainees = loadTraineeData();

  const index = trainees.findIndex(t => t.id === id);

  if (index === -1) {
    console.log(`ERROR: Trainee with ID ${id} does not exist`);
    return;
  }

  trainees.splice(index, 1);

  saveTraineeData(trainees);

  console.log(`DELETED: ${id}`);
}

function fetchTrainee(args) {
  if (!args || args.length < 1) {
    console.log("ERROR: Must provide ID");
    return;
  }

  const id = Number(args[0]);
  const trainees = loadTraineeData();

  const trainee = trainees.find(t => t.id === id);

  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${id} does not exist`);
    return;
  }

  console.log(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
}

function fetchAllTrainees() {
  const trainees = loadTraineeData();

  console.log("Trainees:");

  const sorted = trainees.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  sorted.forEach(t => {
    console.log(`${t.id} ${t.firstName} ${t.lastName}`);
  });

  console.log(`\nTotal: ${trainees.length}`);
}


export function handleTraineeCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  switch (subcommand) {
    case "ADD":
      addTrainee(args);
      break;

    case "UPDATE":
      updateTrainee(args);
      break;

    case "DELETE":
      deleteTrainee(args);
      break;

    case "FETCH":
      fetchTrainee(args);
      break;

    case "FETCHALL":
      fetchAllTrainees();
      break;

    default:
      console.log("ERROR: Invalid command");
  }
}