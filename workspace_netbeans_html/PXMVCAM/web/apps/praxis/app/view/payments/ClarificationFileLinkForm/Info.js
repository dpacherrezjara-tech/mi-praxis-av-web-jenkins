Ext.define('Ext.Praxis.view.payments.ClarificationFileLinkForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;'
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            border: false,
            width: '100%',
            autoScroll: true,
            overflowY: 'scroll',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-vskPrincipal',
                    border: false,
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxConsultas',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-vskMain',
                                    border: false,
                                    width: '100%',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxMainData',
                                            hidden: false,
                                            width: '100%',
                                            bodyStyle: 'background: transparent;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                border: false,
                                                height: '100%'
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData',
                                                    width: 1140,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Sending <br> Date', width: 100, dataIndex: 'IATADATE'},
                                                            {text: 'Reception <br> Date', width: 100, dataIndex: 'SENTDATE',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;color:#057ECB";

                                                                    return '<a href="#payments-clarification-file-link-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                listeners: {
                                                                    click: 'onClickDetail'
                                                                },
                                                            },
                                                            {text: 'Folio', width: 120, dataIndex: 'FOLIO'},
                                                            {text: 'Credit Card <br> Number', width: 150, dataIndex: 'strDescripcion',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
//                                                                            var color = data.strPEM === 'SALES'? '#64418c' : '#244066';
//                                                                            metaData.style = 'text-align:center;color:'+color+';background-color:#CCFFFF;';
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    metaData.unselectableAttr = "unselectable='off'";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Authorization <br> Code', width: 100, dataIndex: 'AUTHNBR'},
                                                            {text: 'Sales <br> Date', width: 80, dataIndex: 'SALEDATE'},
                                                            {text: 'MXN', width: 80, dataIndex: 'VFOP',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {text: 'Qty Tkts', width: 80, dataIndex: 'lngDocs',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {text: 'Merchant',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Number', width: 70, dataIndex: 'MERCHN',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var tool = record.data['MERCHNAM'].trim();
                                                                            if (tool.length > 0) {
                                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                                            }
                                                                            metaData.style = 'text-align:center;';
                                                                            return  value;
                                                                        }
                                                                    },
                                                                    {text: 'Name', width: 150, dataIndex: 'MERCHNAM',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var tool = record.data['MERCHNAM'].trim();
                                                                            if (tool.length > 0) {
                                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                                            }
                                                                            metaData.style = 'text-align:left;';
                                                                            return  value;
                                                                        }
                                                                    },
                                                                    {text: 'Days', width: 60, dataIndex: 'days',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            var data = record.data;
                                                                            var color = data.strSemaforo === 'AMBAR' ? '#806000' : data.strSemaforo === 'ROJO' ? '#800000' : '#008000';
                                                                            metaData.style = 'text-align:right;color:' + color + ';';
                                                                            return  value;
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
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxDetail',
                                            hidden: true,
                                            width: '100%',
                                            bodyStyle: 'background: transparent;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                border: false,
                                                height: '100%'
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridDataDetail',
                                                    width: 850,
                                                    columnLines: true,
                                                    features: [{
                                                            ftype: 'summary'
                                                        }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Credit Card <br> Number', width: 150, dataIndex: 'strDescripcion',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
//                                                                            var color = data.strPEM === 'SALES'? '#64418c' : '#244066';
//                                                                            metaData.style = 'text-align:center;color:'+color+';background-color:#CCFFFF;';
                                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                                    metaData.unselectableAttr = "unselectable='off'";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Ticket <br> Number', width: 100, dataIndex: 'strTicket'},
                                                            {text: 'Status', width: 100, dataIndex: 'strDescStatus',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var tool = record.data['strDescStatus'].trim();
                                                                    if (tool.length > 0) {
                                                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                                    }
                                                                    metaData.style = 'text-align:left;';
                                                                    return  value;
                                                                }
                                                            },
                                                            {text: 'Folio <br> Number', width: 120, dataIndex: 'FOLIO'},
                                                            {text: 'MXN', width: 80, dataIndex: 'VFOP',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {text: 'Authorization <br> Code', width: 100, dataIndex: 'AUTHNBR'},
                                                            {text: 'Sale',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Date', width: 90, dataIndex: 'SALEDATE'
                                                                    },
                                                                    {text: 'Agent', width: 90, dataIndex: 'AGENTE',
                                                                    }

                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-boxCompleteInformation',
                                            hidden: true,
                                            width: '100%',
                                            bodyStyle: 'background: transparent;',
                                            border: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                border: false,
                                                height: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    margin: '0 7',
                                                    border: false,
                                                    width: 1000,
                                                    bodyStyle: 'background: transparent',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        border: false
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            margin: '20 10 10 50',
                                                            border: true,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 400},
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnSave',
                                                                    text: '<strong style="color:white;">Save<strong>',
                                                                    tooltip: 'Save Ticket',
                                                                    cls: 'x-btn-save',
                                                                    overCls: 'x-btn-save-over',
                                                                    width: 80,
                                                                    height: 25,
                                                                    margin: '8px 5px 5px 5px',
                                                                    padding: '4 5 5 2',
                                                                    listeners: {
                                                                         click: 'onClicSave'
                                                                    }
                                                                }, {xtype: 'tbspacer', width: 20},
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnClear2',
                                                                    margin: '8px 5px 5px 5px',
                                                                    iconCls: 'prx-icon-clear',
                                                                    tooltip: 'Clear Options',
                                                                    listeners: {
                                                                        click: 'btnClear_click2'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 50},
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnBack2',
                                                                    margin: '8px 5px 5px 5px',
                                                                    iconCls: 'prx-icon-back',
                                                                    tooltip: 'Back',
                                                                    listeners: {
                                                                        click: 'btnBack_click2'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Booking Code (PNR):)',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtPNR',
                                                                    fieldStyle: 'text-align:center',
                                                                    enforceMaxLength: true,
                                                                    disabled: true,
                                                                    width: 350

                                                                },
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Ticket(s):',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.id + '-txtTKT',
                                                                    value: '',
                                                                    style: 'font-size:50px ;font-weight:bold;',
                                                                    fieldStyle: 'font-size: 11.7px; font-weight: bold; ',
                                                                    height: 90,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    html: '<b>Cardholder Name </b>',
                                                                    padding: '3 0',
                                                                    width: 230
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'color:red;font-size:15px;',
                                                                    text: '(*)',
                                                                    width: 20,
                                                                    autoEl: {
                                                                        tag: 'label',
                                                                        'data-qtip': 'Mandatory Field'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtNOMTARHAB',
                                                                    value: '',
                                                                    maxLength: 100,
                                                                    minLength: 1,
                                                                    maskRe: /[a-zA-Z]/,
                                                                    style: 'font-size:50px ;font-weight:bold;',
                                                                    fieldStyle: 'font-size: 11.7px; font-weight: bold; ',
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Credit Card Number:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtCARDNBR',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Authorization Number:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtAUTHO',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Transaction Date:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtSALEDATE',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Merchant Name:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtMERCHNAM',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Agent',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtAGENTE',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Amount',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtAUTAMOUNT',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Purchase Description:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.id + '-txtDESCRIPCION',
                                                                    height: 90,
                                                                    width: 350,
                                                                    disabled: true
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Delivery Address:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtDIRECCION',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Merchant Number:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtMERCHN',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Passenger Name:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.id + '-txtNOMPAX',
                                                                    height: 70,
                                                                    width: 350,
                                                                    disabled: true
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Phone/Internet Sale Description:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtDESCVENTA',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Name of Recipient:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtNOMPAX2',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Delivery Date:',
                                                                    padding: '3 0',
                                                                    width: 250
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: prototype.id + '-txtFVUELO',
                                                                    disabled: true,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margin: '5 10 5 10',
                                                            border: false,
                                                            width: 900,
                                                            bodyStyle: 'background: transparent',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                border: false
                                                            },
                                                            items: [
                                                                {xtype: 'tbspacer', width: 200},
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'Ticket(s):',
                                                                    padding: '3 0',
                                                                    width: 230
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'color:red;font-size:15px;',
                                                                    text: '(*)',
                                                                    width: 20,
                                                                    autoEl: {
                                                                        tag: 'label',
                                                                        'data-qtip': 'Mandatory Field'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textarea',
                                                                    id: prototype.id + '-txtCOMMENT',
                                                                    value: '',
                                                                    style: 'font-size:50px ;font-weight:bold;',
                                                                    fieldStyle: 'font-size: 11.7px; font-weight: bold; ',
                                                                    maxLength: 420,
                                                                    minLength: 1,
                                                                    height: 90,
                                                                    width: 350
                                                                }
                                                            ]
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxPagDetail',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            height: '100%',
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
                                                    id: prototype.id + '-lblPagActual',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lblPagTotal',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lblRowsTotal',
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
                    ]
                }
            ]
        }
    ]
});

