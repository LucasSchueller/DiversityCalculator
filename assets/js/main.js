/**
 * -------------------------------------------------------------
 *  
 * File: main.js
 * Project: Amoplex Technologies
 * Author: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Modified By: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Copyright - 2021 Amoplex Technologies
 *  
 * -------------------------------------------------------------
 */
let names = [
    "Brennan Palmer",
    "Elias Reed",
    "Edouard Alfonso",
    "Zayden Beau",
    "Frederick Toryn",
    "Ibrahim Julius",
    "Slade Kendall",
    "Orion Nath",
    "Cohen Sven",
    "Martin Zeph",
    "Hayley Skyler",
    "Anastasia Caitlin",
    "Cat Haley",
    "April Hazel",
    "Rosa Pollyanna",
    "Christal Briana",
    "Tasha Louella",
    "Shawna Jade",
    "Leila Janice"
];

$(document).ready(() => {
    calc(randomName());
    $(document).on("keyup", (e) => {
        if (e.key == "Enter") {
            calc();
        }
    });
    $('button[data-role="BTN_DISCLAIMER"]').on("click", (e) => {
        if ($("section").attr("data-disclaimer")) {
            $("section").removeAttr("data-disclaimer");
            $(e.currentTarget).html("Disclaimer");
        } else {
            $("section").attr("data-disclaimer", "true");
            $(e.currentTarget).html("Close Disclaimer");
        }
    });
});

function calc(pName) {
    let name = pName || $(".input input").val();
    $.ajax({
        type: "GET",
        url: `https://api.diversitydata.io/?fullname=${encodeURI(name)}`,
        success: function(response) {
            updateInfo(response);
        }
    });
}

function updateInfo(response) {
    $("li[data-role='name']").html("<span>Name</span> " + response.fullname.toLowerCase());
    $("li[data-role='gender']").html("<span>Gender</span> " + response.gender + " (" + Math.round(response["gender probability"] * 100) + "%)");
    let prob = [];
    Object.keys(response["ethnicity probability"]).forEach(function(item) {
        if (response["ethnicity probability"][item] > 0) {
            let key = item;
            let val = response["ethnicity probability"][item];
            prob.push({ key, val });
        }
    });
    let html = "";
    prob.sort(function(a, b) {
        return b.val - a.val;
    });

    if (prob.length >= 3) {
        let sum = 0;
        let sumText = "";
        prob.forEach((item, i) => {
            if (i > 1) {
                sum += item.val;
                sumText += item.key + ";";
            }
        });
        prob = prob.slice(0, 2);
        sumText = sumText.substring(0, sumText.length - 1);
        prob.push({ key: sumText, val: sum });
    }

    prob.forEach((item) => {
        html += `<li><h3>${shortToLongName(item.key)}</h3><div class="prog"><div class="progBar"></div><div class="curProg" style="width: ${Math.round(item.val*100)}%"><span>${Math.round(item.val*100)}%</span></div></div></li>`;
    });
    $(".img img").attr("src", getImageByAttr(response.gender, prob[0].key));
    $("ul.ethnic").html(html);
}

function shortToLongName(short) {
    if (short.length < 3) {
        switch (short) {
            case "A":
                return "Asian";
            case "AR":
                return "Arab";
            case "B":
                return "Black";
            case "H":
                return "Hispanic";
            case "N":
                return "Native American";
            case "P":
                return "Pacific Islander";
            case "W":
                return "White";
        }
    } else {
        let result = "Other (";
        short.split(";").forEach((item) => {
            result += shortToLongName(item) + ", ";
        });
        result = result.substring(0, result.length - 2);
        result += ")";
        return result;
    }
}

function getImageByAttr(gender, short) {
    return "assets/img/avatars/" + gender + "/" + getRandomImage(gender, short);
}

function getRandomImage(gender, short) {
    let aM = ["049-man.svg"];
    let arM = ["021-man.svg"];
    let bM = ["027-man.svg", "033-man.svg", "003-man.svg", "009-man.svg"];
    let hM = ["039-man.svg"];
    let nM = ["045-man.svg", "015-man.svg"];
    let pM = ["023-man.svg", "001-man.svg", "005-man.svg"];
    let wM = ["001-man.svg", "029-man.svg", "031-man.svg", "035-man.svg", "037-man.svg", "041-man.svg", "043-man.svg"];

    let aF = ["022-woman.svg", "046-woman.svg"];
    let arF = ["036-woman.svg"];
    let bF = ["024-woman.svg", "030-woman.svg"];
    let hF = ["006-woman.svg", "018-woman.svg"];
    let nF = ["024-woman.svg", ""];
    let pF = ["028-woman.svg"];
    let wF = ["032-woman.svg", "034-woman.svg", "040-woman.svg", "044-woman.svg", "014-woman.svg"];
    switch (short) {
        case "A":
            if (gender === "male") return aM[Math.floor(Math.random() * aM.length)];
            if (gender === "female") return aF[Math.floor(Math.random() * aM.length)];
            break;
        case "AR":
            if (gender === "male") return arM[Math.floor(Math.random() * arM.length)];
            if (gender === "female") return arF[Math.floor(Math.random() * arM.length)];
            break;
        case "B":
            if (gender === "male") return bM[Math.floor(Math.random() * bM.length)];
            if (gender === "female") return bF[Math.floor(Math.random() * bM.length)];
            break;
        case "H":
            if (gender === "male") return hM[Math.floor(Math.random() * hM.length)];
            if (gender === "female") return hF[Math.floor(Math.random() * hM.length)];
            break;
        case "N":
            if (gender === "male") return nM[Math.floor(Math.random() * nM.length)];
            if (gender === "female") return nF[Math.floor(Math.random() * nM.length)];
            break;
        case "P":
            if (gender === "male") return pM[Math.floor(Math.random() * pM.length)];
            if (gender === "female") return pF[Math.floor(Math.random() * pM.length)];
            break;
        case "W":
            if (gender === "male") return wM[Math.floor(Math.random() * wM.length)];
            if (gender === "female") return wF[Math.floor(Math.random() * wM.length)];
            break;
    }
}

function randomName() {
    return names[Math.floor(Math.random() * names.length)];
}