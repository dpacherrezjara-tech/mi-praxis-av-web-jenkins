Ext.define('Ext.Praxis.view.payments.CargoGuideForm.MPF291LinkForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.MPF291LinkForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoGuide.MPF291LinkController'
    ],
    controller: 'MPF291LinkController',
    title: 'Link MPF291 Records',
    height: 540,
    width: 980,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {border: false},
    items: [
        {
            xtype: 'panel',
            layout: {type: 'vbox', align: 'stretch'},
            bodyPadding: '10 14 6 14',
            items: [
                // ── Header info (MPF295 context) ──────────────────────
                {
                    xtype: 'container',
                    id: prototype.id + '-lnk-headerInfo',
                    style: 'background:#EBF4FB; border-left:4px solid #2196F3; border-radius:3px; padding:8px 14px; margin-bottom:10px;',
                    html: '<span style="color:#546e7a; font-size:12px;">Loading context...</span>'
                },
                // ── Grid MPF291 ───────────────────────────────────────
                {
                    xtype: 'grid',
                    id: prototype.id + '-lnk-gridMPF291',
                    flex: 1,
                    border: true,
                    selModel: {
                        selType: 'checkboxmodel',
                        mode: 'MULTI',
                        showHeaderCheckbox: true
                    },
                    columns: [
                        {
                            text: 'RN',
                            dataIndex: 'RN',
                            width: 55,
                            align: 'right',
                            renderer: function (v, m) {
                                m.style = 'text-align:right';
                                return Ext.util.Format.number(v, '0,000');
                            }
                        },
                        {
                            text: 'AWB No',
                            dataIndex: 'AWBNO',
                            width: 120,
                            renderer: function (v, m) { m.style = 'text-align:left'; return v; }
                        },
                        {
                            text: 'Customer',
                            dataIndex: 'CCUST',
                            width: 80,
                            renderer: function (v, m) { m.style = 'text-align:left'; return v; }
                        },
                        {
                            text: 'Cycle',
                            dataIndex: 'NCICLO',
                            width: 60,
                            renderer: function (v, m) { m.style = 'text-align:center'; return v; }
                        },
                        {
                            text: 'ADATE',
                            dataIndex: 'ADATE',
                            width: 80,
                            renderer: function (v, m) { m.style = 'text-align:center'; return v; }
                        },
                        {
                            text: 'Pay Day',
                            dataIndex: 'PAYDAY',
                            width: 80,
                            renderer: function (v, m) { m.style = 'text-align:center'; return v; }
                        },
                        {
                            text: 'File (SFILE)',
                            dataIndex: 'SFILE',
                            width: 160,
                            renderer: function (v, m) { m.style = 'text-align:left; font-size:11px;'; return v; }
                        },
                        {
                            text: 'Reference',
                            dataIndex: 'REFERENCE',
                            width: 110,
                            renderer: function (v, m) { m.style = 'text-align:left'; return v; }
                        },
                        {
                            text: 'Amount',
                            dataIndex: 'MONTO',
                            width: 100,
                            align: 'right',
                            renderer: function (v, m) {
                                m.style = 'text-align:right';
                                return Ext.util.Format.number(v, '0,000.00');
                            }
                        },
                        {
                            text: 'State',
                            dataIndex: 'STATE',
                            width: 55,
                            renderer: function (v, m) { m.style = 'text-align:center'; return v; }
                        },
                        {
                            text: 'Batch',
                            dataIndex: 'CBATCH',
                            width: 70,
                            renderer: function (v, m) {
                                m.style = 'text-align:center';
                                if (v && v !== '') {
                                    m.style += ';color:#1565C0; font-weight:bold;';
                                }
                                return v;
                            }
                        }
                    ],
                    store: {
                        fields: [
                            'RN','CCUST','AWBNO','NCICLO','METPAGO','NPAGPAGO','SCOUNTRY',
                            'ADATE','SFILE','NPAGE','MONTO','REFERENCE','PAYDAY','STVAL',
                            'BANDOC','TYPE','SEQ','CBATCH','STATE','USCR','FECR','HOCR',
                            'USUP','FEUP','HOUP'
                        ],
                        data: []
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '8 0 8 0',
            layout: {pack: 'center'},
            defaults: {scale: 'medium'},
            items: [
                {
                    text: 'Link Selected',
                    id: prototype.id + '-lnk-btnLink',
                    iconCls: 'prx-icon-update',
                    disabled: true,
                    listeners: {click: 'onLinkClick'}
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-lnk-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {click: 'onCancelClick'}
                }
            ]
        }
    ]
});
