/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FOBForm.Filters', {
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
                sanchor: '100%'

            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    border: false,
                    //style: 'border-bottom: 8px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Search By</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:red;font-size:13px;">*</strong>',
                            width: 30
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDate',
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
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 120,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIata',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9/]/,
                            maxLength: 8,
                            width: 90,
                            labelWidth: 0,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id: prototype.id + '-txtA1728FFIN_01',
                            fieldStyle: 'text-align:center',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            maskRe: /[0-9/]/,
                            maxLength: 10,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            width: 150,
                            labelWidth: 50,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            },
                            listeners: {
                                keypress: function(obj, e, eOpts) {
                                    if (e.getKey() === e.ENTER) {
                                        Ext.getCmp(prototype.id + '-txtA1728FFIN_02').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id: prototype.id + '-txtA1728FFIN_02',
                            fieldStyle: 'text-align:center',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            maskRe: /[0-9/]/,
                            maxLength: 10,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            width: 140,
                            labelWidth: 40,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            },
                            listeners: {
                                keypress: function(obj, e, eOpts) {
                                    if (e.getKey() === e.ENTER) {
                                        Ext.getCmp(prototype.id + '-txtIata_02').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtIata_02',
                            required: true,
                            editable: true,
                            fieldLabel: 'IATA',
                            labelAlign: 'right',
                            enableKeyEvents: true,
                            width: 180,
                            labelWidth: 60,
                            maxLength: 8,
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtLote',
                            required: true,
                            editable: true,
                            fieldLabel: '',
                            enableKeyEvents: true,
                            width: 100,
                            labelWidth: 0,
                            maxLength: 20,
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right',
                            padding: '8px 2px 8px 2px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbmStatus',
                            fieldLabel: 'Status',
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
                            labelWidth: 80,
                            width: 200,
                            anchor: '100%'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-download-detail-lote',
                            icon: 'resources/img/botones/download.png',
                            tooltip: 'Download Datail',
                            listeners: {
                                click: 'img_downloadDetailLote_clickHandler'
                            }
                        }
                    ]
                }

            ]
        }
    ]
});

