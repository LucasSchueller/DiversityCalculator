/**
 * -------------------------------------------------------------
 *  
 * File: credits.js
 * Project: Amoplex Technologies
 * File Created: Friday, 5th February 2021 3:33:15 pm
 * Author: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Last Modified: Friday, 5th February 2021 3:33:15 pm
 * Modified By: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Copyright - 2021 Amoplex Technologies
 *  
 * -------------------------------------------------------------
 */
let linkSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.587 28.588"><g transform="translate(0.993 1)"><g transform="translate(-0.993 -1)"><g transform="translate(0)"><path d="M10.858,188.838l-3.369,3.369a3.573,3.573,0,1,1-5.054-5.053l6.739-6.739a3.572,3.572,0,0,1,5.053,0,1.191,1.191,0,1,0,1.685-1.685,5.955,5.955,0,0,0-8.422,0L.751,185.469a5.956,5.956,0,0,0,8.423,8.422l3.369-3.369a1.191,1.191,0,1,0-1.685-1.685Z" transform="translate(0.993 -167.048)"/><path d="M206.118.744a5.956,5.956,0,0,0-8.423,0l-4.042,4.042a1.191,1.191,0,1,0,1.685,1.685l4.042-4.042a3.573,3.573,0,0,1,5.054,5.053l-7.412,7.412a3.572,3.572,0,0,1-5.053,0,1.191,1.191,0,0,0-1.685,1.685,5.955,5.955,0,0,0,8.422,0l7.412-7.412A5.955,5.955,0,0,0,206.118.744Z" transform="translate(-179.275 1)"/></g></g></g></svg>';

$(document).ready(function() {
    loadJson();
});

function loadJson() {
    let link = location.pathname.substring(0, location.pathname.split("assets")[0].lastIndexOf("/")) + "/assets/json/project.json";
    $.getJSON(link, function(data) {
        $("section h1").html(data.project + " | Credits");
        data.credits.forEach(item => {
            $("section ul.creditList").append(`<li><div class="text"><h3>${item.type} by</h3><h2>${item.name}</h2></div><a href="${item.link}">${linkSvg}</a></li>`);
        });
    });
}