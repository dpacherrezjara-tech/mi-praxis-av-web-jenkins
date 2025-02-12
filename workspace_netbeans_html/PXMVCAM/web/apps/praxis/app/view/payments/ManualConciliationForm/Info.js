var controller = {
    select: function (value, row) {
        var dataStore = Ext.getCmp(prototype.id + '-gridDataMain').getStore();
        var dataRow = dataStore.data.items[row].data;
        //console.log(dataRow);
        var name = dataRow.DESCRIPT;
        if (dataRow.select === true) {
            storeList.remove(storeList.findRecord('DESCRIPT', name));
            dataRow.select = false;
        } else {
            dataRow.select = true;
            storeList.add(dataRow);
        }
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(dataStore);
    }
};
var storeCombo = Ext.create('Ext.data.SimpleStore', {
    fields: ['code', 'name'],
    data: [
        ["", ""],
        ["ASC", "ASC"],
        ["DESC", "DESC"]
    ]
});
var storeList = Ext.create('Ext.data.SimpleStore', {
    id: prototype.id + '-storeList',
    fields: ['name'],
    data: [
    ]
});

Ext.define('Ext.Praxis.view.payments.ManualConciliationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '10px 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1790,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            id: prototype.id + '-gridDataMain',
                                            width: 1780,
                                            height: 500,
                                            columnLines: true,
                                            viewConfig: {
                                                preserveScrollOnRefresh: true,
                                                preserveScrollOnReload: true
                                            },
                                            bufferedRenderer: true,
                                            plugins: [
                                                Ext.create('Ext.grid.plugin.CellEditing', {
                                                    clicksToEdit: 1,
                                                    selectOnEdit: true,
                                                    gridcellediting: true
                                                })
                                            ],
                                            reserveScrollbar: true,
                                            useArrows: true,
                                            rootVisible: false,
                                            multiSelect: true,
                                            rowLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Key Concil', dataIndex: 'UNIKEY', width: 180, align: 'center', menuDisabled: true, xtype: 'treecolumn',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;"; 
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.SCARDN + '"';
                                                            value = data.SCARDN;
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Ticket', dataIndex: 'TKT', width: 130, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Qty<br>Tkt', dataIndex: 'QTY', width: 50, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataTeleworking').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TotlngQTYTKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataTeleworking').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TotdblSVFOPTKT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount TKT', dataIndex: 'SVFOP_100', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataTeleworking').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TotdblSVFOPTKT, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr.', dataIndex: 'SCURRENCY', width: 60, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Doc<br>Type', dataIndex: 'TDOC', width: 60, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'SDATE', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Abono<br>Date', dataIndex: 'PAYDATE', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Bank<br>Code', dataIndex: 'CODEBANK', width: 70, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Merchand', dataIndex: 'MERCHNC', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Account<br>Number', dataIndex: 'ACCNUMBER', width: 130, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Terminal', dataIndex: 'TERMI', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 90, align: 'center', menuDisabled: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strSORIG + '"';
                                                            return value;
                                                        }
                                                    }, 
                                                    {
                                                        text: 'Credit Card',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'SCARCOD', width: 55, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    var data = record.data;
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'SCARDN', width: 150, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Auth. Code', dataIndex: 'SAUTHOC', width: 90, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Seq', dataIndex: 'SEQNUM', width: 50, align: 'center', menuDisabled: true,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'View',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'View',
                                                                handler: 'onEditClick',
                                                                getClass: function (value, meta, record) {
                                                                    return record.isLeaf() ? 'x-hidden' : 'prx-icon-edit';
                                                                }

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Select',
                                                        width: 50,
                                                        dataIndex: 'select',
                                                        headerCheckbox: true,
                                                        renderer: function (value, meta, record, row, col) {
                                                            if (record.isLeaf()) {
                                                                return '';
                                                            }
                                                            var checked = record.data.select ? 'checked' : '';
                                                            return '<input type="checkbox" ' + checked + ' onclick="controller.select(this.checked,' + row + ')">';
                                                        }
                                                    }

                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-paginacion',
                                            margin: '2px 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: false,
                                            width: 1132,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 572,
                                                    height: 25,
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    defaults: {
                                                        xtype: 'label'
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Page',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-currentPage',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total',
                                                            text: '0',
                                                            width: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


