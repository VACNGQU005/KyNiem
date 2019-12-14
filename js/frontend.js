$("#menu_nav_profile_admin_v1").click(function() {
    if ($(".link_menu_profile_admin_v1").first().is(":hidden")) {
        $(".link_menu_profile_admin_v1").show("slow");
    } else {
        $(".link_menu_profile_admin_v1").slideUp();
    }
});