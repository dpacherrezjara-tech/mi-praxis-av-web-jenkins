/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idDataEntryRules + '-DataEntryRulesatpco',
    controller: prototype.idDataEntryRules + '-DataEntryRulesatpcoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RulesatpcoForm.DataEntryRulesatpcoController'
    ],
    header: true,
    width: 700,
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
            id: prototype.idDataEntryRules + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idDataEntryRules + '-gridRules',
                    width: 600,
                    height: 580,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Field', dataIndex: 'A2684FIELD', width: 100},
                            {text: 'Loc', dataIndex: 'A2684LOC', align: 'center', width: 100, renderer: 'onRendererColumnAttr'},
                            {text: 'Description', dataIndex: 'A2684DESCR', align: 'center', width: 350, renderer: 'onRendererColumnAttr'}
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
                    id: prototype.idDataEntryRules + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});