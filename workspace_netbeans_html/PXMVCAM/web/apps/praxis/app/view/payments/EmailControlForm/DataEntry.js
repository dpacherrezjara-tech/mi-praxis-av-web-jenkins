Ext.define('Ext.Praxis.view.payments.EmailControlForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEmnailControlForm',
    requires: ['Ext.Praxis.controller.payments.EmailControl.DataEntryEmailControlController'],

    controller: 'DataEntryEmailControlController',
    title: 'Email Control -DataEntry Form',

    header: {
        style: 'background:#2F5597;border-bottom:1px solid #1E3F73;'
    },

    height: 455,
    width: 610,

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
                    width: 800,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [

                        {
                            xtype: 'panel',
                            width: 595,
                            border: false,
                            margin: '05 0 0 0',
                            bodyStyle: `
                                        background:#2F5597;
                                        border:1px solid #1E3F73;
                                        border-radius:6px;
                                        padding:12px 15px;
                                    `,
                            layout: 'vbox',
                            items: [

                                {
                                    xtype: 'label',
                                    text: '📧 Email Control Information',
                                    style: 'font-size:18px;font-weight:bold;color:#FFFFFF;'
                                },

                                {
                                    xtype: 'label',

                                    margin: '6 0 0 0',
                                    style: 'font-size:12px;color:#7A7A7A;'
                                }

                            ]
                        },

                        {xtype: 'tbspacer', width: 30},

                        {
                            xtype: 'panel',
                            width: 620,
                            border: false,
                            bodyStyle: 'background:transparent;padding-top:15px;',
                            layout: {
                                type: 'table',
                                columns: 4,
                                tdAttrs: {
                                    style: 'padding:8px 15px;'
                                }
                            },
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [

                                // ===== Fila 1 =====

                                {
                                    xtype: 'label',
                                    text: 'Process',
                                    style: 'font-weight:bold;color:#4F4F4F;'
                                },
                             {
                                xtype: 'combo',
                                id: prototype.id + '-cmbPROCESSDE',
                                allowBlank: false,
                                blankText: 'Process is required.',
                                width: 180,
                                queryMode: 'local',
                                forceSelection: true,
                                editable: false,
                                valueField: 'PROCESS',
                                displayField: 'PROCESS',
                                emptyText: 'Select...',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['PROCESS']
                                })
                                },
                                
                                

                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#4F4F4F;'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbSTATUSDE',
                                    width: 130,
                                    allowBlank: false,
                                    blankText: 'Status is required.',
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    valueField: 'value',
                                    displayField: 'text',
                                    emptyText: 'Select...',
                                    store: {
                                        fields: ['value', 'text'],
                                        data: [
                                            {value: 'A', text: 'Active'},
                                            {value: 'I', text: 'Inactive'}
                                        ]
                                    }
                                },

                                // ===== Fila 2 =====

                                {
                                    xtype: 'label',
                                    text: 'Role',
                                    style: 'font-weight:bold;color:#4F4F4F;'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbROLDE',
                                    allowBlank: false,
                                    blankText: 'Rol is required.',
                                    width: 180,
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    valueField: 'value',
                                    displayField: 'text',
                                    emptyText: 'Select...',
                                    store: {
                                        fields: ['value', 'text'],
                                        data: [
                                            {value: 'BPO', text: 'BPO'},
                                            {value: 'DEV', text: 'Developer'},
                                            {value: 'COM', text: 'Comercial'},
                                            {value: 'AV', text: 'Avianca'}
                                        ]
                                    }
                                },

                                {
                                    xtype: 'label',
                                    text: 'Type',
                                    style: 'font-weight:bold;color:#4F4F4F;'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbTYPEDE',
                                    allowBlank: false,
                                    blankText: 'Type is required.',
                                    width: 130,
                                    queryMode: 'local',
                                    editable: false,
                                    forceSelection: true,
                                    valueField: 'value',
                                    displayField: 'text',
                                    emptyText: 'Select...',
                                    store: {
                                        fields: ['value', 'text'],
                                        data: [
                                            {value: 'TO', text: 'TO'},
                                            {value: 'CC', text: 'CC'},
                                            {value: 'BCC', text: 'BCC'}
                                        ]
                                    }
                                },

                                // ===== Fila 3 =====

                                {
                                    xtype: 'label',
                                    text: 'Email',
                                    style: 'font-weight:bold;color:#4F4F4F;'
                                },
                                {
                                    xtype: 'textfield',
                                    allowBlank: false,
                                    blankText: 'Email is required.',
                                    id: prototype.id + '-txtEMAILDE',
                                    width: 470,
                                    colspan: 3,
                                    enforceMaxLength: true
                                }

                            ]
                        },
                    ]
                },

                // pie


                {xtype: 'tbspacer', height: 10},

                {
                    xtype: 'panel',
                    width: 595,
                    border: true,
                    bodyStyle: `
                                background:#DCEBFA;
                                padding:10px;
                                border:1px solid #AFC9E8;
                                border-radius:6px;
                            `,
                    layout: {
                        type: 'table',
                        columns: 6,
                        tdAttrs: {
                            style: 'padding:6px 8px;'
                        }
                    },
                    items: [

                        {
                            xtype: 'label',
                            text: 'Control Data',
                            colspan: 6,
                            style: 'font-size:18px;font-weight:bold;color:#2F5597;margin-bottom:10px;'
                        },

                        // ===== Primera fila =====

                        {
                            xtype: 'label',
                            text: 'Creator User',
                            style: 'font-weight:bold;color:#3A3A3A;'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtUSCR',
                            width: 70,
                            readOnly: true,
                            fieldStyle: 'background:#F2F4F7;'
                        },

                        {
                            xtype: 'label',
                            text: 'Creation Date',
                            style: 'font-weight:bold;color:#3A3A3A;'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFECR',
                            width: 75,
                            readOnly: true,
                            fieldStyle: 'background:#F2F4F7;'
                        },

                        {
                            xtype: 'label',
                            text: 'Creation Time',
                            style: 'font-weight:bold;color:#3A3A3A;'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtHOCR',
                            width: 75,
                            readOnly: true,
                            fieldStyle: 'background:#F2F4F7;'
                        },

                        // ===== Segunda fila =====

                        {
                            xtype: 'label',
                            text: 'User Update',
                            style: 'font-weight:bold;color:#3A3A3A;'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtUSUP',
                            width: 70,
                            readOnly: true,
                            fieldStyle: 'background:#F2F4F7;'
                        },

                        {
                            xtype: 'label',
                            text: 'Update Date',
                            style: 'font-weight:bold;color:#3A3A3A;'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFEUP',
                            width: 75,
                            readOnly: true,
                            fieldStyle: 'background:#F2F4F7;'
                        },

                        {
                            xtype: 'label',
                            text: 'Update Time',
                            style: 'font-weight:bold;color:#3A3A3A;'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtHOUP',
                            width: 75,
                            readOnly: true,
                            fieldStyle: 'background:#F2F4F7;'
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
                    cls: 'btn-email-save',
                    width: 100,
                    height: 34,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    cls: 'btn-email-update',
                    width: 100,
                    height: 34,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    cls: 'btn-email-cancel',
                    width: 100,
                    height: 34,
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);

Ext.util.CSS.createStyleSheet(`

.btn-email-save {
    background: #2F5597 !important;
    border-radius: 6px;
}

.btn-email-save .x-btn-inner {
    color: white !important;
    font-weight: bold;
    font-size: 13px;
}

.btn-email-update {
    background: #17A589 !important;
    border-radius: 6px;
}

.btn-email-update .x-btn-inner {
    color: white !important;
    font-weight: bold;
    font-size: 13px;
}

.btn-email-cancel {
    background: #E5E7EB !important;
    border-radius: 6px;
}

.btn-email-cancel .x-btn-inner {
    color: #333 !important;
    font-weight: bold;
    font-size: 13px;
}

`, 'email-control-buttons-style');