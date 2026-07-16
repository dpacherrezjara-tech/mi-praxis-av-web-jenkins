prototype.id = 'ReverseAccountingForm';
prototype.url = CONTEXTPATH + '/ReverseAccounting';
prototype.width = 1850;
prototype.height = 630;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.ReverseAccountingForm.ReverseAccountingForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ReverseAccountingForm',
    requires: [
        'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingController',
        'Ext.Praxis.view.payments.ReverseAccountingForm.Options',
        'Ext.Praxis.view.payments.ReverseAccountingForm.Filters',
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingGridController'
    ],
    controller: 'ReverseAccountingController',
    layout: { type: 'fit' },
    border: false,
    defaults: { border: false },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: prototype.width,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: { type: 'vbox', align: 'center' },
                                    border: true,
                                    autoScroll: true,
                                    defaults: { width: prototype.width, align: 'center' },
                                    items: [
                                        { xtype: prototype.id + '-options' },
                                        {
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            border: false,
                                            defaults: { width: prototype.width, align: 'center' },
                                            items: [
                                                { xtype: prototype.id + '-filters' }
                                            ]
                                        },
                                        {
                                            xtype: 'storeprocgrid',
                                            id: prototype.id + '-mainGrid',
                                            library: 'PRAXISMP',
                                            storeProcedure: 'MPS117',
                                            height: prototype.height,
                                            width: prototype.width,
                                            pageSize: 15,
                                            autoSearch: false,
                                            storeParams: {
                                                IN_FROM: Ext.Date.format(new Date(anioActual, mesActual, 1), 'Ymd'),
                                                IN_TO: Ext.Date.format(new Date(), 'Ymd'),
                                                IN_PROCESO: 'TC', IN_ACCTYPE: 'REG', IN_STATUS: '',
                                                IN_IDCONT: '', IN_HEADER: '', IN_CODREC: ''
                                            },
                                            showExcelButton: true,
                                            customController: 'Ext.Praxis.controller.payments.ReverseAccounting.ReverseAccountingGridController',
                                            rowActions: [
                                                { action: 'edit', icon: 'prx-icon-edit', tooltip: 'Detail' }
                                            ],
                                            gridColumns: {
                                                defaults: { align: 'center', menuDisabled: true, sortable: true },
                                                items: [
                                                    {
                                                        text: 'RN',
                                                        locked: true,
                                                        xtype: 'rownumberer',
                                                        width: 40
                                                    },
                                                    { text: 'Proceso', dataIndex: 'PROCESO', width: 80 },
                                                    {
                                                        text: 'Acc. Type', dataIndex: 'TIPOCON', width: 100,
                                                        renderer: function (v) {
                                                            const map = {
                                                                REG: 'Regular', DEB: 'Debit', ADJ: 'Adjustment',
                                                                SAL: 'Sale W/O Settl.', ADM: 'ADM', REV: 'Reversal',
                                                                CHK: 'Check', ARC: 'Neg. Balance'
                                                            };
                                                            return map[v] || v;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'STREJ', width: 90,
                                                        renderer: function (v, m) {
                                                            if (v === 'R') {
                                                                m.style = 'background:#f8d7da;color:#721c24;border-radius:4px;padding:2px 6px;font-weight:bold;';
                                                                return 'Rejected';
                                                            }
                                                            m.style = 'background:#d4edda;color:#155724;border-radius:4px;padding:2px 6px;font-weight:bold;';
                                                            return 'Manual Reject';
                                                        }
                                                    },
                                                    { text: 'Accounting ID', dataIndex: 'IDCONT', width: 200 },
                                                    { text: 'Header', dataIndex: 'HEADER', width: 180 },
                                                    { text: 'Reference', dataIndex: 'REFER', width: 150 },
                                                    { text: 'Error Code', dataIndex: 'CODREC', width: 100 },
                                                    { text: 'Observation', dataIndex: 'OBSERV', width: 350 },
                                                    { text: 'File ID', dataIndex: 'FILEID', width: 120 },
                                                    {
                                                        text: 'Created', dataIndex: 'TSCR', width: 160,
                                                        renderer: function (v) { return v ? global.formatTimeStamp(v) : v; }
                                                    },
                                                    {
                                                        text: 'BPO Status', dataIndex: 'STREVI', width: 90,
                                                        renderer: function (v, m) {
                                                            if (v === 'Y') {
                                                                m.style = 'background:#d4edda;color:#155724;border-radius:4px;padding:2px 6px;font-weight:bold;';
                                                                return 'Revisado';
                                                            }
                                                            m.style = 'background:#f8d7da;color:#721c24;border-radius:4px;padding:2px 6px;font-weight:bold;';
                                                            return 'Pendiente';
                                                        }
                                                    },
                                                    { dataIndex: 'BANDOC', hidden: true },
                                                    { dataIndex: 'DATECI', hidden: true },
                                                    { dataIndex: 'TRANCI', hidden: true }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
