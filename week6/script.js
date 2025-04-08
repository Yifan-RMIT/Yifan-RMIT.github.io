console. log (topHeading);
3
console. log (topHeading. textContent);
topHeading. textContent = "This is my new top heading";
5
topHeading-style. color = "red";
6
7
const allParas = document. querySelectorAll("-blue-color");
8
console. log(allParas);
9
// console. log (allParas.textContent);
10
for (let i = 0; i < allParas. length; i++) {
11
console. log(allParas [1].textContent);
12
allParas [1]. style. border = "1px solid blue";
13
allParas [1] .style.backgroundColor = "beige";
14
15
16
17
18
const mySubHeading = document. querySelector("#first-subheading");
console. log (mySubHeading);
console. log(mySubHeading.textContent);
19

23
const allSubHeadings = document. querySelectorAll("h2");
console. log(allSubHeadings);
for (let i = 0; i < allSubHeadings.length; i++) {
console. log (allSubHeadings [1].textContent);
24
fo main*
0040
Ln 7, Col 56
Spaces: