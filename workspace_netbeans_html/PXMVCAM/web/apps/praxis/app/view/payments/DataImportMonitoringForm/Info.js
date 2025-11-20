Ext.define('Ext.Praxis.view.payments.DataImportMonitoringForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F3F5F7; border: none;',

    items: [

        // ===================================================================
        //   TAB PANEL PRINCIPAL — PROCESADOS DEL DÍA PRIMERO
        // ===================================================================
        {
            xtype: 'tabpanel',
            region: 'center',
            margin: '15 0 0 0',
            tabPosition: 'top',
            bodyStyle: 'background-color: transparent;',
            defaults: {
                padding: 10,
                layout: {
                    type: 'vbox',
                    align: 'center'
                }
            },

            items: [

                // ===========================================================
                //  TAB 1: PROCESADOS DEL DÍA — (tu grid)
                // ===========================================================
                {
                    title: 'PROCESADOS DEL DÍA',
                    itemId: prototype.id + '-tabProcessed',

                    items: [

                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataImport',
                            width: 1100,
                            height: 520,
                            columnLines: true,
                            cls: 'modern-grid',

                            store: Ext.data.StoreManager.lookup(prototype.id + '-store'),

                            style: 'border-radius:10px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.18);',

                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true,
                                getRowClass: function (record) {
                                    const st = record.get('PROCSTATUS');
                                    if (st === 'F') return 'row-green';
                                    if (st === 'I') return 'row-yellow';
                                    if (st === 'E') return 'row-red';
                                }
                            },

                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-weight:bold; font-size:13px; background:#F8FAFB;'
                                },
                                items: [

                                    { text: 'ID', dataIndex: 'PROCID', width: 70 },

                                    { text: 'PROCESS NAME', dataIndex: 'PROCNAME', width: 140, align: 'left' },

                                    { text: 'DESCRIPTION', dataIndex: 'PROCDESC', width: 260, align: 'left' },

                                    {
                                        text: 'STATUS',
                                        dataIndex: 'PROCSTATUS',
                                        width: 110,
                                        renderer: function (v) {
                                            let color = '#555';
                                            let text = v;

                                            if (v === 'I') { color = '#F1C40F'; text = 'Iniciado'; }
                                            if (v === 'F') { color = '#2ECC71'; text = 'Finalizado'; }
                                            if (v === 'E') { color = '#E74C3C'; text = 'Error'; }

                                            return `<span style="font-weight:bold;color:${color};">${text}</span>`;
                                        }
                                    },

                                    { text: 'COUNTRY', dataIndex: 'PROCPAIS', width: 80 },

                                    { text: 'MESSAGE', dataIndex: 'PROCMESSAG', width: 300, align: 'left' },

                                    { text: 'PROGRAM', dataIndex: 'CPROGRAM', width: 90 },

                                    { text: 'DATE', dataIndex: 'PROCDATE', width: 90 },

                                    {
                                        text: 'BEGIN',
                                        dataIndex: 'PROCINI',
                                        width: 90,
                                        renderer: function (value) {
                                            if (!value) return '';
                                            value = value.toString().padStart(6, '0');
                                            return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`;
                                        }
                                    },
                                    {
                                        text: 'END',
                                        dataIndex: 'PROCFIN',
                                        width: 90,
                                        renderer: function (value) {
                                            if (!value) return '';
                                            value = value.toString().padStart(6, '0');
                                            return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`;
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },

                // ===========================================================
                //  TAB 2: CONTROL RPA — (vacío)
                // ===========================================================
                {
                    title: 'CONTROL RPA',
                    itemId: prototype.id + '-tabRpaControl',

                    items: [
                        {
                            xtype: 'panel',
                            html: '<h3 style="color:#777;">En desarrollo — esta sección se usará más adelante</h3>',
                            border: false
                        }
                    ]
                }
            ]
        }
    ]
});


// 
// CSS PARA COLOREAR LAS FILAS
// 
Ext.util.CSS.createStyleSheet(`
    .row-green .x-grid-cell { background-color:#D4EFDF !important; }
    .row-yellow .x-grid-cell { background-color:#FCF3CF !important; }
    .row-red .x-grid-cell { background-color:#F5B7B1 !important; }

    .modern-grid .x-grid-header-ct {
        background: #F8FAFB !important;
        font-weight: bold;
        font-size: 13px;
    }
`, 'modern-grid-style');
