/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.TaxesBySegmentForm.Filters', {
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
                    //xtype: 'fieldset',
                    xtype: 'panel',
                    title: '<b style="font-size:12px">TTBS<b/>',
                    bodyStyle: 'background: #E5ECEF',
                    margin: '1 5 0 0',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            height: 5
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-panelFilters',
                            border: false,
                            layout: 'column',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '8px 5px 8px 5px',
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Invoice Date:',
                                    style: 'font-weight:bold;',
                                    padding: '10 5 5 5'
                                },
                                , {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateYear',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 70,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateMonth',
                                    fieldStyle: 'text-align: left;',
                                    required: true,
                                    disabled: false,
                                    fieldLabel: '',
                                    width: 55,
                                    labelWidth: 0,
                                    labelAlign: 'left',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    valueField: 'code',
                                    displayField: 'name'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Search',
                                    id: prototype.id + '-btnSearch',
                                    iconCls: 'prx-icon-search',
                                    tooltip: 'Search'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});



