valor = '0';
Ext.define('Ext.Praxis.view.payments.SourceControlForm.Info', {
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
                width: 1200,
                height: 700,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 570,
                            width: 874,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    height: 510,
                                    width: 874,
                                    hidden: false,
                                    columnLines: true,
                                    margin: '0 0 0 0 ',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {id: prototype.id + '-columnTitle',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Process',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'strFormatDate', width: 90},
                                                            {text: 'Hour', dataIndex: 'strFecha', width: 90}
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Movements', dataIndex: 'QCPNOD', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data['strDesFCLOFO'].trim();
                                                                    if (color.trim() !== '')
                                                                        color = '#FF0000';
                                                                    else
                                                                        color = '#000000';

                                                                    metaData.style = "text-align:right;" + "color:" + color;
                                                                    return Ext.util.Format.number(value, '0,000,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Day', dataIndex: 'QCPNVC', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data['strDesFCLOFO'].trim();
                                                                    if (color.trim() !== '')
                                                                        color = '#FF0000';
                                                                    else
                                                                        color = '#000000';

                                                                    metaData.style = "text-align:right;" + "color:" + color;
                                                                    return Ext.util.Format.number(value, '0,000,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Final', dataIndex: 'QCPNOCR', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data['strDesFCLOFO'].trim();
                                                                    if (color.trim() !== '')
                                                                        color = '#FF0000';
                                                                    else
                                                                        color = '#000000';

                                                                    metaData.style = "text-align:right;" + "color:" + color;
                                                                    return Ext.util.Format.number(value, '0,000,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center',
                                                            border: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Registered', dataIndex: 'QCPNMA', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var color = record.data['strDesFCLOFO'].trim();
                                                                    if (color.trim() !== '')
                                                                        color = '#FF0000';
                                                                    else
                                                                        color = '#000000';

                                                                    metaData.style = "text-align:right;" + "color:" + color;
                                                                    return Ext.util.Format.number(value, '0,000,000');
                                                                }

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Difference', dataIndex: 'QCPNTOT', width: 110,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = record.data['strDesFCLOFO'].trim();
                                                            if (color.trim() !== '')
                                                                color = '#FF0000';
                                                            else
                                                                color = '#000000';

                                                            metaData.style = "text-align:right;" + "color:" + color;
                                                            return Ext.util.Format.number(value, '0,000,000');
                                                        }

                                                    },
                                                    {text: 'Message', dataIndex: 'strDescripcion', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion+'"';
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Edit',
                                                        align: 'center',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var strSQL = record.data['strSQL'].trim();
                                                            //console.log(store);
                                                            if (strSQL.trim() === '1') {
                                                                return '<a href="#payments-source-control-form" > <img src="resources/img/botones/1326498593_018.png" width="14px"  onClick="me.onEditClick(' + rowIndex + ')"/></a>';
                                                            } else {
                                                                return '<img src="resources/img/botones/16x16/lapiz_blanco.png" width="14px" />';
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
//                                {xtype: 'tbspacer', width: 7, height: 10},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary',
                                    width: 874,
                                    align: 'left',
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        align: 'center',
                                        html: '' + '&nbsp',
                                        height: 25,
                                        padding: '5 5 5 0',
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                    },
                                    items: [
                                        {width: 280, id: prototype.id + '-tot_QCPNOD'},
                                        {width: 100, id: prototype.id + '-tot_QCPNVC'},
                                        {width: 100, id: prototype.id + '-tot_QCPNOCR'},
                                        {width: 100, id: prototype.id + '-tot_QCPNMA'},
                                        {width: 110, id: prototype.id + '-tot_QCPNTOT'},
                                        {width: 182}
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


