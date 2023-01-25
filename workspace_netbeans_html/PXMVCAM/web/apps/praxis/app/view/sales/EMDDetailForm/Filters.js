/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.EMDDetailForm.Filters', {
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
                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Search By',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        }
                        , {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbOpcion',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 120,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From',
                            anchor: '100%',
                            id: prototype.id + '-txtFilterDateFrom',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 140,
                            labelWidth: 40
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'To',
                            anchor: '100%',
                            id: prototype.id + '-txtFilterDateTo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 130,
                            labelWidth: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterCONTABLE',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 100,
                            labelWidth: 0,
                            enableKeyEvents: true,
                            labelAlign: 'left'
                                    //enforceMaxLength: true,
                                    // hidden: true,
                                    // maxLength: 9,
                                    //maskRe: /[0-9]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterGRUPO',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 100,
                            labelWidth: 0,
                            enableKeyEvents: true,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            // hidden: true,
                            maxLength: 9,
                            maskRe: /[0-9]/
                        }
                        //txtFilterTax
                        //txtTotalLoc
                        //txtTotalRev

                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters2',
                    border: false,
                    layout: 'column',
                    defaults: {
                        // labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 7px 8px 10px',
                        anchor: '100%'
                    },
                    items: [
                        //cmbContrytax                       
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbSALES',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Source',
                            width: 120,
                            labelWidth: 50,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbBANK',
                            fieldStyle: 'text-align: left;',
                            required: true,
                            disabled: false,
                            fieldLabel: 'Bank',
                            width: 120,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterCOUNTRY',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Country',
                            width: 130,
                            labelWidth: 60,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 2,
                            maskRe: /[a-zA-Z]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterCHANNEL',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Channnel',
                            width: 160,
                            labelWidth: 60,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 16,
                            maskRe: /[a-zA-Z]/
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterRFIC',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'RFIC',
                            width: 130,
                            labelWidth: 30,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 1
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterServiceCode',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Service Code',
                            width: 180,
                            labelWidth: 80,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 3
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFilterIATA',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'IATA Code',
                            width: 180,
                            labelWidth: 80,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 9,
                            maskRe: /[0-9]/
                        }
                        //txtFilterCurrency
                        //txtFilterContryTax

                    ]
                }
            ]
        }
    ]
});



