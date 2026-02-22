import { loadCourseData, loadTraineeData } from './storage.js';
import fs from 'fs';

export function exportHTML(args) {
  if (!args || args.length < 1) {
    console.log("ERROR: Must provide a file name");
    return;
  }

  const fileName = args[0];
  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Report</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
      th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    </style>
  </head>
  <body>
    <h1>Trainees</h1>
    <table>
      <tr><th>ID</th><th>First Name</th><th>Last Name</th></tr>
      ${trainees.map(t => `<tr><td>${t.id}</td><td>${t.firstName}</td><td>${t.lastName}</td></tr>`).join('')}
    </table>

    <h1>Courses</h1>
    <table>
      <tr><th>ID</th><th>Name</th><th>Start Date</th><th>Participants</th></tr>
      ${courses.map(c => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.startDate}</td><td>${c.participants.length}</td></tr>`).join('')}
    </table>
  </body>
  </html>
  `;

  fs.writeFileSync(fileName, html);
  console.log(`SAVED ${fileName}`);
}