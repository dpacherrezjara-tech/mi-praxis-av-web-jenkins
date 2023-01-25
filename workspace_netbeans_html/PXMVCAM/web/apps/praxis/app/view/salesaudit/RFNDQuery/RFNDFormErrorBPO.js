/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.RFNDFormErrorBPO', {
    extend: 'Ext.window.Window',
    alias: 'widget.RFNDFormErrorBPO',
    controller: 'RFNDFormErrorBPOController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.RFNDFormErrorBPOController'
    ],
    id: prototype.idRFNDFormErrorBPO + '-win',
    title: 'BPO ERROR LIST',
    header: true,
    height: 300,
    width: 800,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idRFNDFormErrorBPO + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idRFNDFormErrorBPO + '-grid',
                    columnLines: true,
                    autoScroll: true,
                    columns: {
                        items: [
                            {text: 'Status', dataIndex: 'A3669FLAG', width: 60},
                            {text: 'Description', dataIndex: 'A3669DESC', width: 400, renderer: 'onRendererColumnAttr'},
                            {text: 'Creator <br> User', dataIndex: 'A3669REGIS', width: 100},
                            {text: 'Creation <br> Date', dataIndex: 'A3669FREGI', width: 90},
                            {text: 'Creation <br> Time', dataIndex: 'A3669HREGI', width: 80}

                        ],
                        defaults: {
                            sortable: true,
                            menuDisabled: true,
                            align: 'center'
                        }
                    },
                    viewConfig: {
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idRFNDFormErrorBPO + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});





