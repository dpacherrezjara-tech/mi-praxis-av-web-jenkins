/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.LinkOCRForm.Filters', {
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
            padding: '1px 5px 1px 5px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 5px',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDateFilters',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Scan Date</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '8px 7px 8px 10px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 40,
                            width: 140,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 150},
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            html: '<strong style="color:#000;">View Image From</strong>',
                            width: 140,
                            padding: '8px 7px 8px 10px'

                        },
//                        {
//                            xtype: 'datefield',
//                            format: 'Ym',
//                            id: prototype.id + '-txtFROM',
//                            fieldStyle: 'text-align:center',
//                            maskRe: /[0-9]/,
//                            maxLength: 6,
//                            enforceMaxLength: true,
//                            width: 120
//                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFROM',
                            required: true,
                            fieldLabel: '',
                            width: 80,
                            labelWidth: 0,
                            enableKeyEvents: true,
                            //padding: '1px 5px 0px 10',
                            enforceMaxLength: true,
                            maxLength: 6,
                            maskRe: /[0-9]/,
                            listeners: {
                                keyup: 'eventKey'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            html: '<strong style="color:#000;">To</strong>',
                            width: 40,
                            padding: '8px 7px 8px 10px'
                        },
//                        {
//                            xtype: 'datefield',
//                            format: 'Y/m',
//                            id: prototype.id + '-txtTO',
//                            fieldStyle: 'text-align:center',
//                            maskRe: /[0-9]/,
//                            enforceMaxLength: true,
//                            width: 120
//                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTO',
                            required: true,
                            fieldLabel: '',
                            width: 80,
                            labelWidth: 0,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 6,
                            maskRe: /[0-9]/,
                            listeners: {
                                keyup: 'eventKey'
                            }
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblCorrelativo',
                            labelAlign: 'left',
                            html: '<strong style="color:#000;">Found</strong>',
                            padding: '8px 7px 8px 10px'
                                    //width: 60,                            
                        }
                    ]
                }

            ]
        }
    ]
});

