/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.RatesExchangeForm.Filters', {
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
                    padding: '10 5 5 5'

                }
                , {xtype: 'tbspacer', width: 15},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSearchType',
                    fieldLabel: 'Type',
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 50,
                    width: 160

                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboFilter',
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
                    labelWidth: '',
                    width: 100

                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-filterPanel_01',
                    border: false,
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'left',
                        hidden: false

                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_1_1',
                            fieldLabel: '',
                            labelAlign: 'right',
                            labelWidth: 0,
                            width: 60,
                            maxLength: 3,
                            enforceMaxLength: true

                        },                       
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_1_2',
                            fieldLabel: 'Date From',
                            labelAlign: 'right',
                            labelWidth: 110,
                            width: 180,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_1_3',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            labelWidth: 50,
                            width: 120,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-filterPanel_02',
                    border: false,
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'left',
                        hidden: false

                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_2_1',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            labelWidth:50,
                            width: 120,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true

                        },                        
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_2_2',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            labelWidth: 30,
                            width: 100,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_2_3',
                            fieldLabel: 'Currency',
                            labelAlign: 'right',
                            labelWidth: 100,
                            width: 150,
                            maxLength: 3,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-filterPanel_03',
                    border: false,
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'left',
                        hidden: false

                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_3_1',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            labelWidth:40,
                            width: 100,
                            maxLength: 3,
                            enforceMaxLength: true

                        },                        
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_3_2',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            labelWidth: 30,
                            width: 100,
                            maxLength: 3,
                            enforceMaxLength: true

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_3_3',
                            fieldLabel: 'Date From ',
                            labelAlign: 'right',
                            labelWidth: 100,
                            width: 170,
                            maxLength: 8,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_3_4',
                            fieldLabel: 'To ',
                            labelAlign: 'right',
                            labelWidth: 40,
                            width: 110,
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-filterPanel_04',
                    border: false,
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'left',
                        hidden: false

                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_4_1',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            labelWidth:50,
                            width: 120,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enforceMaxLength: true

                        },                        
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_4_2',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            labelWidth: 30,
                            width: 100,
                            maxLength: 8,
                            enforceMaxLength: true

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_4_3',
                            fieldLabel: 'Currency From ',
                            labelAlign: 'right',
                            labelWidth: 130,
                            width: 190,
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txt_4_4',
                            fieldLabel: 'To ',
                            labelAlign: 'right',
                            labelWidth: 40,
                            width: 100,
                            maxLength: 3,
                            enforceMaxLength: true
                        }
                    ]
                }


            ]
        }
    ]
});

