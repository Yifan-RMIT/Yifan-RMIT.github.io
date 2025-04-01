// number variable 0 - infinity dont use quotes
let a = 100;
let b = parseInt("20");
console.log(a, b);
let c = a + b;
console.log(c);
let grade = 52;
if (grade > 70) {
  console.log("Yey you got HD");
} else {
  console.log("sorry you just passed the course");
}

// string variables
const myName = "Yifan";
console.log(myName);
const myCity = "Melbourne";
const msg = `
<h1> I live in ${myCity} </h1>
<p> I love this myCity <p/>
`;

console.log(msg);

// boolen variable TRUE FALSE
let isThsSunday = false;
let isItAfternoon = true;

// objects { name:vale, name:value}
const myStudentRecord = {
  name: "sam",
  id: 1234,
  course: "OART1013",
  isLocal: false,
};
console.log(myStudentRecord);
console.log(myStudentRecord.course);

// arrays
// let sName1 = "Yifan";
// let sName2 = "Jim";
// let sName3 = "Alice";

let sNames = ["Yifan", "Jim", "Sarah", "Alice"];

let numbers = [2, 4, 6, 8, 10];
console.log(numbers[3]);
