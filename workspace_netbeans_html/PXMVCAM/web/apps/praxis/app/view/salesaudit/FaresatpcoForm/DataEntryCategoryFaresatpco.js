/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryCategoryFaresatpco', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idDataEntryCategoryFaresatpco + '-DataEntryCategoryFaresatpco',
    controller: prototype.idDataEntryCategoryFaresatpco + '-DataEntryCategoryFaresatpcoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.FaresatpcoForm.DataEntryCategoryFaresatpcoController'
    ],
    header: true,
    width: 720,
    height: 700,
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
            id: prototype.idDataEntryCategoryFaresatpco + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idDataEntryCategoryFaresatpco + '-gridTableFoot',
                    width: 700,
                    height: 600,
                    hidden:true,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Relational<br> Indicator', dataIndex: 'A2468LOGIC', width: 150, renderer: 'onRendererColumnFoot'},
                            {text: 'Table', dataIndex: 'A2468TABLE', align: 'center', width: 80},
                            {text: 'Categoria', dataIndex: 'A2468CATNO', align: 'center', width: 100, renderer: 'onRendererColumnAttr'},
                            {text: 'Information <br>about Table', dataIndex: 'A2468INFORMATION', align: 'center', width: 280, renderer: 'onRendererColumnAttr'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Footnote',
                                width: 70,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Footnote',
                                        handler: 'onDetailFootClick'
                                    }
                                ]
                            }
                        ]
                    }, viewConfig: {
                        //trackOver: false,
                        stripeRows: true,
                        enableTextSelection: true
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.idDataEntryCategoryFaresatpco + '-gridTableRule',
                    width: 700,
                    hidden: true,
                    height: 600,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Relational<br> Indicator', dataIndex: 'A2393LOGIC', width: 150, renderer: 'onRendererColumnRule'},
                            {text: 'Cat.', dataIndex: 'A2393CATNO', align: 'center', width: 80},
                            {text: 'Table', dataIndex: 'A2393TABLE', align: 'center', width: 100, renderer: 'onRendererColumnAttr'},
                            {text: 'Information <br>about Table', dataIndex: 'A2393INFORMATION', align: 'center', width: 280, renderer: 'onRendererColumnAttr'},
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Footnote',
                                width: 70,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Footnote',
                                        handler: 'onDetailRulesClick'
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
                    id: prototype.idDataEntryCategoryFaresatpco + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});