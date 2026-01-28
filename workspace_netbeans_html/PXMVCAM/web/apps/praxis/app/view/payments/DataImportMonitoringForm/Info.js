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
            id: prototype.id + '-tabPanel',
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
                            width: 1220,
                            height: 500,
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
                                {text: '#', dataIndex: 'ORDEN', width:50, align: 'center'},
                                {text: 'Source', dataIndex: 'FUENTE', width:60, align: 'center'},
                                {text: 'Description', dataIndex: 'PROCDESC', width: 220, align: 'left'},
                                
                                {text: 'File Date', dataIndex: 'PROCDATE', width: 90, align: 'center',
                                    renderer: function (value) {
                                        // formato 2025-07-01
                                        return value.substring(0, 4) + '-' +
                                               value.substring(4, 6) + '-' +
                                               value.substring(6, 8);
                                    }
                                },

                                {text: 'Country', dataIndex: 'PROCPAIS', width: 90, align: 'center'},

                                {text: 'Program', dataIndex: 'CPROGRAM', width: 100, align: 'center'},
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
                                {text: 'Message', dataIndex: 'PROCMESSAG', width: 300, align: 'left'},
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
                //  TAB 2: CONTROL RPA —
                // ===========================================================
                {
                    title: 'CONTROL RPA',
                    itemId: prototype.id + '-tabRpaControl',
                    listeners: {
                        activate: 'changeViewRPA'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataRPA',
                            margin: '15 0 0 0',
                            height: 215,
                            width: 918,
                            hidden: false,
                            tdCls: 'rpa-buttons-cell',
                            columnLines: true,
                            viewConfig: {
                                enableTextSelection: true
                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: '<span style="color:black;font-weight:bold;">Nbr</span>',
                                        dataIndex: 'RN',
                                        width: 45,
                                        style: 'padding:2px; background:#c9daf5; border-color:white'
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 40,
                                        text: '<span style="color:black;font-weight:bold;">Edit</span>',
                                        style: 'padding:2px; background:#c9daf5; border-color:white',
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    },
                                    {
                                        text: '<span style="color:black;font-weight:bold;">Client</span>',
                                        dataIndex: 'CCUST',
                                        width: 55,
                                        style: 'padding:2px; background:#c9daf5; border-color:white',
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: '<span style="color:black;font-weight:bold;">Robot Name</span>',
                                        dataIndex: 'ROBOTNAME',
                                        width: 100,
                                        style: 'padding:2px; background:#c9daf5; border-color:white',
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: '<span style="color:black;font-weight:bold;">Enabled</span>',
                                        dataIndex: 'STATUSRO',
                                        width: 90,
                                        style: 'padding:2px; background:#c9daf5; border-color:white',
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value === 'A'
                                                    ? '<span class="badge badge-active">ACTIVE</span>'
                                                    : '<span class="badge badge-stopped">INACTIVE</span>';
                                        }
                                    },
                                    {
                                        text: '<span style="color:black;font-weight:bold;">Current Execution</span>',
                                        align: 'center',
                                        style: 'background:#c9daf5; border-color:white',
                                        columns: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Duration</span>',
                                                dataIndex: 'LIVE_RUNNING_SECONDS',
                                                width: 95,
                                                align: 'center',
                                                style: 'background:#c9daf5; border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    // Si es nulo o 0 -> mostrar guion
                                                    if (!value || value === 0) {
                                                        return '<span style="color:#888;">—</span>'; // gris suave
                                                    }

                                                    value = value.toString().padStart(6, '0');
                                                    return `${value.substring(0, 2)}:${value.substring(2, 4)}:${value.substring(4, 6)}`;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Status</span>',
                                                dataIndex: 'LIVE_STATUS', // RUNNING | STOPPED | ERROR | FINISHED | WAITING | IDLE
                                                width: 130,
                                                align: 'center',
                                                style: 'background:#c9daf5; border-color:white',
                                                renderer: function (value) {
                                                    const map = {
                                                        RUNNING: {text: "Running", cls: "badge-status badge-running"},
                                                        ERROR: {text: "Stopped", cls: "badge-status badge-stopped"},
                                                        STOPPED: {text: "Stopped", cls: "badge-status badge-stopped"},
                                                        FINISHED: {text: "Finished", cls: "badge-status badge-finished"},
                                                        WAITING: {text: "Waiting", cls: "badge-status badge-waiting"},
                                                        IDLE: {text: "Idle", cls: "badge-status badge-idle"}
                                                    };
                                                    const item = map[value] || map["IDLE"]; // default
                                                    return `<span class="${item.cls}">${item.text}</span>`;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '<span style="color:black;font-weight:bold;">Actions</span>',
                                        align: 'center',
                                        style: 'background:#c9daf5; border-color:white',
                                        columns: [
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Start</span>',
                                                width: 90,
                                                align: 'center',
                                                style: 'background:#c9daf5; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    const id = record.get('LIVE_ID');
                                                    const enabled = record.get('STATUSRO') === 'A';
                                                    const status = record.get('LIVE_STATUS');

                                                    const canStart = enabled && status !== 'RUNNING';

                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "rpa-buttons-cell";

                                                    return `
                                                        <button class="btn-rpa-icon ${!canStart ? 'btn-rpa-disabled' : ''}"
                                                            data-id="${id}" data-enabled="${enabled}" data-status="${status}"
                                                            data-action="start">
                                                            <img src="resources/img/botones/icon-play.png" class="rpa-icon-lg"/>
                                                        </button>
                                                    `;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Stop</span>',
                                                width: 90,
                                                align: 'center',
                                                style: 'background:#c9daf5; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    const id = record.get('LIVE_ID');
                                                    const enabled = record.get('STATUSRO') === 'A';
                                                    const status = record.get('LIVE_STATUS');

                                                    const canStop = enabled && status === 'RUNNING';

                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "rpa-buttons-cell";

                                                    return `
                                                        <button class="btn-rpa-icon ${!canStop ? 'btn-rpa-disabled' : ''}"
                                                            data-id="${id}" data-enabled="${enabled}" data-status="${status}"
                                                            data-action="stop">
                                                            <img src="resources/img/botones/1337983423_Cancel__Red.png" class="rpa-icon-lg"/>
                                                        </button>
                                                    `;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Restart</span>',
                                                width: 90,
                                                align: 'center',
                                                style: 'background:#c9daf5; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    const id = record.get('LIVE_ID');
                                                    const enabled = record.get('STATUSRO') === 'A';
                                                    const status = record.get('LIVE_STATUS');

                                                    const canRestart = enabled && status === 'RUNNING';

                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "rpa-buttons-cell";

                                                    return `
                                                        <button class="btn-rpa-icon ${!canRestart ? 'btn-rpa-disabled' : ''}"
                                                            data-id="${id}" data-enabled="${enabled}" data-status="${status}"
                                                            data-action="restart">
                                                            <img src="resources/img/botones/1337982080_system-software-update.png" class="rpa-icon-lg"/>
                                                        </button>
                                                    `;
                                                }
                                            },
                                            {
                                                text: '<span style="color:black;font-weight:bold;">Log</span>',
                                                width: 90,
                                                align: 'center',
                                                style: 'background:#c9daf5; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    const id = record.get('LIVE_ID');
                                                    const enabled = true;
                                                    const status = record.get('LIVE_STATUS');

                                                    const canLog = enabled;

                                                    metaData.style = "text-align:center;";
                                                    metaData.tdCls = "rpa-buttons-cell";

                                                    return `
                                                        <button class="btn-rpa-icon ${!canLog ? 'btn-rpa-disabled' : ''}"
                                                            data-id="${id}" data-enabled="${enabled}" data-status="${status}"
                                                            data-action="log">
                                                            <img src="resources/img/botones/log.png" class="rpa-icon-lg"/>
                                                        </button>
                                                    `;
                                                }

                                            }

                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-rpaLogPanel',
                            title: 'Execution Log',
                            height: 270,
                            width: 918,
                            hidden: false,
                            bodyStyle: 'background-color: #000; color: #00FF00; font-family: monospace; font-size: 12px; padding: 8px;',
                            scrollable: true,
                            html: '<span class="log-waiting" style="color:#00FF00;">⏳ Waiting for robot log...</span>'
                        }
                    ]
                }
            ]
        }
    ]
});


