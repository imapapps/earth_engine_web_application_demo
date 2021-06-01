function toggleSideBar() {
    if ($("#main").width() === 0) {
        $("#sidebar").hide();
        $("#main").width("100%");
    } else {
        $("#sidebar").attr('style', 'display: block !important');
        $("#main").width("0");
    }
    map.updateSize();
}

function toggleCategory(which, icon) {
    if ($('#' + which).is(':visible')) {
        $('#' + which).hide();
        $('#' + icon).attr('data-feather', 'plus-circle');
    } else {
        $('#' + which).show();
        $('#' + icon).attr('data-feather', 'minus-circle');
    }
    feather.replace();
}

/**
 * Loads route from the panel click
 * Builds and shows form to enter specific parameters based on user selection
 * and route requirements.
 * Clears the map layers
 * @param {any} which
 */
function loadparameterPanel(which) {
    removeLayer('geeLayer');
    var html = getBeginModalUI(which);
    switch (which) {
        case 'test':
            html += getTestUI();
            break;
        case 'image':
            html += getImageNameUI() +
                '<br />' +
                getVisParamsUI();
            break;
        case 'getImageCollection':
            html += getImageNameUI()
            html += getFromDateUI();
            html += getToDateUI();
            html += getVisParamsUI();
            break;
        default:
        // code block
    }

    html += getCloseModalUI(which);
    setExampleModalContent(html);
    jQuery(exampleModal).modal('show');
}

function initExampleModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'exampleModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content"></div>' +
        '</div>';
    document.body.appendChild(modal);
    return modal;
}

function getExampleModal() {
    return document.getElementById('exampleModal');
}

function setExampleModalContent(html) {
    getExampleModal().querySelector('.modal-content').innerHTML = html;
}

function getBeginModalUI(route) {
    return '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Route: ' + route + '</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">';
}

function getTestUI() {
    return '<div class="form-group">' +
        '<label>Nothing needed, all code in in server, please click Submit</label >' +
        '</div>';
}

function getImageNameUI() {
    return '<div class="form-group">' +
        '<label for="imageName">Image Name</label >' +
        '<input type="text" id="imageName" placeholder="MCD12Q1/MCD12Q1_005_2001_01_01" class="form-control"/>' +
        '</div>';
}

function getFromDateUI() {
    return '<div class="form-group">' +
        '<label for="fromDate">From Date</label >' +
        '<input type="date" id="fromDate" placeholder="YYYY-MM-DD" class="form-control"/>' +
        '</div>';
}

function getToDateUI() {
    return '<div class="form-group">' +
        '<label for="toDate">To Date</label >' +
        '<input type="date" id="toDate" placeholder="YYYY-MM-DD" class="form-control"/>' +
        '</div>';
}

function getVisParamsUI() {
    return '<div class="form-group">' +
        '<label for="visParams">Vision Parameters</label >' +
        '<textarea id="visParams" class="form-control" placeholder="{&quot;bands&quot;: &quot;B4, B3, B2&quot;, ' +
        '&quot; min &quot;:0,' +
        '&quot; max &quot;: 0.3' +
        '} " rows="4" field_signature="4290505990" form_signature="8463551438221821150" style="overflow: hidden; overflow - wrap: break-word; resize: vertical; "></textarea>' +
        '</div>';
}

function getCloseModalUI(route) {
    var link = route + "();";
    return '<span id="modalerror" style="color:red; font-weight:600;"></span></div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>' +
        '<button type="button" class="btn btn-primary" onclick="' + link + '">Submit</button>' +
        '</div>';
}

function enableRequestUI() {
    jQuery(exampleModal).modal('hide');
    toggleSideBar();
    $('#overlay').show();
}