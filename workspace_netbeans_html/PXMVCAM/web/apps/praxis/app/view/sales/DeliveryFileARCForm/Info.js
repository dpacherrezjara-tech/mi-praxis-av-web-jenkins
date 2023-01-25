/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.DeliveryFileARCForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: white;',
    defaults: {
        bodyStyle: 'background: white;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            bodyStyle: 'background: white;',
            id: prototype.id + '-regionCenterGrid01',
            margin: '10 ,0 ,0 ,0',
            width: 910,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: white;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'textareafield',
                    height: 440,
                    border: false,
                    id: prototype.id + '-txaDelivery',
                    padding: '0 0 0 0',
                    width: 900,
                    fieldLabel: '',
                    labelPad: 0,
                    labelSeparator: ' ',
                    fieldStyle: 'color: #0B333C; font-size: 10px; font-family : Courier New',
                    labelWidth: 0
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

