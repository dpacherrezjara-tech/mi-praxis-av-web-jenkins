Ext.define('Ext.Praxis.view.interline.InvoicingDashboardForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInvoicingDashboardForm',
    requires:[
        'Ext.Praxis.controller.interline.InvoicingDashboard.DataEntryInvoicingDashboardController'
    ],
    controller: 'DataEntryInvoicingDashboardController',
    title:'Detail Taxes',
    header:true,
    height:187,
    width:350,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: true
            },
            items:[
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridTaxes',
                    width: 330,
                    height: 132,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Tax', dataIndex: 'A729CODTAX', width: 50
                            },
                            {
                                text: 'Name', dataIndex: 'strNombre', flex: 1, hidden: true,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                }
                            },
                            {
                                text: 'Currency', dataIndex: 'A729MDARES', width: 70
                            },
                            {
                                text: 'Amount', dataIndex: 'A729VALTAX', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: 'Res.Amount', dataIndex: 'A729TAXRES', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ],
    dockedItems:[
    ]
});