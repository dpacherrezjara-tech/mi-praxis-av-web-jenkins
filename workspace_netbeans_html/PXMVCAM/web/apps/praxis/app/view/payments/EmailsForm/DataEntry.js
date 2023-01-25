Ext.define('Ext.Praxis.view.payments.EmailsForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryEmailsForm',
    requires: [
        'Ext.Praxis.controller.payments.Emails.DataEntryEmailsController'
    ],
    controller: 'DataEntryEmailsController',
    title: 'Emails - Data Entry Form',
    header: true,
    height: 580,
    width: 720,
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
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Emails Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 3'
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80

                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODIGO',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 80,
                                    maskRe: /[0-9/]/,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDESCR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 270,
                                    enforceMaxLength: true,
                                    maxLength: 40,
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            hidden: false,
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    fieldLabel: '<b>Bank</b>',
                                    id: prototype.id + '-de-cmbCBANK',
                                    fieldStyle: 'text-align: left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'CODEBANK',
                                    displayField: 'IN_CODE_IN_NAME',
                                    emptyText: 'All',
                                    width: 240,
                                    labelWidth: 80,
//                    hidden: false,
                                    hiddenLabel: false
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    fieldLabel: '<b>C. Card</b>',
                                    id: prototype.id + '-de-cmbSCARCOD',
                                    fieldStyle: 'text-align: left',
                                    disabled: false,
                                    width: 240,
                                    labelWidth: 80,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    hidden: false,
                                    hiddenLabel: false
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Input',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80

                                },
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFTE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 80,
                                    enforceMaxLength: true,
                                    maxLength: 5,
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            hidden: false,
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'combo',
                                    fieldLabel: '<b>Zone</b>',
                                    id: prototype.id + '-de-cmbZONA',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    readOnly: false,
                                    editable: true,
                                    emptyText: 'All',
                                    //maxLength: 3,
                                    labelWidth: 80,
                                    width: 240,
                                    hiddenLabel: false,
                                    value: '',
//                                    listeners: {
//                                        change: 'obtenerPaisesSumm'
//                                    }
                                },                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: "Add Email's",
                                    style: 'font-weight:bold; color:#121E31; text-decoration: underline;',
                                    width: 90,
                                    margin: '2 2 0 20',
                                }
                            ]
                        },
                        {xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            width: 620,
                            margin: '2 2 0 20',
                            height: 240,
                            defaults: {
                                anchor: '100%',
                                width: 580,
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        width: 580,
                                        align: 'center'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Email',
                                            style: 'font-weight:bold;color:#121E31;',
                                            width: 50,
                                            padding: '3 0'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            padding: '1px 1px 1px 1px',
                                            html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                            width: 30,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Required field'
                                            }
                                        }
                                    ]
                                },
                                //*****
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 550,
                                        align: 'center'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtEMAIL',
                                            enforceMaxLength: true,
//                                            enforceMinLength: true,
//                                            minLength: 5,
                                            maxLength: 40,
                                            //maskRe: /[0-9/]/,
                                            padding: '3 0',
                                            fieldStyle: 'text-align:center',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 3},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            margin: '4 1 1 1',
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'Add',
                                            listeners: {
                                                click: 'addEMAIL'
                                            }

                                        },
                                        {xtype: 'tbspacer', width: 3},
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            margin: '4 1 1 1',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'clear',
                                            listeners: {
                                                click: 'clearEMAIL'
                                            }
                                        }
                                    ]
                                },
                                //grilla------
                                {
                                    xtype: 'panel',
                                    margin: '5 5 0 10',
                                    padding: '0 0 0 0',
                                    width: 500,
                                    height: 170,
                                    autoScroll: true,
                                    align: 'center',
                                    border: false,
                                    //title: '<b style="font-size:13px;color:white">RAPID Information</b>',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center',
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 180},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridEMAIL',
                                            width: 260,
                                            height: 150,
                                            columnLines: true,
                                            padding: '1',
                                            margin: '1',
                                            defaults: {
                                                sortable: true,
                                                align: 'center'
                                            },
                                            columns: [
                                                {
                                                    header: 'Email',
                                                    id: prototype.id + '-colEmail',
                                                    dataIndex: 'EMAIL',
                                                    xtype: 'gridcolumn',
                                                    align: 'center',
                                                    width: 200
                                                },
                                                {
                                                    header: '',
                                                    dataIndex: '',
                                                    xtype: 'widgetcolumn',
                                                    align: 'center',
                                                    width: 40,
                                                    widget: {
                                                        xtype: 'button',
                                                        iconCls: 'prx-icon-delete',
                                                        tooltip: 'remove',
                                                        listeners: {
                                                            click: function (button, e, eOpts) {
                                                                var record = button.getWidgetRecord();
                                                                meDE.removeEMAIL(record);
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {xtype: 'tbspacer', height: 10},
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '0 2 4 8'

                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
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
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);