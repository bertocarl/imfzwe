//Change History
//Date Modified		    : Jan 2013
//Changed By		    : Tata Consultancy Services
//Change Description    : SRS 24883 : Change Publication category
//------------------------------------------------------------------------------------------------------------
function GetQueryStringValue(key) {
    var queryString = window.location.search.substring(1);
    if (queryString != null && queryString != "") {
        var keyPair = queryString.split("&");
        for (var i = 0; i < keyPair.length; i++) {
            var keyValue = keyPair[i].split("=");
            if (keyValue[0].toLowerCase() == key.toLowerCase()) {
                //alert(keyValue[1]);
                return keyValue[1];
            }
        }
    }
}

function GetIt() {
    //var deptId = GetQueryStringValue("DeptId");
    var fldExpId = GetQueryStringValue("FieldOfExpertiseId");
    if (document.getElementById("listcolwrap1") != "") {
        document.getElementById("listcolwrap1").style.display = "";
    }
    //document.getElementById("liDepartmentDetails").style.display = "none";
    document.getElementById("liFieldOfExpertiseDetails").style.display = "none";
//    if (deptId != null && deptId != "") {
//        document.getElementById("listcolwrap1").style.display = "none";
//        document.getElementById("liDepartmentDetails").style.display = "block";
//        $(function () {
//            $('#content-nav').corner("tl tr");
//            $('#reslisttabs > ul > li > a').corner("tl tr 5px");
//            //$('#rescvtabcontain').corner("tr");
//            $("#reslisttabs").tabs({ cookie: { expires: 365 }, selected: 2 });
//        })
//    }
     if (fldExpId != null && fldExpId != "") {
        document.getElementById("listcolwrap1").style.display = "none";
        document.getElementById("liFieldOfExpertiseDetails").style.display = "block";
        $(function () {
            $('#content-nav').corner("tl tr");
            $('#reslisttabs > ul > li > a').corner("tl tr 5px");
            $("#reslisttabs").tabs({ cookie: { expires: 365 }, selected: 2});
        })
    }
    else {
        $(function () {
            $('#content-nav').corner("tl tr");
            $('#reslisttabs > ul > li > a').corner("tl tr 5px");
            //$('#rescvtabcontain').corner("tr");
            $("#reslisttabs").tabs({ cookie: { expires: 365 }, selected: 0 });
        })

    }
    }

//Sets the focus on Submit Button 
function SetFocusOnEnter(e) {
    var keyCode = (window.Event) ? e.which : e.keyCode;
    if (keyCode == 13) {
        document.getElementById('btnSubmit').focus();
        return true;
    }
    else {
        return false;
    }
}
//sets the features for printCV window
function ShowPrintCV(authorId) {
    window.open("PrintCV.aspx?AuthID=" + authorId, "PrinterFriendly", "menubar=yes,scrollbars=1");
    return false;
}

//hide the tab
function enact(liid) {
    if (document.getElementById("listcolwrap1") != "") {
        document.getElementById("listcolwrap1").style.display = "";
    }
    var liids = liid.split(",");
    for (var i in liids) {
        var objli = document.getElementById(liids[i]);
        objli.style.display = "none";
    }
}
function CheckResearch() {
    var researcher = document.getElementById("txtSearch").value;
    if (jQuery.trim(researcher) == "") {
        alert("Please provide a Researcher name to search");
        return false;
    }
    else {
        return true;
    }
}



