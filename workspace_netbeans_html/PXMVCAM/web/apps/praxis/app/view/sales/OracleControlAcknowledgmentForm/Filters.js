/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.OracleControlAcknowledgmentForm.Filters', {
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
//                {
//                    xtype: 'label',
//                    text: 'Search By',
//                    style: 'font-weight:bold;',
//                    padding: '10 5 5 5'
//
//                }
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboModulo',
                    fieldLabel: '<b>Module</b> <strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                    width: 250,
                    labelWidth: 90,
                    editable: false,
                    labelAlign: 'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboAccion',
                    fieldLabel: '<b>Type</b> ',
                    width: 150,
                    labelWidth: 50,
                    editable: false,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name'
                },
                {
                    xtype: 'datefield',
                    format: 'Y/m/d',
                    fieldLabel: '<b>Date From</b>',
                    anchor: '100%',
                    id: prototype.id + '-txtDateFrom',
                    fieldStyle: 'text-align:center',
                    maskRe: /[0-9/]/,
                    enforceMaxLength: true,
                    width: 180,
                    labelWidth: 80
                },
                {
                    xtype: 'datefield',
                    format: 'Y/m/d',
                    fieldLabel: '<b> To</b>',
                    anchor: '100%',
                    id: prototype.id + '-txtDateTo',
                    fieldStyle: 'text-align:center',
                    maskRe: /[0-9/]/,
                    enforceMaxLength: true,
                    width: 140,
                    labelWidth: 40
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboEstado',
                    fieldLabel: '<b>Status</b> ',
                    width: 220,
                    labelWidth: 60,
                    editable: false,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cboFuente',
                    fieldLabel: '<b>Source</b> ',
                    width: 180,
                    labelWidth: 70,
                    editable: false,
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name'
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtPais',
                    readOnly: false,
                    fieldLabel: '<b></b>',
                    width: 150,
                    labelWidth: 70,
                    enableKeyEvents: true,
                    labelAlign: 'right',
                    maskRe: /[0-9]/
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCanal',
                    readOnly: false,
                    fieldLabel: '<b></b>',
                    width: 150,
                    labelWidth: 70,
                    enableKeyEvents: true,
                    labelAlign: 'right',
                    maskRe: /[0-9]/

                }
            ]
        }
    ]
});

