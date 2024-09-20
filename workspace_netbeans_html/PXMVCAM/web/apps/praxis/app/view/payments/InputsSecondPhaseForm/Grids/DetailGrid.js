Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.InputsSecondPhase.DetailGridController'
    ],
    controller: 'DetailGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1000,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            //{text: 'Client<br>Name', dataIndex: 'AIRLINE_NAME', width: 120},
            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80},
            {text: 'Load<br>Date', dataIndex: 'FECR', width: 80},
            {text: 'Source', dataIndex: 'DESC_PRO', flex: 1},
            {text: 'Status', dataIndex: 'ESTADO', width: 90,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.tdAttr = `data-qtip="${record.data.VRESULT}"`;
                    const opts = {
                        '': () => {
                            return '<img src="resources/img/icon/16x16/loading_robot.png"/>';
                        },
                        '1': () => {
                            
                            return '<img src="resources/img/icon/16x16/check.png"/>';
                        },
                        '0':() => {
                            return '<img src="resources/img/icon/delete.png"/>';
                        },
                        'E':() => {
                            return '<img src="resources/img/icon/list-error.png"/>';
                        }
                    };
                    return opts[value.trim()]();
                }
            },
            {text: 'Total Records',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                        return value;
                    }
                }, columns: [
                    {text: 'Received', dataIndex: 'TLINEA', width: 70,
                        listeners: {
                            'click': 'onClickReceived'
                        }
                    },
                    {text: 'Loaded', dataIndex: 'TTRNDB', width: 70,
                        listeners: {
                            'click': 'onClickLoaded'
                        }
                    },
                    {text: 'Exonerated', dataIndex: 'TTRNEX', width: 90,
                        listeners: {
                            'click': 'onClickExonerated'
                        }
                    },
                    {text: 'Difference', dataIndex: 'DIFFS', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'background:#A7ECC9;color:red;text-align:center;font-weight: bold;';
                            return value;
                        }
                    }
                ]
            }

            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


