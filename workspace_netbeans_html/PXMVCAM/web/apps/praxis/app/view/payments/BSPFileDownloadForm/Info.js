Ext.define('Ext.Praxis.view.payments.BSPFileDownloadForm.Info', {
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
                                    height: 543,
                                    width: 1210,
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
                                            
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45,style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CUSTOMER', width: 80,style: 'padding:2px; background: #6C87A8;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;";
                                                
                                                if (value == 'TA01') {
                                                    return  '202';
                                                } else if (value == 'AV01') {
                                                    return  '134';
                                                } else if (value == 'LR01') {
                                                    return  '133';
                                                } else if (value == '2K01') {
                                                    return  '547';
                                                }
                                                
                                                return  value;
                                            }},
                                            {text: '<span style="color:white;font-weight:bold;">Country</span>', dataIndex: 'COUNTRY', width: 70,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                             {
                                                text: '<span style="color:white;font-weight:bold;">Settlement Date</span>',
                                                dataIndex: 'DATESETT',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    
                                                    if (!value || value.length !== 8) return value;

                                                    var year = value.substring(0, 4);
                                                    var month = value.substring(4, 6);
                                                    var day = value.substring(6, 8);

                                                    return day + "/" + month + "/" + year;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File Name</span>', dataIndex: 'NAMEFILE', width: 503,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">File Type</span>', dataIndex: 'TYPEFILE', width: 90,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload Date</span>',
                                                dataIndex: 'DATEUPLO',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    
                                                    if (!value || value.length !== 8) return value;

                                                    var year = value.substring(0, 4);
                                                    var month = value.substring(4, 6);
                                                    var day = value.substring(6, 8);

                                                    return day + "/" + month + "/" + year;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">Size</span>', dataIndex: 'SIZEFILE', width: 80,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Download File</span>',
                                                width: 100,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');  // o el campo que tú uses para descargar

                                                    return `<img src="resources/img/botones/excel-png-office-xlsx-icon-3.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onDownloadCSV'
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
                                    height: 543,
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
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45,style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Report ID</span>', dataIndex: 'REPORTID', width: 80,style: 'padding:2px; background: #6C87A8;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;";
                                                
                                                if (value == 'TA01') {
                                                    return  '202';
                                                } else if (value == 'AV01') {
                                                    return  '134';
                                                } else if (value == 'LR01') {
                                                    return  '133';
                                                } else if (value == '2K01') {
                                                    return  '547';
                                                }
                                                
                                                return  value;
                                            }},
                                            {text: '<span style="color:white;font-weight:bold;">User ID (N/A)</span>', dataIndex: 'USERID', width: 90,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">REF NBR (B*MM*W*C)</span>', dataIndex: 'REFNBR', width: 140,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">PED (yy/mm/dd)</span>', dataIndex: 'PEDARC', width: 110,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Date</span>', dataIndex: 'DATEARC', width: 80,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">File Name</span>', dataIndex: 'NAMEFILE', width: 260,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Time</span>', dataIndex: 'TIMEARC', width: 90,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                              {text: '<span style="color:white;font-weight:bold;">Dist. Name</span>', dataIndex: 'DISTNAME', width: 150,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                              {text: '<span style="color:white;font-weight:bold;">Group ID (N/A)</span>', dataIndex: 'GROUPID', width: 100,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                              {text: '<span style="color:white;font-weight:bold;">Lines</span>', dataIndex: 'LINESARC', width: 50,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                             {text: '<span style="color:white;font-weight:bold;">Pages</span>', dataIndex: 'PAGESARC', width: 60,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";

                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Download</span>',
                                                width: 80,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');  // o el campo que tú uses para descargar

                                                    return `<img src="resources/img/botones/txt.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onDownloadCSVARC'
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">View</span>',
                                                width: 60,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME');

                                                    return `<img src="resources/img/botones/search.png"
                                                                  style="cursor:pointer; width:14px; height:14px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onViewCSVARC'
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
                            id: prototype.id + '-panelGridDataICCS',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetailICCS',
                                    height: 543,
                                    width: 1090,
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
                                            {text: '<span style="color:white;font-weight:bold;">Nbr</span>', dataIndex: 'RN', width: 45,style: 'padding:4px; background: #6C87A8;border-color:white'},
                                            {text: '<span style="color:white;font-weight:bold;">Customer</span>', dataIndex: 'CCUST', width: 80,style: 'padding:2px; background: #6C87A8;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                var data = record.data;
                                                metaData.style = "text-align:center;";
                                                
                                                if (value == 'TA01') {
                                                    return  '202';
                                                } else if (value == 'AV01') {
                                                    return  '134';
                                                } else if (value == 'LR01') {
                                                    return  '133';
                                                } else if (value == '2K01') {
                                                    return  '547';
                                                }
                                                
                                                return  value;
                                            }},
                                             {
                                                text: '<span style="color:white;font-weight:bold;">Settlement Date</span>',
                                                dataIndex: 'DATESETT',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    
                                                    if (!value || value.length !== 8) return value;

                                                    var year = value.substring(0, 4);
                                                    var month = value.substring(4, 6);
                                                    var day = value.substring(6, 8);

                                                    return day + "/" + month + "/" + year;
                                                }
                                            },
                                            {text: '<span style="color:white;font-weight:bold;">File Name</span>', dataIndex: 'NAMEFILE', width: 503,style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload Date</span>',
                                                dataIndex: 'FECR',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Upload By</span>',
                                                dataIndex: 'USCR',
                                                width: 120,
                                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                                renderer: function (value, metaData) {
                                                    metaData.style = "text-align:center;";
                                                    return value ? value.toUpperCase() : '';
                                                }
                                            },
                                            {
                                                text: '<span style="color:white;font-weight:bold;">Download File</span>',
                                                width: 100,
                                                align: 'center',
                                                style: 'padding:2px; background: #6C87A8; border-color:white',
                                                renderer: function (value, metaData, record) {
                                                    let file = record.get('FILE_NAME'); 

                                                    return `<img src="resources/img/botones/excel-png-office-xlsx-icon-3.png"
                                                                 style="cursor:pointer; width:18px; height:18px;"
                                                                >`;
                                                },
                                                listeners: {
                                                    click: 'onDownloadICCS'
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