//SRS 24883 : Change Publication category
//For More/Hide button
function showHide(divID) {
    var div = document.getElementById(divID);
    var divLink = document.getElementById(divID + 'Link');
    if (div != "" && div != null) {

        if (div.style.display == "none") {
            div.style.display = "block";
        }
        else {
            div.style.display = "none";
        }
    }
    if (divLink != "" && divLink != null) {

        if (divLink.innerHTML == "More...") {
            divLink.innerHTML = "....Hide";
        }
        else {
            divLink.innerHTML = "More...";
        }
    }
}
//SRS 24883 : Change Publication category
//For Expand All/ Collapse All button
function SetDisplay(divID, visible) {
    var div = document.getElementById(divID);
    var divLink = document.getElementById(divID + 'Link');
    if (visible == 'true') {
        if (div != "" && div != null) {
            div.style.display = "block";
        }
        if (divLink != "" && divLink != null) {
            divLink.innerHTML = "....Hide";
        }
    }
    else {
        if (div != "" && div != null) {
            div.style.display = "none";
        }
        if (divLink != "" && divLink != null) {
            divLink.innerHTML = "More...";
        }
    }
}
//SRS 24883 : Change Publication category
//For Expand All/ Collapse All Background
function ExpandBackground(visible) {
    SetDisplay('divBiographyMore', visible);
    var divCategories = document.getElementById('divAuthorCategories');
    if (divCategories != "" && divCategories != null) {
        var divCategoryValues = divCategories.getElementsByTagName('div');
        for (var index = 0; index < divCategoryValues.length; index++) {
            if (divCategoryValues[index].id.substring(divCategoryValues[index].id.length - 4) != 'Link') {
                SetDisplay(divCategoryValues[index].id, visible);
            }
        }
    }
}
//SRS 24883 : Change Publication category
//For Expand All/ Collapse All IMF Publication
function ExpandIMFPublications(visible) {
    SetDisplay('divPubtrackPublicationMore', visible);
    var divPublications = document.getElementById('divIMFPublications');
    if (divPublications != "" && divPublications != null) {
        var divPublicationsValues = divPublications.getElementsByTagName('div');
        for (var index = 0; index < divPublicationsValues.length; index++) {
            if (divPublicationsValues[index].id.substring(divPublicationsValues[index].id.length - 4) != 'Link') {
                SetDisplay(divPublicationsValues[index].id, visible);
            }
        }
    }
}
//SRS 24883 : Change Publication category
//For Expand All/ Collapse All NonIMF Publication
function ExpandNonIMFPublications(visible) {
    var divPublications = document.getElementById('divNonIMFPublications');
    if (divPublications != "" && divPublications != null) {
        var divPublicationsValues = divPublications.getElementsByTagName('div');
        for (var index = 0; index < divPublicationsValues.length; index++) {
            if (divPublicationsValues[index].id.substring(divPublicationsValues[index].id.length - 4) != 'Link') {
                SetDisplay(divPublicationsValues[index].id, visible);
            }
        }
    }
}
//SRS 24883 : Change Publication category
//For Expand All/ Collapse All All Tab
function ExpandAll(visible) {
    SetDisplay('divBiographyMoreAll', visible);
    var divCategories = document.getElementById('divAuthorCategoriesAll');
    if (divCategories != "" && divCategories != null) {
        var divCategoryValues = divCategories.getElementsByTagName('div');
        for (var index = 0; index < divCategoryValues.length; index++) {
            if (divCategoryValues[index].id.substring(divCategoryValues[index].id.length - 4) != 'Link') {
                SetDisplay(divCategoryValues[index].id, visible);
            }
        }
    }
    SetDisplay('divPubtrackPublicationMoreAll', visible);
    var divPublications = document.getElementById('divIMFPublicationsAll');
    if (divPublications != "" && divPublications != null) {
        var divPublicationsValues = divPublications.getElementsByTagName('div');
        for (var index = 0; index < divPublicationsValues.length; index++) {
            if (divPublicationsValues[index].id.substring(divPublicationsValues[index].id.length - 4) != 'Link') {
                SetDisplay(divPublicationsValues[index].id, visible);
            }
        }
    }
    var divPublications = document.getElementById('divNonIMFPublicationsAll');
    if (divPublications != "" && divPublications != null) {
        var divPublicationsValues = divPublications.getElementsByTagName('div');
        for (var index = 0; index < divPublicationsValues.length; index++) {
            if (divPublicationsValues[index].id.substring(divPublicationsValues[index].id.length - 4) != 'Link') {
                SetDisplay(divPublicationsValues[index].id, visible);
            }
        }
    }
}
