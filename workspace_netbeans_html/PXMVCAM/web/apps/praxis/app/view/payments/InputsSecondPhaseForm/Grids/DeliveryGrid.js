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
        enableTextSelection: true,
        stripeRows: false, // Eliminar el efecto de rayas alternas
        listeners: {
            refresh: function(view) {
                // Acceder a cada fila del grid y eliminar los bordes
                view.getEl().query('.x-grid-item').forEach(function(row) {
                    row.style.borderBottom = 'none';
                });
            }
        }
    },
    //columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {text: 'Client<br>Code', dataIndex: 'CCUST', width: 70},
            {text: 'Row<br>Number', dataIndex: 'REG', width: 80},
            {text: 'Delivery Line', dataIndex: 'MAXLONG', flex: 1, 
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = 'text-align:left;';
                    return value;
                }
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


