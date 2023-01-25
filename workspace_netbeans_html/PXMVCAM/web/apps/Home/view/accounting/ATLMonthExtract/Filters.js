/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Filters                                           *
 * Created on : 18-10-2016, 16:44:05                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 18-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.accounting.ATLMonthExtract.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accounting-atl-month-extract-form-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '1px 0px 1px 0px',
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
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Accounting Period',
                    style: 'color:#000;font-weight:bold;',
                    margin: '3px 0px 0px 5px',
                    width: 120,
                    hidden: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'From',
                    id: 'vATLMonthExtract-cmbDateFromYear',
                    store: Ext.create('PXMVCAMHome.store.accounting.ATLMonthExtract.DateYears'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'data',
                    displayField: 'label',
                    emptyText: '[All]',
                    labelWidth: 40,
                    width: 120,
                    hidden: false,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '',
                    id: 'vATLMonthExtract-cmbDateFromMonth',
                    store: Ext.create('PXMVCAMHome.store.accounting.ATLMonthExtract.DateMonths'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'data',
                    displayField: 'label',
                    emptyText: '[All]',
                    labelWidth: 0,
                    width: 70,
                    hidden: false,
                    hiddenLabel: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'To',
                    id: 'vATLMonthExtract-cmbDateToYear',
                    store: Ext.create('PXMVCAMHome.store.accounting.ATLMonthExtract.DateYears'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'data',
                    displayField: 'label',
                    emptyText: '[All]',
                    labelWidth: 40,
                    width: 120,
                    hidden: false,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '',
                    id: 'vATLMonthExtract-cmbDateToMonth',
                    store: Ext.create('PXMVCAMHome.store.accounting.ATLMonthExtract.DateMonths'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'data',
                    displayField: 'label',
                    emptyText: '[All]',
                    labelWidth: 0,
                    width: 70,
                    hidden: false,
                    hiddenLabel: true
                }
            ]
        }
    ]
});
