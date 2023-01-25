/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.AccountingPasseInvoicesForm.Filters', {
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
                 *  Panel 01
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters1',
                    border: false,
                    //style: 'border-bottom: 2px #ffffff solid;',
                    layout: 'hbox',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 3px 8px 3px',
                        anchor: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 100},
//                        {
//                            xtype: 'label',
//                            text: 'Accounting Date',
//                            style: 'font-weight:bold;',
//                            padding: '10 5 5 5'
//
//                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTfecha',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: '',
                            width: 120,
                            labelWidth: 10,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'From',
                            width: 110,
                            labelWidth: 40,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'To',
                            width: 100,
                            labelWidth: 30,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTTRAN',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'Transaction',
                            width: 150,
                            labelWidth: 90,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPEREST',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'Per. Estimated',
                            width: 145,
                            labelWidth: 90,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {xtype: 'tbspacer', width: 40},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkSummary',
                            labelStyle: 'color:#378BCC;font-weight:bold;',
                            width: 70,
                            boxLabel: 'Summary',
                            inputValue: '1',
//                            checked   : true,
                            listeners: {
                                change: 'showSummary'
                            }
                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id + '-cmbPMI',
//                            hidden:true,
//                            fieldStyle: 'text-align: left;',
//                            disabled: false,
//                            fieldLabel: 'PMI',
//                            width: 100,
//                            labelWidth: 40,
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            valueField: 'code',
//                            displayField: 'name'
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id + '-txtTKT',
////                            hidden:true,
//                            required: true,
//                            readOnly: false,
//                            fieldLabel: 'Ticket',
//                            width: 140,
//                            labelWidth: 40,
//                            fieldStyle: 'text-align: center;',
//                            enableKeyEvents: true,
//                            enforceMaxLength: true,
//                            labelAlign: 'left',
//                            maxLength: 13,
//                            maskRe: /[0-9]/,
//                            listeners: {
//                                keypress: 'BuscarTKT_keyDownHandler'
//                            }
//                        },
//                        {
//                            xtype: 'checkboxfield',
//                            id: prototype.id + '-chckBtn',
//                            margin: '8 0 0 20',
//                            width: 90,
//                            boxLabel: 'Source Code',
//                            inputValue: '1'
//                        },
//                        {
//                            xtype: 'combo',
//                            hidden:true,
//                            id: prototype.id + '-cmbSource',
//                            fieldStyle: 'text-align: left;',
//                            disabled: false,
//                            fieldLabel: '',
//                            width: 250,
//                            labelWidth: 0,
//                            labelAlign: 'right',
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            valueField: 'CODSOUR',
//                            displayField: 'DESSOU'
//                        }
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

//
//                    ]
//                }
            ]
        }
    ]
});



