Ext.define('Ext.Praxis.view.payments.DuplicateSettlementsForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'segmentedbutton',
            id: prototype.id + '-segViewMode',
            width: 180,
            cls: 'segmode',
            value: 0,
            items: [
                {
                    text: 'Duplicates',
                    itemId: 'dashboard'
                },
                {
                    text: 'Removed',
                    itemId: 'detail'
                }
            ],
            listeners: {
                change: 'changeView'
            }
        },
        {xtype: 'tbspacer', width: 20},
        {
            xtype: 'panel',
            id: prototype.id + '-boxPaginacion',
            hidden: false,
            width: 100,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    cls: 'x-toolbar-pag',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-first',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page'

                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin2',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        },
                        {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin3',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                    ]
                }
            ]
        },
        {xtype: 'tbspacer', width: 20},
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search'
                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnFilter',
//                            iconCls: 'prx-icon-filter',
//                            tooltip: 'Display filter'
//
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnAdd',
//                            iconCls: 'prx-icon-add',
//                            tooltip: 'New'
//                        },
//                        {
//                            xtype:'button',
//                            id: prototype.id+'-btnDisplay',
//                            icon: 'resources/img/botones/FalseChart.png',
//                            tooltip: 'Display Charts',
//                            listeners: {
//                                click: 'btnDisplay_click'
//                            }
//                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back'
                        }
                    ]
                }
            ]
        }
    ]
});
Ext.util.CSS.createStyleSheet(`

    /* Contenedor */
    .segmode {
        background-color: transparent !important;
        border: none !important;
        padding: 0 !important;
    }

    /* ------------------- BOTONES BASE ------------------- */
    .segmode .x-btn {
        background-color: #f5f7fa !important;
        border: 1px solid #c9d4e2 !important;
        border-radius: 0 !important;
        color: #1a4d8f !important;
        font-weight: bold;
        font-size: 12px;
        padding: 2px 8px !important;
        margin-right: -1px !important;  /* UNE la cápsula */
        transition: all .2s ease-in-out;
    }

    /* Primer botón redondeado */
    .segmode .x-segmented-button-first {
        border-top-left-radius: 20px !important;
        border-bottom-left-radius: 20px !important;
    }

    /* Último botón redondeado */
    .segmode .x-segmented-button-last {
        border-top-right-radius: 20px !important;
        border-bottom-right-radius: 20px !important;
    }

    /* Hover */
    .segmode .x-btn-over {
        background-color: #e8eef7 !important;
    }

    /* ---------------- BOTÓN SELECCIONADO ---------------- */
    .segmode .x-btn-pressed {
        background: #316fdc !important;           /* Verde del switch */
        background-color: #316fdc !important;
        border-color: #316fdc !important;         /* Un verde más oscuro para el borde */
        color: white !important;                  /* TEXTO BLANCO */
        font-weight: bold !important;             /* TEXTO BOLD */
        z-index: 2 !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
    }

    .segmode .x-btn-pressed .x-btn-inner {
        color: white !important;
    }


`, 'segmode-style');



