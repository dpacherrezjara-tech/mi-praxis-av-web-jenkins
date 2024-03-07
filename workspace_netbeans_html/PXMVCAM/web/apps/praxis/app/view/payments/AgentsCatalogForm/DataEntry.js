Ext.define('Ext.Praxis.view.payments.AgentsCatalogForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAgentsCatalogForm',
    requires: [
        'Ext.Praxis.controller.payments.AgentsCatalog.DataEntryAgentsCatalogController'
    ],
    controller: 'DataEntryAgentsCatalogController',
    title: 'Agent - Data Entry Form',
    header: true,
    height: 400,
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
                            text: 'Agent Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 3'
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '1 2 1 20',
                            defaults: {
                                anchor: '100%',
                                width: 900
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '1 2 1 10',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Code',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCAGENCY',
                                            fieldStyle: 'text-align:center',
                                            enableKeyEvents: false,
                                            enforceMaxLength: true,
                                            editable: true,
                                            enabled: false,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            readOnly: false,
                                            width: 80,
                                        },
                                        {xtype: 'tbspacer', width: 226},
                                        {
                                            xtype: 'label',
                                            text: 'Name',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtNAMEA',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 40,
                                            width: 263,
                                            labelWidth: 20
                                        },
                                        {xtype: 'tbspacer', width: 12}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '1 2 1 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbCOUNTRY',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            width: 95,
                                            editable: true,
                                            readOnly: false,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            emptyText: 'All',
                                            valueField: 'A006PAIS',
                                            displayField: 'A006PAIS',
                                            listeners: {
                                                select: 'searchCitys'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 213},
                                        {
                                            xtype: 'label',
                                            text: 'City',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbCITY',
                                            fieldStyle: 'text-align:left;',
                                            enableKeyEvents: true,
                                            width: 190,
                                            editable: true,
                                            readOnly: false,
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            emptyText: 'All',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '1 2 1 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Channel',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 24},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCANAL',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            //maskRe: /[0-9]/,
                                            width: 95
                                        },
                                        {xtype: 'tbspacer', width: 213},
                                        {
                                            xtype: 'label',
                                            text: 'Bussines',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de-cmbNEGOC',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 100,
                                            labelWidth: 10,
                                            hidden: false,
                                            hiddenLabel: false
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '1 2 1 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Terminal',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 24},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbTERMI',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //maskRe: /[0-9]/,
                                            width: 95
                                        },
                                        {xtype: 'tbspacer', width: 213},
                                        {
                                            xtype: 'label',
                                            text: 'Contact',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbCONTACT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 30,
                                            //maskRe: /[0-9]/,
                                            width: 263
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '1 2 1 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Phone',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 60
                                        },
                                        {xtype: 'tbspacer', width: 24},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbNPHONE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            //maskRe: /[0-9]/,
                                            width: 95
                                        },
                                        {xtype: 'tbspacer', width: 213},
                                        {
                                            xtype: 'label',
                                            text: 'Email',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbEMAILS',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
//                                            enforceMaxLength: true,
//                                            maxLength: 30,
                                            //maskRe: /[0-9]/,
                                            width: 263
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '1 2 1 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Email 2',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 82
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbEMAILS2',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
//                                            enforceMaxLength: true,
//                                            maxLength: 30,
                                            //maskRe: /[0-9]/,
                                            width: 263
                                        },
                                        {xtype: 'tbspacer', width: 45},
                                        {
                                            xtype: 'label',
                                            text: 'Email 3',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbEMAILS3',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
//                                            enforceMaxLength: true,
//                                            maxLength: 30,
                                            //maskRe: /[0-9]/,
                                            width: 263
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    margin: '1 2 1 10',
                                    bodyStyle: 'background:#E5ECEF;',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Email 4',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 82
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbEMAILS4',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
//                                            enforceMaxLength: true,
//                                            maxLength: 30,
                                            //maskRe: /[0-9]/,
                                            width: 263
                                        },
                                        {xtype: 'tbspacer', width: 45},
                                        {
                                            xtype: 'label',
                                            text: 'Email 5',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-cmbEMAILS5',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center;',
//                                            enforceMaxLength: true,
//                                            maxLength: 30,
                                            //maskRe: /[0-9]/,
                                            width: 263
                                        },
                                        {xtype: 'tbspacer', width: 40},
                                    ]
                                },
                            ]
                        },
                    ]
                },
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