/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.FlightInteractPraxisForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '7px 1px 5px 1px',
                anchor: '100%',               
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'label',
                    labelAlign: 'left',
                    html: '<strong style="color:#000;">Search By</strong>',
                    width: 80,
                    padding: '10px 5px 5px 10px'
                },
                {
                    xtype: 'label',width: 10, height: 25 ,margin: '5px 5px 2px 0px',                    
                    style:'style="border-right: 1px solid #B7B8B8'         
                },
                {
                    xtype: 'datefield',
                    id: prototype.id + '-txtFecha',
                    fieldLabel: 'Flight Date',
                     labelAlign: 'left',
                    format: 'Y/m/d',
                    fieldStyle: 'text-align:center',
                    maskRe: /[0-9]/,
                    width: 200
                }
            ]
        }
    ]
});

