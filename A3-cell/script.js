/**
 * CELL BIOLOGY EXPLORER - SIMPLIFIED JAVASCRIPT
 * Student-friendly version for RMIT Interactive Media A3
 * Focus: Core click interaction functionality without complexity
 */

// ==============================================
// GLOBAL VARIABLES - Simple and Clear
// ==============================================

let canvas;
let ctx;
let organelles = {};
let selectedOrganelle = null;

// DOM elements we'll need to update
let organelleName, organelleFunction, organelleBiology;
let organelleClinical, organelleSize;
let clinicalSection, sizeSection, clearBtn;

// ==============================================
// MAIN INITIALIZATION - When Page Loads
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Starting Cell Explorer...");

  // Get the canvas and set up drawing context
  canvas = document.getElementById("cell-canvas");
  ctx = canvas.getContext("2d");

  // Get all the DOM elements we need to update
  setupDOMElements();

  // Load organelle data from the HTML
  loadOrganelleData();

  // Set up click events
  setupEvents();

  // Draw the initial cell
  drawCell();

  console.log("✅ Cell Explorer ready!");
});

// ==============================================
// GET DOM ELEMENTS - Find Elements to Update
// ==============================================

function setupDOMElements() {
  organelleName = document.getElementById("organelle-name");
  organelleFunction = document.getElementById("organelle-function");
  organelleBiology = document.getElementById("organelle-biology");
  organelleClinical = document.getElementById("organelle-clinical");
  organelleSize = document.getElementById("organelle-size");
  clinicalSection = document.getElementById("clinical-section");
  sizeSection = document.getElementById("size-section");
  clearBtn = document.getElementById("clear-btn");
}

// ==============================================
// LOAD DATA - Get Organelle Information
// ==============================================

function loadOrganelleData() {
  try {
    // Get the JSON data embedded in the HTML
    const dataScript = document.getElementById("organelle-data");
    const jsonText = dataScript.textContent;
    organelles = JSON.parse(jsonText);

    console.log("✅ Loaded organelles:", Object.keys(organelles));
  } catch (error) {
    console.error("❌ Error loading organelle data:", error);
  }
}

// ==============================================
// EVENT SETUP - Handle User Interactions
// ==============================================

function setupEvents() {
  // Main interaction: Click on canvas
  canvas.addEventListener("click", function (event) {
    const mousePos = getMousePosition(event);
    handleCanvasClick(mousePos.x, mousePos.y);
  });

  // Clear selection button
  clearBtn.addEventListener("click", function () {
    clearSelection();
  });

  // Keyboard support (Escape to clear)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      clearSelection();
    }
  });
}

// ==============================================
// MOUSE POSITION - Convert Click to Canvas Coordinates
// ==============================================

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

// ==============================================
// CLICK HANDLING - Main Interaction Logic
// ==============================================

function handleCanvasClick(x, y) {
  console.log(`🖱️ Clicked at: (${Math.round(x)}, ${Math.round(y)})`);

  // Check if we clicked on an organelle
  const clickedOrganelle = findOrganelleAt(x, y);

  if (clickedOrganelle) {
    // Found an organelle - select it
    selectOrganelle(clickedOrganelle);
  } else {
    // Clicked empty space - clear selection
    clearSelection();
  }
}

// ==============================================
// ORGANELLE DETECTION - Find What Was Clicked
// ==============================================

function findOrganelleAt(mouseX, mouseY) {
  // Check each organelle to see if the click was inside it
  for (const [id, organelle] of Object.entries(organelles)) {
    const distance = Math.sqrt(
      (mouseX - organelle.x) * (mouseX - organelle.x) +
        (mouseY - organelle.y) * (mouseY - organelle.y)
    );

    // If the click is within the organelle's radius
    if (distance <= organelle.radius) {
      return {
        id: id,
        data: organelle,
      };
    }
  }

  // No organelle found at this position
  return null;
}

// ==============================================
// SELECTION SYSTEM - Show Organelle Information
// ==============================================

function selectOrganelle(organelleData) {
  const { id, data } = organelleData;

  console.log(`🎯 Selected: ${data.name}`);

  // Remember what's selected
  selectedOrganelle = id;

  // Update the information panel
  showOrganelleInfo(data);

  // Redraw the cell with selection highlight
  drawCell();

  // Show the clear button
  clearBtn.style.display = "block";

  // On mobile, scroll to info panel
  if (window.innerWidth < 768) {
    document.querySelector(".info-section").scrollIntoView({
      behavior: "smooth",
    });
  }
}

