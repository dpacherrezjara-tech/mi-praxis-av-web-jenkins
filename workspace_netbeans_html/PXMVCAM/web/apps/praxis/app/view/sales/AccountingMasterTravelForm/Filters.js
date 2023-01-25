/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterTravelForm.Filters', {
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
                padding: '5px 1px 5px 5px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Search By',
                    style: 'font-weight:bold;',
                    padding: '8 5 5 5'

                },
                {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtType',
                    labelAlign: 'left',
                    fieldLabel: 'Type',
                    labelWidth: 50,
                    width: 150,
                    maxLength: 10,
                    enforceMaxLength: true
                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAgent',
                    labelAlign: 'left',
                    fieldLabel: 'Agent',
                    labelWidth: 50,
                    width: 170,
                    maxLength: 10,
                    enforceMaxLength: true
                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCta',
                    labelAlign: 'left',
                    fieldLabel: 'Account',
                    labelWidth: 50,
                    width: 150,
                    maxLength: 4,
                    enforceMaxLength: true
                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtSubCta',
                    labelAlign: 'left',
                    fieldLabel: 'Sub Account',
                    labelWidth: 110,
                    width: 160,
                    maxLength: 5,
                    enforceMaxLength: true
                }


            ]
        }
    ]
});

