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
let saveButton = document.getElementById("save-button");

let dstDetectionMethod = document.getElementById("detection-method-dst");
let dstDetectionMethodCheckbox = document.getElementById(
  "detection-method-dst-checkbox"
);
let randomDetectionMethod = document.getElementById("detection-method-random");
let randomDetectionMethodCheckbox = document.getElementById(
  "detection-method-random-checkbox"
);

let cacheCheckbox = document.getElementById("checkbox-cache");

let strategies = new Map();
strategies.set("majority", decisionStrategyMajority);
strategies.set("unanimous", decisionStrategyUnanimous);
strategies.set("strict", decisionStrategyStrict);

let methods = new Map();
methods.set("dst", [dstDetectionMethod, dstDetectionMethodCheckbox]);
methods.set("random", [randomDetectionMethod, randomDetectionMethodCheckbox]);

let capabilities;

try {
  capabilities = await fetchApi("/capabilities");
  detectionSettings.hidden = false;
  console.log(capabilities);

  setupStrategies();
  setupMethods();
  // getSettings();

  capabilities.detection_methods.forEach((method) => {});
} catch (error) {
  noConnection.hidden = false;
  console.error(error);
}

saveButton.addEventListener("click", async () => {
  saveSettings();
});

function setupStrategies() {
  let index = 0;

  capabilities.decision_strategies.forEach((strategy) => {
    if (index == 0) {
      strategies.get(strategy).checked = true;
    }
    strategies.get(strategy).disabled = false;
    index++;
  });
}

function setupMethods() {
  let index = 0;

  capabilities.detection_methods.forEach((method) => {
    if (index == 0) {
      methods.get(method)[1].checked = true;
    }
    methods.get(method)[0].hidden = false;
    methods.get(method)[1].disabled = false;
    index++;
  });
}

async function getSettings() {
  let settings = await fetchApi("/settings");

  console.log(settings);

  strategies(settings.decision_strategy).checked = true;

  return settings;
}

async function saveSettings() {}