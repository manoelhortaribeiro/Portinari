var $ = require("../external/jquery.min.js");

function toggle_button(b_id, b_class, b_desc) {
    /* Makes the button toggle the section with id! */
    $(b_id).click(function () {
        $(b_class).slideToggle(200);
        if ($(b_id).text() == b_desc + ' ▽') $(b_id).html(b_desc + ' &#9651');
        else $(b_id).html(b_desc + ' &#9661');
    });
}

function toggle_if_visible(b_id, div_id) {
    /* Toggles button if the section is visible! */
    var display = $(div_id).css("display");
    if (display == "block"){
        $(b_id).click();
    }
}


module.exports = {
    toggleButton: toggle_button,
    toggleIfVisible: toggle_if_visible
};
