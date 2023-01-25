Ext.define('Ext.Praxis.view.salesaudit.EMDCodesPricesForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryEMDCodesPricesForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.EMDCodesPrices.DataEntryEMDCodesPricesController'
    ],
    controller: 'DataEntryEMDCodesPricesController',
    title: 'Master Codes and Price EMD',
    header: true,
    height: 390,
    width: 700,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
//                    margin: '4 27 0 27',
//                    border: true,
//                    style: 'border-style:solid;border-color:#7F98A8;border-width:1px;',
                    layout: {
                        type: 'vbox',
//                        align: 'center'
                    },
                    defaults: {
//                        border: false
                    },
                    items: [
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'RFIS:',
                                    style: 'font-weight:bold;',
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    },
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665RFIS',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'RFIC:',
                                    style: 'font-weight:bold;',
                                    width: 130
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    },
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665RFIC',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    width: 30,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Type EMD:',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665EMDTP',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Fee Description:',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665DESCR',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 50,
                                    width: 350,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Group:',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665GROUP',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 35,
                                    width: 322,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Domestic Price 1:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665DMSTC',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 10,
                                    width: 60,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Domestic Price 2:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665DMSTC2',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 10,
                                    width: 60,
                                    listeners: {
                                    }
                                },                                
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Domestic Currency:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665MDADO',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 10,
                                    width: 60,
                                    listeners: {
                                    change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'International Price 1:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665INTNC',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 50,
                                    width: 60,
                                    listeners: {
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'International Price 2:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665INTNC2',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 50,
                                    width: 60,
                                    listeners: {
                                    }
                                },                                
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'International Currency:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 165
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665MDAIN',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 50,
                                    width: 60,
                                    listeners: {
                                    change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 3},
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: false,
                            hidden: false,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                            },
                            items: [
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'DATE Efective:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 160
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id+'-1-txtFechaOpen',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 113,
                                    hideTrigger: false,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'DATE Discontinuity:',
                                    padding:'4 0',
                                    style: 'font-weight:bold;',
                                    width: 142
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id+'-1-txtFechaClose',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 113,
                                    hideTrigger: false,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                    }
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-1-ControlData',
                    title: 'Control Data',
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtA2665REGIS',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtA2665FREGI',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtA2665HREGI',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtA2665REVIS',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtA2665FREVI',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtA2665HREVI',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id+'-1-txtA2665CORRL',
                                    hidden: true,
                                    width: 40
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id+'-1-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'btnInsert_clickHandler'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id+'-1-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                    click: 'btnUpdate_clickHandler'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id+'-1-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'btnDelete_clickHandler'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id+'-1-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                }
            ]
        }
    ]
});