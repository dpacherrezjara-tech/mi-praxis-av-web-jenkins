valor = '0';
Ext.define('Ext.Praxis.view.payments.ChargebackForm.Info', {
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
                width: 1600,
                height: 'auto',
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
                            id: prototype.id + '-boxMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1522,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    width: 1522,
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
                                                text: 'Source',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'strSCARF', width: 90}
                                                ]
                                            },                                            
                                            {text: 'Applic. Date', dataIndex: 'CHGDATE', width: 100},
                                            {text: 'Adate', dataIndex: 'ADATE', width: 100},
                                            {text: 'Sdate', dataIndex: 'SDATE', width: 100},
                                            {
                                                text: 'Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'CARDTYPE', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Credit Card', dataIndex: 'SCARDN', width: 145},
                                            {text: 'Cardncor', dataIndex: 'SCARDNCOR', width: 145},
                                            {
                                                text: 'Authorization',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'SAUTHOC', width: 90}
                                                ]
                                            },
                                            {
                                                text: 'Merchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
//                                                    {text: 'Nbr.', dataIndex: 'CHARNBR', width: 70},
                                                    {text: 'Name', dataIndex: 'CHARNBR', width: 180,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            metaData.tdAttr = 'data-qtip="' + data.MERCHNAM + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sub Merchant', dataIndex: 'SUCMERCH', width: 180},
//                                            {text: 'Concept', dataIndex: 'CONCEPT', width: 220,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    var data = record.data;
//                                                    metaData.style = "text-align:left;";
//                                                    metaData.tdAttr = 'data-qtip="' + data.CONCEPT + '"';
//                                                    return value;
//                                                }
//                                            },
                                            {text: 'CHGAMOUNT', dataIndex: 'CHGAMOUNT', width: 75},
                                            {text: 'CHGCURREN', dataIndex: 'CHGCURREN', width: 75},
                                            {text: 'Num. Ticket', dataIndex: 'TKTNUMER', width: 75},
                                            {text: 'Prda', dataIndex: 'PRDA', width: 75},
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 75},
                                            {text: 'Stval', dataIndex: 'STVAL', width: 75},
                                            {text: 'Proces', dataIndex: 'PROCESA', width: 75},
                                            {text: 'Auth. Currency', dataIndex: 'SCURRENCY', width: 75},
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 75},
                                            {text: 'Acc. Number', dataIndex: 'ACCNUMBER', width: 75},
                                            {text: 'Code Bank', dataIndex: 'CODEBANK', width: 75},
                                            {text: 'Auth. Amount', dataIndex: 'AUTAMOUNT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                            },
                                                    {text: 'Society', dataIndex: 'SOCIETY', width: 90},
                                                    {text: 'Societyl', dataIndex: 'SOCIETYL', width: 90},
                                                    {text: 'Canal', dataIndex: 'CANAL', width: 50},
                                                    {text: 'Correp', dataIndex: 'COREP', width: 60},
                                                    {text: 'Companyid', dataIndex: 'COMPANYID', width: 60},
                                            
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
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary',
                                    width: 1522,
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

                                        {width: 1030},
                                        {width: 100, id: prototype.id + '-dblTotAUTAMOUNT'},
                                        {width: 390}
                                    ]
                                },
                            ]
                        },

                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1522,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1522,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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
                        },
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


