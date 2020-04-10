function loadElements() {
  var categories = [
    ["Alimentação", "food"],
    ["Compras e Serviços", "shopping_and_services"],
    ["Transporte", "transport"]
  ];

  const { MDCSlider } = mdc.slider;
  const { MDCSelect } = mdc.select;
  const { MDCRipple } = mdc.ripple;
  const { MDCChipSet } = mdc.chips;

  try {
    const rentPriceSlider = new MDCSlider(
      document.querySelector("#rent-price-slider")
    );
    rentPriceSlider.listen(
      "MDCSlider:change",
      () =>
        (document.querySelector("#rent-price-label").textContent =
          "Até R$ " + rentPriceSlider.value)
    );

    const soldPriceSlider = new MDCSlider(
      document.querySelector("#sold-price-slider")
    );
    soldPriceSlider.listen(
      "MDCSlider:change",
      () =>
        (document.querySelector("#sold-price-label").textContent =
          "Até R$ " + soldPriceSlider.value)
    );

    updatePriceRange();
  } catch (error) {
    console.log(error);
  }

  try {
    const transportSlider = new MDCSlider(
      document.querySelector("#transport-slider")
    );
    transportSlider.listen("MDCSlider:change", () =>
      transportSlider.value < 1000
        ? (document.querySelector("#transport-label").textContent =
            "Até " + transportSlider.value + " m")
        : (document.querySelector("#transport-label").textContent =
            "Até " +
            Math.round((transportSlider.value / 1000) * 10) / 10 +
            " km")
    );
  } catch (error) {}

  try {
    const foodSlider = new MDCSlider(document.querySelector("#food-slider"));
    foodSlider.listen("MDCSlider:change", () =>
      foodSlider.value < 1000
        ? (document.querySelector("#food-label").textContent =
            "Até " + foodSlider.value + " m")
        : (document.querySelector("#food-label").textContent =
            "Até " + Math.round((foodSlider.value / 1000) * 10) / 10 + " km")
    );
  } catch (error) {}

  try {
    const shoppingAndServicesSlider = new MDCSlider(
      document.querySelector("#shopping-and-services-slider")
    );
    shoppingAndServicesSlider.listen("MDCSlider:change", () =>
      shoppingAndServicesSlider.value < 1000
        ? (document.querySelector("#shopping-and-services-label").textContent =
            "\nAté " + shoppingAndServicesSlider.value + " m")
        : (document.querySelector("#shopping-and-services-label").textContent =
            "\nAté " +
            Math.round((shoppingAndServicesSlider.value / 1000) * 10) / 10 +
            " km")
    );
  } catch (error) {}

  try {
    const citySelect = new MDCSelect(document.querySelector("#city-select"));
  } catch (error) {}

  try {
    const locationSelect = new MDCSelect(
      document.querySelector("#location-select")
    );
  } catch (error) {}

  try {
    const buttonRipple = new MDCRipple(document.querySelector(".mdc-button"));
  } catch (error) {}

  const chipSet = new MDCChipSet(document.querySelector(".mdc-chip-set"));
}

function changePriceRangeOnClick() {
  $("#location-select li").on("click", function() {
    setTimeout(() => {
        updatePriceRange();
    }, 500);
  });
}

function updatePriceRange() {
  var locationType = $("#location-select li.mdc-list-item--selected")
    .attr("data-value")
    .toLowerCase();
  $("#" + locationType + "-price-range").show();

  var notSelectedLocationType = $(
    "#location-select li:not(.mdc-list-item--selected)"
  )
    .attr("data-value")
    .toLowerCase();
  var notSelectedPriceRange = $(
    "#" + notSelectedLocationType + "-price-range"
  ).hide();
}

function realStateSearch() {
  var city = $("#city-select li.mdc-list-item--selected")
    .attr("data-value")
    .trim();
  var locationType = $("#location-select li.mdc-list-item--selected")
    .attr("data-value")
    .trim();
  var maxPrice = $("#" + locationType.toLowerCase() + "-price-slider")
    .attr("aria-valuenow")
    .trim();
  var maxTransport = $("#transport-slider")
    .attr("aria-valuenow")
    .trim();
  var maxFood = $("#food-slider")
    .attr("aria-valuenow")
    .trim();
  var maxShoppingAndServices = $("#shopping-and-services-slider")
    .attr("aria-valuenow")
    .trim();

  var bedroomFilters = $(
    '#filter-chips .mdc-chip--selected.mdc-ripple-upgraded span[role="checkbox"][data-type="bedroom"]'
  );
  var bedroomString = "";
  for (let index = 0; index < bedroomFilters.length; index++) {
    const element = bedroomFilters[index];
    bedroomString +=
      $(element)
        .attr("value")
        .trim() + ",";
  }
  bedroomString = bedroomString.substring(0, bedroomString.length - 1);

  var parameters =
    "?city=" +
    city +
    "&locationType=" +
    locationType +
    "&price_max=" +
    maxPrice +
    "&transport_max=" +
    maxTransport +
    "&food_max=" +
    maxFood +
    "&shopping_and_services_max=" +
    maxShoppingAndServices +
    "&bedroom=" +
    bedroomString;
  console.log(parameters);
  // window.location = "http://localhost:8080/search.html" + parameters;
}
