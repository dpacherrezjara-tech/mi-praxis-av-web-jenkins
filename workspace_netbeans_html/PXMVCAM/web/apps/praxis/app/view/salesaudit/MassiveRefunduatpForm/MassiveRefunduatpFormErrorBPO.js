/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormErrorBPO', {
    extend: 'Ext.window.Window',
    alias: 'widget.MassiveRefunduatpFormErrorBPO',
    controller: 'MassiveRefunduatpFormErrorBPOController',
    requires: [
        'Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormErrorBPOController'
    ],
    id: prototype.idMassiveRefunduatpFormErrorBPO + '-win',
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
            id: prototype.idMassiveRefunduatpFormErrorBPO + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idMassiveRefunduatpFormErrorBPO + '-grid',
                    columnLines: true,
                    autoScroll: true,
                    width: 780,
                    height: 300,
                    columns: {
                        items: [
                            {text: 'Status', dataIndex: 'A4076FLAG', width: 60},
                            {text: 'Description', dataIndex: 'A4076DESC', width: 400, renderer: 'onRendererColumnAttr'},
                            {text: 'Creator <br> User', dataIndex: 'A4076REGIS', width: 100},
                            {text: 'Creation <br> Date', dataIndex: 'A4076FREGI', width: 90},
                            {text: 'Creation <br> Time', dataIndex: 'A4076HREGI', width: 80}

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
                    id: prototype.idMassiveRefunduatpFormErrorBPO + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]

});





