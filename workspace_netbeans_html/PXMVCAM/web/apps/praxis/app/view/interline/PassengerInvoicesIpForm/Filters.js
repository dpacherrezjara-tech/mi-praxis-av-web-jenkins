/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.PassengerInvoicesIpForm.Filters', {
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
                        {
                            xtype: 'label',
                            text: 'Billing Date',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        },
                        {xtype: 'tbspacer', width: 5},
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
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPeriod',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            fieldLabel: 'Period',
                            width: 130,
                            labelWidth: 60,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbAerolinea',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'Airline',
                            width: 300,
                            labelWidth: 60,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'A005KEY',
                            displayField: 'A005KEY2'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPMI',
                            hidden:true,
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'PMI',
                            width: 100,
                            labelWidth: 40,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindBy',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["TICKET", "Ticket"], ["REJ", "Reject"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "",
                            fieldLabel: 'Search by ',
                            labelWidth: 111,
                            labelAlign: 'right',
                            width: 184,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                change: 'cmbFind_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 33},
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblTkt',
                            text: '',
                            width: 1,
                            hidden: true,
                            padding: '10 0 0 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 13,
                            maskRe: /[0-9]/,
                            width: 150,
                            hidden: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblRej',
                            text: '',
                            width: 110,
                            hidden: true,
                            padding: '10 0 0 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRej',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            //maxLength: 10,
                            hidden: true,
                            width: 140,
                            listeners: {
                                keypress: 'searchRejection'
                            }
                        },
                        /*{
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
//                            hidden:true,
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Ticket',
                            width: 140,
                            labelWidth: 40,
                            fieldStyle: 'text-align: center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            labelAlign: 'left',
                            maxLength: 13,
                            maskRe: /[0-9]/,
                            listeners: {
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },*/
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chckBtn',
                            margin: '8 0 0 20',
                            width: 90,
                            boxLabel: 'Source Code',
                            inputValue: '1'
                        },
                        {
                            xtype: 'combo',
                            hidden:true,
                            id: prototype.id + '-cmbSource',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: '',
                            width: 250,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODSOUR',
                            displayField: 'DESSOU'
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

//
//                    ]
//                }
            ]
        }
    ]
});



