const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");

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

        if ((maxVal - minVal >= priceGap) && maxVal <= 10000) {
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


$(document).ready(() => {
    // showCards(htmlBlock, data)
    filter()
});

function showCards(htmlBlock, data) {

}

function filter() {
    const elems = document.getElementsByClassName('salePrice');
    const listBlockElems = document.querySelectorAll('.prodSlot');
    const prices = [];
    const listBlock = document.querySelector('.list-products');

    $(".salePrice[data-bs-priceFilter]").val(function() {
        prices.push($(this).attr("data-bs-priceFilter")) 
    });

    $("#filterPriceButton").on('click', () => {
        $(listBlockElems).removeClass('d-none');
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);
        const inputMin = minVal;
        const inputMax = maxVal;
        prices.map((el, key) => {
            // 1000 - 5000 .... 3450
            if (!(+inputMin < el && +inputMax > el)) {
                $(listBlockElems[key]).addClass('d-none');
            }
        })
        
    });

    
}