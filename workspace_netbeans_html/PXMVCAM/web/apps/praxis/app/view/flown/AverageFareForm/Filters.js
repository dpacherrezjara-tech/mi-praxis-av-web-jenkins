/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AverageFareForm.Filters', {
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
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1000
            },
            items: [
                /**
                 *  Panel 01
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters1',
                    border: false,
                    style: 'border-bottom: 0px #ffffff solid;',
                    layout: 'hbox',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '*',
                            style: 'font-weight:bold;color:red;',
                            padding: '10 5 5 5'

                        },
                        {
                            xtype: 'label',
                            text: 'From',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCDEPART',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: '',
                            width: 200,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR'
                        },
                        {
                            xtype: 'label',
                            text: 'To',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCARRIVA',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: '',
                            width: 200,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'A1007CTATO',
                            displayField: 'A1007NOMBR'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFARE',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Fare Basis',
                            width: 200,
                            labelWidth: 70,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 15,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            listeners:{
                                change: function(field, newValue){
                                    field.setValue(newValue.toUpperCase());
                                 } 
                            }
                            //maskRe: /[0-9]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtA1781RBD',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'RBD',
                            width: 90,
                            labelWidth: 40,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 1,
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/
                        }
                    ]
                }
//                {
//                    xtype: 'panel',
//                    bodyStyle: 'background: transparent',
//                    id: prototype.id + '-panelFilters2',
//                    border: false,
//                    layout: 'column',
//                    defaults: {
//                        // labelStyle: 'font-weight:bold;',
//                        fieldStyle: 'text-align: center;',
//                        padding: '8px 7px 8px 10px',
//                        anchor: '100%'
//                    },
//                    items: [
//                        {
//                            xtype: 'label',
//                            text: 'Ticket',
//                            width: 55,
//                            style: 'font-weight:bold;',
//                            padding: '10 5 5 5'
//
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id + '-txtTKT',
//                            required: true,
//                            readOnly: false,
//                            fieldLabel: '',
//                            width: 120,
//                            labelWidth: 0,
//                            fieldStyle: 'text-align: center;',
//                            labelAlign: 'left',
//                            maxLength: 13,
//                            enforceMaxLength: true,
//                            maskRe: /[0-9]/
//                        }
//
//                    ]
//                }
            ]
        }
    ]
});



