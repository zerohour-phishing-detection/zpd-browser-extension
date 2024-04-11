import { fetchApi } from "./util.js";

// Elements for detection methods and decision strategy list
let noConnection = document.getElementById("no-connection");
let detectionSettings = document.getElementById("detection-settings");
let decisionStrategyMajority = document.getElementById(
  "decision-strategy-majority"
);
let decisionStrategyUnanimous = document.getElementById(
  "decision-strategy-unanimous"
);
let decisionStrategyStrict = document.getElementById(
  "decision-strategy-strict"
);

let dstDetectionMethod = document.getElementById("detection-method-dst");
let dstDetectionMethodCheckbox = document.getElementById(
  "detection-method-dst-checkbox"
);
let dstDetectionMethodDetails = document.getElementById(
  "detection-method-dst-details"
);
let dstDetectionMethodHomebrew = document.getElementById(
  "detection-method-dst-homebrew"
);
let dstDetectionMethodGCV = document.getElementById("detection-method-dst-gcv");

let randomDetectionMethod = document.getElementById("detection-method-random");
let randomDetectionMethodCheckbox = document.getElementById(
  "detection-method-random-checkbox"
);
let randomDetectionMethodDetails = document.getElementById(
  "detection-method-random-details"
);
let randomDetectionMethodSeed = document.getElementById(
  "detection-method-random-seed"
);

let cacheCheckbox = document.getElementById("checkbox-cache");

let saveButton = document.getElementById("save-button");

let strategies = new Map();
strategies.set("majority", decisionStrategyMajority);
strategies.set("unanimous", decisionStrategyUnanimous);
strategies.set("strict", decisionStrategyStrict);

let methods = new Map();
methods.set("dst", [
  dstDetectionMethod,
  dstDetectionMethodCheckbox,
  dstDetectionMethodDetails,
]);
methods.set("random", [
  randomDetectionMethod,
  randomDetectionMethodCheckbox,
  randomDetectionMethodDetails,
]);

let logoFinders = new Map();
logoFinders.set("homebrew", dstDetectionMethodHomebrew);
logoFinders.set("gcv", dstDetectionMethodGCV);

let capabilities;

try {
  capabilities = await fetchApi("/capabilities");
  await getSettings();

  detectionSettings.hidden = false;

  methods.forEach((method) => {
    method[1].addEventListener("change", () => {
      method[2].hidden = !method[1].checked;
    });
  });

  saveButton.addEventListener("click", async () => {
    saveSettings();
  });

  showStrategies();
  showMethods();
} catch (error) {
  noConnection.hidden = false;
  console.error(error);
}

// Function that loads the decision strategies based on the capabilities
function showStrategies() {
  let index = 0;

  capabilities.decision_strategies.forEach((strategy) => {
    strategies.get(strategy).disabled = false;
    index++;
  });
}

// Function that loads the detection methods based on the capabilities
function showMethods() {
  let index = 0;

  capabilities.detection_methods.forEach((method) => {
    methods.get(method)[0].hidden = false;
    methods.get(method)[1].disabled = false;
    index++;
  });
}

// Function that gets the settings from the server
async function getSettings() {
  let settings = await fetchApi("/settings");

  strategies.get(settings.decision_strategy).checked = true;

  settings.detection_methods.forEach((method) => {
    methods.get(method)[1].checked = true;
    methods.get(method)[2].hidden = false;
  });

  logoFinders.get(settings.dst.logo_finder).checked = true;

  randomDetectionMethodSeed.value = settings.random.seed;

  cacheCheckbox.checked = settings.cache;

  return settings;
}

// Function that saves the settings to the server
async function saveSettings() {
  // await fetchApi("/settings", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     decision_strategy: ,
  //     detection_method: ,
  //     cache: cacheCheckbox.checked,
  //   }),
  // });
}