// 
// CSS 
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

Ext.util.CSS.createStyleSheet(`
    .section-title {
        font-weight: bold;
        font-size: 13px;
        color: #0B333C;
        text-decoration: underline;
        background-color: #E5ECEF;
        padding: 4px 8px;
        border-radius: 3px;
        display: block;
        margin: 8px 0 4px 8px;
    }
`, 'section-title-style');

Ext.util.CSS.createStyleSheet(`
    /* Contenedor base */
    .badge {
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: bold;
        color: white;
        display: inline-block;
        text-align: center;
        min-width: 65px;
    }

    /* Badge verde – activo */
    .badge-active {
        background-color: #28a745;
    }

    /* Badge rojo – inactivo */
    .badge-inactive {
        background-color: #d9534f;
    }
`, 'badge-status-style');

Ext.util.CSS.createStyleSheet(`

    .badge-status {
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
        color: white;
        display: inline-block;
        min-width: 80px;
        text-align: center;
    }

    .badge-running {
        background-color: #28a745; /* verde */
    }

    .badge-stopped {
        background-color: #6c757d; /* gris */
    }

    .badge-error {
        background-color: #e74c3c; /* rojo */
    }

    .badge-finished {
        background-color: #007bff; /* azul */
    }

    .badge-waiting {
        background-color: #f1c40f; /* amarillo */
        color: black !important;
    }

    .badge-idle {
        background-color: #95a5a6; /* gris claro */
    }

`, 'badge-rpa-status-style');

