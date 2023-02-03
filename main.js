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
        const inputMin = $("#filterPriceInputMin").val();
        const inputMax = $("#filterPriceInputMax").val();
        prices.map((el, key) => {
            // 1000 - 5000 .... 3450
            if (!(+inputMin < el && +inputMax > el)) {
                $(listBlockElems[key]).addClass('d-none');
            }
        })
        
    });

    
}