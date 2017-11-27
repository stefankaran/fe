//----- Tabs
// Default option ==> tabs(); First tab will be active
// Custom option ==> tabs('#example'); Tab with #example href will be active
function tabs(customActiveTab, onClick, index) {
// WB.tabs = function(customActiveTab, onClick, index) {
    if (typeof customActiveTab === "undefined") {
        customActiveTab = location.hash;
    }

    if (typeof index !== "undefined") {
        var index = index;
    } else {
        var index = 0;
    }

    $('.c-tab__links').each(function() {

        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var $active, $content, $links = $(this).find('a'),
            $oldId;

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="' + customActiveTab + '"]')[index] || $links[index]);
        $active.addClass('active');

        $content = $($active[0].hash);
        $content.addClass('active');
        $oldId = $active.attr("id");

        // Hide the remaining content
        $links.not($active).each(function() {
            $(this.hash).removeClass('active');
        });

        // Bind the click event handler
        $(this).on('click touch', 'a', function(e) {
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.removeClass('active');

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            // Make the tab active.
            $active.addClass('active');
            $content.addClass('active');

            if (typeof onClick !== "undefined" && $oldId !== $active.attr("id")) {
                $oldId = $active.attr("id");

                onClick($active.attr("id"));
            }

            // Prevent the anchor's default click action
            e.preventDefault();
        });
    });
};

tabs();
