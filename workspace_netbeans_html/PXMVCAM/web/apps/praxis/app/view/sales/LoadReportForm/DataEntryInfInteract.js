/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.LoadReportForm.DataEntryInfInteract', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idInfInteract + '-wdataEntryInfInteract',
    controller: prototype.idInfInteract + '-dataEntryInfInteractController',
    requires: [
        'Ext.Praxis.controller.sales.LoadReport.DataEntryInfInteractController'
    ],
    title: 'Transaction Source',
    header: true,
    width: 600,
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
            id: prototype.idInfInteract + '-dataEntryInfInteract',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 680,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            bodyStyle: 'background: #E5ECEF',
                            padding: '5 0 0 0',
                            id: prototype.idInfInteract + '-det-TxtInfInteract',
                            height: 650,
                            width: 580
                        }
                    ]
                }
            ]
        }
    ]
});