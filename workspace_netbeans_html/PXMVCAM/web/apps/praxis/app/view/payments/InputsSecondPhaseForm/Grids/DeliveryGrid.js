Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.Grids.DeliveryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DeliveryGrid',
    requires: [
        'Ext.Praxis.controller.payments.InputsSecondPhase.DeliveryGridController'
    ],
    controller: 'DeliveryGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: '100%',
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
            {text: 'Line', dataIndex: 'MAXLONG', flex: 1},
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Delivery',
                        handler: 'onClickDelivery'
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
            },
            {
                xtype: 'button',
                scale: 'small',
                id: prototype.id + '-delivery-btnBack',
                iconCls: 'prx-icon-back',
                width: 25,
                hidden: true,
                tooltip: 'Back'
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


