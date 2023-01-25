Ext.define('Ext.Praxis.view.interline.IATACalendarForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryIATACalendarForm',

    controller: 'DataEntryIATACalendarController',

    requires: [
        'Ext.Praxis.controller.interline.IATACalendar.DataEntryIATACalendarController'
    ],

    title: 'Calendar IATA - Data Entry Form',
    header: true,
    width: 716,
    height: 360,
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
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-box1',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: '100%',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 16},
                                {
                                    xtype: 'label',
                                    text: 'Date Invoiced',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtFINVOIC',
                                    fieldStyle: 'text-align:center',
                                    allowBlank: false,
                                    format: 'Ym',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: yyyymm',
                                    maskRe: /[0-9]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    width: 70,
                                    hideTrigger: true,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid yyyymm'
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'label',
                                    text: 'Period',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPERIOD',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["01", "01"], ["02", "02"], ["03", "03"], ["04", "04"], ["05", "05"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 70,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("01");
                                        },
                                        focus: function (combo) {
                                            combo.expand();
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 10}
                                ,
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-txtStatus',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["",''],["1",'Processed'], ["0",'Closed']
                                        ]
                                    }),
                                    fieldStyle: 'text-align:center',
                                    width: 80,
                                    valueField: 'code', displayField: 'name'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: '<b style="color:#0B333C;text-decoration:underline;">Information Delivery Settings</b>',
                            border: true,
                            width: '100%',
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'vbox',
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'label',
                                                    text: 'Date Open',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtDOENV',
                                                    fieldStyle: 'text-align:center',
                                                    allowBlank: false,
                                                    format: 'Ymd',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: yyyymmdd',
                                                    maskRe: /[0-9]/,
                                                    editable: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    width: 70,
                                                    hideTrigger: true,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid yyyymmdd'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    text: 'Time Open',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTIMESI',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
//                                                    maxLength: 6,
                                                    maskRe: /[0-9a-zA-Z]/,
                                                    width: 70,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        //</editor-fold>
                                        {xtype: 'tbspacer', height: 3},
                                        //<editor-fold defaultstate="collapsed" desc="Fila 2">
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'label',
                                                    text: 'Date Close',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtDCENV',
                                                    fieldStyle: 'text-align:center',
                                                    allowBlank: false,
                                                    format: 'Ymd',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: yyyymmdd',
                                                    maskRe: /[0-9]/,
                                                    editable: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    width: 70,
                                                    hideTrigger: true,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid yyyymmdd'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    text: 'Time Close',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTIMESO',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    maskRe: /[0-9a-zA-Z]/,
                                                    width: 70,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: '<b style="color:#0B333C;text-decoration:underline;">Sending Parameters Image Support</b>',
                            border: true,
                            width: '100%',
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'vbox',
                                    bodyStyle: 'background-color: transparent;',
                                    defaults: {
                                    },
                                    items: [
                                        //<editor-fold defaultstate="collapsed" desc="Fila 1">
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 4},
                                                {
                                                    xtype: 'label',
                                                    text: 'Date',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-txtDENVI',
                                                    fieldStyle: 'text-align:center',
                                                    allowBlank: false,
                                                    format: 'Ymd',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: yyyymmdd',
                                                    maskRe: /[0-9]/,
                                                    editable: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    width: 70,
                                                    hideTrigger: true,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid yyyymmdd'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'label',
                                                    text: 'Time',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 100
                                                },
                                                {xtype: 'tbspacer', width: 3},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtTIMESE',
                                                    fieldStyle: 'text-align:center;',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
//                                                    maxLength: 6,
                                                    maskRe: /[0-9a-zA-Z]/,
                                                    width: 70,
                                                    listeners: {
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        }
                                        //</editor-fold>
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: '<b style="color:#0B333C;text-decoration:underline;">Control Data</b>',
                    border: true,
                    width: '100%',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    fieldStyle: 'text-align:center;',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    fieldStyle: 'text-align:center;',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    fieldStyle: 'text-align:center;',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    fieldStyle: 'text-align:center;',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    fieldStyle: 'text-align:center;',
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
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center;',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id:prototype.id+'-btnSave',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btnUpdate',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btnDelete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});