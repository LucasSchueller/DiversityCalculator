/**
 * -------------------------------------------------------------
 *  
 * File: navigation.js
 * Project: Amoplex Technologies
 * File Created: Saturday, 6th February 2021 11:05:20 am
 * Author: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Last Modified: Saturday, 6th February 2021 11:05:20 am
 * Modified By: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Copyright - 2021 Amoplex Technologies
 *  
 * -------------------------------------------------------------
 */

$(document).ready(() => {
    $("nav[data-element='nav']").on("click", (e) => {
        if ($("nav[data-element='nav']").attr("data-open")) {
            console.log(e);
            if ($(e.target).is("button, span")) {
                $("nav[data-element='nav']").removeAttr("data-open");
            }
        } else {
            $("nav[data-element='nav']").attr("data-open", "true");
        }
    });

    loadJson();
});

function loadJson() {
    let link = location.pathname.substring(0, location.pathname.split("assets")[0].lastIndexOf("/")) + "/assets/json/project.json";
    $.getJSON(link, function(data) {
        $('nav[data-element="nav"] #github').attr("href", data.github);
        $('nav[data-element="nav"] #nextProject').attr("href", data.nextProject);
        $('nav[data-element="nav"] #previousProject').attr("href", data.previousProject);
        if (!data.github) $('nav[data-element="nav"] #github').remove();
        if (!data.nextProject) $('nav[data-element="nav"] #nextProject').remove();
        if (!data.previousProject) $('nav[data-element="nav"] #previousProject').remove();
    });
}