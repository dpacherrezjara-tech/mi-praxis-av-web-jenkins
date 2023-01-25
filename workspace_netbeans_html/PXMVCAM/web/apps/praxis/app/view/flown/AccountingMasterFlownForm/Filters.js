/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : AccountingMasterFlownForm                         *                
 * Created on : 23/02/2018, 14:24:00                              *          
 * Author     : Gregory Sánchez (gsanchez)                        *          
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

Ext.define('Ext.Praxis.view.flown.AccountingMasterFlownForm.Filters', {
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
//                fieldStyle: 'text-align: center;',
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
                    html: '<strong style="color:#000;">Search By</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 0px 8px 0px'
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Document Type: ',
                    width: 100,
                    padding: '8px 0px 8px 0px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDocumentType',
                    queryMode: 'local',
                    editable:false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
//                    emptyText: 'All',
                    width: 200                
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Account Type: ',
                    width: 100,
                    padding: '8px 0px 8px 0px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCtaType',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
//                    emptyText: 'All',
                    width: 200,
                    listConfig: {height: 111}
                },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'label',
                    html: 'Category: ',
                    width: 100,
                    padding: '8px 0px 8px 0px'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCategory',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
//                    emptyText: 'All',
                    width: 200,
                    listConfig: {height: 111}
                }
            ]
        }
    ]
});

