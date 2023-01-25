/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.FrequentFlyerForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain0',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1 0 0 10',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1 0 0 10',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
//                        {
//                            xtype: 'label',
//                            id: prototype.id + '-labelTitle',
//                            labelAlign: 'center',
//                            labelStyle: 'color:#231223',
//                            align: 'center',
//                            margin: '10 0 0 0',
//                            hide: true
//                        },
                                // --------------------------   GRID MAIN DATA---------------------
                                //-----------------------------------------------------------------
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 530,
                                    width: 1464,
                                    columnLines: true,
                                    resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Clearing<br> Date', width: 80, dataIndex: 'strFormatDate'},
                                            {text: 'Period', width: 60, dataIndex: 'PERMONT'},
                                            {text: 'Air', width: 60, dataIndex: 'AIRLINE'},
                                            {text: 'Ticket', width: 150, dataIndex: 'strDescripcion'},
                                            {text: 'Invoice', width: 100, dataIndex: 'INVOICE'},
                                            {text: 'Fare<br>base', width: 100, dataIndex: 'strDescripcion4'},
                                            {text: 'PNR', width: 90, dataIndex: 'strFlag'},
                                            {text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', width: 80, dataIndex: 'strFormatDate1'},
                                                    {text: 'Gross', width: 80, dataIndex: 'GROSSI',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ISC', width: 80, dataIndex: 'ISCI',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TAXI',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Neto', width: 80, dataIndex: 'NETI',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'We Accept',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Gross', width: 80, dataIndex: 'GROSSIA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ISC', width: 80, dataIndex: 'ISCIA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'TAX', width: 80, dataIndex: 'TAXIA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Neto', width: 80, dataIndex: 'NETIA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', width: 90, dataIndex: 'strDescripcion1', hidden: true},
                                            {text: 'Pre<br>Memo', width: 90, dataIndex: 'NROPRT',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-frequent-flyer-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'viewProrate'
                                                }
                                            }
                                        ]
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelWRF170',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            width: 940,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                // --------------------------   GRID WEF170----------------
                                //-----------------------------------------------------------------
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataWRF170',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 400,
                                    width: 643,
                                    columnLines: true,
                                    resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Invoice<br> Date', width: 100, dataIndex: 'strFormatDate',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#interline-frequent-flyer-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetDetailWRF170'
                                                }
                                            },
                                            {text: 'PLM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'QTY', width: 90, dataIndex: 'QTYP', renderer: 'getInt'},
                                                    {text: 'Total USD', width: 90, dataIndex: 'VCPN', renderer: 'getDouble'}
                                                ]
                                            },
                                            {text: 'Interline',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'QTY', width: 90, dataIndex: 'QTYI', renderer: 'getInt'},
                                                    {text: 'Total USD', width: 90, dataIndex: 'NETI', renderer: 'getDouble'}
                                                ]
                                            },
                                            {text: 'Error', width: 90, dataIndex: 'QTYE',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;text-align:right;';
                                                    return '<a href="#interline-frequent-flyer-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetDetailWRF170'
                                                }
                                            },
                                            {text: 'Sin PLM', width: 90, dataIndex: 'QTYSP',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;text-align:right;';
                                                    return '<a href="#interline-frequent-flyer-form" style="color:#008FE3;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetDetailWRF170'
                                                }
                                            }

                                        ]
                                    }
                                }
                                ,
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraficos1',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    padding: '5 0 0 20',
                                    width: 940,
                                    height: 450,
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-grafico01',
                                            width: 900,
                                            height: 400,
                                            background: '#E3EAF9',
                                            captions: {
                                                title: {
                                                    text: 'Frequent Flyer vs Interline',
                                                    alignTo: 'chart'
                                                }
                                                //                                subtitle: {
                                                //                                    text: 'Sky vs Rapid vs Oracle',
                                                //                                    alignTo: 'chart'
                                                //                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                background: '#E3EAF9',
                                                //type: 'dom',
                                                docked: 'bottom'
                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    yField: ['QTYP', 'QTYI'],
                                                    grid: true,
                                                    title: 'QTY',
                                                    renderer: function(obj, value) {
                                                        if (value > 1) {
                                                            return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
//                                    minimum: 0,
//                                    label: {
//                                        renderer: function(v) {
//                                            return v + '';
//                                        }
//                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Date',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Frecuent Flyer', 'Interline'],
                                                    xField: 'strFormatDate',
                                                    yField: ['QTYP', 'QTYI'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function(toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'QTYP') {
                                                                label = 'Frecuent Flyer';
                                                            } else if (ctx.field === 'QTYI') {
                                                                label = 'Interline';
                                                            }
                                                            toolTip.setHtml(label + ' -  ' + record.get('strFormatDate') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainDataADM',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1 0 0 10',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                // --------------------------   GRID TKT ADM ----------------
                                //-----------------------------------------------------------------
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataADM',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 550,
                                    width: 1700,
                                    columnLines: true,
                                    resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'PRAXIS MOTOR PLM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Ticket<br> Number', width: 120, dataIndex: 'strDescripcion',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;text-align:right;';

                                                            var tool = record.data['strDescripcion'].trim() + ' - click to view Master Ticket';
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return '<a href="#interline-frequent-flyer-form" style="color:#008FE3;">' + value + '</a>';

                                                        },
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        }
                                                    },
                                                    {text: 'Trans', width: 50, dataIndex: 'CAMARA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'IATA <br> Code', width: 70, dataIndex: 'SERIE',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['COMENT2'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            metaData.style = 'background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
//                                          No de visualiza en la version de FLEX
//                                          <mx:AdvancedDataGridColumn headerText="Name" dataField="COMENT2" visible="false" textAlign="left" backgroundColor="#f2e6ff" sortable="false"  width="70"/>
//					    </mx:AdvancedDataGridColumnGroup>


                                                    {text: 'Chnl', width: 40, dataIndex: 'COMENT1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Sales <br> Date', width: 80, dataIndex: 'strFormatDate',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Ser. Start <br> Date', width: 80, dataIndex: 'strFormatDate2',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'From-To', width: 80, dataIndex: 'FORMA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fare <br>Fasis', width: 50, dataIndex: 'strDescripcion4',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Cl', width: 40, dataIndex: 'CCIA',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'KMS', width: 50, dataIndex: 'totAud1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Air', width: 50, dataIndex: 'AIRLINE',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr', width: 50, dataIndex: 'CURRENP',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Base <br> USD', width: 60, dataIndex: 'totNet1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#f2e6ff;text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'PRAXIS MOTOR INTERLINE',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'SCR', width: 40, dataIndex: 'TUSO',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Bill <br> Date', width: 70, dataIndex: 'strFormatDate1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Flight <br> Date', width: 70, dataIndex: 'strFormatDate2',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Air', width: 40, dataIndex: 'AIRLINE',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr', width: 40, dataIndex: 'CURRENC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Gross', width: 40, dataIndex: 'GROSSI',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'ISC', width: 40, dataIndex: 'ISCI',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'TAX', width: 40, dataIndex: 'TAXI',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Neto', width: 40, dataIndex: 'NETI',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'From-To', width: 70, dataIndex: 'RUTAP',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#e6faff;';
                                                            return value;
                                                        }
                                                    }
                                                ]

                                            },
                                            {text: 'Auditoria PLM vs Interline"',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cl', width: 50, dataIndex: 'strDescripcion1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = '';
                                                            var desc = record.data['strDescripcion1'].trim();
                                                            if (desc === 'NOT') {
                                                                color = '#ff8080';
                                                            } else {
                                                                color = '#fff0e6';
                                                            }
                                                            metaData.style = 'text-align:left; background-color: ' + color;
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fare <br> Basis', width: 50, dataIndex: 'strDescripcion2',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = '';
                                                            var desc = record.data['strDescripcion2'].trim();
                                                            if (desc === 'FOUND') {
                                                                color = '#ff8080';
                                                            } else {
                                                                color = '#fff0e6';
                                                            }
                                                            metaData.style = 'text-align:left; background-color: ' + color;
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Carr Member <br> Skyteam', width: 60, dataIndex: 'strDescripcion3',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var color = '';
                                                            var desc = record.data['strDescripcion3'].trim();
                                                            if (desc === 'PLM') {
                                                                color = '#ff8080';
                                                            } else {
                                                                color = '#fff0e6';
                                                            }
                                                            metaData.style = 'text-align:left; background-color: ' + color;
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'B. USD <br> PLM', width: 60, dataIndex: 'totNet1',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#fff0e6;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'B. USD <br> Inter', width: 60, dataIndex: 'totNet3',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#fff0e6;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Diff <br> Cpn', width: 60, dataIndex: 'totNet2',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' background-color:#fff0e6;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxTKT',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1647,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridTKT',
                                    width: 1647,
                                    columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Clearing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 105}
                                                ]
                                            },
                                            {text: 'Period', dataIndex: 'PERMONT', width: 65},
                                            {text: 'Air', dataIndex: 'AIRLINE', width: 65},
                                            {text: 'Ticket', dataIndex: 'strDescripcion', width: 120},
                                            {text: 'Invoice', dataIndex: 'INVOICE', width: 100},
                                            {
                                                text: 'Fare',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Base', dataIndex: 'strDescripcion4', width: 90}
                                                ]
                                            },
                                            {text: 'PNR', dataIndex: 'strFlag', width: 90},
                                            {
                                                text: 'Invoice',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate1', width: 90},
                                                    {text: 'Gross', dataIndex: 'GROSSI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'ISC', dataIndex: 'ISCI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'TAX', dataIndex: 'TAXI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Neto', dataIndex: 'NETI', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'We Accept',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Gross', dataIndex: 'GROSSIA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'ISC', dataIndex: 'ISCIA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'TAX', dataIndex: 'TAXIA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'Neto', dataIndex: 'NETIA', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'strDescripcion1', width: 90},
                                            {
                                                text: 'Pre',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Memo', dataIndex: 'NROPRT', width: 110,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                            return '<a href="#interline-frequent-flyer-form" style="color:#008FE3;">' + value + '</a>';
                                                        },
                                                        listeners: {
                                                            click: 'viewProrate'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }           
                            ]
                        },
                    ]
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelPie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPieInterno',
                            width: 400,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
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

