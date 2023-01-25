/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.tnu.AtlUsageNoSale.Filters', {
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
                {
                    xtype: 'panel',  
                    border: false,
                    bodyStyle: 'background-color: #E3EAF9;',
                    defaults: {
                        bodyStyle: 'background: transparent',
                        border: false,
                        padding: '5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.id + '-contenedor-filters-form',
                            border: false,
                            defaults: {
                                padding: '1px',
                                bodyStyle: 'background: transparent'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-box-filter-01',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        padding: '5px 1px 5px 1px'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',                                            
                                            bodyStyle: 'background: #e3eaf9',
                                            layout: 'hbox',
                                            border: false,
                                            padding: '2px 1px 1px 1px',
                                            defaults: {
                                                bodyStyle: 'background: transparent',
                                                border: false,
                                                padding: '5px'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Filter By',
                                                    id: prototype.id + '-search-type',
                                                    labelAlign: 'right',
                                                    queryMode: 'remote',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    emptyText: '[Seleccione]',
                                                    labelWidth: 85,
                                                    width: 220,
                                                    listeners: {
                                                        select: function(obj, records, eOpts) {
                                                            me.setFilter(records);
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Status',
                                                    id: prototype.id + '-filtr-status',
                                                    labelAlign: 'right',
                                                    columns: 3,
                                                    hidden: false,
                                                    vertical: true,
                                                    defaults: {
                                                        style: 'margin: 2px;'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Pending', name: 'rbfiltrST', inputValue: '1',checked: true},
                                                        {boxLabel: 'Regularized', name: 'rbfiltrST', inputValue: '2'},
                                                        {boxLabel: 'All', name: 'rbfiltrST', inputValue: ''}
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-tkt-air',
                                                    labelWidth: 100,
                                                    labelAlign: 'right',
                                                    fieldLabel: 'Ticket Number',
                                                    value: "139",
                                                    width: 140,
                                                    readOnly: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-tkt',
                                                    labelWidth: 50,
                                                    width: 80,
                                                    listeners: {
                                                        specialkey: function(f, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                me.setGridData();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Use',
                                                    id: prototype.id + '-tuse',
                                                    labelAlign: 'right',
                                                    queryMode: 'remote',
                                                    triggerAction: 'all',
                                                    autoSelect: false,
                                                    enableKeyEvents: true,
                                                    hidden: true,
                                                    caseSensitive: true,
                                                    valueField: 'code',
                                                    displayField: 'name',
                                                    emptyText: '[All]',
                                                    labelWidth: 85,
                                                    width: 220,
                                                    listeners: {
                                                        select: function(obj, records, eOpts) {
                                                            //Ext.getCmp(prototype.id + '-fecha1').focus(true, 100);
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-fecha1',
                                                    labelWidth: 35,
                                                    labelAlign: 'right',
                                                    fieldLabel: 'From',
                                                    format: 'Y/m/d',
                                                    width: 130,
                                                    hidden: true,
                                                    listeners: {
                                                        specialkey: function(f, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                Ext.getCmp(prototype.id + '-fecha2').focus(true, 100);
                                                            }
                                                        },
                                                        change: function(obj, newValue, oldValue, eOpts) {
                                                            Ext.getCmp(prototype.id + '-fecha2').setValue(new Date());
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-fecha2',
                                                    labelWidth: 35,
                                                    labelAlign: 'right',
                                                    fieldLabel: 'To',
                                                    format: 'Y/m/d',
                                                    width: 130,
                                                    hidden: true,
                                                    listeners: {
                                                        specialkey: function(f, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                me.setGridData();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-iata',
                                                    labelWidth: 85,
                                                    labelAlign: 'right',
                                                    fieldLabel: 'IATA Number',
                                                    width: 170,
                                                    hidden: true,
                                                    maxLength: 9,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    listeners: {
                                                        specialkey: function(f, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                me.setGridData();
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

