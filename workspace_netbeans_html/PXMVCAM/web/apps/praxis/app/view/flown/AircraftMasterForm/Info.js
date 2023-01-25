Ext.define('Ext.Praxis.view.flown.AircraftMasterForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1537,
                height: 500,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    store: Ext.create('Ext.Praxis.store.flown.AircraftMaster.GridData'),
                    height: 507,
                    columnLines: true,                     
                    columns:{
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items:[
                            {text: 'Nbr', dataIndex: 'RN', width: 40},
                            {text: 'Equipment', dataIndex: 'EQUIPO', width: 80},
                            {text: 'Model', dataIndex: 'MODELO', width: 80},
                            {text: 'Number', dataIndex: 'NUMERO', width: 60},
                            {
                                text: 'Registration',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Number', dataIndex: 'MATRIC', width: 90}
                                ]
                            },
                            {text: 'Carrier', dataIndex: 'CARRIER', width: 60},
                            {text: 'Type', dataIndex: 'TIPO', width: 40},
                            {
                                text: 'Manufacture',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', dataIndex: 'FECHA', width: 85}
                                ]
                            },
                            {
                                text: 'Operation',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Start Date', dataIndex: 'FECHAOP', width: 80}
                                ]
                            },
                            {
                                text: 'Contract',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Start Date', dataIndex: 'FECINICO', width: 80},
                                    {text: 'End Date', dataIndex: 'FECFINCO', width: 80}
                                ]
                            },
                            {
                                text: 'Time',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'of Flight', dataIndex: 'HORAVLO', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Seats Number',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Pax F', dataIndex: 'PAXF', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {text: 'Pax J', dataIndex: 'PAXJ', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {text: 'Pax Y', dataIndex: 'PAXY', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {text: 'Total Pax', dataIndex: 'PAX', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Total',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Miles', dataIndex: 'TOTMILL', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {text: 'Gallons', dataIndex: 'TOTGALO', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {text: 'Charge', dataIndex: 'TOTCARG', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Weight', dataIndex: 'PESO', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    return value;
                                }
                            },
                            {
                                text: 'Maximum',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Weight', dataIndex: 'PESOMAX', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Status', dataIndex: 'IN_FECHA_TO', width: 70},
                            {
                                text: 'Edit',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 50,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

