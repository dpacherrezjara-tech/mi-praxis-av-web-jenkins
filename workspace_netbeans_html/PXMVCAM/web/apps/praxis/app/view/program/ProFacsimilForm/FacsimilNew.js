
Ext.define('Ext.Praxis.view.program.ProFacsimilForm.FacsimilNew', {
    extend: 'Ext.window.Window',
    alias: 'widget.FacsimilNew',
    requires: [
        'Ext.Praxis.controller.program.ProFacsimil.FacsimilNewController',
        'Ext.Praxis.view.widgets.facsimil'
    ],
    controller: 'FacsimilNewController',
    id: prototype.idFacsimil + '-ContenedorFacsimil',

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
            id: prototype.idFacsimil + '-contenedor-form',
            width: 790,
            height: 390,
            items: [
                {
                    xtype: 'facsimil',
                    id: prototype.idFacsimil + '-widget-facsimil'
                }
            ]
        }
    ]
});