
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

function updateCourse(args) {
  // TODO: Implement logic
  if (args.length !== 3) {
    console.log('ERROR: Must provide ID, new name, and new start date');
    console.log('Example:');
    console.log('   course update 5 "Advanced JavaScript" 2026-03-15');
    return;
  }

  // Get the values
  const id = Number(args[0]); // convert to number
  const newName = args[1];
  const newStartDate = args[2];

  // Check date format (yyyy-MM-dd)
  if (
    newStartDate.length !== 10 ||
    newStartDate[4] !== '-' ||
    newStartDate[7] !== '-'
  ) {
    console.log('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
    return;
  }

  // Load courses
  const courses = loadCourseData();

  // Find the course
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === id) {
      course = courses[i];
      break;
    }
  }

  if (!course) {
    console.log(`Course with ID ${id} not found`);
    return;
  }

  // Updates
  course.name = newName;
  course.startDate = newStartDate;

  // Save
  saveCourseData(courses);

  console.log(`UPDATED: ${id} ${newName} ${newStartDate}`);
}

function deleteCourse(args) {
  // TODO: Implement logic
  if (args.length !== 1) {
    console.log('ERROR: You must provide exactly one ID');
    console.log('Example:');
    console.log('   course delete 7');
    return;
  }

  // turn it to a number
  const id = Number(args[0]);

  // wrong input
  if (isNaN(id)) {
    console.log('ERROR: ID must be a number');
    return;
  }

  // load courses
  const courses = loadCourseData();

  //look for course
  let foundIndex = -1;
  let courseName = '';

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === id) {
      foundIndex = i; // remember where it is
      courseName = courses[i].name; // remember the name
      break;
    }
  }

  if (foundIndex === -1) {
    console.log(`ERROR: Course with ID ${id} does not exist`);
    return;
  }

  //delete
  courses.splice(foundIndex, 1);

  // save
  saveCourseData(courses);

  console.log(`DELETED: ${id} ${courseName}`);
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
