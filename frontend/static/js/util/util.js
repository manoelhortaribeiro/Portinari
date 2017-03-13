var $ = require("../external/jquery.min.js");


function toggle_if_visible(b_id, div_id) {
    /* Toggles button if the section is visible! */
    var display = $(div_id).css("display");
    if (display == "block") {
        $(b_id).click();
    }
}

function make_visible(loader_d, content_d) {
    $(loader_d).css("display", "none");
    $(content_d).css("opacity", 1);
    $(content_d).addClass("active");
}


module.exports = {
    toggleIfVisible: toggle_if_visible,
    makeVisible: make_visible
};
