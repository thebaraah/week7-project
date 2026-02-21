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

function joinCourse(args) {
  // TODO: Implement logic
  if (args.length !== 2) {
    console.log('ERROR: Must provide course ID and trainee ID');
    console.log('Example:');
    console.log('   course join 3 12');
    return;
  }

  // convert to numbers
  const courseId = Number(args[0]);
  const traineeId = Number(args[1]);

  if (isNaN(courseId) || isNaN(traineeId)) {
    console.log('ERROR: Both IDs must be numbers');
    return;
  }

  // === Step 2: Load both lists ===
  const courses = loadCourseData();
  const trainees = loadTraineeData();

  // === Step 3: Find the course ===
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === courseId) {
      course = courses[i];
      break;
    }
  }

  if (!course) {
    console.log(`ERROR: Course with ID ${courseId} does not exist`);
    return;
  }
  let trainee = null;
  for (let i = 0; i < trainees.length; i++) {
    if (trainees[i].id === traineeId) {
      trainee = trainees[i];
      break;
    }
  }

  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${traineeId} does not exist`);
    return;
  }

  // Check if already enrolled
  if (course.enrolled.includes(traineeId)) {
    console.log('ERROR: The Trainee has already joined this course');
    return;
  }

  // Step 6: Check course capacity
  if (course.enrolled.length >= 20) {
    console.log('ERROR: The course is full.');
    return;
  }

  // check limit
  let traineeCourseCount = 0;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].enrolled.includes(traineeId)) {
      traineeCourseCount++;
    }
  }

  if (traineeCourseCount >= 5) {
    console.log('ERROR: A trainee is not allowed to join more than 5 courses.');
    return;
  }

  // enroll
  course.enrolled.push(traineeId);

  saveCourseData(courses);

  console.log(`${trainee.name} Joined ${course.name}`);
}

function leaveCourse(args) {
  // TODO: Implement logic
  if (args.length !== 2) {
    console.log('ERROR: Must provide course ID and trainee ID');
    console.log('Example:');
    console.log('   course leave 3 12');
    return;
  }

  // Convert IDs to numbers
  const courseId = Number(args[0]);
  const traineeId = Number(args[1]);

  // Quick safety check
  if (isNaN(courseId) || isNaN(traineeId)) {
    console.log('ERROR: Both IDs must be numbers');
    return;
  }

  //  Load the data
  const courses = loadCourseData();
  const trainees = loadTraineeData();
  //  Find the course
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === courseId) {
      course = courses[i];
      break;
    }
  }

  if (!course) {
    console.log(`ERROR: Course with ID ${courseId} does not exist`);
    return;
  }

  // Find the trainee
  let trainee = null;
  for (let i = 0; i < trainees.length; i++) {
    if (trainees[i].id === traineeId) {
      trainee = trainees[i];
      break;
    }
  }

  if (!trainee) {
    console.log(`ERROR: Trainee with ID ${traineeId} does not exist`);
    return;
  }

  //  Check if  in the course
  const position = course.enrolled.indexOf(traineeId);

  if (position === -1) {
    console.log('ERROR: The Trainee did not join the course');
    return;
  }

  // Remove
  course.enrolled.splice(position, 1);

  saveCourseData(courses);

  console.log(`${trainee.name} Left ${course.name}`);
}

function getCourse(args) {
  // TODO: Implement logic
  if (args.length !== 1) {
    console.log('ERROR: You must provide exactly one course ID');
    console.log('Example: course get 5');
    return;
  }

  // Convert ID to number
  const courseId = Number(args[0]);

  if (isNaN(courseId)) {
    console.log('ERROR: Course ID must be a number');
    return;
  }

  const courses = loadCourseData();
  const trainees = loadTraineeData();

  // Find the course
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === courseId) {
      course = courses[i];
      break;
    }
  }

  //  If course not found
  if (!course) {
    console.log(`ERROR: Course with ID ${courseId} does not exist`);
    return;
  }

  console.log(`${course.id} ${course.name} ${course.startDate}`);

  //  header with count
  const participantCount = course.enrolled.length;
  console.log(`Participants (${participantCount}):`);

  if (participantCount === 0) {
    console.log('  (no participants yet)');
    return;
  }

  // 8. Show each
  for (let i = 0; i < course.enrolled.length; i++) {
    const traineeId = course.enrolled[i];

    // Find by ID
    let foundTrainee = null;
    for (let j = 0; j < trainees.length; j++) {
      if (trainees[j].id === traineeId) {
        foundTrainee = trainees[j];
        break;
      }
    }

    if (foundTrainee) {
      console.log(
        `- ${foundTrainee.id} ${foundTrainee.firstName} ${foundTrainee.lastName}`
      );
    } else {
      //  data is missing
      console.log(`- ${traineeId} (trainee data not found)`);
    }
  }
}

function getAllCourses() {
  // TODO: Implement logic
  const courses = loadCourseData();

  //If no courses exist at all
  if (courses.length === 0) {
    console.log('Courses:');
    console.log('  (no courses yet)');
    console.log('Total: 0');
    return;
  }

  //  Make a copy so we don't change the original array
  const sortedCourses = courses.slice();

  // Sort by startDate (earliest first)
  sortedCourses.sort((a, b) => {
    if (a.startDate < b.startDate) return -1;
    if (a.startDate > b.startDate) return 1;
    return 0;
  });

  //  Print header
  console.log('Courses:');

  //Print each course
  for (let i = 0; i < sortedCourses.length; i++) {
    const course = sortedCourses[i];

    const participantCount = course.enrolled.length;
    const isFull = participantCount >= 20 ? 'FULL' : '';

    console.log(
      `${course.id} ${course.name} ${course.startDate} ` +
        `${participantCount} ${isFull}`
    );
  }

  // Show total count
  console.log('');
  console.log(`Total: ${courses.length}`);
}

export function handleCourseCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  const cmd = subcommand ? subcommand.toLowerCase() : '';

  if (cmd === 'add') {
    addCourse(args);
  } else if (cmd === 'update') {
    updateCourse(args);
  } else if (cmd === 'delete') {
    deleteCourse(args);
  } else if (cmd === 'join' || cmd === 'enroll') {
    joinCourse(args);
  } else if (cmd === 'leave' || cmd === 'unenroll') {
    leaveCourse(args);
  } else if (cmd === 'get' || cmd === 'show') {
    getCourse(args);
  } else if (cmd === 'getall' || cmd === 'list') {
    getAllCourses();
  }

  // Errors
  else {
    console.log('Unknown course command. Available commands:');
    console.log('');
    console.log('  course add <name> <yyyy-mm-dd>');
    console.log(
      '  course get <id>                → show course + participants'
    );
    console.log(
      '  course getall                  → list all courses (sorted by date)'
    );
    console.log('  course join <courseID> <traineeID>');
    console.log('  course leave <courseID> <traineeID>');
    console.log('  course update <id> <name> <yyyy-mm-dd>');
    console.log('  course delete <id>');
    console.log('');
    console.log("Type 'course getall' to see all courses.");
  }
}
