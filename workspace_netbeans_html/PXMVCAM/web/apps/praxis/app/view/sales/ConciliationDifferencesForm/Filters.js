/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.ConciliationDifferencesForm.Filters', {
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
                width: 1550
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters',
                    border: false,
                    //style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        /*{
                            xtype: 'label',
                            text: 'Search By',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        }
                        , {xtype: 'tbspacer', width: 5},
                        */
                        {
                            xtype: 'combo',
                            fieldLabel: 'Search By', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            id: prototype.id + '-cbxSearchBy',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,                            
                            width: 220,
                            //labelWidth: 0,                            
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            listeners: {
                                change: 'changeCmbSearchBy'
                            }
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            anchor: '100%',value: new Date(),
                            id: prototype.id + '-txtFPRDA_FROM',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40,
                            enableKeyEvents: true,
                            listeners: {                                
                                change:function( obj, newValue, oldValue, eOpts){
                                    //console.log('****' + newValue);
                                    Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue( newValue );
                                },
                                keypress: function (obj, e, eOpts) {
                                    if (e.getKey() === e.ENTER) {
                                        Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue( Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue() );
                                        Ext.getCmp(prototype.id + '-txtFPRDA_TO').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            anchor: '100%',value:new Date(),
                            id: prototype.id + '-txtFPRDA_TO',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 130,
                            labelWidth: 30,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: function (obj, e, eOpts) {
                                    if (e.getKey() === e.ENTER) {
                                        Ext.getCmp(prototype.id + '-txtPais').focus();
                                    }
                                }
                            }
                        },                       
                        {                            
                            xtype: 'combo',
                            fieldLabel: 'Source', labelAlign: 'right', labelStyle: 'font-weight: bold;',                            
                            id: prototype.id + '-cmbSource',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["ARC", "ARC"], ["BSP", "BSP"], ["ASR", "ASR"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            forceSelection: true,
                            caseSensitive: false,
                            editable: true,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            width: 180,
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            padding: '6 0',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("ASR");
                                },
                                focus: function (combo) {
                                    combo.expand();
                                },
                                keypress: 'onTextKeypress',
                                change: 'CmbSource_clickHandler'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPais',
                            required: true,
                            disabled: false,
                            readOnly: false,                            
                            fieldLabel: 'Country', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            width: 120,
                            labelWidth: 60,
                            enableKeyEvents: true,                            
                            enforceMaxLength: true,
                            maxLength: 2,
                            maskRe: /[a-zA-Z]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIATA',                                                        
                            fieldLabel: 'Agent', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            width: 125,
                            labelWidth: 60,
                            enableKeyEvents: true,                            
                            enforceMaxLength: true,
                            maxLength: 8,
                            //maskRe: /[a-zA-Z]/,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Bank', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            id: prototype.id + '-cmbBank',
                            hidden:true,
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "ALL"], ["IAP", "IAP"], ["IAR", "IAR"], ["ELW", "ELW"]
                                ]
                            }),
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            forceSelection: true,
                            caseSensitive: false,
                            editable: true,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            width: 180,
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            padding: '6 0',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                },
                                focus: function (combo) {
                                    combo.expand();
                                },
                                keypress: 'onTextKeypress',
                                change: 'CmbBank_clickHandler',
                            }
                        }
                    ]
                }

            ]
        }
    ]
});



