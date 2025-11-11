// Object mapping of slider values to corresponding monthly amounts
const sliderMappingMonthly = {
  100: 750,
  200: 1250,
  400: 1650,
  800: 2000,
  810: "Get a quote",
};
// Object mapping of slider values to corresponding annual amounts
const sliderMappingAnnually = {
  100: 675,
  200: 1125,
  400: 1485,
  800: 1800,
  810: "Get a quote",
};
// Object mapping of cost value to corresponding savings
const savingTable = {
  675: 11825,
  750: 11750,
  1125: 11375,
  1250: 11250,
  1485: 11015,
  1650: 10850,
  1800: 10700,
  2000: 10500,
};

let initialDisplays = [];
window.addEventListener("load", (event)=>{
  const elems = document.querySelectorAll("[data-slider='hide']");
  elems.forEach((elem)=>initialDisplays.push(getComputedStyle(elem).display));
}
);

// HTML for inactive and active icons
const iconInactive = `<svg id="inactive" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="1" width="31" height="31" rx="15.5" stroke="black"></rect></svg>`;
const iconActive = `<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="32" height="32" rx="16" fill="#FB8F37"></rect><path d="M11 16.25L14.5 19.75L21 13.25" stroke="white" stroke-width="1.5"></path></svg>`;

// Function to create and update NoUiSlider, handles and sets slider values in appropriate areas
const createSlider = (sliderElement,start,map1,map2)=>{
  noUiSlider.create(sliderElement, {
      start: [start],
      padding: [100, 0],
      snap: true,
      connect: [true, false],
      range: {
          min: 100,
          "20%": 100,
          "40%": 200,
          "60%": 400,
          "80%": 800,
          "100%": 810,
          max: 810,
      },
  });

  sliderElement.noUiSlider.on("update", function(values, handle) {
      let tabs = $("[data-box='slider-tab']");
      let activeTabIndex = tabs.index(tabs.filter(".is-active"));
      let sliderValue = Math.round(values[handle]);

      calculateAndDisplaySavings(activeTabIndex, sliderValue);

      const elems = document.querySelectorAll("[data-slider='hide']");
      if (sliderValue === 810) {
          elems.forEach((elem)=>(elem.style.display = "none"));
      } else {
          elems.forEach((elem,index)=>(elem.style.display = initialDisplays[index]));
      }

      let value = Math.round(values[handle]);
      $(`#${sliderElement.id}-val`).text(value);

      if (map1.hasOwnProperty(value.toString()) && map2.hasOwnProperty(value.toString())) {
          let calculatedValue1 = map1[value.toString()];
          let calculatedValue2 = map2[value.toString()];
          $(`#calculated-${sliderElement.id}-monthly`).text(calculatedValue1);
          $(`#calculated-${sliderElement.id}-annually`).text(calculatedValue2);

          let costValueMonthly = calculatedValue1 / (value * 1000);
          let costValueAnnually = calculatedValue2 / (value * 1000);

          $(`#cost-${sliderElement.id}-monthly`).text(isNaN(costValueMonthly) ? "-" : costValueMonthly.toFixed(4));
          $(`#cost-${sliderElement.id}-annually`).text(isNaN(costValueAnnually) ? "-" : costValueAnnually.toFixed(4));

          let tabs = $("[data-box='slider-tab']");
          let activeTabIndex = tabs.index(tabs.filter(".is-active"));
          let sliderValue = Number($(`#${sliderElement.id}-val`).text()) * 1000;

          let calculatedValue1Numeric = isNaN(calculatedValue1) ? null : Number(calculatedValue1);
          let calculatedValue2Numeric = isNaN(calculatedValue2) ? null : Number(calculatedValue2);

          let savingsValue;
          if (savingTable.hasOwnProperty(calculatedValue1Numeric)) {
              savingsValue = savingTable[calculatedValue1Numeric];
          } else if (savingTable.hasOwnProperty(calculatedValue2Numeric)) {
              savingsValue = savingTable[calculatedValue2Numeric];
          }

          if (activeTabIndex === 0) {
              // Monthly tab
              let monthValue = $("#calculated-slider-monthly").text();
              $("[data-item='picked']").each(function() {
                  $(this).text(monthValue);
              });
              let sessionCostMonthly = Number(monthValue) / sliderValue;
              const formattedMonthlySessionCost = isNaN(sessionCostMonthly) ? "-" : sessionCostMonthly.toFixed(4);
              $(".cost-session").each(function() {
                  $(this).text(formattedMonthlySessionCost);
              });
              $("#cost-session").text(formattedMonthlySessionCost);

          } else if (activeTabIndex === 1) {
              // Annually tab
              let yearValue = $("#calculated-slider-annually").text();
              $("[data-item='picked']").each(function() {
                  $(this).text(yearValue);

              });
              let sessionCostAnnually = Number(yearValue) / sliderValue;
              const formattedAnnualSessionCost = isNaN(sessionCostAnnually) ? "-" : sessionCostAnnually.toFixed(4);
              $(".cost-session").each(function() {
                  $(this).text(formattedAnnualSessionCost);
              });
              $("#cost-session").text(formattedAnnualSessionCost);

          }
      }
      let displayValue = value === 810 ? "upto 50Mio" : value;
      $(`#${sliderElement.id}-val`).text(displayValue);
  });
}
;

