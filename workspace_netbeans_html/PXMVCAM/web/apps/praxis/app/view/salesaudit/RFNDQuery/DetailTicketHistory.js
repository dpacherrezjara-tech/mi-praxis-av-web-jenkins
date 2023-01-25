/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicketHistory', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetailTicketHistory',
    controller: 'DetailTicketHistoryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDQuery.DetailTicketHistoryController'
    ],
    id: prototype.idDetailTicketHistory + '-win',
    title: 'TICKET HISTORY',
    header: true,
    width: 800,
     height: 400,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    closable: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'box',
            id: prototype.idDetailTicketHistory + '-contenido_historica_html',
            layout: 'fit',
            autoScroll: true,
            style: 'background-color: black; color: white; padding: 4px; fontSize:18; fontFamily:Courier New; '
        }/*,
        {
            xtype: 'box',
            hidden: true,
            html: '<div id="content-contenido_historica_html"></div>'
        }*/
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            //margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    xtype: 'button',
                    width: 100,
                    cls: 'x-btn-sent',
                    overCls: 'x-btn-sent-over',
                    text: '<span style="color: white; font-weight: bold;">Close</span>',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
