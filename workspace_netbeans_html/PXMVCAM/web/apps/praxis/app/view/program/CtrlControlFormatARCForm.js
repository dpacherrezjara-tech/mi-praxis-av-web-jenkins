prototype.ControlFormatARC = {
    id: 'CtrlControlFormatARCForm'
};

Ext.define('Ext.Praxis.view.program.CtrlControlFormatARCForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.CtrlControlFormatARCForm',
    requires: [
        'Ext.Praxis.controller.program.CtrlControlFormatARCController'
    ],
    controller: 'CtrlControlFormatARCController',
    title: 'Control Format ARC',
    header: true,
    width: 300,
    height: 180,
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
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '30 0 0 7',
                            width: '100%',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%',
                                style: 'font-size:13px;'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'ID File:',
                                    width: 72
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.ControlFormatARC.id+'-txtIDFile',
                                    fieldStyle: 'text-align:center;',
                                    maxLength: 9,
                                    maskRe: /[0-9]/,
                                    width: 90
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 10},
                        {
                            xtype: 'label',
                            id: prototype.ControlFormatARC.id+'-lblMsg',
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
            id: prototype.ControlFormatARC.id+'-test',
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
                    id: prototype.ControlFormatARC.id+'-btnAccept',
                    scale: 'small',
                    width: 90,
                    listeners: {
                        click: 'btnAccept_clickHandler'
                    }
                },
                {xtype: 'tbspacer', width: 10},
                {
                    style: 'font-weight:bold;background:#024F79;',
                    html: '<strong style="background:#024F79;color:white;">Process</strong>',
                    id: prototype.ControlFormatARC.id+'-btnProcess',
                    scale: 'small',
                    width: 90,
                    listeners: {
                        click: 'btnProcess_clickHandler'
                    }
                }
            ]
        }
    ]
});