Ext.define('Ext.Praxis.view.interline.SPAReportForm.Info', {
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
                    region: 'center',
                    id: prototype.id + '-boxMainDataPrincipal',
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataPrincipal',
//                            width: prototype.widthGrid,
                            width: 602,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Airline', dataIndex: 'A1155CIA1', width: 50,
                                    },
                                    {
                                        text: 'Agreement', dataIndex: 'AGREEMENT', width: 250,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ind.', dataIndex: 'strDescripcion', width: 57
                                    },
//                                    {
//                                        text: 'Start Date', dataIndex: 'strFormatDate', width: 90
//                                    },
                                    {
                                        text: 'End Date', dataIndex: 'strFormatDate1', width: 90
                                    },
                                    {
                                        text: 'Status', dataIndex: 'strDescripcion1', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Annexes', dataIndex: 'A1155ANEXO', width: 75,
                                        listeners: {
                                            click: 'viewSearch'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-spa-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
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
                            width: prototype.widthGrid,
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
                                    width: prototype.widthGrid,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
//                            width: prototype.widthGrid,
                            width: 1147,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Air', dataIndex: 'A1155CIAFM', width: 50,
                                        listeners: {
                                            click: 'viewPDFs'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-spa-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Bill',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Air.', dataIndex: 'A1155CIA1', width: 50
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Agree.', dataIndex: 'A1155CODAC', width: 75,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion2 + '"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ind.', dataIndex: 'strDescripcion', width: 57
                                    },
                                    {
                                        text: 'Vers.', dataIndex: 'A1155VRSAC', width: 50,
                                        listeners: {
                                            click: 'viewDetail'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-spa-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Start Date', dataIndex: 'strFormatDate', width: 90
                                    },
                                    {
                                        text: 'End Date', dataIndex: 'strFormatDate1', width: 90
                                    },
                                    {
                                        text: 'Status', dataIndex: 'strDescripcion1', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'A1155SRP', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Base',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amt', dataIndex: 'A1155PRO', width: 50
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Fixed',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Amt', dataIndex: 'A1155TRAMO', width: 50
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Loaded By', dataIndex: 'A1155UINGR', width: 110,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Recep. Date', dataIndex: 'strFormatDate2', width: 90
                                    },
                                    {
                                        text: 'Hold.', dataIndex: 'A1155FNUM', width: 75
                                    },
                                    {
                                        text: 'Certification',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Date', dataIndex: 'strFormatDate3', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Updated', dataIndex: 'strFormatDate4', width: 90
                                    },
//                                    {
//                                        text: 'Remark', dataIndex: 'A1155ESTAD', width: 75
//                                    },
//                                    {
//                                        text: 'Adendum', dataIndex: 'A1155IDSCO', width: 75,
//                                        listeners: {
//                                            click: 'viewWRF014'
//                                        },
//                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                            var color = (value === 'Y' ? '#057ECB' : '#000000');
//                                            var fontWeight = (value === 'Y' ? 'bold' : 'normal');
//                                            metaData.style = "text-align:center;color:" + color + ";text-decoration:none;font-weight:" + fontWeight + ";cursor:hand;";
//                                            return '<a href="#interline-spa-report-form" style="color:' + color + ';text-decoration:none;font-weight:" + fontWeight + ";">' + value + '</a>';
//                                        }
//                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
//                            width: prototype.widthGrid,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 0px 1px 0px',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: prototype.widthGrid,
//                                    height: 25,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        margin: '3px 0px 0px 5px'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total found',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxDetailData',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataDetail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetail',
                            width: prototype.widthGrid2,
                            height: 530,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Prorate Number', dataIndex: 'NROPRT', width: 120,
                                        listeners: {
                                            click: 'viewA728'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;text-decoration:none;font-weight:bold;cursor:hand;";
                                            return '<a href="#interline-spa-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Paragraph References.', dataIndex: 'TEXT1', width: 300,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Description', dataIndex: 'TEXT2', flex: 1, //width: 450,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                {
                    region: 'center',
                    id: prototype.id + '-boxWRF014Data',
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
                        // <editor-fold defaultstate="collapsed" desc="gridWRF014Detail">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridWRF014Detail',
                            width: prototype.widthGrid3,
                            height: 250,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Billed',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Airline', dataIndex: 'AIRLINE', width: 90
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Code', dataIndex: 'CODAC', width: 105
                                    },
                                    {
                                        text: 'Indicator', dataIndex: 'INDAC', width: 105
                                    },
                                    {
                                        text: 'Version', dataIndex: 'VRSAC', width: 105
                                    },
                                    {
                                        text: 'Reference', dataIndex: 'REFE', flex: 1, //width: 200,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Begin Date', dataIndex: 'strFormatDate', width: 105
                                    },
                                    {
                                        text: 'Ending Date', dataIndex: 'strFormatDate1', width: 105
                                    },
                                    {
                                        text: 'Sending Date', dataIndex: 'strFormatDate2', width: 105
                                    },
                                    {
                                        text: 'Reception Date', dataIndex: 'strFormatDate3', width: 105
                                    },
                                    {
                                        text: 'Entry Date', dataIndex: 'strFormatDate4', width: 105
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="BoxAddendum">
                        {
                            region: 'center',
                            id: prototype.id + '-BoxAddendum',
                            width: 660,
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
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #99CCFF;',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '6 0 6 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Addendum Data Entry',
                                            padding: '8px 7px 8px 0px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Customer',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1155AIRLI',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Airline',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1155CIAFM',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agrrement Code',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1155CODAC',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agrrement Indicator',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1155INDAC',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agrrement Version',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtA1155VRSAC',
                                                    fieldStyle: 'text-align:center;',
                                                    readOnly: true,
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Reference',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtReference',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 20,
                                                    width: 200
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Begin Date',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFBEGIN',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'YYYYMMDD'
                                                    }
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Ending Date',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFENDIN',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'YYYYMMDD'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Sending Date',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFSEND',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'YYYYMMDD'
                                                    }
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Reception Date',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFRECE',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'YYYYMMDD'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Entry Date',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtFENTR',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 8,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'YYYYMMDD'
                                                    }
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: true,
                                            bodyStyle: 'background-color: #CCFFFF;',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '6 0 6 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Sequence',
                                                    width: 135,
                                                    padding: '8px 7px 8px 0px'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-txtSequence',
                                                    fieldStyle: 'text-align:center;',
                                                    enforceMaxLength: true,
                                                    maxLength: 2,
                                                    width: 100
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    border: false,
                                    bodyStyle: 'background-color: white;',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '6 0 6 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn',
                                            html: '<strong style="color:#009999;">Save</strong>',
                                            border: true,
                                            scale: 'small',
                                            margin: '2 0 2 0',
                                            width: 80,
                                            listeners: {
                                                click: 'imgSave',
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                }
            ]
        }
    ]
});