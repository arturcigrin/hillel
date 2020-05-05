const students = [{
    name: "John Smith",
    marks: [10, 8, 6, 9, 8, 7],
  },
  {
    name: "John Doe",
    marks: [9, 8, 7, 6, 7],
  },
  {
    name: "Thomas Anderson",
    marks: [6, 7, 10, 8],
  },
  {
    name: "Jean-Baptiste Emanuel Zorg",
    marks: [10, 9, 8, 9],
  },
];

studentAvarageMarks(students);

groupAvarageMark(students);

function studentAvarageMarks(studentsList) {
  studentsList.forEach(student => {
    let sumMarksStudent = student.marks.reduce((acc, mark) => acc += mark);
    let avarageMarkStudent = sumMarksStudent / student.marks.length;

    console.log(`${student.name} средняя оценка ${avarageMarkStudent}`);
  });
}

function groupAvarageMark(studentsList) {
  let sumMarksGroup = 0;

  studentsList.forEach(student => {
    student.marks.reduce((acc, mark) => sumMarksGroup = acc + mark, sumMarksGroup);
  });

  const avarageMarkGroup = sumMarksGroup / studentsList.length;

  console.log(`Cредняя оценка группы: ${avarageMarkGroup}`);
}