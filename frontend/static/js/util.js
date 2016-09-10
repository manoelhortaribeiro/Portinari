function toggle_button(b_id, b_class, b_desc) {
    $(b_id).click(function () {
        $(b_class).slideToggle(200);

        if ($(b_id).text() == b_desc + ' ▽') {
            $(b_id).html(b_desc + ' &#9651');
        }
        else {
            $(b_id).html(b_desc + ' &#9661');
        }
    });
}

module.exports = {
    toggleButton: toggle_button,
};
