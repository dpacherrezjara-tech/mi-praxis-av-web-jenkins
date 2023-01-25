Ext.define('Ext.Praxis.view.payments.InputsCatalogForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
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
                width: 1510,
//                height: 516,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            margin: '0 0 0 5',
                            height: 610,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    height: 522,
                                    width: 1500,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Aplication',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Group', dataIndex: 'APLIC', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Seq', dataIndex: 'SEQNUM', width: 70,hidden:true,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'descSTAT', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Shipping',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Days', dataIndex: 'DENV', width: 135,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            var valueS = "";
                                                            if(value.includes('1')){
                                                                valueS = 'L';
                                                            }
                                                            if(value.includes('2')){
                                                                valueS = valueS + ' - M';
                                                            }
                                                            if(value.includes('3')){
                                                                valueS = valueS + ' - Mi';
                                                            }
                                                            if(value.includes('4')){
                                                                valueS = valueS + ' - J';
                                                            }
                                                            if(value.includes('5')){
                                                                valueS = valueS + ' - V';
                                                            }
                                                            if(value.includes('6')){
                                                                valueS = valueS + ' - S';
                                                            }
                                                            if(value.includes('7')){
                                                                valueS = valueS + ' - D';
                                                            }
                                                            value = valueS;
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Net',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Directory', dataIndex: 'NETDIR', width: 220,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Input',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Name', dataIndex: 'INPNAME', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Extension', dataIndex: 'descINPEXTE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Type', dataIndex: 'descINPTYPE', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'INPDESC', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Library', dataIndex: 'LIBNAME', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Output <br> Name', dataIndex: 'OUTNAME', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Date Last',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Process', dataIndex: 'FECPROC', width: 85,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Table', dataIndex: 'TABLA', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Qty.Record',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Unprocessed', dataIndex: 'QTYREG', width: 90,hidden:true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    }
                                                ]
                                            },
                                            {text: 'Phase', dataIndex: 'descFASE', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
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
                                ,
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-pie',
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    border: true,
//                                    height: 25,
//                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 1px 0px 1px'
//                                    },
//                                    padding: '1px 1px 1px 1px',
//                                    items: [
//                                        {
//                                            xtype: 'panel',
//                                            id: prototype.id + '-panelPie',
//                                            width: 780,
//                                            height: 25,
//                                            layout: {
//                                                type: 'hbox',
//                                                pack: 'center'
//                                            },
//                                            defaults: {
//                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
//                                            },
//                                            items: [
//                                                {
//                                                    text: 'Page',
//                                                    width: 50
//                                                },
//                                                {
//                                                    id: prototype.id + '-lbl-currentPage',
//                                                    text: '1',
//                                                    width: 50
//                                                },
//                                                {
//                                                    text: 'Of',
//                                                    width: 50
//                                                },
//                                                {
//                                                    id: prototype.id + '-lbl-pageCount',
//                                                    text: '0',
//                                                    width: 50
//                                                },
//                                                {xtype: 'tbspacer', width: 100},
//                                                {
//                                                    text: 'Total found',
//                                                    width: 80
//                                                },
//                                                {
//                                                    id: prototype.id + '-lbl-total',
//                                                    text: '0',
//                                                    width: 50
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                }
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
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            }
        }
    ]
}
);


