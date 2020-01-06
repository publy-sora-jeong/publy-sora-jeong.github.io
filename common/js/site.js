$(function () {

        // with jQuery
        var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                getSortData: {
                        name: '.name',
                        category: '[data-category]'
                },
                // layout mode options
                masonry: {
                        columnWidth: 0
                },
        });

        $('.filter-button-group').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                        filter: filterValue
                });
        });
});