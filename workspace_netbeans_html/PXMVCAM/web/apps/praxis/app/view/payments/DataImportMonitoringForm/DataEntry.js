Ext.define('Ext.Praxis.view.payments.DataImportMonitoringForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDataImportMonitoringForm',
    requires: [
        'Ext.Praxis.controller.payments.DataImportMonitoring.DataEntryDataImportMonitoringController'
    ],
    controller: 'DataEntryDataImportMonitoringController',
    title: 'Credit Card - Data Entry Form',
    header: true,
    height: 600,
    width: 820,
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
                style: 'margin: 10px;',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id + '-formRPA',
                    border: false,
                    defaults: {margin: '3 0 0 0'},
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Robot Configuration">
                        {
                            xtype: 'label',
                            text: 'Robot Configuration',
                            cls: 'section-title',
                            margin: '10 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'Client', width: 260, labelWidth: 100, disabled: true,
                                    id: prototype.id + '-de-txtCCUST', fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 25},
                                {xtype: 'textfield', fieldLabel: 'Robot Name', width: 450, labelWidth: 80, disabled: true,
                                    id: prototype.id + '-de-txtROBOTNAME', fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 3 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Frequency Type',
                                    width: 260,
                                    labelWidth: 100,
                                    id: prototype.id + '-de-cmbFREQTYPE',
                                    editable: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    forceSelection: true,
                                    fieldStyle: 'text-align:center;',
                                    value: ''
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Days',
                                    width: 200,
                                    labelWidth: 80,
                                    id: prototype.id + '-de-cmbFREQDAYS',
                                    editable: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name',
                                    fieldStyle: 'text-align:center;',
                                    value: ''
                                },
                                {xtype: 'tbspacer', width: 25},
                                {xtype: 'textfield', fieldLabel: 'Execution Time', width: 200, labelWidth: 110,
                                    id: prototype.id + '-de-txtTIMEEXEC', fieldStyle: 'text-align:center;', maxLength: 4}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 12 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Status',
                                    width: 260,
                                    labelWidth: 100,
                                    id: prototype.id + '-de-cmbSTATUSRO',
                                    editable: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    displayField: 'name',
                                    valueField: 'code',
                                    fieldStyle: 'text-align:center;',
                                    value: ''
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Last Execution (historical)">
                        {
                            xtype: 'label',
                            text: 'Last Execution',
                            cls: 'section-title',
                            margin: '15 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Date',
                                    width: 260,
                                    labelWidth: 100,
                                    id: prototype.id + '-de-txtLASTEXECD',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Hour',
                                    width: 200,
                                    labelWidth: 75,
                                    id: prototype.id + '-de-txtLASTEXECH',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Result',
                                    width: 260,
                                    labelWidth: 70,
                                    id: prototype.id + '-de-txtLASTSTATR',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;font-weight:bold;color:white;background:#e8e8e8;'
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc=" Current Execution (Live)">
                        {
                            xtype: 'label',
                            text: 'Current Execution (Live)',
                            cls: 'section-title',
                            margin: '15 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 12 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Status',
                                    width: 260,
                                    labelWidth: 100,
                                    id: prototype.id + '-de-txtLIVE_STATUS',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;font-weight:bold;color:white;background:#95a5a6;'
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PID',
                                    width: 200,
                                    labelWidth: 60,
                                    id: prototype.id + '-de-txtLIVE_PID',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Running Seconds',
                                    width: 260,
                                    labelWidth: 120,
                                    id: prototype.id + '-de-txtLIVE_SECONDS',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                }
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Audit Information">
                        {
                            xtype: 'label',
                            text: 'Audit Information',
                            cls: 'section-title',
                            margin: '20 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '8 12 4 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Created By',
                                    id: prototype.id + '-de-txtUSCR',
                                    width: 210,
                                    labelWidth: 110,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creation Date',
                                    id: prototype.id + '-de-txtFECR',
                                    width: 210,
                                    labelWidth: 110,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creation Time',
                                    id: prototype.id + '-de-txtHOCR',
                                    width: 210,
                                    labelWidth: 110,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '4 12 14 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Updated By',
                                    id: prototype.id + '-de-txtUSUP',
                                    width: 210,
                                    labelWidth: 110,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Update Date',
                                    id: prototype.id + '-de-txtFEUP',
                                    width: 210,
                                    labelWidth: 110,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 25},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Update Time',
                                    id: prototype.id + '-de-txtHOUP',
                                    width: 210,
                                    labelWidth: 110,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                }
                            ]
                        }
                        // </editor-fold>
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
                    hidden:true,
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