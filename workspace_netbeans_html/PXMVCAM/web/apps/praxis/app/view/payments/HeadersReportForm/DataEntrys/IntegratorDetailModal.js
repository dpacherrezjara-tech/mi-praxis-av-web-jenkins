prototype.idDIM = prototype.id + '-IntegratorDetailModal';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.IntegratorDetailModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.IntegratorDetailModal',

    requires: [
        'Ext.Praxis.view.widgets.StoreProcGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.DeliveryGrid',
        'Ext.Praxis.view.payments.HeadersReportForm.Grids.FormateoGrid'
    ],

    /** @cfg {Object} rowData  Full record.data from the HeaderIntegratorGrid row */
    rowData: null,
    /** @cfg {Object} baseParams  Filter params from the integrator (used as MPS294 base params) */
    baseParams: null,

    title: 'File Detail',
    width: 1200,
    height: 700,
    modal: true,
    border: false,
    layout: 'fit',
    resizable: true,
    constrainHeader: true,

    initComponent: function () {
        const me  = this;
        const row = me.rowData   || {};
        const prm = me.baseParams || {};

        // ── Badge helpers ────────────────────────────────────────────────────
        const stproOpts = {
            '1': ['#d3f9d8', '#1a5c1e', 'Found'],
            '0': ['#fff3bf', '#7d5a00', 'Not found']
        };
        const stcarOpts = {
            '':  ['#E6E3E3', '#4C4E57', 'Pending'],
            '1': ['#638be1', '#ffffff', 'Loaded'],
            '2': ['#FFF091', '#ce3232', 'Rejected']
        };

        const stpro = (String(row.STPRO || '')).trim();
        const stcar = (String(row.STCAR || '')).trim();
        const spro  = stproOpts[stpro] || ['#ddd', '#333', stpro || '—'];
        const scar  = stcarOpts[stcar] || ['#ddd', '#333', stcar || '—'];

        const mkBadge = function (text, bg, fg) {
            return '<span style="display:inline-block;background:' + bg +
                   ';color:' + fg + ';font-weight:700;font-size:11px;border-radius:10px;padding:2px 10px;">' +
                   text + '</span>';
        };
        const mkField = function (label, valueHtml) {
            return '<div style="display:inline-flex;flex-direction:column;margin-right:22px;">' +
                   '<span style="color:#9ec6e8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">' +
                   label + '</span>' +
                   '<span style="color:#fff;font-size:12px;font-weight:500;margin-top:3px;">' + valueHtml + '</span>' +
                   '</div>';
        };

        const summaryHtml =
            '<div style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:0;">' +
            mkField('File ID',        Ext.htmlEncode(String(row.FILEID   || '—'))) +
            mkField('File Type',      Ext.htmlEncode(String(row.FILETYPE || '—'))) +
            mkField('Corrl',          Ext.htmlEncode(String(row.CORRL    || '—'))) +
            mkField('File Name',      Ext.htmlEncode(String(row.FILENAME || '—'))) +
            mkField('Qty Rows',       Ext.htmlEncode(String(row.QTYROWS  || '—'))) +
            mkField('Status',         mkBadge(spro[2], spro[0], spro[1])) +
            mkField('Process Status', mkBadge(scar[2], scar[0], scar[1])) +
            '</div>';

        // ── Build storeParams for each tab ───────────────────────────────────
        const deliveryParams = Ext.apply(Ext.apply({}, prm), {
            IN_FILEID: row.FILEID || '', IN_MODE: 'D',
            IN_DATEF: '', IN_DATET: '', IN_FILENAME: '', IN_FILEREF: '', IN_STATUS: ''
        });
        const formateoParams = Ext.apply(Ext.apply({}, prm), {
            IN_FILEID: row.FILEID || '', IN_MODE: 'F',
            IN_DATEF: '', IN_DATET: '', IN_FILENAME: '', IN_FILEREF: '', IN_STATUS: ''
        });

        me.items = [{
            xtype: 'panel',
            layout: 'border',
            border: false,
            items: [
                // ── Summary bar ───────────────────────────────────────────────
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 58,
                    border: false,
                    bodyStyle: 'background:#2c3e50;padding:10px 16px;overflow:hidden;',
                    html: summaryHtml
                },

                // ── Tabs ──────────────────────────────────────────────────────
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    border: false,
                    plain: true,
                    deferredRender: false,
                    items: [
                        {
                            title: 'Delivery',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: prototype.id + '-DeliveryGrid',
                                storeParams: deliveryParams
                            }]
                        },
                        {
                            title: 'Formatted',
                            layout: 'fit',
                            border: false,
                            items: [{
                                xtype: prototype.id + '-FormateoGrid',
                                storeParams: formateoParams
                            }]
                        }
                    ]
                }
            ]
        }];

        me.callParent(arguments);
    }
});
