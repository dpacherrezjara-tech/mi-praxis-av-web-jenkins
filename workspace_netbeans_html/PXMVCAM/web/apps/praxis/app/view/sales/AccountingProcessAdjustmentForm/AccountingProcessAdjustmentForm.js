/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'AccountingProcessAdjustmentForm';
prototype.url = CONTEXTPATH + '/AccountingProcessAdjustment';

Ext.define('Ext.Praxis.view.sales.AccountingProcessAdjustmentForm.AccountingProcessAdjustmentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AccountingProcessAdjustmentForm',
    requires: [
        'Ext.Praxis.view.sales.AccountingProcessAdjustmentForm.Info',
        'Ext.Praxis.controller.sales.AccountingProcessAdjustment.AccountingProcessAdjustmentController'
    ],
    controller: 'AccountingProcessAdjustmentController',
    layout: {
        type: 'fit'
    },
    padding: ' 0 0 0',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
//                          width: 900,
                            layout: 'border',
                            border: false,
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1300,
                                        align: 'center'
                                    },
                                    items: [

                                        {xtype: 'tbspacer', height: 25},
                                        {
                                            xtype: 'tabpanel',
                                            //height: 803,
                                            defaults: {
                                                //height: 803,
                                                border: true
                                            },
                                            activeTab: 0,
                                            enableKeyEvents: true,
                                            items: [
                                                {
 
 
                                                    xtype: 'panel',
                                                    title: "Processing",
                                                    width: prototype.widthContenedor,
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    //align: 'center',
                                                    //margin: '50 0 0 0',
                                                    border: false,
                                                    //bodyStyle: 'background: white;',
                                                    height: 90,
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo',
                                                            border: false
                                                        }
                                                    ]
                                                        
                                                        
                                                        
                                                        
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxMainResultado',
                                                    title: "Result Processing",
                                                    bodyStyle: 'background-color: #E3EAE9;',
                                                    width: prototype.widthContenedor,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        width: prototype.widthContenedor,
                                                        align: 'center'
                                                    },
                                                    items: [


                                                        {xtype: 'tbspacer', height: 17},
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-boxDownloadFiles',
                                                            width: prototype.widthContenedor,
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            border: false,
                                                            hidden: false,
                                                            bodyStyle: 'background-color: transparent;',
                                                            /*
                                                             defaults: {
                                                                anchor: '100%'
                                                            },
                                                            //*/
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnDownloadFiles',
                                                                    html: '<strong>Download Files</strong>',
                                                                    border: true,
                                                                    scale: 'small',
                                                                    width: 117,
                                                                    listeners: {
                                                                        click: 'btnDownloadFiles_click'
                                                                    }
                                                                },
                                                                {xtype: 'tbspacer', width: 12}
                                                            ]
                                                        },
                                                        {xtype: 'tbspacer', height: 12},
                                                        // <editor-fold defaultstate="collapsed" desc="gridResult">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridResult',
                                                            width: 700,
                                                            height: 560,
                                                            border: true,
                                                            columnLines: true,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Nbr', dataIndex: 'RN', width: 50
                                                                    },
                                                                    {
                                                                        text: 'Accounting Date', dataIndex: 'FCONT', flex:1
                                                                    },
                                                                    {
                                                                        text: 'Source', dataIndex: 'MDALOC', width: 85
                                                                    },
                                                                    {
                                                                        text: 'Country', dataIndex: '', width: 85
                                                                    },
                                                                    {
                                                                        text: 'D.Channel', dataIndex: '', width: 85
                                                                    },
                                                                    {
                                                                        text: 'Currency', dataIndex: '', width: 80
                                                                    },
                                                                    {
                                                                        text: 'GL', dataIndex: '', width: 90
                                                                    },
                                                                    {
                                                                        xtype: 'checkcolumn',
                                                                        text: '', dataIndex: 'DESCARGA', width: 50,
                                                                        defaults: {
                                                                            align: 'center'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'checkboxfield',
                                                                                id: prototype.id + '-chkAll',
                                                                                boxLabel: '',
                                                                                checked: false,
                                                                                width: 16,
                                                                                listeners: {
                                                                                    change: 'checkAll_clickHandler'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxMainAudit',
                                                    title: "Generate Audit",
                                                    bodyStyle: 'background-color: #E3EAEF;',
                                                    width: prototype.widthContenedor,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        width: prototype.widthContenedor,
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'background: #E3EAF9',
                                                            border: false,
                                                            width: 1300,
                                                            height: 80,
                                                            layout: {
                                                                type: 'hbox',
                                                                //align: 'center'
                                                            },
                                                            defaults: {
                                                                labelAlign: 'left',
                                                                margin: '30 2 0 10'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    labelAlign: 'center',
                                                                    style: 'color:#231223;font-weight:bold',
                                                                    align: 'center',
                                                                    text: 'Search By',
                                                                    //margin: '20 20 0 5'
                                                                },
                                                                {
                                                                    xtype: 'datefield',
                                                                    format: 'Y/m/d',
                                                                    fieldLabel: 'Account Date:',
                                                                    anchor: '100%',
                                                                    id: prototype.id + '-txtDate2',
                                                                    fieldStyle: 'text-align:center',
                                                                    maskRe: /[0-9/]/,
                                                                    enforceMaxLength: true,
                                                                    width: 220,
                                                                    labelWidth: 80
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: prototype.id + '-btnProccess2',
                                                                    text: '<strong>Start Process<strong>',
                                                                    tooltip: 'Process',
                                                                    width: 100,
                                                                    height: 25
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
                }
            ]
        }
    ]
});