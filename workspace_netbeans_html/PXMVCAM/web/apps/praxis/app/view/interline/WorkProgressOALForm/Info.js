Ext.define('Ext.Praxis.view.interline.WorkProgressOALForm.Info', {
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
            id: prototype.id + '-boxConsultas',
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
                    xtype: 'button',
                    id: prototype.id + '-swf1',
                    width: 25,
                    align: 'center',
                    icon: 'resources/img/exchange.png',
                    style: 'background: #E3EAEF;',
                    tooltip: 'Swap',
                    scale: 'large',
                    handler: 'imgSwap_clickHandler',
                    margin: '0 150 0 0'
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    width: prototype.widthContenedor,
                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="Box1">
                        {
                            region: 'center',
                            id: prototype.id + '-Box1',
                            width: prototype.widthContenedor,
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: true,
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: prototype.widthGrid,
                                    height: 512,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DFLIGHT', width: 76
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '01', dataIndex: 'dia01', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '02', dataIndex: 'dia02', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '03', dataIndex: 'dia03', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '04', dataIndex: 'dia04', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '05', dataIndex: 'dia05', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '06', dataIndex: 'dia06', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '07', dataIndex: 'dia07', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '08', dataIndex: 'dia08', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '09', dataIndex: 'dia09', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '10', dataIndex: 'dia10', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '11', dataIndex: 'dia11', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '12', dataIndex: 'dia12', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '13', dataIndex: 'dia13', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '14', dataIndex: 'dia14', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '15', dataIndex: 'dia15', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDataTot">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTot',
                                    width: prototype.widthGrid,
                                    height: 84,
                                    columnLines: true,
                                    hideHeaders: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '', dataIndex: 'descr', width: 76,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background: #a0bfd3;";
                                                    return '<label style="font-size:11px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot01', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per01', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot02', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per02', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot03', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per03', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot04', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per04', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot05', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per05', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot06', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per06', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot07', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per07', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot08', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per08', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot09', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per09', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot10', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per10', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot11', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per11', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot12', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per12', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot13', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per13', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot14', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per14', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot15', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per15', width: 40,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', id: prototype.id+'-scroll_adg', width: 16, hidden: true
                                            }
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Box2">
                        {
                            region: 'center',
                            id: prototype.id + '-Box2',
                            width: prototype.widthContenedor,
                            hidden: true,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: true,
                                align: 'center'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData2">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData2',
                                    width: prototype.widthGrid+17,
                                    height: 512,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DFLIGHT', width: 76
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '16', dataIndex: 'dia16', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '17', dataIndex: 'dia17', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '18', dataIndex: 'dia18', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '19', dataIndex: 'dia19', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '20', dataIndex: 'dia20', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '21', dataIndex: 'dia21', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '22', dataIndex: 'dia22', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '23', dataIndex: 'dia23', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '24', dataIndex: 'dia24', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '25', dataIndex: 'dia25', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '26', dataIndex: 'dia26', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '27', dataIndex: 'dia27', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '28', dataIndex: 'dia28', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '29', dataIndex: 'dia29', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '30', dataIndex: 'dia30', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'VCR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: '31', dataIndex: 'dia31', width: 76,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="gridDataTot2">
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataTot2',
                                    width: prototype.widthGrid+17,
                                    height: 84,
                                    columnLines: true,
                                    hideHeaders: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '', dataIndex: 'descr', width: 76,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background: #a0bfd3;";
                                                    return '<label style="font-size:11px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot16', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per16', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot17', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per17', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot18', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per18', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot19', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per19', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot20', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per20', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot21', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per21', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot22', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per22', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot23', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per23', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot24', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per24', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot25', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per25', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot26', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per26', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot27', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per27', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot28', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per28', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot29', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per29', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot30', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per30', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'tot31', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</label>';
                                                }
                                            },
                                            {
                                                text: '', dataIndex: 'per31', width: 38,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background: #a0bfd3;";
                                                    return '<label style="font-size:9px;">' + (value===undefined?'':value) + '</label>';
                                                }
                                            },
                                            {
                                                text: '', id: prototype.id+'-scroll_adg2', width: 16, hidden: true
                                            }
                                        ]
                                    }
                                }
                                // </editor-fold>
                            ]
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxMainDataVCR',
                    width: prototype.widthContenedor,
                    hidden: true,
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
                        // <editor-fold defaultstate="collapsed" desc="gridMainDataVCR">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridMainDataVCR',
                            width: prototype.widthGrid2,
                            height: 530,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'VCR Date', dataIndex: 'strFormatFECVAL', width: 110
                                    },
                                    {
                                        text: 'Accounting Date', dataIndex: 'strFCON', flex: 1
                                    },
                                    {
                                        text: 'Flight Date', dataIndex: 'strFormatDate', width: 110
                                    },
                                    {
                                        text: 'Quantity',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'OWN', dataIndex: 'CPN_Proc', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataVCR').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totCPN_Proc, '0,000');
                                                }
                                            },
                                            {
                                                text: 'OAL', dataIndex: 'CPN_Bill', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataVCR').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totCPN_Bill, '0,000');
                                                }
                                            },
                                            {
                                                text: 'OCR', dataIndex: 'CPN_Aud', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridMainDataVCR').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totCPN_Aud, '0,000');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Total', dataIndex: 'NETO', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridMainDataVCR').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.totNETO, '0,000');
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid2,
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid2,
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
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});