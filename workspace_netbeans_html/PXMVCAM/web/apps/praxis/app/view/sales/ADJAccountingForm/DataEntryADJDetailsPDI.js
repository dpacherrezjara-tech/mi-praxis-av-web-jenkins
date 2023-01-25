/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.ADJAccountingForm.DataEntryADJDetailsPDI', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryADJDetailsPDI',
    controller: 'DataEntryADJDetailsPDIController',
    requires: [
        'Ext.Praxis.controller.sales.ADJAccounting.DataEntryDetailsPDIController'
    ],
    header: true,
    height: 410,
    title: 'PDI Information',
    width: 1100,
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
            id: prototype.idADJPDI + '-contenido_html',
            layout: 'fit',
            autoScroll: true,
            style: 'background-color: black; color: white; padding: 4px; fontSize:14; fontFamily:Courier New; '
        },
        {
            xtype: 'box',
            hidden:true,
            html: '<div id="content-contenido_html"></div>'
        }
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


