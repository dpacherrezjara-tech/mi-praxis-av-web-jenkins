/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryRulesFaresatpco', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idDataEntryRulesFaresatpco + '-DataEntryRulesFaresatpco',
    controller: prototype.idDataEntryRulesFaresatpco + '-DataEntryRulesFaresatpcoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.FaresatpcoForm.DataEntryRulesFaresatpcoController'
    ],
    header: true,
    width: 1200,
    height: 700,
    title: 'Rules',
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
            id: prototype.idDataEntryRulesFaresatpco + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idDataEntryRulesFaresatpco + '-gridFareRule',
                    width: 1180,
                    height: 580,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Carrier', dataIndex: 'A2393CXRCO', width: 55, align: 'center'},
                            {text: 'Tariff', dataIndex: 'A2393TARNO', width: 50, align: 'left'},
                            {text: 'Rule', dataIndex: 'A2393RULNO', width: 55, align: 'center'},
                            {text: 'Cat.', dataIndex: 'A2393CATNO', width: 45, align: 'center'},
                            {text: 'Loc 1', dataIndex: 'A2393LOC1', width: 60, align: 'center'},
                            {text: 'Loc 2', dataIndex: 'A2393LOC2', width: 60, align: 'center'},
                            {text: 'Fare <br>Class', dataIndex: 'A2393FCLAS', width: 60, align: 'center'},
                            {text: 'Fare <br>Type', dataIndex: 'A2393FTYPE', width: 60, align: 'center'},
                            {text: 'General <br>Rule', dataIndex: 'A2393GEAPP', width: 60, align: 'center'},
                            {text: 'EFF', dataIndex: 'A2393EFFE', width: 80, align: 'center'},
                            {text: 'DISC', dataIndex: 'A2393DISC', width: 85, align: 'center'},
                            {text: 'Season<br> Type', dataIndex: 'A2393STYPE', width: 85, align: 'center'},
                            {text: 'Day Type', dataIndex: 'A2393DTYPE', width: 85, align: 'center'},
                            {text: 'OW/RT', dataIndex: 'A2393OWRT', width: 85, align: 'center'},
                            {text: 'Routing<br> Number', dataIndex: 'A2393RTGNO', width: 85, align: 'center'},
                            {text: 'Footnote', dataIndex: 'A2393FTNT', width: 85, align: 'center'},
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
                                        handler: 'onRuleDetailClick'
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
                    id: prototype.idDataEntryRulesFaresatpco + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});