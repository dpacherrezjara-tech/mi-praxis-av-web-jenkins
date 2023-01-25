/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates FormPDIRFND
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormPDIRFND', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormPDIRFND',
    controller: 'FormPDIRFNDController',
    requires: [
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.FormPDIRFNDController'
    ],
    title: 'PDI RFND',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 500,
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
            id: prototype.id07 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                /* {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-Filter',
                            fieldLabel: 'Filter',
                            labelAlign: 'right',
                            labelWidth: 60,
                            width: 600,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        }
                    ]
                },*/ {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textareafield',
                            name: 'pdi',
                            id: prototype.id07 + '-pdi',
                            fieldLabel: 'PDI',
                            height: 420,
                            readOnly: true,
                            width: 750
                        }
                    ]
                }
            ]
        }
    ]
});


