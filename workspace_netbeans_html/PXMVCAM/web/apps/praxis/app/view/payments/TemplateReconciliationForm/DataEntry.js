Ext.define('Ext.Praxis.view.payments.TemplateReconciliationForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTemplateReconciliationForm',
    requires: [
        'Ext.Praxis.controller.payments.TemplateReconciliation.DataEntryTemplateReconciliationController'
    ],
    controller: 'DataEntryTemplateReconciliationController',
    title: 'Credit Card - Data Entry Form',
    header: true,
    height: 520,
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
                        // <editor-fold defaultstate="collapsed" desc="DETAIL">
                        {
                            xtype: 'label',
                            text: 'Detail',
                            cls: 'section-title',
                            margin: '18 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'RN', id: prototype.id + '-de-txtRN', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'CCUST', id: prototype.id + '-de-txtCCUST2', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'PRDA', id: prototype.id + '-de-txtPRDA', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'CODPRO', id: prototype.id + '-de-txtCODPRO', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'CCUSTPRO', id: prototype.id + '-de-txtCCUSTPRO', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'FLIQUIDACI', id: prototype.id + '-de-txtFLIQUIDACI', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'LIQUIDACIO', id: prototype.id + '-de-txtLIQUIDACIO', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'MERCHAND', id: prototype.id + '-de-txtMERCHAND', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'CODIGO', id: prototype.id + '-de-txtCODIGO', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'CORRL', id: prototype.id + '-de-txtCORRL', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
// </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="AMOUNT">
                        {
                            xtype: 'label',
                            text: 'Amount',
                            cls: 'section-title',
                            margin: '18 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 12 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'MONEDA',
                                    id: prototype.id + '-de-txtMONEDA',
                                    width: 230,
                                    labelWidth: 90,
                                    fieldStyle: 'text-align:center;font-weight:bold;'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'IMPORTE',
                                    id: prototype.id + '-de-txtIMPORTE',
                                    width: 210,
                                    labelWidth: 90,
                                    hideTrigger: true,
                                    decimalPrecision: 2,
                                    allowDecimals: true,
                                    fieldStyle: 'text-align:right;font-weight:bold;',
                                    listeners: {
                                        blur: function (f) {
                                            var v = f.getValue();
                                            if (v !== null && v !== undefined) {
                                                f.setRawValue(Ext.util.Format.number(v, '0,000.00'));
                                            }
                                        },
                                        focus: function (f) {
                                            var raw = f.getRawValue().replace(/,/g, '');
                                            f.setRawValue(raw);
                                        }
                                    }
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
                                    width: 230,
                                    labelWidth: 90,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creation Date',
                                    id: prototype.id + '-de-txtFECR',
                                    width: 230,
                                    labelWidth: 90,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Creation Time',
                                    id: prototype.id + '-de-txtHOCR',
                                    width: 230,
                                    labelWidth: 90,
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
                                    width: 230,
                                    labelWidth: 90,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Update Date',
                                    id: prototype.id + '-de-txtFEUP',
                                    width: 230,
                                    labelWidth: 90,
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;background:#e8e8e8;'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Update Time',
                                    id: prototype.id + '-de-txtHOUP',
                                    width: 230,
                                    labelWidth: 90,
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
                    hidden: true,
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