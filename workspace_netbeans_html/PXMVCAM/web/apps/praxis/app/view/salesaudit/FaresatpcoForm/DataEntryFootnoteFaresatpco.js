/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryFootnoteFaresatpco', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idDataEntryFootnoteFaresatpco + '-DataEntryFootnoteFaresatpco',
    controller: prototype.idDataEntryFootnoteFaresatpco + '-DataEntryFootnoteFaresatpcoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.FaresatpcoForm.DataEntryFootnoteFaresatpcoController'
    ],
    header: true,
    width: 900,
    height: 700,
    title:'Footnote',
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idDataEntryFootnoteFaresatpco + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idDataEntryFootnoteFaresatpco + '-gridFareFoot',
                    width: 880,
                    height: 580,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Carrier', dataIndex: 'A2468CXRCO', width: 60, align: 'center'},
                            {text: 'Tariff', dataIndex: 'A2468TARNO', width: 60, align: 'left'},
                            {text: 'Footnote', dataIndex: 'A2468FTNT', width: 60, align: 'center'},
                            {text: 'Category', dataIndex: 'A2468CATNO', width: 80, align: 'center'},
                            {text: 'Loc 1', dataIndex: 'A2468LOC1', width: 60, align: 'center'},
                            {text: 'Loc 2', dataIndex: 'A2468LOC2', width: 60, align: 'center'},
                            {text: 'Fare Class', dataIndex: 'A2468FCLAS', width: 80, align: 'center'},
                            {text: 'EFF', dataIndex: 'A2468EFF', width: 85, align: 'center'},
                            {text: 'DISC', dataIndex: 'A2468DISC', width: 85, align: 'center'},
                            {text: 'OW/RT', dataIndex: 'A2468OWRT', width: 85, align: 'center'},
                            {text: 'Routing<br> Number', dataIndex: 'A2468RTGNO', width: 85, align: 'center'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: '',
                                width: 50,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Rule',
                                        handler: 'onFootnoteDetailClick'
                                    }
                                ]
                            }
                        ]
                    }, viewConfig: {
                        //trackOver: false,
                        stripeRows: true,
                        enableTextSelection: true
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idDataEntryFootnoteFaresatpco + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});