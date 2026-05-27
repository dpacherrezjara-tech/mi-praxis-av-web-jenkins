Ext.define('Ext.Praxis.view.payments.DebitsReportForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    bodyStyle: 'background: transparent',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1400,
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetail',
                                    height: 500,
                                    width: 1140,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [

                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45, style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">ID</span>', dataIndex: 'IDDEB', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">ID Concepto</span>', dataIndex: 'IDCONCEP', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Aerolinea</span>', dataIndex: 'CCIA', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    if (value === '1') {
                                                        return  'Match';
                                                    } else if (value === '3') {
                                                        return  'Pending';
                                                    } else if (value === '5') {
                                                        return  'Match Manual';
                                                    } else if (value === '') {
                                                        return  'Blank';
                                                    }
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Deb Type</span>', dataIndex: 'DEBTYPE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Date Create</span>', dataIndex: 'FECR', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Transaction Date</span>', dataIndex: 'DATEC', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Code Tarjet</span>', dataIndex: 'SCARCOD', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Number Tarjet</span>', dataIndex: 'SCARDN', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'CURRLOCAL', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Amount</span>', dataIndex: 'VALLOCAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1400,
                            id: prototype.id + '-panelGridDataRefund',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataRefund',
                                    height: 500,
                                    width: 1400,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [

                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45, style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Aerolinea</span>', dataIndex: 'CCIA', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Ticket</span>', dataIndex: 'TKT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    if (value === '1') {
                                                        return  'Match';
                                                    } else if (value === '3') {
                                                        return  'Pending';
                                                    } else if (value === '5') {
                                                        return  'Match Manual';
                                                    } else if (value === '') {
                                                        return  'Blank';
                                                    }
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Deb Type</span>', dataIndex: 'DEBTYPE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Date Create</span>', dataIndex: 'FECR', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Sale Date</span>', dataIndex: 'SDATE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Refund Date</span>', dataIndex: 'RFNDATE', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Code</span>', dataIndex: 'SCARCOD', width: 50, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Number</span>', dataIndex: 'SCARDN', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                },
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Author</span>', dataIndex: 'SAUTHOC', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">PNR</span>', dataIndex: 'SPNR', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },

                                            {text: '<span style="color:white;font-weight:bold;">Origen</span>', dataIndex: 'ORIGEN', width: 100, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Amount</span>', dataIndex: 'TOTAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1400,
                            id: prototype.id + '-panelGridDataAcredit',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAcredit',
                                    height: 500,
                                    width: 1330,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [

                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45, style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Aerolinea</span>', dataIndex: 'CCIA', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Status</span>', dataIndex: 'STVAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    if (value === '1') {
                                                        return  'Match';
                                                    } else if (value === '3') {
                                                        return  'Pending';
                                                    } else if (value === '5') {
                                                        return  'Match Manual';
                                                    } else if (value === '') {
                                                        return  'Blank';
                                                    }
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Deb Type</span>', dataIndex: 'DEBTYPE', width: 80, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Date Create</span>', dataIndex: 'FECR', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Date Transaction</span>', dataIndex: 'DTRAN', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Date Process</span>', dataIndex: 'FPROC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {align: 'center', text: '<span style="color:white;font-weight:bold;">Code</span>', dataIndex: 'SCARCOD', width: 50, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Number</span>', dataIndex: 'SCARDN', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                },
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Author</span>', dataIndex: 'SAUTHOC', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'IATA', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">PNR</span>', dataIndex: 'SPNR', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Caso CVS</span>', dataIndex: 'CASOCVS', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Currency</span>', dataIndex: 'SCURRENCY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Amount</span>', dataIndex: 'VALOR', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1420,
                            id: prototype.id + '-panelGridDataARC',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailARC',
                                    height: 510,
                                    width: 1400,
                                    hidden: false,
                                    columnLines: true,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [

                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45, style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 50,
                                                text: '<span style="color:white;font-weight:bold;">Asign</span>',
                                                style: 'padding:2px; background:#6C87A8; border-color:white',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ],
                                                summaryRenderer: function (v, s, d, meta) {
                                                    meta.style = "background:#3F5675;color:white";
                                                    return "";
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Aerolinea</span>', dataIndex: 'CCUST', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                             {text: '<span style="color:white;font-weight:bold;">Processor</span>', dataIndex: 'CODPRO', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Code Bank</span>', dataIndex: 'CODEBANK', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Payment Date</span>', dataIndex: 'ADATE', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Date Create</span>', dataIndex: 'FECR', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Bandoc</span>', dataIndex: 'BANDOC', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                            {text: '<span style="color:white;font-weight:bold;">Reference</span>', dataIndex: 'REFER', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                             {text: '<span style="color:white;font-weight:bold;">Agent</span>', dataIndex: 'SAGENT', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                              {text: '<span style="color:white;font-weight:bold;">Merchant</span>', dataIndex: 'MERCHAND', width: 90, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }},
                                             {align: 'center', text: '<span style="color:white;font-weight:bold;">Code</span>', dataIndex: 'SCARCOD', width: 50, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Number</span>', dataIndex: 'SCARDN', width: 130, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                },
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Author</span>', dataIndex: 'SAUTHOC', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'SCOUNTRY', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Monto Neto</span>', dataIndex: 'NETO', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Moneda Local</span>', dataIndex: 'SCURRENCY', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Monto Local</span>', dataIndex: 'TOTAL', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                             {align: 'center', text: '<span style="color:white;font-weight:bold;">Moneda en Dolares</span>', dataIndex: 'MONEDA_DOLARES', width: 120, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Monto en Dolares</span>', dataIndex: 'MONTO_DOLARES', width: 110, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return '<b>' + value + '</b>';
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Type</span>', dataIndex: 'DEBTYPE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {align: 'center', text: '<span style="color:white;font-weight:bold;">F1</span>', dataIndex: 'FASE1', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {align: 'center', text: '<span style="color:white;font-weight:bold;">F2</span>', dataIndex: 'FASE2', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Date Update F2</span>', dataIndex: 'LAST_UPDATE', width: 70, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                             {align: 'center', text: '<span style="color:white;font-weight:bold;">Accounting ID DEB</span>', dataIndex: 'IDCDEB', width: 200, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Accounting Date DEB</span>', dataIndex: 'FCONT', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">Status Accounting DEB</span>', dataIndex: 'STATUS_SAP', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {align: 'center', text: '<span style="color:white;font-weight:bold;">BPO Comment</span>', dataIndex: 'BPO_COMMENT_DESC', width: 140, style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    return  value;
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            region: 'south',
            xtype: 'panel',
            id: prototype.id + '-pie',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: false,
            height: 30,
            margin: '5 0 18 0',
            defaults: {
                border: false
            },
            items: [
                {
                    bodyStyle: 'background: #6C87A8; border-radius: 5px;',
                    xtype: 'panel',
                    width: '30%',
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
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-currentPage',
                            text: '1',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            text: 'OF',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-pageCount',
                            text: '0',
                            width: 50,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {xtype: 'tbspacer', width: 50},
                        {
                            text: 'Total Found',
                            width: 80,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        },
                        {
                            id: prototype.id + '-lbl-total',
                            text: '0',
                            width: 40,
                            style: 'margin-top: 7px;color:white;font-weight:bold;color:white'
                        }
                    ]
                }
            ]
        }
    ]
}
);
