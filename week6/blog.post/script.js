let myButton = document.querySelector("#my-button");
myButton.addEventListener("click", toggleMe);
let myImg = document.querySelector("#myImage");
let helloMsg = document.querySelector("#hello");
myImg.addEventListener("mouseover", addMe);
myImg.addEventListener("mouseout", removeMe);
function addMe() {
  myImg.classList.add("round");
}
function removeMe() {
  myImg.classList.remove("round");
}
function toggleMe() {
  let myName = myImg.dataset.catname;
  helloMsg.textContent = "Hi I am " + myName;
  myImg.classList.toggle("round");
}

let allParagraphs = document.querySelectorAll("p");
//allParagraphs.forEach(changeColor);

function changeColor(item) {
  //console.log(item);
  item.style.backgroundColor = "limegreen";
  // item.textContent = "New text content";
}
console.log(allParagraphs);

const myStatus = document.getElementById("status");
console.log(myStatus);
myStatus.addEventListener("mouseover", function () {
  myStatus.style.backgroundColor = "lightgreen";
});
myStatus.addEventListener("mouseout", function () {
  myStatus.style.backgroundColor = "lightblue";
});

//console.log(blogPosts);
const gridContainer = document.querySelector("#grid-container");
// console.log(gridContainer);

let formattedContent = "";
for (let i = 0; i < blogPosts.length; i++) {
  console.log.apply(blogPosts);
}
