/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAEF;',
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
                width: 1400
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
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Transaction',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbType',
                            fieldStyle: 'text-align: left;',
                            editable: false,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter1',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Request1',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 130,
                                    labelWidth: 40
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Request2',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 120,
                                    labelWidth: 30
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter2',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Rfnd1',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 130,
                                    labelWidth: 40
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Rfnd2',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 120,
                                    labelWidth: 30
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter3',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Emission1',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 130,
                                    labelWidth: 40
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Emission2',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 120,
                                    labelWidth: 30
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter4',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Flown1',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 130,
                                    labelWidth: 40
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-Flown2',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 120,
                                    labelWidth: 30
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter5',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-System1',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 130,
                                    labelWidth: 40
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-System2',
                                    fieldStyle: 'text-align:center;color:blue;',
                                    maskRe: /[0-9]/,
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 120,
                                    labelWidth: 30
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter6',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtIATA',
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: '(*)',
                                    width: 130,
                                    labelWidth: 40,
                                    fieldStyle: 'text-align: center;',
                                    labelStyle: 'color:red',
                                    labelAlign: 'left',
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter7',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCia',
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: '(*)',
                                    width: 70,
                                    labelWidth: 30,
                                    fieldStyle: 'text-align: center;',
                                    labelStyle: 'color:red',
                                    labelAlign: 'left',
                                    maxLength: 3,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true

                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFrmaSerie',
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left',
                                    maxLength: 10,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter8',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '6px 5px 6px 5px',
                            border: true,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                padding: '2px 5px 2px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-Tour',
                                    required: true,
                                    readOnly: false,
                                    fieldLabel: '',
                                    width: 100,
                                    labelWidth: 0,
                                    fieldStyle: 'text-align: center;',
                                    labelAlign: 'left',
                                    maxLength: 20,
                                    maskRe: /[a-zA-Z]/,
                                    enforceMaxLength: true
                                }

                            ]
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-Country',
                            required: true,
                            readOnly: false,
                            fieldLabel: 'Country',
                            width: 110,
                            labelWidth: 50,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            maxLength: 2,
                            enforceMaxLength: true

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbstatus',
                            fieldStyle: 'text-align: left;',
                            editable: false,
                            fieldLabel: 'State',
                            width: 170,
                            labelWidth: 50,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
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