Ext.util.CSS.createStyleSheet(`
/* CONTENEDOR para que los botones no se peguen abajo */
.rpa-buttons-cell {
    white-space: nowrap;
    padding-top: 4px;
    padding-bottom: 6px;
}

/* ---- BOTÓN BASE ---- */
.btn-rpa {
    border: none;
    border-radius: 12px;        /* Bordes más redondos */
    padding: 6px 16px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    color: white;
    margin: 0 4px;
    transition: all 0.15s ease-in-out;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

/* Iconos dentro del botón */
.btn-rpa i {
    font-style: normal;
}

/* ---- START (Iniciar) ---- */
.btn-rpa-start {
    background-color: #1A73E8;
}
.btn-rpa-start:hover {
    background-color: #0F5AD0;
}

/* ---- STOP (Detener) ---- */
.btn-rpa-stop {
    background-color: #E74C3C;
}
.btn-rpa-stop:hover {
    background-color: #C0392B;
}

/* ---- RESTART (Reiniciar) ---- */
.btn-rpa-restart {
    background-color: #17A589;
}
.btn-rpa-restart:hover {
    background-color: #12806A;
}

/* ---- DESHABILITADO ---- */
.btn-rpa-disabled {
    background-color: #BCC6D3 !important;
    cursor: not-allowed !important;
    color: #6A7683 !important;
    opacity: 0.9;
}
`, 'rpa-buttons-style-v2');

Ext.util.CSS.createStyleSheet(`
    .btn-rpa-icon {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 1px;
        border-radius: 12px;
        transition: background 0.15s;
        margin: 0 1px;
    }

    .btn-rpa-icon:hover {
        background: #e6f0fc;
    }

    .btn-rpa-disabled {
        opacity: 0.35 !important;
        cursor: not-allowed !important;
    }

    .rpa-icon-lg {
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }

    .rpa-buttons-cell {
        white-space: nowrap;
    }
`, 'rpa-icons-modern-style');

Ext.util.CSS.createStyleSheet(`
    @keyframes blink {
        50% { opacity: 0; }
    }
    .log-waiting {
        animation: blink 1s infinite;
    }
`, 'log-style');


