
import fs from 'node:fs';
import path from 'path';

const TRAINEE_DATA_FILE_PATH = path.resolve('./data/trainees.json');
const COURSE_DATA_FILE_PATH = path.resolve('./data/courses.json');

// Helper: Read JSON file safely
function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([])); 
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Helper: Write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

export function loadTraineeData() {
  return readJsonFile(TRAINEE_DATA_FILE_PATH);
}

export function saveTraineeData(data) {
  writeJsonFile(TRAINEE_DATA_FILE_PATH, data);
}

export function loadCourseData() {
  return readJsonFile(COURSE_DATA_FILE_PATH);
}

export function saveCourseData(data) {
  writeJsonFile(COURSE_DATA_FILE_PATH, data);
}