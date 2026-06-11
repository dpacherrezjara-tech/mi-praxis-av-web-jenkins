prototype.idDE = prototype.id + '-ReverseAccountingDataEntry';

Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.DataEntrys.ReverseAccountingDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ReverseAccountingDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingDataEntryController'
    ],
    controller: 'ReverseAccountingDataEntryController',
    title: 'BPO Rejection Maintenance',
    header: true,
    width: 1200,
    resizable: true,
    constrainHeader: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: { border: false },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
            autoScroll: true,
            layout: { type: 'vbox', align: 'stretch' },
            border: false,
            bodyStyle: 'padding: 10px 12px; background: #f4f6fb;',
            defaults: {
                xtype: 'fieldset',
                margin: '0 0 8 0',
                padding: '4 10 8 10',
                defaults: {
                    xtype: 'panel',
                    layout: { type: 'hbox', align: 'middle' },
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '4 0 0 0',
                    defaults: {
                        xtype: 'textfield',
                        labelStyle: 'font-weight: 600; color: #3a3a3a;',
                        labelAlign: 'right',
                        fieldStyle: 'text-align: center;',
                        editable: false,
                        margin: '0 6 0 0'
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Rejection Details">
                {
                    title: 'Rejection Details',
                    style: { backgroundColor: '#fdf3f3', borderColor: '#e8c5c5' },
                    items: [
                        {
                            // Row 1: IDCONT | HEADER | PROCESO | TIPOCON | STREJ
                            items: [
                                {
                                    fieldLabel: 'Praxis ID',
                                    name: 'IDCONT',
                                    labelWidth: 65, flex: 5
                                },
                                {
                                    fieldLabel: 'Header',
                                    name: 'HEADER',
                                    labelWidth: 55, flex: 4
                                },
                                {
                                    fieldLabel: 'Process',
                                    name: 'PROCESO',
                                    labelWidth: 58, flex: 2
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Acc. Type',
                                    name: 'TIPOCON',
                                    labelWidth: 68, flex: 2.5,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['REG', 'Regular'],
                                            ['DEB', 'Debit'],
                                            ['ADJ', 'Adjustment'],
                                            ['SAL', 'Sale W/O Settl.'],
                                            ['ADM', 'ADM'],
                                            ['REV', 'Reversal'],
                                            ['CHK', 'Check'],
                                            ['ARC', 'Neg. Balance']
                                        ]
                                    }),
                                    displayField: 'name', valueField: 'code',
                                    queryMode: 'local', readOnly: true, border: false
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Rej. Type',
                                    name: 'STREJ',
                                    labelWidth: 68, flex: 2.5,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['R', 'Rejected'],
                                            ['J', 'Justified'],
                                            ['P', 'Re-Process']
                                        ]
                                    }),
                                    displayField: 'name', valueField: 'code',
                                    queryMode: 'local', readOnly: true, border: false,
                                    listeners: {
                                        change: function (combo, value) {
                                            combo.inputWrap.setStyle({ border: 'none', boxShadow: 'none', background: 'transparent' });
                                            combo.setFieldStyle('');
                                            if (value === 'R') {
                                                combo.setFieldStyle('background:#d26666;text-align:center;font-weight:bold;color:#fff;border-radius:15px;');
                                            } else if (value === 'J') {
                                                combo.setFieldStyle('background:#e5c840;text-align:center;font-weight:bold;color:#333;border-radius:15px;');
                                            } else if (value === 'P') {
                                                combo.setFieldStyle('background:#1379c8;text-align:center;font-weight:bold;color:#fff;border-radius:15px;');
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            // Row 2: FILEID | REFER | CODREC | TSCR
                            items: [
                                {
                                    fieldLabel: 'File ID',
                                    name: 'FILEID',
                                    labelWidth: 50, flex: 2
                                },
                                {
                                    fieldLabel: 'Reference',
                                    name: 'REFER',
                                    labelWidth: 75, flex: 4
                                },
                                {
                                    fieldLabel: 'Error Code',
                                    name: 'CODREC',
                                    labelWidth: 80, flex: 2
                                },
                                {
                                    fieldLabel: 'Created',
                                    name: 'TSCR',
                                    labelWidth: 60, flex: 3
                                }
                            ]
                        },
                        {
                            // Row 3: OBSERV full width (read-only)
                            items: [
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'AV Comment',
                                    name: 'OBSERV',
                                    labelWidth: 90, flex: 1,
                                    readOnly: true,
                                    maxLength: 200,
                                    enforceMaxLength: true,
                                    grow: true, growMin: 52, growMax: 110,
                                    fieldStyle: 'text-align:left; resize:none; background:#f0eef0; color:#555;'
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="BPO Review">
                {
                    title: 'BPO Review',
                    margin: '0',
                    style: { backgroundColor: '#f0f5fc', borderColor: '#c5d5e8' },
                    items: [
                        {
                            // Row 1: STREVI badge | USUP | TSUP
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'BPO Status',
                                    name: 'STREVI',
                                    labelWidth: 80, flex: 1.5,
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['Y', 'Revisado'],
                                            ['N', 'Pendiente']
                                        ]
                                    }),
                                    displayField: 'name', valueField: 'code',
                                    queryMode: 'local', readOnly: true, border: false,
                                    listeners: {
                                        change: function (combo, value) {
                                            combo.inputWrap.setStyle({ border: 'none', boxShadow: 'none', background: 'transparent' });
                                            combo.setFieldStyle('');
                                            if (value === 'Y') {
                                                combo.setFieldStyle('background:#28a745;text-align:center;font-weight:bold;color:#fff;border-radius:15px;');
                                            } else if (value === 'N') {
                                                combo.setFieldStyle('background:#dc3545;text-align:center;font-weight:bold;color:#fff;border-radius:15px;');
                                            }
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Reviewed By',
                                    name: 'USUP',
                                    labelWidth: 90, flex: 2
                                },
                                {
                                    fieldLabel: 'Review Date',
                                    name: 'TSUP',
                                    labelWidth: 90, flex: 2
                                }
                            ]
                        },
                        {
                            // Row 2: BPOCOMM full width (editable)
                            items: [
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'BPO Comment',
                                    id: prototype.idDE + '-txtBpoComment',
                                    name: 'BPOCOMM',
                                    labelWidth: 90, flex: 1,
                                    maxLength: 200,
                                    enforceMaxLength: true,
                                    grow: true, growMin: 60, growMax: 130,
                                    fieldStyle: 'text-align:left; resize:none;'
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '6 5 6 5',
            layout: { pack: 'center' },
            defaults: { scale: 'medium' },
            items: [
                {
                    text: 'Save',
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-image-update',
                    listeners: { click: 'onUpdateRejection' }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: { click: 'onCancelClick' }
                }
            ]
        }
    ]
});
