/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRfnd', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryFareCalcRfnd',
    controller: 'DataEntryFareCalcRfndController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFareCalcRfndController'
    ],
    id: prototype.idRfndFareCalc + '-winDataEntryFareCalcRfnd',
    title: 'Fare Calculation',
    header: true,
    height: 200,
    width: 700,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idRfndFareCalc + '-dataEntryFareCalcRfnd',
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
                            id: prototype.idRfndFareCalc + '-det-TktFareCalc',
                            height: 100,
                            width: 680
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idRfndFareCalc + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRfndFareCalc + '-gridFareCalcSave',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveFareCalcClick'
                    }
                }
            ]
        }
    ]

});

