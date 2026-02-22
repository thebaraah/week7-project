
import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';

function addCourse(args) {
  if (!args || args.length < 2) {
    console.log("ERROR: Must provide course name and start date");
    return;
  }

  const name = args[0];
  const startDate = args[1];

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate)) {
    console.log("ERROR: Invalid start date. Must be in yyyy-MM-dd format");
    return;
  }

  const courses = loadCourseData();

  const newCourse = {
    id: Math.floor(Math.random() * 100000),
    name,
    startDate,
    participants: []
  };

  courses.push(newCourse);
  saveCourseData(courses);

  console.log(`CREATED: ${newCourse.id} ${name} ${startDate}`);
}

function updateCourse(args) {
  if (!args || args.length < 3) {
    console.log("ERROR: Must provide ID, name and start date.");
    return;
  }

  const id = Number(args[0]);
  const name = args[1];
  const startDate = args[2];

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate)) {
    console.log("ERROR: Invalid start date. Must be in yyyy-MM-dd format");
    return;
  }

  const courses = loadCourseData();
  const course = courses.find(c => c.id === id);

  if (!course) {
    console.log(`ERROR: Course with ID ${id} does not exist`);
    return;
  }

  course.name = name;
  course.startDate = startDate;

  saveCourseData(courses);

  console.log(`UPDATED: ${id} ${name} ${startDate}`);
}

function deleteCourse(args) {
  if (!args || args.length < 1) {
    console.log("ERROR: Must provide ID");
    return;
  }

  const id = Number(args[0]);
  const courses = loadCourseData();

  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    console.log(`ERROR: Course with ID ${id} does not exist`);
    return;
  }

  const deletedCourse = courses[index];

  courses.splice(index, 1);

  saveCourseData(courses);

  console.log(`DELETED: ${deletedCourse.id} ${deletedCourse.name}`);
}

function joinCourse(args) {
  if (!args || args.length < 2) {
    console.log("ERROR: Must provide course ID and trainee ID");
    return;
  }

  const courseID = Number(args[0]);
  const traineeID = Number(args[1]);

  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find(c => c.id === courseID);
  if (!course) {
    console.log(`ERROR: Course with ID ${courseID} does not exist`);
    return;
  }

  const trainee = trainees.find(t => t.id === traineeID);
  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${traineeID} does not exist`);
    return;
  }

  //already joined
  if (course.participants.includes(traineeID)) {
    console.log("ERROR: The Trainee has already joined this course");
    return;
  }

  // Course full
  if (course.participants.length >= 20) {
    console.log("ERROR: The course is full.");
    return;
  }

  // Count how many courses trainee already joined
  const joinedCourses = courses.filter(c =>
    c.participants.includes(traineeID)
  );

  if (joinedCourses.length >= 5) {
    console.log("ERROR: A trainee is not allowed to join more than 5 courses.");
    return;
  }

  //Add trainee
  course.participants.push(traineeID);
  saveCourseData(courses);

  console.log(`${trainee.firstName} ${trainee.lastName} Joined ${course.name}`);
}

function leaveCourse(args) {
  if (!args || args.length < 2) {
    console.log("ERROR: Must provide course ID and trainee ID");
    return;
  }

  const courseID = Number(args[0]);
  const traineeID = Number(args[1]);

  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find(c => c.id === courseID);
  if (!course) {
    console.log(`ERROR: Course with ID ${courseID} does not exist`);
    return;
  }

  const trainee = trainees.find(t => t.id === traineeID);
  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${traineeID} does not exist`);
    return;
  }

  if (!course.participants.includes(traineeID)) {
    console.log("ERROR: The Trainee did not join the course");
    return;
  }

  course.participants = course.participants.filter(
    id => id !== traineeID
  );

  saveCourseData(courses);

  console.log(`${trainee.firstName} ${trainee.lastName} Left ${course.name}`);
}

function getCourse(args) {
  if (!args || args.length < 1) {
    console.log("ERROR: Must provide ID");
    return;
  }

  const courseID = Number(args[0]);

  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find(c => c.id === courseID);

  if (!course) {
    console.log(`ERROR: Course with ID ${courseID} does not exist`);
    return;
  }

  console.log(`${course.id} ${course.name} ${course.startDate}`);
  console.log(`Participants (${course.participants.length}):`);

  course.participants.forEach(id => {
    const trainee = trainees.find(t => t.id === id);
    if (trainee) {
      console.log(`- ${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
    }
  });
}

function getAllCourses() {
  const courses = loadCourseData();

  console.log("Courses:");

  const sorted = courses.sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  sorted.forEach(course => {
    const count = course.participants.length;
    const fullLabel = count === 20 ? "FULL" : "";
    console.log(`${course.id} ${course.name} ${course.startDate} ${count} ${fullLabel}`);
  });

  console.log(`\nTotal: ${courses.length}`);
}

export function handleCourseCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  switch (subcommand) {
    case "ADD":
      addCourse(args);
      break;
      case "UPDATE":
  updateCourse(args);
  break;
  case "DELETE":
  deleteCourse(args);
  break;
      case "JOIN":
  joinCourse(args);
  break;
  case "LEAVE":
  leaveCourse(args);
  break;
  case "GET":
  getCourse(args);
  break;
      case "GETALL":
  getAllCourses();
  break;

    default:
      console.log("ERROR: Invalid command");
  }
}

