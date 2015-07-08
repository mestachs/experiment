
$( document ).ready(function() {
    $('.datepicker').pickadate({
        selectYears: true,
        selectMonths: true,
        format: 'dd/mm/yyyy',
        formatSubmit: 'dd/mm/yyyy'
    });


    function evaluate(){
        var item = $(this);
        var relatedItem = $("#" + item.attr("data-related-item")).parent();

        if(item.is(":checked")){
            relatedItem.css('visibility', 'visible');
        }else{
            relatedItem.css('visibility', 'hidden');
        }
    }

    $('input[type="checkbox"]').click(evaluate).each(evaluate);
    $('input[type="radio"]').click(evaluate).each(evaluate);

    $('select').not('.disabled').material_select();

});
