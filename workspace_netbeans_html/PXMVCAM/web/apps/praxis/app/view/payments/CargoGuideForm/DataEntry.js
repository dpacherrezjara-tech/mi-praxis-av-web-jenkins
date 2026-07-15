Ext.define('Ext.Praxis.view.payments.CargoGuideForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCargoGuideForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoGuide.DataEntryCargoGuideController'
    ],
    controller: 'DataEntryCargoGuideController',
    title: 'Cargo Guide — Data Entry',
    header: true,
    height: 760,
    width: 990,
    resizable: true,
    maximizable: true,
    layout: {type: 'hbox', align: 'stretch'},
    modal: true,
    border: false,
    defaults: {border: false},
    items: [
        // ══ LEFT: data form + linked records ══════════════════════════════
        {
            xtype: 'container',
            id: prototype.id + '-de-leftPane',
            width: 972,
            layout: {type: 'vbox', align: 'stretch'},
            defaults: {border: false},
            items: [
        // ── Detail + Amount form ──────────────────────────────────────────
        {
            xtype: 'form',
            id: prototype.id + '-formRPA',
            border: false,
            bodyStyle: 'background:#F0F4F8;',
            padding: '8 12 6 12',
            items: [
                // ─── DETAIL ──────────────────────────────────────────────
                {
                    xtype: 'container',
                    html: '<div style="background:linear-gradient(90deg,#1565C0,#1976D2);color:#fff;font-size:11px;font-weight:bold;letter-spacing:2px;padding:5px 14px;border-radius:4px 4px 0 0;">&#9632;&nbsp;DETAIL</div>'
                },
                {
                    xtype: 'container',
                    style: 'background:#fff;border:1px solid #BBDEFB;border-top:none;border-radius:0 0 4px 4px;box-shadow:0 1px 3px rgba(0,0,0,.07);',
                    padding: '8 10 4 10',
                    defaults: {
                        xtype: 'container',
                        layout: {type: 'hbox', align: 'middle'},
                        margin: '0 0 5 0',
                        defaults: {labelStyle: 'font-weight:bold;color:#37474F;font-size:11px;'}
                    },
                    items: [
                        {items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'STVAL',
                                id: prototype.id + '-de-cmbSTVAL',
                                width: 290, labelWidth: 60,
                                editable: false,
                                forceSelection: true,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'code',
                                store: {
                                    fields: ['code', 'name'],
                                    data: [
                                        {code: '1', name: '1 - Match'},
                                        {code: '2', name: '2 - Duplicado'},
                                        {code: '3', name: '3 - Pendiente'},
                                        {code: '4', name: '4 - Match sin cartera'},
                                        {code: '5', name: '5 - Manual'}
                                    ]
                                }
                            },
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'ADATE',   id: prototype.id + '-de-txtADATE',   width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'Pay Day', id: prototype.id + '-de-txtPAYDATE', width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'}
                        ]},
                        {items: [
                            {xtype: 'textfield', fieldLabel: 'Cycle',   id: prototype.id + '-de-txtNCICLO',  width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'NPAGE',   id: prototype.id + '-de-txtNPAGE',   width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'METPAGO', id: prototype.id + '-de-txtMETPAGO', width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'}
                        ]},
                        {items: [
                            {xtype: 'numberfield', fieldLabel: 'SALDO', id: prototype.id + '-de-txtSALDO', width: 290, labelWidth: 60, hideTrigger: true, decimalPrecision: 2, allowDecimals: true, fieldStyle: 'text-align:right;font-weight:bold;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield',   fieldLabel: 'STATE', id: prototype.id + '-de-txtSTATE', width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield',   fieldLabel: 'REFERENCE', id: prototype.id + '-de-txtREFERENCE', flex: 1, labelWidth: 70, fieldStyle: 'text-align:center;'}
                        ]},
                        {
                            layout: {type: 'hbox', align: 'stretch'},
                            items: [
                                // SFILE puede ser bastante largo: textarea de solo lectura que
                                // envuelve el texto en vez de truncarlo en una sola línea.
                                {
                                    xtype: 'textarea',
                                    fieldLabel: 'SFILE',
                                    id: prototype.id + '-de-txtSFILE',
                                    flex: 1,
                                    labelWidth: 60,
                                    rows: 2,
                                    grow: false,
                                    readOnly: true,
                                    fieldStyle: 'font-family:monospace;font-size:11px;word-break:break-all;background:#F5F7FA;color:#37474F;resize:none;'
                                }
                            ]
                        }
                    ]
                },
                // ─── AMOUNT & FILE ────────────────────────────────────────
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    html: '<div style="background:linear-gradient(90deg,#1565C0,#1976D2);color:#fff;font-size:11px;font-weight:bold;letter-spacing:2px;padding:5px 14px;border-radius:4px 4px 0 0;">&#9632;&nbsp;AMOUNT &amp; FILE</div>'
                },
                {
                    xtype: 'container',
                    style: 'background:#fff;border:1px solid #BBDEFB;border-top:none;border-radius:0 0 4px 4px;box-shadow:0 1px 3px rgba(0,0,0,.07);',
                    padding: '8 10 8 10',
                    layout: {type: 'hbox', align: 'middle'},
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Currency',
                            id: prototype.id + '-de-txtMONEDA',
                            labelStyle: 'font-weight:bold;color:#37474F;font-size:11px;',
                            width: 198, labelWidth: 65,
                            fieldStyle: 'text-align:center;font-weight:bold;'
                        },
                        {xtype: 'tbspacer', width: 14},
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Amount',
                            id: prototype.id + '-de-txtIMPORTE',
                            labelStyle: 'font-weight:bold;color:#37474F;font-size:11px;',
                            width: 235, labelWidth: 65,
                            hideTrigger: true,
                            decimalPrecision: 2,
                            allowDecimals: true,
                            fieldStyle: 'text-align:right;font-weight:bold;color:#1565C0;font-size:13px;'
                        },
                        {xtype: 'container', flex: 1},
                        {
                            xtype: 'button',
                            id: prototype.id + '-de-btnDownloadPDF',
                            text: '&#8659;&nbsp;Download PDF',
                            hidden: true,
                            cls: 'prx-btn-danger',
                            style: 'background:#C62828;border:1px solid #B71C1C;color:#fff;border-radius:3px;font-weight:bold;',
                            scale: 'medium',
                            listeners: {click: 'onDownloadPDF'}
                        },
                        {xtype: 'tbspacer', width: 8},
                        {
                            xtype: 'button',
                            id: prototype.id + '-de-btnPreviewPDF',
                            text: '&#9974;&nbsp;Full Screen',
                            hidden: true,
                            style: 'background:#1976D2;border:1px solid #1565C0;color:#fff;border-radius:3px;font-weight:bold;',
                            scale: 'medium',
                            listeners: {click: 'onPreviewPDF'}
                        }
                    ]
                }
            ]
        },
        // ── MPF291 linked records (hidden until data loads) ───────────────
        {
            xtype: 'panel',
            id: prototype.id + '-de-panelMPF291',
            height: 165,
            hidden: true,
            border: false,
            layout: 'fit',
            margin: '8 12 0 12',
            items: [{
                xtype: 'grid',
                id: prototype.id + '-de-gridMPF291',
                border: false,
                viewConfig: {stripeRows: true},
                columns: [
                    {text: 'Nbr',           dataIndex: 'RN',     width: 45,  align: 'center'},
                    {text: 'Airwaybilling', dataIndex: 'AWBNO',  width: 150},
                    {text: 'ADATE',         dataIndex: 'ADATE',  width: 85,  align: 'center'},
                    {text: 'NPAGE',         dataIndex: 'NPAGE',  width: 80,  align: 'center'},
                    {text: 'State',         dataIndex: 'STATE',  width: 70,  align: 'center'},
                    {text: 'BANDOC',        dataIndex: 'BANDOC', flex: 1,    align: 'center'},
                    {
                            text: '<span style="color:white;font-weight:bold;">Delete</span>',
                            width: 60,
                            align: 'center',
                            style: 'padding:2px; background: #6C87A8; border-color:white',
                            renderer: function (value, metaData, record) {
                                return `<img src="resources/img/botones/restricted_folder_symbol_stop-16.png"
                                             style="cursor:pointer; width:18px; height:18px;"
                                            >`;
                            },
                            listeners: {
                                click: 'onDeleteDetailPayment'
                            }
                        }
                ],
                // Se mantienen todos los campos en el store (aunque no todos se muestren
                // como columna) porque onDeleteDetailPayment necesita CBATCH/DATEBAT/CCUST/
                // AWBNO/SFILE del registro seleccionado para armar su request.
                store: {
                    fields: [
                        'RN','CCUST','AWBNO','NCICLO','METPAGO','NPAGPAGO','SCOUNTRY',
                        'ADATE','SFILE','NPAGE','MONTO','REFERENCE','PAYDAY','STVAL',
                        'BANDOC','TYPE','SEQ','CBATCH','STATE','USCR','FECR','HOCR',
                        'USUP','FEUP','HOUP'
                    ],
                    data: []
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    style: 'background:#E3F2FD;border-bottom:2px solid #1565C0;',
                    items: [{
                        xtype: 'label',
                        html: '<b style="color:#1565C0;font-size:12px;letter-spacing:1px;">DETAIL TICKETS</b>',
                        style: 'line-height:24px;padding-left:4px;'
                    }]
                }]
            }]
        },
        // ── BANK RECONCILIATION — manual scan ─────────────────────────────
        {
            xtype: 'panel',
            id: prototype.id + '-de-panelScan',
            flex: 1,
            hidden: true,
            border: false,
            layout: {type: 'vbox', align: 'stretch'},
            margin: '8 12 0 12',
            items: [
                {
                    xtype: 'container',
                    html: '<div style="background:linear-gradient(90deg,#2E7D32,#43A047);color:#fff;font-size:11px;font-weight:bold;letter-spacing:2px;padding:5px 14px;border-radius:4px 4px 0 0;">&#128269;&nbsp;BANK RECONCILIATION — MANUAL SCAN</div>'
                },
                {
                    xtype: 'container',
                    style: 'background:#fff;border:1px solid #C8E6C9;border-top:none;border-radius:0 0 4px 4px;box-shadow:0 1px 3px rgba(0,0,0,.07);',
                    padding: '8 10 8 10',
                    items: [
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            margin: '0 0 6 0',
                            defaults: {labelStyle: 'font-weight:bold;color:#2E7D32;font-size:11px;'},
                            items: [
                                {
                                    // Por ahora la unica fuente disponible es "Extractos" (tabla MPF287).
                                    // Se deja como combo para poder sumar otras fuentes a futuro.
                                    xtype: 'combobox',
                                    fieldLabel: 'Source',
                                    id: prototype.id + '-de-scanBANK',
                                    width: 320, labelWidth: 60,
                                    editable: false,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'code',
                                    value: 'EXT',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'EXT', name: 'Extractos'}
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 14},
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'STVAL',
                                    id: prototype.id + '-de-scanSTVAL',
                                    width: 190, labelWidth: 50,
                                    editable: false,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'code',
                                    value: '3',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '',  name: 'All'},
                                            {code: '1', name: '1 - Match'},
                                            {code: '2', name: '2 - Duplicado'},
                                            {code: '3', name: '3 - Pendiente'},
                                            {code: '4', name: '4 - Sin cartera'},
                                            {code: '5', name: '5 - Manual'}
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 14},
                                {xtype: 'textfield',   fieldLabel: 'ADATE',  id: prototype.id + '-de-scanADATE',  width: 200, labelWidth: 60, fieldStyle: 'text-align:center;', maxLength: 8, enforceMaxLength: true, maskRe: /[0-9]/},
                                {xtype: 'tbspacer', width: 14},
                                {xtype: 'numberfield', fieldLabel: 'Amount', id: prototype.id + '-de-scanMONTO',  width: 200, labelWidth: 60, hideTrigger: true, decimalPrecision: 2, allowDecimals: true, fieldStyle: 'text-align:right;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            defaults: {labelStyle: 'font-weight:bold;color:#2E7D32;font-size:11px;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'Account',   id: prototype.id + '-de-scanACCOUNT',   width: 320, labelWidth: 60, fieldStyle: 'text-align:center;', maxLength: 6, enforceMaxLength: true},
                                {xtype: 'tbspacer', width: 14},
                                {xtype: 'textfield', fieldLabel: 'Text',      id: prototype.id + '-de-scanTEXTO',     width: 230, labelWidth: 60, maxLength: 60, enforceMaxLength: true},
                                {xtype: 'tbspacer', width: 14},
                                {xtype: 'textfield', fieldLabel: 'BANDOC',    id: prototype.id + '-de-scanBANDOC',    width: 230, labelWidth: 60, fieldStyle: 'text-align:center;', maxLength: 10, enforceMaxLength: true},
                                {xtype: 'container', flex: 1},
                                {
                                    xtype: 'button',
                                    text: '&#128269;&nbsp;Scan',
                                    id: prototype.id + '-de-btnScan',
                                    scale: 'medium',
                                    style: 'background:#2E7D32;border:1px solid #1B5E20;color:#fff;border-radius:3px;font-weight:bold;',
                                    listeners: {click: 'onScanSearch'}
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-de-gridScan',
                    flex: 1,
                    margin: '8 0 0 0',
                    border: false,
                    selModel: {selType: 'checkboxmodel', mode: 'SINGLE'},
                    viewConfig: {
                        stripeRows: true,
                        variableRowHeight: true,
                        emptyText: '<div style="padding:18px;color:#90A4AE;text-align:center;">Use the filters above and press <b>Scan</b> to find bank movements to reconcile.</div>'
                    },
                    columns: [
                        {text: 'Status',   dataIndex: 'STVAL',   width: 90,  align: 'center',
                            renderer: function (v) {
                                var map = {'1': '1 - Match', '2': '2 - Duplicado', '3': '3 - Pendiente', '4': '4 - Sin cartera', '5': '5 - Manual'};
                                return map[v] || (v || '');
                            }},
                        {text: 'Account',  dataIndex: 'ACCOUNT', width: 90,  align: 'center'},
                        {text: 'BANDOC',   dataIndex: 'BANDOC',  width: 110, align: 'center'},
                        {text: 'ADATE',    dataIndex: 'ADATE',   width: 85,  align: 'center'},
                        {text: 'Amount',   dataIndex: 'NETO',    width: 110, align: 'right',
                            renderer: function (v, m) { m.style = 'text-align:right;font-weight:bold;color:#2E7D32;'; return Ext.util.Format.number(v, '0,000.00'); }},
                        {text: 'Text',     dataIndex: 'TEXTO',    flex: 1, minWidth: 200,
                            renderer: function (v) {
                                return '<div style="white-space:normal;word-break:break-word;line-height:1.3;padding:2px 0;">' + Ext.String.htmlEncode(v || '') + '</div>';
                            }},
                        {text: 'Long Text', dataIndex: 'TEXTOLAR', flex: 2, minWidth: 260,
                            renderer: function (v) {
                                return '<div style="white-space:normal;word-break:break-word;line-height:1.3;padding:2px 0;color:#546E7A;">' + Ext.String.htmlEncode(v || '') + '</div>';
                            }}
                    ],
                    store: {
                        fields: ['RN', 'CCUST', 'STVAL', 'ACCOUNT', 'BANDOC', 'ADATE', 'NETO', 'TEXTO', 'TEXTOLAR'],
                        data: []
                    },
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        style: 'background:#E8F5E9;border-bottom:2px solid #2E7D32;',
                        items: [
                            {xtype: 'label', html: '<b style="color:#2E7D32;font-size:12px;letter-spacing:1px;">BANK MOVEMENTS</b>', style: 'line-height:24px;padding-left:4px;'},
                            '->',
                            {
                                xtype: 'button',
                                text: '&#10003;&nbsp;Reconcile Manually',
                                id: prototype.id + '-de-btnReconcile',
                                scale: 'small',
                                style: 'background:#1B5E20;border:1px solid #145017;color:#fff;border-radius:3px;font-weight:bold;',
                                listeners: {click: 'onReconcileManual'}
                            }
                        ]
                    }]
                }
            ]
        }
            ]
        },
        // ══ RIGHT: live PDF preview (auto-loaded on edit) ═════════════════
        {
            xtype: 'panel',
            id: prototype.id + '-de-pdfPane',
            flex: 1,
            hidden: true,
            border: false,
            bodyStyle: 'background:#37474F;',
            layout: 'fit',
            margin: '8 8 8 0',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                style: 'background:linear-gradient(90deg,#1565C0,#1976D2);',
                items: [
                    {
                        xtype: 'component',
                        id: prototype.id + '-de-pdfTitle',
                        html: '<b style="color:#fff;font-size:12px;letter-spacing:1px;">&#128196;&nbsp;PDF PREVIEW</b>',
                        style: 'line-height:24px;padding-left:4px;'
                    },
                    '->',
                    {
                        xtype: 'button',
                        text: '&#8635;&nbsp;Reload',
                        scale: 'small',
                        style: 'background:#fff;border:1px solid #1565C0;color:#1565C0;border-radius:3px;font-weight:bold;',
                        listeners: {click: 'loadPdfPreview'}
                    }
                ]
            }],
            items: [{
                xtype: 'component',
                id: prototype.id + '-de-pdfFrame',
                autoEl: {
                    tag: 'iframe',
                    src: 'about:blank',
                    frameborder: '0',
                    style: 'width:100%;height:100%;border:none;background:#fff;'
                }
            }]
        }
    ],
    dockedItems: [
        // Buttons — rendered at the very bottom (first bottom-docked = outermost)
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            padding: '6 0',
            layout: {pack: 'center'},
            defaults: {scale: 'medium'},
            items: [
                {text: 'Save',   id: prototype.id + '-btn-save',   iconCls: 'prx-icon-save',   listeners: {click: 'onSaveClick'}},
                {text: 'Update', id: prototype.id + '-btn-update', iconCls: 'prx-icon-update', listeners: {click: 'onUpdateClick'}},
                {text: 'Delete', id: prototype.id + '-btn-delete', hidden: true, iconCls: 'prx-icon-delete', listeners: {click: 'onDeleteClick'}},
                {text: 'Cancel', id: prototype.id + '-btn-cancel', iconCls: 'prx-icon-cancel', listeners: {click: 'onCancelClick'}}
            ]
        },
        // Audit Information — rendered just above buttons (second bottom-docked = above first)
        {
            xtype: 'container',
            dock: 'bottom',
            style: 'background:#ECEFF1;border-top:2px solid #CFD8DC;',
            padding: '6 12 4 12',
            items: [
                {
                    xtype: 'container',
                    html: '<div style="background:linear-gradient(90deg,#546E7A,#607D8B);color:#fff;font-size:11px;font-weight:bold;letter-spacing:2px;padding:4px 14px;border-radius:4px 4px 0 0;">&#9632;&nbsp;AUDIT INFORMATION</div>'
                },
                {
                    xtype: 'container',
                    style: 'background:#fff;border:1px solid #CFD8DC;border-top:none;border-radius:0 0 4px 4px;',
                    padding: '6 10 6 10',
                    layout: {type: 'vbox', align: 'stretch'},
                    items: [
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            defaults: {labelStyle: 'font-weight:bold;color:#546E7A;font-size:11px;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'Created By',    id: prototype.id + '-de-txtUSCR', width: 290, labelWidth: 85, readOnly: true, fieldStyle: 'text-align:center;background:#ECEFF1;color:#607D8B;border-color:#CFD8DC;'},
                                {xtype: 'tbspacer', width: 12},
                                {xtype: 'textfield', fieldLabel: 'Creation Date', id: prototype.id + '-de-txtFECR', width: 290, labelWidth: 95, readOnly: true, fieldStyle: 'text-align:center;background:#ECEFF1;color:#607D8B;border-color:#CFD8DC;'},
                                {xtype: 'tbspacer', width: 12},
                                {xtype: 'textfield', fieldLabel: 'Creation Time', id: prototype.id + '-de-txtHOCR', width: 290, labelWidth: 95, readOnly: true, fieldStyle: 'text-align:center;background:#ECEFF1;color:#607D8B;border-color:#CFD8DC;'}
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {type: 'hbox', align: 'middle'},
                            margin: '4 0 0 0',
                            defaults: {labelStyle: 'font-weight:bold;color:#546E7A;font-size:11px;'},
                            items: [
                                {xtype: 'textfield', fieldLabel: 'Updated By',  id: prototype.id + '-de-txtUSUP', width: 290, labelWidth: 85, readOnly: true, fieldStyle: 'text-align:center;background:#ECEFF1;color:#607D8B;border-color:#CFD8DC;'},
                                {xtype: 'tbspacer', width: 12},
                                {xtype: 'textfield', fieldLabel: 'Update Date', id: prototype.id + '-de-txtFEUP', width: 290, labelWidth: 95, readOnly: true, fieldStyle: 'text-align:center;background:#ECEFF1;color:#607D8B;border-color:#CFD8DC;'},
                                {xtype: 'tbspacer', width: 12},
                                {xtype: 'textfield', fieldLabel: 'Update Time', id: prototype.id + '-de-txtHOUP', width: 290, labelWidth: 95, readOnly: true, fieldStyle: 'text-align:center;background:#ECEFF1;color:#607D8B;border-color:#CFD8DC;'}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
