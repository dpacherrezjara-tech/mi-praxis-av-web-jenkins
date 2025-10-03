Ext.define('Ext.Praxis.view.payments.DuplicateSettlementsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
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
                    bodyStyle: 'background-color: transparent;',
                     border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            width: 1327,
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #F4F7FD;',
                            padding: '1',
                            hidden: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    height: 510,
                                    width: 1327,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkcolumn', 
                                                text: 'SEL', 
                                                width: 50, 
                                                dataIndex: 'checkActive',
                                                align: 'center',
                                                menuDisabled: true,
                                                style: 'padding:2px; background: #3F5675;border-color:white',
                                                listeners: {
                                                    checkchange: 'markSettlement'
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;background: #3F5675;color:white";
                                                    return '';
                                                }
                                            },
                                            {text: 'STVAL', dataIndex: 'STVAL', width: 150,style: 'padding:2px; background: #3F5675;border-color:white',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value.replace(/\s/g, '') == '0') {
                                                        metaData.style = 'background: #c8e6c9';
                                                        return '<span style="font-weight: bold;">Pending</span>';
                                                    } else if (value.replace(/\s/g, '') == '1') {
                                                        metaData.style = 'background: #ffcccb';
                                                        return '<span style="font-weight: bold;">Match</span>';
                                                    } else if (value.replace(/\s/g, '') == '2') {
                                                        metaData.style = 'background: #ffd1b3';
                                                        return '<span style="font-weight: bold;">Sales Without Settlement</span>';
                                                    } else if (value.replace(/\s/g, '') == '3') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Settlement Without Sales</span>';
                                                    } else if (value.replace(/\s/g, '') == '4') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Diference</span>';
                                                    } else if (value.replace(/\s/g, '') == '5') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Manual</span>';
                                                    } else if (value.replace(/\s/g, '') == '6') {
                                                        metaData.style = 'background: #a2d5f2';
                                                        return '<span style="font-weight: bold;">Match Forzado</span>';
                                                    } else {
                                                        metaData.style = 'background: #cfcfcf';
                                                        return '<span style="font-weight: bold;">Sin Estado</span>';
                                                    }
                                                },
                                            },
                                            {text: 'SCOUNTRY', dataIndex: 'SCOUNTRY', width: 120,style: 'padding:2px; background: #3F5675;border-color:white'},
                                            {text: 'TDOC', dataIndex: 'TDOC', width: 120,style: 'padding:2px; background: #3F5675;border-color:white'},
                                            {text: 'CODEBANK', dataIndex: 'CODEBANK', width: 120,style: 'padding:2px; background: #3F5675;border-color:white'},
                                            {text: 'SCARCOD', dataIndex: 'SCARCOD', width: 120,style: 'padding:2px; background: #3F5675;border-color:white'},
                                            {text: 'SCARDN', dataIndex: 'SCARDN', width: 150,style: 'padding:2px; background: #3F5675;border-color:white',
                                                 renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.style = "text-align:left;";
//                                                        value = Ext.util.Format.number(value, '0,000.00');
                                                        return value;
                                                    }
                                             },
                                            {text: 'SAUTHOC', dataIndex: 'SAUTHOC', width: 120,style: 'padding:2px; background: #3F5675;border-color:white'},
                                            {text: 'SEQ', dataIndex: 'SEQ', width: 120,style: 'padding:2px; background: #3F5675;border-color:white'},
                                             {text: 'SVFOP', dataIndex: 'SVFOP', width: 120,style: 'padding:2px; background: #3F5675;border-color:white',
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.style = "text-align:right;";
                                                value = Ext.util.Format.number(value, '0,000.00');
                                                return '<b>' + value + '</b>';
                                            }},
                                             
                                            
//                                             {text: 'ADATE', dataIndex: 'ADATE', width: 60,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             
//                                             {text: 'SDATE', dataIndex: 'SDATE', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'SAGENT', dataIndex: 'SAGENT', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'MERCHAND', dataIndex: 'MERCHAND', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'RED', dataIndex: 'RED', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'NETO', dataIndex: 'NETO', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             
//                                             
//                                             {text: 'NEGOC', dataIndex: 'NEGOC', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             
//                                             {text: 'ACCNUMBER', dataIndex: 'ACCNUMBER', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             
//                                             {text: 'FECR', dataIndex: 'FECR', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'HOCR', dataIndex: 'HOCR', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             
//                                             
//                                             {text: 'TERMI', dataIndex: 'TERMI', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'COMISION', dataIndex: 'COMISION', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'TOTAL', dataIndex: 'TOTAL', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'SCURRENCY', dataIndex: 'SCURRENCY', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                            
//                                             
//                                             {text: 'CODEBANK', dataIndex: 'CODEBANK', width: 65,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                             {text: 'Credit Card',style: 'background: #3F5675;border-color:white',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'Code', dataIndex: 'CODE', width: 70,style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'Number', dataIndex: 'CORE', width: 160, style: 'background: #3F5675;border-color:white'},
//                                                    {
//                                                        text: 'Author',
//                                                        style: 'background: #3F5675;border-color:white',
//                                                        columns: [
//                                                            {text: 'Code', dataIndex: 'CODE', width: 90, align:'center',style: 'background: #3F5675;border-color:white'}
//                                                        ]
//                                                    }
//                                                ]
//                                            },
//                                            {text: 'Curr', dataIndex: 'RN', width: 60,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                            {text: 'Amount', dataIndex: 'RN', width: 80,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                            {text: 'Comision', dataIndex: 'RN', width: 80,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                            {text: 'Comistota', dataIndex: 'RN', width: 80,style: 'padding:2px; background: #3F5675;border-color:white'},
//                                            {text: 'Sales',style: 'background: #3F5675;border-color:white',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'Merchant', dataIndex: 'CODE', width: 110,style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'PNR', dataIndex: 'CORE', width: 100, align: 'center',style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'Agent.', dataIndex: 'CORE', width: 110, style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'Business.', dataIndex: 'CORE', width: 110, style: 'background: #3F5675;border-color:white'}
//                                                ]
//                                            },
//                                             {text: 'Bank Information',style: 'background: #3F5675;border-color:white',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center',
//                                                    border: true
//                                                },
//                                                columns: [
//                                                    {text: 'Pay. Date', dataIndex: 'CODE', width: 90,style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'Acc Number', dataIndex: 'CORE', width: 120, align: 'center',style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'Termi.', dataIndex: 'CORE', width: 120, style: 'background: #3F5675;border-color:white'},
//                                                    {text: 'ID SAP.', dataIndex: 'CORE', width: 120, style: 'background: #3F5675;border-color:white'},
//                                                     {text: 'Pen. <br> Day.', dataIndex: 'CORE', width: 120, style: 'background: #3F5675;border-color:white'}
//                                                ]
//                                            },
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
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
                    bodyStyle: 'background: #3F5675; border-radius: 5px;',
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
);


