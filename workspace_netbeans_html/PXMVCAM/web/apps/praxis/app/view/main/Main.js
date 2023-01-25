
/* global urlPRAXIS */

/**
 * @author: remicioluis
 */

var title_initial = '<div id="divTitle"><h2 class="label-praxis-module">PRAXIS </h2></div>';
var title_module = '<div id="divTitle"><h2 class="label-praxis-module">MENU MODULE<br>Option</h2></div>';

var html_header = '' +
        '<div class="page-top-bar menu-hide-element">' +
        '<div class="page-am-logo"><img src="resources/img/menu/139X.png" height="47" /></div>' + title_initial +
        '<div class="page-am-iata"><img src="resources/img/menu/IATA_SP.png" /></div>' +
        '<div class="page-am-miatech"><img src="resources/img/menu/logo_miatech3.png" /></div>' +
        '</div>' +
        '<div class="page-menu-bar">' +
        '<ul id="menuPraxis">' +
        '</ul>' +
        '<div id="menuCommands">' +
        '<div class="menuCommandPanel">' +
        '<div class="menuCommand">' +
        '<span id="menuUser"></span>' +
        '<span id="menuDate"></span>' +
        '</div>' +
        '<div class="menuCommand">' +
        '<span id="menuProgram"></span>' +
        '<span id="menuHour"></span>' +
        '</div>' +
        '<div class="menuCommand">' +
        '<div class="menu menu-desktop" title="On / Off Fullscreen"></div>' +
        '<div class="menu menu-home" title="Home"></div>' +
        '<div class="menu menu-logout" title="Exit"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="menu" class="panel-parent">' +
        '<div id="panelPraxis" class="panel-menus">' +
        '</div>' +
        '<div class="panel-slider" style="background:transparent">' +
        '<span class="close-menu"></span>' +
        '</div>' +
        '</div>';

var htmlMenuLeft = '' +
        '<div class="page-left-bar" id="left-bar">' +
        '<table height="100%" width="100%">' +
        '<tr>' +
        '<td valign="center" id="menuLateral"></td>' +
        '</tr>' +
        '</table>' +
        '</div>';

var htmlFondo = '<div class="fondo_principal"></div>';

var id_main = 'App-main';
var nprog = '';

var prototypeProgram = {
    view : '',
    nprog : '',
    title : '',
    modulo : ''
};

var prototype = {
    id: '[]Form',
    idProrrate: '',
    idFacsimil: '',
    idCtrlTaxesByCode: '',
    url: CONTEXTPATH + '/[]',
    urlMaster: CONTEXTPATH + '/MasterController'
};

Ext.define('Ext.Praxis.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.Praxis.controller.main.MainController'
    ],
    controller: 'MainController',
    id: id_main,
    hideParams: [],
    layout: 'border',
    border: false,
    defaults: {
        border: false,
        style: {
            margin: '0px'
        }
    },
    header: {
        width: 0,
        height: 0
    },
    items: [
        {
            region: 'north',
            id: id_main + '-region-content-north',
            height: 105,
            border: false,
            bodyStyle: 'visibility: hidden',
            html: html_header
        },
        {
            region: 'center',
            layout: 'border',
            id: id_main + '-region-content-center-parent',
            border: false,
            style: 'z-index:-1',
            bodyStyle: 'visibility: hidden',
            items: [
                {
                    region: 'west',
                    id: id_main + '-region-content-west',
                    width: 220,
                    border: false,
                    html: htmlMenuLeft
                },
                {
                    region: 'center',
                    id: id_main + '-region-content-center',
                    autoScroll: false,
                    layout: 'fit',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: id_main + '-content-background',
                            html: htmlFondo
                        },
                        {
                            xtype: 'panel',
                            id: id_main + '-contenedor',
                            margin: 0,
                            padding: 0,
                            width: '100%',
                            height: '100%',
                            border: false,
                            layout: 'fit',
                            hideMode: 'offsets'
                        }
                    ]
                }
            ]
        }
    ]
});
