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
            cls: 'custom-text-tabs',
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
                    title: 'Procesos del día',
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
                            width: 1075,
                            height: 540,
                            columnLines: true,
                            cls: 'modern-grid',
                            store: Ext.data.StoreManager.lookup(prototype.id + '-store'),

                            // style: 'overflow:hidden;', // Removed to prevent rendering issues
                            bufferedRenderer: false, // Fix for "white screen until scroll" issue

                            scrollable: true,

                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true

                            },

                            columns: [

                                //                                {text: 'ID', dataIndex: 'PROCID', width: 70, align: 'center'},

                                { text: 'Description', dataIndex: 'PROCDESC', width: 220, align: 'left' },

                                { text: 'COUNTRY', dataIndex: 'PROCPAIS', width: 90, align: 'center' },

                                { text: 'PROGRAM', dataIndex: 'CPROGRAM', width: 100, align: 'center' },
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
                                            text = 'En Proceso ...';
                                            metaData.tdCls = 'status-loading-cell'; // Add animation class
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
                                { text: 'MESSAGE', dataIndex: 'PROCMESSAG', width: 350, align: 'left' },
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
                    title: 'Control RPA',
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
    /* .row-green, .row-yellow, .row-red removed for pure white look */

    .modern-grid .x-grid-cell {
        border: none !important;
        background-color: #FFFFFF !important; /* Pure White Background */
    }

    .modern-grid .x-grid-cell {
        font-size: 13px;
        padding: 6px 8px;
        border-right: 1px solid #E0E0E0;
    }

    /* Loading Animation for 'Iniciado' Status */
    @keyframes pulse-opacity {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }

    .status-loading-cell {
        animation: pulse-opacity 1.5s infinite ease-in-out;
    }

    /* TabPanel Active Text Color Change */
    .custom-text-tabs .x-tab-bar {
        background-color: transparent !important;
        border-bottom: 1px solid #ccc !important;
    }
    
    .custom-text-tabs .x-tab-bar-strip { display: none !important; }

    .custom-text-tabs .x-tab {
        background-color: transparent !important;
        border: none !important;
        margin-right: 5px !important;
    }

    .custom-text-tabs .x-tab-inner {
        color: #9E9E9E; /* Opaque/Faded Inactive Text */
        font-weight: normal;
        transition: color 0.3s ease;
    }

    .custom-text-tabs .x-tab-active .x-tab-inner {
        color: #00796B !important; /* Professional Deep Teal */
        font-weight: bold;
        background-color: transparent !important; /* Ensure no background change */
    }
    
    .custom-text-tabs .x-tab-bar-body {
        background: transparent !important;
        border: none !important;
    }
`, 'modern-grid-style');

