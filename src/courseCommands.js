import { saveCourseData, loadCourseData } from './storage.js';

function addCourse(args) {
  // TODO: Implement logic
  if (args.length !== 2) {
    console.log('ERROR: Must provide course name and start date');
    return;
  }
  //check format
  const name = args[0];
  const startDate = args[1];

  if (!isGoodDate) {
    console.log('ERROR: Invalid start date. Must be in the yyyy-mm-dd format');
    return;
  }

  const courses = loadCourseData();
  //create unique id and try 20 times
  let id;
  let isUnique = false;

  for (let tryCount = 0; tryCount < 20; tryCount++) {
    id = Math.floor(Math.random() * 1000);
    //look if id is used
    isUnique = true;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === id) {
        isUnique = false;
        break;
      }
    }
    //stop looking if id is unique
    if (isUnique) {
      break;
    }
  }
  if (!isUnique) {
    id = 0;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id > id) {
        id = courses[i].id;
      }
    }
    id = id + 1;
    if (id > 9999) id = 9999;
  }
  //adding a new course
  const newCourse = {
    id: id,
    name: name,
    startDate: startDate,
  };
  courses.push(newCourse);
  saveCourseData(courses);

  console.log('CREATED: ${id} ${name} ${startDate}');
}

function updateCourse() {
  // TODO: Implement logic
}

function deleteCourse() {
  // TODO: Implement logic
}

function joinCourse() {
  // TODO: Implement logic
}

function leaveCourse() {
  // TODO: Implement logic
}

function getCourse() {
  // TODO: Implement logic
}

function getAllCourses() {
  // TODO: Implement logic
}

export function handleCourseCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
}
