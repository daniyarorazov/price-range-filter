$(document).ready(() => {
    const mainCardsBlockClass = "prodSlot"; // main cards block element from list
    const priceClass = "salePrice"; // class of price elements
    const priceAttrValue = "data-bs-priceFilter"; // name of attr with a value with prices from price elements
    const buttonIdHandler = "filterPriceButton"; // id button handler for filter
    filterFunc(mainCardsBlockClass, priceClass, priceAttrValue, buttonIdHandler, rangePriceInputConf);
});

// Settings of range slider GUI
function rangePriceInputConf() {
    const rangeInput = document.querySelectorAll(".range-input input");
    const priceInput = document.querySelectorAll(".price-input input");
    const progress = document.querySelector(".slider .progress");
    const inputMinRange = document.querySelector("#inputMinRange");
    const maxValue = inputMinRange.getAttribute('max');
    const minValue = inputMinRange.getAttribute('min');
    let priceGap = 1000;

    // Functionality for controlling slider
    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minValRangeInput = parseInt(rangeInput[0].value);
            let maxValRangeInput = parseInt(rangeInput[1].value);
            
            if (maxValRangeInput - minValRangeInput < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxValRangeInput - priceGap;
                } else {
                    rangeInput[1].value = minValRangeInput + priceGap;
                }
            } else {
                priceInput[0].value = minValRangeInput;
                priceInput[1].value = maxValRangeInput;
                progress.style.left = (minValRangeInput / rangeInput[0].max) * 100 + "%";
                progress.style.right = 100 - (maxValRangeInput / rangeInput[1].max) * 100 + "%";
            }
        });
    });

    // Functionality for control slider with numbers from field
    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(priceInput[0].value);
            let maxVal = parseInt(priceInput[1].value);

            if ((maxVal - minVal >= priceGap) && maxVal <= maxValue) {
                if (e.target.className === "input-min") {
                    if (minVal >= minValue) {
                        rangeInput[0].value = minVal;
                        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                    } else {
                        rangeInput[0].value = minValue;
                        progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
                    }
                    
                } else {
                    rangeInput[1].value = maxVal;
                    progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                }
            } 
        });
    });

    return priceInput;
}

// Function of filter elements from list
function filterFunc(mainCardsBlockClass, priceClass, priceAttrValue, buttonIdHandler, priceInputFunc) {
    const listBlockElems = document.querySelectorAll(`.${mainCardsBlockClass}`);
    const priceInput = priceInputFunc();
    const rangeInput = document.querySelectorAll(".range-input input");
    const prices = [];
    const maxValue = inputMinRange.getAttribute('max');
    const minValue = inputMinRange.getAttribute('min');
    const progress = document.querySelector(".slider .progress");

    // Putting to array "prices", all prices from list
    $(`.${priceClass}[${priceAttrValue}]`).val(function() {
        prices.push($(this).attr(priceAttrValue)) 
    });

    // Button handler
    $(`#${buttonIdHandler}`).on('click', () => {
        $(listBlockElems).removeClass('d-none');
        let inputMin = parseInt(priceInput[0].value);
        let inputMax = parseInt(priceInput[1].value);

        // Check, if inputMax value bigger than max value in range form
        if (inputMax > maxValue) {
            rangeInput[1].value = maxValue;
            priceInput[1].value = maxValue;
            let percent = (rangeInput[1].value / maxValue) * 100;
            progress.style.right = 100 - percent + "%";
            progress.style.right = 100 - (priceInput[1].value / maxValue) * 100 + "%";
        }

        // Check, if inputMin value lower than min value in range form
        if (inputMin < minValue) {
            rangeInput[0].value = minValue;
            priceInput[0].value = minValue;
            let percent = (rangeInput[0].value / minValue) * 100;
            progress.style.left = 100 - percent + "%";
            progress.style.left = (minVal / priceInput[0].min) * 100 + "%";
        }

        // filter list
        prices.map((el, key) => {
            if (!(+inputMin <= el && +inputMax >= el)) {
                $(listBlockElems[key]).addClass('d-none');
            }
        })
    });
}