// Initialization of NoUiSlider
const slider = document.getElementById("slider");
createSlider(slider, 60, sliderMappingMonthly, sliderMappingAnnually);

// Event handler for window resize which wraps NoUiSlider handle in anchor tag for larger screens and removes for smaller screens
let handleElements = $('[data-handle="0"]');
let anchorElements = $("[data-anchor]");
$(window).resize(function() {
  handleElements.each(function(index) {
      if (window.innerWidth > 767) {
          if (anchorElements[index]) {
              $(this).append(anchorElements[index]);
          }
      } else {
          var dataAnchor = $(this).children("[data-anchor]");
          if (dataAnchor.length) {
              $("#slider").append(dataAnchor);
          }
      }
  });
}).trigger("resize");

// Event handler for tab clicks to change active state and update associated slider values and savings
$("[data-box='slider-tab']").on("click", function() {
  $("[data-box='slider-tab']").removeClass("is-active").each(function() {
      const indicator = $(this).find("[data-role='indicator']")[0];
      indicator.innerHTML = iconInactive;
  });

  $(this).addClass("is-active");
  const indicator = $(this).find("[data-role='indicator']")[0];
  indicator.innerHTML = iconActive;
  updateSliderValues();
  const activeTabIndex = $("[data-box='slider-tab']").index($(this).addClass("is-active"));
  const sliderValue = Math.round(slider.noUiSlider.get());
  calculateAndDisplaySavings(activeTabIndex, sliderValue);
});

// Function to set slider value
function updateSliderValues() {
  slider.noUiSlider.set(slider.noUiSlider.get());
}

// Listens for changes in NoUiSlider, updates slider value
slider.noUiSlider.on("change", function() {
  updateSliderValues();
});

// change savings to "." instead of ","
function formatNumberWithDots(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Function to calculate and display savings
function calculateAndDisplaySavings(activeTabIndex, sliderValue) {
  let map = activeTabIndex === 0 ? sliderMappingMonthly : sliderMappingAnnually;
  let calculatedValue = map.hasOwnProperty(sliderValue.toString()) ? map[sliderValue.toString()] : null;
  if (!isNaN(calculatedValue)) {
      let savingsValue = savingTable[calculatedValue];
      $("[data-slider='value']").text("Start 14-Day Trial");

      $("[data-link='slider']").attr("href", "/get-a-demo");
      // set default link if not set already
      $("[data-link='slider']").removeAttr("data-modifier");
      // remove the data-modifier attribute

      let formattedSavingsValue = savingsValue ? formatNumberWithDots(savingsValue) : "-";
      $("#savings").text(formattedSavingsValue);
  } else if (calculatedValue === "Get a quote") {
      let savingsValue = Object.values(savingTable).pop();

      $("[data-slider='value']").text("Get a quote");
      // get the last value from the object

      $("[data-link='slider']").attr("href", "/get-a-demo");
      // set href to "/get-a-demo"
      $("[data-link='slider']").attr("data-modifier", "true");
      // set data-modifier to true

      let formattedSavingsValue = savingsValue ? formatNumberWithDots(savingsValue) : "-";
      $("#savings").text(formattedSavingsValue);
      toggleContentVisibilityBasedOnClick();
  }
}

// linked to netlify at 19/10
