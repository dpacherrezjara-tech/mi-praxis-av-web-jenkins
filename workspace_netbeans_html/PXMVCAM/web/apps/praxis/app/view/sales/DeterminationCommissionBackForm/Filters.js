/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.DeterminationCommissionBackForm.Filters', {
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
                width: 1900
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDateFilters',
                    border: false,
                    style: 'border-bottom: 8px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'Year',
                            labelAlign: 'left',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 150,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbtypeperiod',
                            fieldLabel: 'Type Period',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 90,
                            width: 200,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPeriod',
                            fieldLabel: '',
                            labelAlign: 'left',
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
                            width: 120,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPais',
                            fieldLabel: 'Country',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'A051KEY2',
                            displayField: 'A051DESCR1',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 200,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtChema',
                            fieldLabel: 'Schema',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'A051KEY2',
                            displayField: 'A051DESCR1',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 350,
                            anchor: '200%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtProccess',
                            fieldLabel: 'Proccess',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'A3034CDESQ',
                            displayField: 'A3034NAME',
                            emptyText: 'All',
                            labelWidth: 65,
                            width: 220,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSelectTypeIATA',
                            fieldLabel: 'Group IATA',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 90,
                            width: 220,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSelectBy',
                            fieldLabel: 'Select By',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 90,
                            width: 220,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIATA',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            enforceMaxLength: true,
                            maxLength: 13,
                            value: '',
                            width: 120,
                            labelWidth: 0,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIATAH',
                            required: true,
                            editable: true,
                            fieldLabel: 'IATA HOME',
                            enforceMaxLength: true,
                            maxLength: 13,
                            value: '',
                            width: 200,
                            labelWidth: 90,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtLABEL',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            enforceMaxLength: true,
                            maxLength: 13,
                            value: '',
                            width: 120,
                            labelWidth: 0,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            enforceMaxLength: true,
                            maxLength: 13,
                            value: '',
                            width: 120,
                            labelWidth: 0,
                            maskRe: /[0-9]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbEnvironment',
                            fieldLabel: 'Environment',
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 90,
                            width: 220,
                            anchor: '100%'
                        }
//                      
//                        {
//                            xtype: 'datefield',
//                            format: 'Y/m/d',
//                            fieldLabel: '<b>From</b>',
//                            anchor: '100%',
//                            id: prototype.id + '-txtFPRDA_FROM',
//                            fieldStyle: 'text-align:center',
//                            maskRe: /[0-9/]/,
//                            enforceMaxLength: true,
//                            width: 140,
//                            labelWidth: 40
//                        },
//                       
//                        {
//                            xtype: 'radiogroup',
//                            id: prototype.id + '-rbgCtlStpro',
//                            fieldLabel: 'Status',
//                            labelWidth: 50,
//                            horizontal: true,
//                            items: [
//                                {boxLabel: '<strong >All</strong>', name: 'rb', inputValue: '', width: 50},
//                                {boxLabel: '<strong >Error</strong>', name: 'rb', inputValue: '1', width: 60, checked: true},
//                                {boxLabel: '<strong >OK</strong>', name: 'rb', inputValue: '0', width: 50}
//                            ]
//                        }

                    ]
                }

            ]
        }
    ]
});