function clearSelection() {
  console.log("🧹 Clearing selection");

  // Clear the selection
  selectedOrganelle = null;

  // Show default information
  showDefaultInfo();

  // Redraw without highlight
  drawCell();

  // Hide the clear button
  clearBtn.style.display = "none";
}

// ==============================================
// INFORMATION DISPLAY - Update Text Content
// ==============================================

function showOrganelleInfo(organelle) {
  console.log(`📖 Showing info for: ${organelle.name}`);

  // Update organelle name and color
  organelleName.textContent = organelle.name;
  organelleName.style.color = organelle.color;

  // Update function description
  organelleFunction.textContent = organelle.function;

  // Update biology details
  organelleBiology.textContent = organelle.biology;

  // Show clinical information if available
  if (organelle.clinical) {
    organelleClinical.textContent = organelle.clinical;
    clinicalSection.style.display = "block";
  } else {
    clinicalSection.style.display = "none";
  }

  // Show size information if available
  if (organelle.size) {
    organelleSize.textContent = organelle.size;
    sizeSection.style.display = "block";
  } else {
    sizeSection.style.display = "none";
  }
}

function showDefaultInfo() {
  // Reset to default state
  organelleName.textContent = "Animal Cell Explorer";
  organelleName.style.color = "#2196f3";

  organelleFunction.textContent =
    "Click on any organelle to discover its biological function and importance in cellular life.";

  organelleBiology.textContent =
    "Each organelle has specialized structures and functions that work together to maintain cellular life processes.";

  // Hide optional sections
  clinicalSection.style.display = "none";
  sizeSection.style.display = "none";
}

// ==============================================
// DRAWING FUNCTIONS - Visual Cell Representation
// ==============================================

function drawCell() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  drawBackground();

  // Draw cell membrane
  drawCellMembrane();

  // Draw all organelles
  drawOrganelles();

  // Draw selection highlight if something is selected
  if (selectedOrganelle) {
    drawSelectionHighlight(selectedOrganelle);
  }

  // Draw title
  drawTitle();
}

function drawBackground() {
  // Simple gradient background
  const gradient = ctx.createRadialGradient(400, 300, 0, 400, 300, 300);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(1, "#f8f9fa");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCellMembrane() {
  // Draw the outer cell boundary
  ctx.strokeStyle = "#4CAF50";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(400, 300, 280, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw inner boundary (dotted)
  ctx.strokeStyle = "#81C784";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.arc(400, 300, 270, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.setLineDash([]); // Reset to solid line
}

function drawOrganelles() {
  // Draw each organelle as a colored circle
  for (const [id, organelle] of Object.entries(organelles)) {
    drawSingleOrganelle(organelle);
  }
}

function drawSingleOrganelle(organelle) {
  // Draw the main organelle circle
  ctx.fillStyle = organelle.color;
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(organelle.x, organelle.y, organelle.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Add a simple highlight for 3D effect
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.beginPath();
  ctx.arc(
    organelle.x - organelle.radius * 0.3,
    organelle.y - organelle.radius * 0.3,
    organelle.radius * 0.4,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Draw label for larger organelles
  if (organelle.radius > 20) {
    ctx.fillStyle = "#333333";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      organelle.name,
      organelle.x,
      organelle.y + organelle.radius + 15
    );
  }
}

function drawSelectionHighlight(organelleId) {
  const organelle = organelles[organelleId];
  if (!organelle) return;

  // Draw gold selection ring
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(organelle.x, organelle.y, organelle.radius + 8, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw outer glow
  ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(organelle.x, organelle.y, organelle.radius + 15, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawTitle() {
  // Draw the main title
  ctx.fillStyle = "#333333";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Animal Eukaryotic Cell", 400, 30);

  // Draw instructions
  ctx.font = "14px Arial";
  ctx.fillStyle = "#4CAF50";
  ctx.fillText("Click organelles to explore their functions", 400, 580);
}

// ==============================================
// UTILITY FUNCTIONS - Helper Functions
// ==============================================

// Test function for debugging (call from browser console)
function testSelect(organelleName) {
  const found = Object.entries(organelles).find(([id, org]) =>
    org.name.toLowerCase().includes(organelleName.toLowerCase())
  );

  if (found) {
    const [id, data] = found;
    selectOrganelle({ id, data });
  } else {
    console.log(
      "Organelle not found. Available:",
      Object.values(organelles).map((o) => o.name)
    );
  }
}

// Make test function available globally for debugging
window.testSelect = testSelect;

console.log("📝 Cell Explorer script loaded successfully!");
console.log('💡 Try: testSelect("nucleus") in console to test!');
