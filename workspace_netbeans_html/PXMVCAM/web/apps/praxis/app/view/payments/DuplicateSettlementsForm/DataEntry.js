Ext.define('Ext.Praxis.view.payments.DuplicateSettlementsForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDuplicateSettlementsForm',
    requires: [
        'Ext.Praxis.controller.payments.DuplicateSettlements.DataEntryDuplicateSettlementsController'
    ],
    controller: 'DataEntryDuplicateSettlementsController',
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
                            margin: '14 0 6 10'
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'CCUST', id: prototype.id + '-de-txtCCUST', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                 {xtype: 'textfield', fieldLabel: 'SDATE', id: prototype.id + '-de-txtSDATE', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'SCOUNTRY', id: prototype.id + '-de-txtSCOUNTRY', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', maxLength: 1,enforceMaxLength: true,fieldLabel: 'TDOC', id: prototype.id + '-de-txtTDOC', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'CODEBANK', id: prototype.id + '-de-txtCODEBANK', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'SCARCOD', id: prototype.id + '-de-txtSCARCOD', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'SCARDN', id: prototype.id + '-de-txtSCARDN', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'SAUTHOC', id: prototype.id + '-de-txtSAUTHOC', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {xtype: 'textfield', fieldLabel: 'SEQ', id: prototype.id + '-de-txtSEQ', width: 220, labelWidth: 90, fieldStyle: 'text-align:center;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            bodyStyle: 'background:#F4F7FD;',
                            padding: '6 12 6 12',
                            defaults: {labelStyle: 'font-weight:bold;color:#0B333C;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'SVFOP', id: prototype.id + '-de-txtSVFOP', width: 230, labelWidth: 90, fieldStyle: 'text-align:center;'},
                                {xtype: 'tbspacer', width: 15},
                                {
    xtype: 'combobox', 
    fieldLabel: 'NEGOC', 
    id: prototype.id + '-de-txtNEGOC', 
    width: 220, 
    labelWidth: 90, 
    
    queryMode: 'local',      // Evita que busque en el servidor
    displayField: 'nombre',  // El texto que lee el usuario
    valueField: 'codigo',    // El valor real ("1", "2", "S") que viaja al backend y que seteas
    editable: false,         // Bloquea el teclado para obligar a usar la lista
    
    store: {
        fields: ['codigo', 'nombre'],
        data: [
            { codigo: '1', nombre: 'PASAJES' },
            { codigo: '2', nombre: 'CARGO' },
            { codigo: '3', nombre: 'CORREO' },
            { codigo: '4', nombre: 'TURISMO' },
            { codigo: 'S', nombre: 'STANDBY' }
        ]
    }
}
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="AMOUNT">
                        /*
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
                                    fieldStyle: 'text-align:right;font-weight:bold;'
                                }
                            ]
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
                                    fieldLabel: 'MONEDA PAGO',
                                    id: prototype.id + '-de-txtMONEDAPAGO',
                                    width: 230,
                                    labelWidth: 90,
                                    fieldStyle: 'text-align:center;font-weight:bold;'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'IMPORTE PAGO',
                                    id: prototype.id + '-de-txtIMPORTEPAGO',
                                    width: 210,
                                    labelWidth: 90,
                                    hideTrigger: true,
                                    decimalPrecision: 2,
                                    allowDecimals: true,
                                    fieldStyle: 'text-align:right;font-weight:bold;'
                                }
                            ]
                        },
                        */
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