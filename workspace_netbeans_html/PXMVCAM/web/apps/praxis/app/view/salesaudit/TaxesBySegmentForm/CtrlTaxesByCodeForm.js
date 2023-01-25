
Ext.define('Ext.Praxis.view.salesaudit.TaxesBySegmentForm.CtrlTaxesByCodeForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlTaxesByCodeForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.TaxesBySegmentForm.CtrlTaxesByCodeController',
        'Ext.Praxis.view.widgets.ttbs'
    ],
    controller: 'CtrlTaxesByCodeController',
    id: prototype.idCtrlTaxesByCode + '-ContenedorTtbs',
    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults: {
        border: false
    },

    listeners: {
        beforeShow: 'OnBeforeShow'
    },

    items: [
        {
            xtype: 'panel',
            id: prototype.idCtrlTaxesByCode + '-contenedor-form',
            width: 1305,
            height: 750,
            items: [
                {
                    xtype: 'ttbs',
                    id: prototype.idCtrlTaxesByCode + '-widget-ttbs' 
                }
            ]
        }
    ]
});