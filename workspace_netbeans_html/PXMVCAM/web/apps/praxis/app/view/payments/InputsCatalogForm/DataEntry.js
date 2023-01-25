Ext.define('Ext.Praxis.view.payments.InputsCatalogForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInputsCatalogForm',
    requires: [
        'Ext.Praxis.controller.payments.InputsCatalog.DataEntryInputsCatalogController'
    ],
    controller: 'DataEntryInputsCatalogController',
    title: 'Inputs Catalog - Data Entry Form',
    header: true,
    height: 470,
    width: 845,
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
                    width: 840,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: "General information",
                                    style: 'font-weight:bold; color:#121E31; text-decoration: underline;',
                                    width: 200,
                                    margin: '15 0 5 0',
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Aplication Group',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'font-weight:bold;color:red;',
//                                    width: 20,
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAPLIC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 210
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Seq',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSEQNUM',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 90},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSTAT',
                                    queryMode: 'local',
                                    width: 130,
                                    fieldStyle: 'color:#074066;',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    hidden: false,
                                    autoSelect: true,
                                    editable: false,
                                    disabled: false,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Net Directory',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNETDIR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 210
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Library',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtLIBNAME',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'label',
                                    text: 'Table',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTABLA',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 130
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
                                    text: "Shipping days",
                                    style: 'font-weight:bold; color:#121E31;',
                                    width: 200,
                                    margin: '10 2 0 20',
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 5 0 110',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                //{xtype: 'tbspacer', width: 110},
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtLun',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Lunes',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtMar',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Martes',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtMie',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Miercoles',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtJue',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Jueves',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtVie',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Viernes',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtSab',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Sabado',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-de-txtDom',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    text: 'Domingo',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Output Name ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtOUTNAME',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Qty Rec.Unproc.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYREG',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Date last Proc.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFECPROC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Phase',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbFASE',
                                    queryMode: 'local',
                                    width: 130,
                                    fieldStyle: 'color:#074066;',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    hidden: false,
                                    autoSelect: true,
                                    editable: false,
                                    disabled: false,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
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
                                    text: "Input information",
                                    style: 'font-weight:bold; color:#121E31; text-decoration: underline;',
                                    width: 200,
                                    margin: '15 0 5 0',
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtINPNAME',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 300
                                },
                                {xtype: 'tbspacer', width: 155},
                                {
                                    xtype: 'label',
                                    text: 'Extension',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbINPEXTE',
                                    queryMode: 'local',
                                    width: 130,
                                    fieldStyle: 'color:#074066;',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    hidden: false,
                                    autoSelect: true,
                                    editable: false,
                                    disabled: false,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            //bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtINPDESC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    readOnly: false,
                                    width: 300
                                },
                                {xtype: 'tbspacer', width: 155},
                                {
                                    xtype: 'label',
                                    text: 'Type',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbINPTYPE',
                                    queryMode: 'local',
                                    width: 130,
                                    fieldStyle: 'color:#074066;',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    hidden: false,
                                    autoSelect: true,
                                    editable: false,
                                    disabled: false,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                    margin: '10 2 0 20',
                    defaults: {
                        anchor: '100%',
                        width: 1080
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            margin: '0 0 0 7',
                            width: 234
                        }
//                        { xtype: 'tbspacer', width: 470}
                    ]
                },
                // </editor-fold>

                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 50',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
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
                            margin: '5 0 10 50',
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