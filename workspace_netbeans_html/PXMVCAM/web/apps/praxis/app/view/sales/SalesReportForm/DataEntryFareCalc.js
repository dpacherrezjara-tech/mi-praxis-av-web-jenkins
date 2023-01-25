/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalc', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-wdataEntryFareCalc',
    controller: prototype.id + '-dataEntryFareCalcController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFareCalcController'
    ],
    title: 'Fare Calculation',
    header: true,
    width: 700,
    height: 140,
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
            id: prototype.id + '-dataEntryFareCalc',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 130,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            bodyStyle: 'background: #E5ECEF',
                            padding: '5 0 0 0',
                            id: prototype.id + '-det-TktFareCalc',
                            height: 100,
                            width: 680
                        }
                    ]
                }
            ]
        }
    ]
});