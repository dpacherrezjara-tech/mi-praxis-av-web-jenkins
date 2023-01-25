/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Filters                                           *
 * Created on : 20-09-2016, 17:18:52                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sales-conciliation-asr-form-filters',
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
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Search By',
                    id: 'vConciliationASR-cbmFilterType',
                    store: Ext.create('PXMVCAMHome.store.sales.ConciliationASR.FilterBys01'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: '[Seleccione]',
                    labelWidth: 85,
                    width: 200,
                    hidden: false,
                    hiddenLabel: false
                },
                {
                    xtype: 'datefield',
                    id: 'vConciliationASR-txtDateFrom',
                    fieldLabel: 'From',
                    maxLength: 10,
                    labelWidth: 40,
                    format: 'Y/m/d',
                    width: 140,
                    hideTrigger: false
                },
                {
                    xtype: 'datefield',
                    id: 'vConciliationASR-txtDateTo',
                    fieldLabel: 'To',
                    maxLength: 10,
                    labelWidth: 25,
                    format: 'Y/m/d',
                    width: 125,
                    hideTrigger: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Status Amount',
                    id: 'vConciliationASR-cmbFilterStatusAmount',
                    store: Ext.create('PXMVCAMHome.store.sales.ConciliationASR.FilterStatusAmounts'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: '[Seleccione]',
                    labelWidth: 100,
                    width: 155,
                    hiddenLabel: false
                },
                {
                    xtype: 'datefield',
                    id: 'vConciliationASR-txtProcessingDate01',
                    fieldLabel: 'Date',
                    maxLength: 10,
                    labelWidth: 40,
                    format: 'Y/m/d',
                    width: 140,
                    hideTrigger: false
                },
                {
                    id: 'vConciliationASR-txtIATACode01',
                    fieldLabel: 'IATA Code',
                    maxLength: 8,
                    labelWidth: 75,
                    width: 150
                },
                {
                    xtype: 'datefield',
                    id: 'vConciliationASR-txtOpenDate02',
                    fieldLabel: 'Date',
                    maxLength: 10,
                    labelWidth: 40,
                    format: 'Y/m/d',
                    width: 140,
                    hideTrigger: false
                },
                {
                    id: 'vConciliationASR-txtIATACode02',
                    fieldLabel: 'IATA Code',
                    maxLength: 8,
                    labelWidth: 75,
                    width: 150
                },
                {
                    id: 'vConciliationASR-txtGroup03',
                    fieldLabel: 'Group',
                    maxLength: 9,
                    labelWidth: 50,
                    width: 125
                },
                {
                    id: 'vConciliationASR-txtIDFile04',
                    fieldLabel: 'ID File',
                    maxLength: 9,
                    labelWidth: 50,
                    width: 125
                }
            ]
        }
    ]
});
