Ext.define('Ext.Praxis.view.payments.CargoGuideForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCargoGuideForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoGuide.DataEntryCargoGuideController'
    ],
    controller: 'DataEntryCargoGuideController',
    title: 'Cargo Guide — Data Entry',
    header: true,
    height: 530,
    width: 960,
    resizable: true,
    layout: {type: 'vbox', align: 'stretch'},
    modal: true,
    border: false,
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
                            {xtype: 'textfield', fieldLabel: 'RN',       id: prototype.id + '-de-txtRN',      width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'Customer', id: prototype.id + '-de-txtCCUST',   width: 290, labelWidth: 72, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'ADATE',    id: prototype.id + '-de-txtADATE',   width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'}
                        ]},
                        {items: [
                            {xtype: 'textfield', fieldLabel: 'Pay Day',  id: prototype.id + '-de-txtPAYDATE', width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'Country',  id: prototype.id + '-de-txtCOUNTRY', width: 290, labelWidth: 72, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'Cycle',    id: prototype.id + '-de-txtNCICLO',  width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'}
                        ]},
                        {items: [
                            {xtype: 'textfield', fieldLabel: 'METPAGO', id: prototype.id + '-de-txtMETPAGO', width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'NPAGE',   id: prototype.id + '-de-txtNPAGE',   width: 290, labelWidth: 72, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'CUSCA',   id: prototype.id + '-de-txtCUSCA',   width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'}
                        ]},
                        {items: [
                            {xtype: 'textfield', fieldLabel: 'CODPSE', id: prototype.id + '-de-txtCODPSE', width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'BANDOC', id: prototype.id + '-de-txtBANDOC', width: 290, labelWidth: 72, fieldStyle: 'text-align:center;'},
                            {xtype: 'tbspacer', width: 14},
                            {xtype: 'textfield', fieldLabel: 'STATE',  id: prototype.id + '-de-txtSTATE',  width: 290, labelWidth: 60, fieldStyle: 'text-align:center;'}
                        ]}
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
                            text: '&#128196;&nbsp;Preview PDF',
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
            flex: 1,
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
                    {text: 'AWB No',       dataIndex: 'AWBNO',     width: 140},
                    {text: 'Cycle',        dataIndex: 'NCICLO',    width: 55,  align: 'center'},
                    {text: 'METPAGO',      dataIndex: 'METPAGO',   width: 80,  align: 'center'},
                    {text: 'ADATE',        dataIndex: 'ADATE',     width: 80,  align: 'center'},
                    {text: 'Pay Day',      dataIndex: 'PAYDAY',    width: 80,  align: 'center'},
                    {text: 'File (SFILE)', dataIndex: 'SFILE',     flex: 1,
                        renderer: function(v, m) { m.style = 'font-size:11px;'; return v; }},
                    {text: 'Reference',    dataIndex: 'REFERENCE', width: 110},
                    {text: 'Amount',       dataIndex: 'MONTO',     width: 115, align: 'right',
                        renderer: function(v, m) {
                            m.style = 'text-align:right;font-weight:bold;color:#1565C0;';
                            return Ext.util.Format.number(v, '0,000.00');
                        }},
                    {text: 'Batch',        dataIndex: 'CBATCH',    width: 70,  align: 'center',
                        renderer: function(v, m) {
                            m.style = 'text-align:center;color:#1565C0;font-weight:bold;';
                            return v;
                        }},
                    {text: 'State',        dataIndex: 'STATE',     width: 55,  align: 'center'}
                ],
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
                        html: '<b style="color:#1565C0;font-size:12px;letter-spacing:1px;">MPF291 — LINKED RECORDS</b>',
                        style: 'line-height:24px;padding-left:4px;'
                    }]
                }]
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
