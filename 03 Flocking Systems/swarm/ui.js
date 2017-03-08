ui = {
    create: function() {
        var d = createDiv('Separate: ');
        sepSlider = createSlider(-1, 5, 1.5, 0.1);
        sepSlider.parent(d);
        var span = createSpan();
        span.parent(d);
        span.id('sep');

        var d = createDiv('Align: ');
        algnSlider = createSlider(-1, 5, 1, 0.1);
        algnSlider.parent(d);
        var span = createSpan();
        span.parent(d);
        span.id('algn');

        var d = createDiv('Cohestion: ');
        cohSlider = createSlider(-1, 5, 1, 0.1);
        cohSlider.parent(d);
        var span = createSpan();
        span.parent(d);
        span.id('coh');

        var d = createDiv('Grid: ');
        gridToggler = createCheckbox();
        gridToggler.parent(d);
        gridToggler.style('display: inline-block');
        gridToggler.checked(true);
    },

    update: function() {
        select('#sep').html(sepSlider.value());
        select('#algn').html(algnSlider.value());
        select('#coh').html(cohSlider.value());
    }
}
