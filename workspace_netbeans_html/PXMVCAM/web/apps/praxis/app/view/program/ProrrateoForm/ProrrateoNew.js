
Ext.define('Ext.Praxis.view.program.ProrrateoForm.ProrrateoNew', {
    extend: 'Ext.window.Window',
    alias: 'widget.ProrrateoNew',
    requires: [
        'Ext.Praxis.controller.program.Prorrateo.ProrrateoNewController',
        'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.prorrate'
    ],
    controller: 'ProrrateoNewController',
    id: prototype.idProrrate + '-ContenedorProrrate',
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
            id: prototype.idProrrate + '-contenedor-form',
            width: 1440,
            height: 710,
            items: [
                {
                    xtype: 'prorrate',
                    id: prototype.idProrrate + '-widget-prorrate' 
                }
            ]
        }
    ]
});