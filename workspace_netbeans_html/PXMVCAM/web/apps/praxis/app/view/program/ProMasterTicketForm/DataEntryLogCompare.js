Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryLogCompare', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLogCompareProMasterTicketForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryLogCompareProMasterTicketController'
    ],
    controller: 'DataEntryLogCompareProMasterTicketController',
    title: 'Log Compare - Sales Data',
    header: true,
    width: 666,
    height: 172,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 20},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'FOP',
                                    style: 'font-weight:bold;',
                                    padding: '4 0',
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531TTARJ',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531NREF',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531CAPL',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531VFOP',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 120
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'FOP',
                                    style: 'font-weight:bold;',
                                    padding: '4 0',
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531TTARJ2',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531NREF2',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531CAPL2',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    value: '',
                                    id: prototype.id+'-3-txtA1531VFOP2',
                                    fieldStyle: 'text-align:left;background-color:#E5EDFC;',
                                    readOnly: true,
//                                    maxLength: 3,
                                    width: 120
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Close',
                    id:prototype.id+'-3-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'btnClose_clickHandler'
                    }
                },
                { xtype: 'tbspacer', width: 54 },
                {
                    xtype: 'label',
                    id: prototype.id+'-3-msjDiff',
                    text: 'Differences Exist',
                    style: 'color:red;',
                    hidden: true,
                    width: 146
                }
            ]
        }
    ]
});