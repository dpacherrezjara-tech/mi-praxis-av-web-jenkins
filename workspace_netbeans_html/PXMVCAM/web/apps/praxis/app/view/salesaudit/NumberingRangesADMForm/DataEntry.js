Ext.define('Ext.Praxis.view.salesaudit.NumberingRangesADMForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryNumberingRangesADMForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.NumberingRangesADM.DataEntryNumberingRangesADMController'
    ],
    controller: 'DataEntryNumberingRangesADMController',
    title: 'Maintenance ADM\'S Range',
    header: true,
    height: 400,
    width: 550,
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
                                    text: 'Cod.Country:',
                                    style: 'font-weight:bold;',
                                    width: 120
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
                                    id: prototype.id+'-1-txtPais',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    width: 70,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function(obj, e, eOpts) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id+'-1-txtCountryName').focus();
                                            }
                                        }
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
                                    text: 'Country Name:',
                                    style: 'font-weight:bold;',
                                    width: 120
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
                                    id: prototype.id+'-1-txtCountryName',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 40,
                                    width: 150,
                                    listeners: {
                                       change: 'onUpperValue',
                                        keypress: function(obj, e, eOpts) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id+'-1-txtinitial').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        //
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
                                    text: 'Type:',
                                    style: 'font-weight:bold;',
                                    width: 89
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
                                    id: prototype.id+'-1-txtType',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 102,
                                    listeners: {
                                       change: 'onUpperValue',
                                        keypress: function(obj, e, eOpts) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id+'-1-txtinitial').focus();
                                            }
                                        }
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
                                    text: 'Initial:',
                                    style: 'font-weight:bold;',
                                    width: 90
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
                                    id: prototype.id+'-1-txtinitial',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 100,
                                     maskRe: /[0-9.]/,
                                    listeners: {
                                        keypress: function(obj, e, eOpts) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id+'-1-txtending').focus();
                                            }
                                        }
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
                                    text: 'Ending:',
                                    style: 'font-weight:bold;',
                                    width: 90
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
                                    id: prototype.id+'-1-txtending',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 100,
                                     maskRe: /[0-9.]/,
                                    listeners: {
                                        keypress: function(obj, e, eOpts) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id+'-1-txtCurrent').focus();
                                            }
                                        }
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
                                    text: 'ADM Current:',
                                    style: 'font-weight:bold;',
                                    width: 140
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
                                    id: prototype.id+'-1-txtCurrent',
                                    fieldStyle: 'text-align:right;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function(obj, e, eOpts) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.id+'-1-txtPais').focus();
                                            }
                                        }
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
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtREGIS',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 45
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtFREGI',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'label',
                                    text: 'Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 45
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtHREGI',
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
                                    text: 'User Modified:',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtREVIS',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 45
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtFREVI',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'label',
                                    text: 'Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 45
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-1-txtHREVI',
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