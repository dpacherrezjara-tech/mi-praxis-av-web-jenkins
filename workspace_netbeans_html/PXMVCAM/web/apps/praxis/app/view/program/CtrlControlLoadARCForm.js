prototype.ControlLoadARC = {
    id: 'CtrlControlLoadARCForm'
};

Ext.define('Ext.Praxis.view.program.CtrlControlLoadARCForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlControlLoadARCForm',
    requires: [
        'Ext.Praxis.controller.program.CtrlControlLoadARCController'
    ],
    controller: 'CtrlControlLoadARCController',
    title: 'Control Load ARC',
    header: true,
    width: 300,
    height: 150,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            width: '100%',
            xtype: 'form',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    height: 80,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'label',
                            id: prototype.ControlLoadARC.id+'-lblMsg',
                            style: 'font-weight:bold;text-align:center;',
                            text: '',
                            width: '100%'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            id: prototype.ControlLoadARC.id+'-test',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0',
            padding: '4 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                padding: '2 0',
                margin: '4 0'
            },
            items: [
                {
                    style: 'font-weight:bold;background:#024F79;',
                    html: '<strong style="background:#024F79;color:white;">Accept</strong>',
                    id: prototype.ControlLoadARC.id+'-btnAccept',
                    scale: 'small',
                    width: 90,
                    listeners: {
                        click: 'btnAccept_clickHandler'
                    }
                }
            ]
        }
    ]
});