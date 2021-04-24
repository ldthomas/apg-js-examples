/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// Note that
//
//\<script src="../../node_modules/apg-js/dist/apg-exp-bundle.js"\>\</script\>;
//
// defines variables:<br>
// apgExp - the apg-exp constructor<br>
// and <br>
// apgLib - the APG library
//
/* main function */
let execute = function () {
    executeApgExp();
    executeRegExp();
};

/* execute apg-exp */
let executeApgExp = function () {
    let exp, result, output;
    exp = new apgExp($("#apgexp-def").val());
    exp.exclude(["local-char", "sub-domain-char", "top-domain-char", "alpha", "num", "special"]);
    result = exp.exec($("#email-address").val());
    if (result) {
        output = result.toHtml();
    } else {
        output = "<pre>\n";
        output += "result: null";
        output += "</pre>\n";
    }
    $("#apgexp-result").html(output);
};

/* execute RegExp */
let executeRegExp = function () {
    let exp, result, output;
    exp = new RegExp($("#regexp-def").val(), "i");
    result = exp.exec($("#email-address").val());
    if (result) {
        output = regToHtml(result);
    } else {
        output = "<pre>\n";
        output += "result: null";
        output += "</pre>\n";
    }
    $("#regexp-result").html(output);
};

/* format RegExp result to HTML table */
let regToHtml = function (result) {
    let html = "";
    let caption = "result:";
    html += '<table class="' + apgLib.style.CLASS_STATE + '">\n';
    html += "<caption>" + caption + "</caption>\n";
    html += "<tr>";
    html += "<td>input</td>";
    html += "<td>" + result.input + "</td>";
    html += "</tr>\n";

    html += "<tr>";
    html += "<td>index</td>";
    html += "<td>" + result.index + "</td>";
    html += "</tr>\n";

    for (let i = 0; i < result.length; i += 1) {
        html += "<tr>";
        html += "<td>[" + i + "]</td>";
        html += "<td>" + result[i] + "</td>";
        html += "</tr>\n";
    }
    html += "</table>\n";
    return html;
};

$(document).ready(function () {
    let string = {};

    // RegExp - regular expression syntax
    string.regexp =
        "^(([\\w!#$%&'*+/=?^_`{|}~-]+)(?:\\.([\\w!#$%&'*+/=?^_`{|}~-]+))*)@((?:([A-Z0-9-]+)\\.)+([A-Z]{2,6}))$";

    // ApgExp - ABNF syntax
    string.apgexp = "";
    string.apgexp += 'email-address   = %^ local "@" domain %$\n';
    string.apgexp += 'local           = local-word *("." local-word)\n';
    string.apgexp += 'domain          = 1*(sub-domain ".") top-domain\n';
    string.apgexp += "local-word      = 1*local-char\n";
    string.apgexp += "sub-domain      = 1*sub-domain-char\n";
    string.apgexp += "top-domain      = 2*6top-domain-char\n";
    string.apgexp += "local-char      = alpha / num / special\n";
    string.apgexp += 'sub-domain-char = alpha / num / "-"\n';
    string.apgexp += "top-domain-char = alpha\n";
    string.apgexp += "alpha           = %d65-90 / %d97-122\n";
    string.apgexp += "num             = %d48-57\n";
    string.apgexp += "special         = %d33      / %d35 / %d36-39\n";
    string.apgexp += "                  / %d42-43 / %d45 / %d47\n";
    string.apgexp += "                  / %d61    / %d63 / %d94-96\n";
    string.apgexp += "                  / %d123-126\n";

    // initial email address
    string.input = "foo.b.bar@my.email.com";

    // page setup
    $("#col-1").tabs();
    $("#col-2").tabs();
    $("#col-3").tabs();
    $("#regexp-def").val(string.regexp);
    $("#apgexp-def").val(string.apgexp);
    $("#email-address").val(string.input);
    $("#tryit").click(execute);
});
