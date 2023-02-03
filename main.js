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
    let priceGap = 1000;

    

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });

    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(priceInput[0].value);
            let maxVal = parseInt(priceInput[1].value);

            if ((maxVal - minVal >= priceGap) && maxVal <= maxValue) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minVal;
                    progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
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
    const progress = document.querySelector(".slider .progress");

    $(`.${priceClass}[${priceAttrValue}]`).val(function() {
        prices.push($(this).attr(priceAttrValue)) 
    });

    $(`#${buttonIdHandler}`).on('click', () => {
        $(listBlockElems).removeClass('d-none');
        let inputMin = parseInt(priceInput[0].value);
        let inputMax = parseInt(priceInput[1].value);

        if (inputMax > maxValue) {
            rangeInput[1].value = maxValue;
            priceInput[1].value = maxValue;
            let percent = (rangeInput[1].value / maxValue) * 100;
            progress.style.right = 100 - percent + "%";
            progress.style.right = 100 - (priceInput[1].value / maxValue) * 100 + "%";
        }


        prices.map((el, key) => {
            if (!(+inputMin <= el && +inputMax >= el)) {
                $(listBlockElems[key]).addClass('d-none');
            }
        })
    });
}