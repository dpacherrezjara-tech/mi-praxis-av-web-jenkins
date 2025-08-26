 Ext.define('Ext.Praxis.view.payments.AgentsCatalogForm.Info', {
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
                    bodyStyle: 'background-color: transparent;',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                             width: 1390,
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
                                    id: prototype.id + '-gridDataAirport',
                                    height: 548,
                                    width: 1390,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Nbr', dataIndex: 'RN', width: 40,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Country', dataIndex: 'COUNTRY', width: 62,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Code', dataIndex: 'SAGENT', width: 80,style: 'padding:2px; background: #3F5675;border-color:white',},                                            
                                            {text: 'Name', dataIndex: 'DESCSAGENT', width: 200, align: 'center',style: 'padding:2px; background: #3F5675;border-color:white',
                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value
                                                        }},
                                            {text: 'Channel', dataIndex: 'CANAL', width: 65,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'City', dataIndex: 'CITY', width: 70,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Society', dataIndex: 'SOCIETY', width: 60,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Bussines', dataIndex: 'descNEGOC', width: 90,style: 'padding:2px; background: #3F5675;border-color:white',},
                                             {
                                                text: 'Details Cash', style: 'background: #3F5675;border-color:white',
                                                columns: [
                                                    {
                                                        text: 'Payment', 
                                                        style: 'background: #3F5675;border-color:white',
                                                        columns: [
                                                             {text: 'Code ', dataIndex: 'FORMPAYM', width: 50, align: 'center',style: ' background: #3F5675;border-color:white',},
                                                            {text: 'Form', dataIndex: 'DESCRIPTION_PAYMENT', width: 140, align: 'center,',style: 'background: #3F5675;border-color:white',
                                                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                            return value
                                                        },},
                                                        ]
                                                    },
                                                   
                                                    {text: 'Acc Bank', dataIndex: 'NACCBANK', width: 90, align: 'center',style: 'background: #3F5675;border-color:white',},
                                                    {text: 'Frec Payment', dataIndex: 'FRECPAYM', width: 100, align: 'center',style: 'background: #3F5675;border-color:white',
                                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                        
                                                        metaData.style = "text-align:left;";
                                                        metaData.tdCls = "x-grid-cell x-grid-td x-grid-cell-actioncolumn-1609 x-grid-cell-last x-selectable";
                                                        
                                                        if (value == "98") {
                                                            return "IATA BSP";
                                                        } else if (value == "99") {
                                                            return "IATA ARC";
                                                        } else {
                                                            return value;
                                                        }
                                                        
                                                    }},
                                                   {
                                                        text: 'Period', 
                                                        style: 'background: #3F5675;border-color:white',
                                                        columns: [
                                                            {text: 'From ', dataIndex: 'T_DATEF', width: 70, align: 'center',style: ' background: #3F5675;border-color:white'},
                                                            {text: 'To', dataIndex: 'T_DATET', width: 70, align: 'center,',style: 'background: #3F5675;border-color:white'}
                                                    
                                                        ]
                                                    }
                                                ]
                                            },
                                            {text: 'Email-1', dataIndex: 'EMAILS', width: 120, align: 'center',style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Email-2', dataIndex: 'EMAILS2', width: 120, align: 'center',style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Email-3', dataIndex: 'EMAILS3', width: 120, align: 'center',style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Email-4', dataIndex: 'EMAILS4', width: 120, align: 'center',style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Email-5', dataIndex: 'EMAILS5', width: 120, align: 'center',style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Phone', dataIndex: 'NPHONE', width: 80,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Terminal', dataIndex: 'TERMI', width: 80,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {text: 'Contact', dataIndex: 'CONTAC', width: 120,style: 'padding:2px; background: #3F5675;border-color:white',},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                style: 'padding:2px; background: #3F5675;border-color:white',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick',
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
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
            margin: '5 0 20 0',
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


