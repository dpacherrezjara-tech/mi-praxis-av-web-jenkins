/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AccountingMasterDecisionForm.Filters', {
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
                    text: 'Search By :',
                    style: 'font-weight:bold;',
                    padding: '10 5 5 5'

                }, {xtype: 'tbspacer', width: 10},
                {
                    xtype: 'label',
                    text: 'Payment Form',
                    style: 'font-weight:bold;',
                    padding: '10 5 5 5'

                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cbxFP',
                    fieldLabel: '',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 0,
                    width: 100

                }, {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'label',
                    text: 'Source',
                    style: 'font-weight:bold;',
                    padding: '10 5 5 5'

                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cbxSource',
                    fieldLabel: '',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 0,
                    width: 80

                }
                , {xtype: 'tbspacer', width: 5},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCIA',
                    labelAlign: 'left',
                    fieldLabel: 'Operator Company',
                    labelWidth: 120,
                    width: 180,
                    maxLength: 2,
                    enforceMaxLength: true
                }

            ]
        }
    ]
});

