/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */




Ext.define('Ext.Praxis.view.refund.RefundInputsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;border: none;',

    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '20px 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1580,
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
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-vskMain',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 150
                            },
                            bodyStyle: 'background: transparent',
                            border: false,
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 720,
                                    height: 535,
                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom',
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Process Date', width: 200, dataIndex: 'FCARG', align: 'center', style: 'padding:6px;background: #6A95AF; border-color:white !important',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;';
                                                    return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:center;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return 'TOTAL';
                                                },
                                                listeners: {
                                                    click: 'onViewDataDetail'
                                                }
                                            },
                                            {text: 'Total', width: 100, dataIndex: 'QTY_TOTAL', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;text-align:right';
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam - 1].data;
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return Ext.util.Format.number(data.totalQty, '0');
                                                }
                                            },
                                            {text: 'Pending', width: 100, dataIndex: 'QTY_PENDING', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;text-align:right;';
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam - 1].data;
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return Ext.util.Format.number(data.totalPending, '0');
                                                }
                                            },
                                            {text: 'Accepted', width: 100, dataIndex: 'QTY_ACCEPTED', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;text-align:right;';
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam - 1].data;
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return Ext.util.Format.number(data.totalAccepted, '0');
                                                }
                                            },
                                            {text: 'Insert Error', width: 100, dataIndex: 'QTY_ERROR', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;text-align:right;';
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam - 1].data;
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return Ext.util.Format.number(data.totalError, '0');
                                                }
                                            },
                                            {text: 'Validation Error', width: 120, dataIndex: 'QTY_ERROR_VALIDACION', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;text-align:right;';
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam - 1].data;
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return Ext.util.Format.number(data.totalErrorValidation, '0');
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        
                        // DETAILTICKET2 PRIMER DRILD
                         {
                    xtype: 'panel',
                    id: prototype.id + '-detailTicket2',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        border: false,
                        height: 150
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetailTicketRTS2',
                            width: 650,
                            height: 535,
                            columnLines: true,
                            enableColumnMove: false,
                            features: [{
                                ftype: 'summary',
                                dock: 'bottom',
                            }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Process Date', width: 110, dataIndex: 'FCARG', align: 'center', style: 'padding:6px;background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;';
                                      
                                          
                                            let secuencia = record.data.A5003SEQ || '00';
                                            return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">'
                                        + value + ' - ' + secuencia +
                                       '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:center;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return 'TOTAL';
                                        },
                                        listeners: {
                                            click: 'onViewDataDetail2'
                                        }
                                    },
                                    {
                                        text: 'File Date',
                                        width: 100,
                                        dataIndex: 'FILEFCAR',
                                        align: 'center',
                                        style: 'padding:6px;background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;';
                                            if (!value) return '';

                                            // Convierte '20250810' → '10 OCT 25'
                                            const year = value.substring(2, 4);        // '25'
                                            const month = value.substring(4, 6);       // '08'
                                            const day = value.substring(6, 8);         // '10'

                                            const meses = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
                                            const mesTexto = meses[parseInt(month, 10) - 1];

                                            const fechaFormateada = `${day} ${mesTexto} ${year}`;

                                            return `<span style="color:#0D1117;font-weight:bold;">${fechaFormateada}</span>`;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:center;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return '';
                                        }
                                    },
                                    {text: 'Total', width: 80, dataIndex: 'QTY_TOTAL', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;text-align:right';
                                            return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items[tam-1].data;
                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return Ext.util.Format.number(data.totalQty, '0');
                                        },
                                        listeners: {
                                            click: 'onViewDataDetail2'
                                        }
                                    },
                                    {text: 'Pending', width: 80, dataIndex: 'QTY_PENDING', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;text-align:right';
                                            return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items[tam-1].data;
                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return Ext.util.Format.number(data.totalPending, '0');
                                        },
                                        listeners: {
                                            click: 'onViewDataDetail2'
                                        }
                                    },
                                     {text: 'Accepted', width: 80, dataIndex: 'QTY_ACCEPTED', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;text-align:right';
                                            return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                           var tam = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items[tam-1].data;
                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return Ext.util.Format.number(data.totalAccepted, '0');
                                        },
                                        listeners: {
                                            click: 'onViewDataDetail2'
                                        }
                                    },
                                    {text: 'Insert Error', width: 80, dataIndex: 'QTY_ERROR', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;text-align:right';
                                            return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items[tam-1].data;
                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return Ext.util.Format.number(data.totalError, '0');
                                        },
                                        listeners: {
                                            click: 'onViewDataDetail2'
                                        }
                                    },
                                    {text: 'Validation Error', width: 120, dataIndex: 'QTY_ERROR_VALIDACION', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;text-align:right';
                                            return '<a href="#" style="color:#4169E1;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var tam = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items.length;
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').getStore().getData().items[tam-1].data;
                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                            return Ext.util.Format.number(data.totalErrorValidation, '0');
                                        },
                                        listeners: {
                                            click: 'onViewDataDetail2'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                
                   {
                    xtype: 'panel',
                    id: prototype.id + '-detailTicket',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        border: false,
                        height: 150
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataDetailTicket',
                            width: 1330,
                            height: 545,
                            columnLines: true,
                            enableColumnMove: false,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    
                                    {
                                        text: 'Seq',
                                        width: 60,
                                        dataIndex: 'A5003SEQ',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ticket',
                                        width: 110,
                                        dataIndex: 'TICKET',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ticket Conj',
                                        width: 110,
                                        dataIndex: 'TKTC',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                            return value;
                                        }
                                    },
                                    
                                     {
                                        text: 'Status Refund',
                                        width: 110,
                                        dataIndex: 'A5003STATR',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                             if ( value == 'A' ) {
                                                 return "Autorizado"
                                             } else if ( value == 'R' ) {
                                                 return "Rechazado"
                                             } else {
                                                 return "No identificado"
                                             }
                                           
                                        }
                                    },
                                     {
                                        text: 'Country',
                                        width: 110,
                                        dataIndex: 'SCOUNTRY',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                             return value;
                                           
                                        }
                                    },
                                    {text: 'Agent', width: 90, dataIndex: 'SAGENT', align: 'center', style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;';
                                            return  value;
                                        }
                                    },
                                    {
                                        text: 'ID Solicitud',
                                        width: 120,
                                        dataIndex: 'RFNI',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Refund Reason', width: 120, dataIndex: 'A5003REASF', align: 'center', style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;';
                                            return  value;
                                        }
                                    },
                                    {text: 'Cupon Indicator',style: 'background: #6A95AF; border-color:white !important;text-align: center;',  // Agregar padding al encabezado de la columna
                                        columns: [
                                            {
                                                text: '1 2 3 4 5 6 7 8', align: 'left', dataIndex: 'IDXRESULT', width: 115, style: 'background: #6A95AF; border-color:white !important',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'margin-top: 1px;text-align: left;';
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Issue Date',
                                        width: 90,
                                        dataIndex: 'RDBS',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Total Refund',style: 'background: #6A95AF; border-color:white !important;',  // Agregar padding al encabezado de la columna
                                        columns: [
                                            {
                                                text: 'Amount', align: 'center', dataIndex: 'TOTRE', width: 100,
                                                style: 'background: #6A95AF; border-color:white !important',
                                                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {
                                                text: 'Currency', align: 'center', dataIndex: 'TOTCU', width: 80, 
                                                style: 'background: #6A95AF; border-color:white !important',  
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Load Date',
                                        width: 80,
                                        dataIndex: 'FECR',
                                        align: 'center',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             metaData.style = 'margin-top: 1px;';
                                            return value;
                                        }
                                    },
                                    {text: 'Status', width: 100, dataIndex: 'STVAL', align: 'center', style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;';
                                            if (value == '1') {
                                                return "Pending"
                                            } else if (value == '2') {
                                                return "Error Insert"
                                            } else if (value == '3') {
                                                return "Accepted"
                                            } else if (value == '4') {
                                                return "Error"
                                            }
                                        }
                                    },
                                    {
                                        text: 'Description Status',
                                        width: 270,
                                        dataIndex: 'FSELEC',
                                        align: 'center',
                                        style: 'background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'margin-top: 1px;text-align:left';

                                           switch (value) {
                                            case 'A': return "Accepted for processing in BSPLink";
                                            case 'B': return "The ticket does not meet the 13-digit format (CUST + FORM + SERIES)";
                                            case 'C': return "Payment method not identified";
                                            case 'D': return "Inconsistency between tax amount and tax detail";
                                            case 'E': return "Issue date not provided";
                                            case 'F': return "Request status not provided";
                                            case 'G': return "Inconsistency between total tax and tax detail amount";
                                            case 'H': return "Refund status not specified for the tax";
                                            case 'I': return "IATA code does not meet the 8-digit requirement";
                                            case 'J': return "Refund reason not specified";
                                            case 'K': return "Conjunction ticket does not meet the 13-digit format (CUST + FORM + SERIES)";
                                            case 'L': return "Amount not reported in the ticket";
                                            case 'M': return "Inconsistency in the total refund amount";
                                            case 'N': return "Refund number not provided";
                                            case 'O': return "Card type not provided";
                                            case 'P': return "Country not provided";
                                            case 'Q': return "Invalid XF tax entry";
                                            case 'R': return "An authorized ticket already exists";
                                            case 'S': return "Invalid commission amount";
                                            case 'T': return "Inconsistency between tax detail and total tax sum";
                                            case 'U': return "Tickets in column A are not equal to those in column F";
                                            case 'V': return "When the fare has a differential and all coupons are selected";
                                            case 'W': return "-";
                                            case 'Z': return "-";
                                            default: return value;
                                        }


                                        }
                                    },
                                     {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 70,
                                        text: 'Edit',
                                        hidden: true,
                                        align: 'center',
                                        dataIndex: 'U',
                                        style: 'padding: 6px;background: #6A95AF; border-color:white !important',  // Agregar padding al encabezado de la columna
                                        items: [
                                            {
                                                iconCls: 'rfn-icon-edit',
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
                    xtype: 'panel',
                    id: prototype.id + '-boxPag',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 410,
                    height: 30,
                    margin: '18 0 0 0 ',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            bodyStyle: 'background: #6A95AF; border-radius: 5px;',
                            xtype: 'panel',
                            width: '100%',
                            height: '100%',
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
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    text: 'OF',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    text: 'Total Found',
                                    width: 80,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 40,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
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
}
);


