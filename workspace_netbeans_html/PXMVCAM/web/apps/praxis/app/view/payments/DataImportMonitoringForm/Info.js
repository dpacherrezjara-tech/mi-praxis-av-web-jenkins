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
//            bodyStyle: 'background-color: #1A237E;',
            tabPosition: 'top',
            bodyStyle: 'background-color: transparent;',
            defaults: {
                padding: 10,
                layout: {
                    type: 'vbox',
                    align: 'center' 
//                    bodyStyle: 'background-color: #1A237E;' // fondo azul oscuro de cada tab
                },
                 bodyStyle: 'background-color: transparent;' // transparente
            },

            items: [

                // ===========================================================
                //  TAB 1: PROCESADOS DEL DÍA — (tu grid)
                // ===========================================================
                {
                    title: 'PROCESADOS DEL DÍA',
                    itemId: prototype.id + '-tabProcessed',

                    listeners: {
                        activate: function (tab) {
                            const grid = tab.down('grid');
                            if (grid)
                                grid.getStore().load();
                        }
                    },

                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataImport',
                            width: 1065,
                            height: 540,
                            columnLines: true,
                            cls: 'modern-grid',
                            store: Ext.data.StoreManager.lookup(prototype.id + '-store'),

                            style: 'overflow:hidden;',

                            scrollable: true,

                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true

                            },

                            columns: [

//                                {text: 'ID', dataIndex: 'PROCID', width: 70, align: 'center'},

                                {text: 'Description', dataIndex: 'PROCDESC', width: 220, align: 'left'},

                                {text: 'COUNTRY', dataIndex: 'PROCPAIS', width: 90, align: 'center'},

                                {text: 'PROGRAM', dataIndex: 'CPROGRAM', width: 100, align: 'center'},
//                                {text: 'DATE', dataIndex: 'PROCDATE', width: 100, align: 'center'},
                                {
                                    text: 'Status',
                                    dataIndex: 'PROCSTATUS',
                                    width: 120,
                                    align: 'center',
                                    renderer: function (v, metaData) {
                                        let color = '#555', text = v;
                                        if (v === 'I') {
                                            color = '#F1C40F'; // amarillo
                                            text = 'Iniciado';
                                        }
                                        if (v === 'F') {
                                            color = '#2ECC71'; // verde
                                            text = 'Finalizado';
                                        }
                                        if (v === 'E') {
                                            color = '#E74C3C'; // rojo
                                            text = 'Error';
                                        }
                                        metaData.style = `background-color:${color}; color:white; font-weight:bold;`;
                                        return text;
                                    }
                                },
                                {text: 'MESSAGE', dataIndex: 'PROCMESSAG', width: 350, align: 'left'},
                                {
                                    text: 'Begin',
                                    dataIndex: 'PROCINI',
                                    width: 90,
                                    align: 'center',
                                    renderer: function (value) {
                                        if (!value)
                                            return '';
                                        value = value.toString().padStart(6, '0');
                                        return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`;
                                    }
                                },
                                {
                                    text: 'End',
                                    dataIndex: 'PROCFIN',
                                    width: 90,
                                    align: 'center',
                                    renderer: function (value) {
                                        if (!value)
                                            return '';
                                        value = value.toString().padStart(6, '0');
                                        return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`;
                                    }
                                }

                            ]
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
                            html: '<h3 style="color:#777;">En Construccion — usuuu</h3>',
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

    .modern-grid .x-grid-cell {
    border: none !important;
    background-color: #E0F7FA !important; /* celeste claro */
}


    .modern-grid .x-grid-cell {
        font-size: 13px;
        padding: 6px 8px;
        border-right: 1px solid #E0E0E0;
    }
`, 'modern-grid-style');

