/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

prototype.id = 'Dashboard01Form';
prototype.url = CONTEXTPATH + '/Dashboard01';
prototype.urlMaster = CONTEXTPATH + '/MasterController';
prototype.widthContenedor = 1850;
prototype.widthGrid = 1147;



Ext.define('Ext.Praxis.view.screens.Dashboard01Form.Dashboard01Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Dashboard01Form',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.Dashboard01Controller',
        'Ext.Praxis.view.screens.Dashboard01Form.Options',
        'Ext.Praxis.view.screens.Dashboard01Form.Filters',
        'Ext.Praxis.view.screens.Dashboard01Form.Info',
        'Ext.Praxis.view.screens.Dashboard01Form.charts.ChartInterline',
        'Ext.Praxis.view.screens.Dashboard01Form.charts.ChartSales',
        'Ext.Praxis.view.screens.Dashboard01Form.charts.ChartFlown'
    ],
    controller: 'Dashboard01Controller',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
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
                                        width: 1750,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelTabs',
                                            border: false,
                                            autoScroll: true,
                                            defaults: {
                                                width: 1650,
                                                align: 'center'
                                            },
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            items: [
                                                {xtype: prototype.id + '-options'},
                                                {
                                                    xtype: prototype.id + '-filters',
                                                    id: prototype.id + '-contentFilter'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 780,//820
                                                    layout: 'fit',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id + '-centerC-panel01',
                                                            layout: 'border',
                                                            align: 'center',
                                                            border: false,
                                                            defaults: {
                                                                border: false
                                                            },
                                                            bodyStyle: 'background-color: #E3EAEF;',
                                                            items: [
                                                                {
                                                                    region: 'center',
                                                                    xtype: prototype.id + '-info',
                                                                    id: prototype.id + '-contentInfo'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                
                                            ]
                                        },
                                        
                                        /**
                                         * PANELS CHARTS
                                         * */
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelChart',
                                            hidden: true,
                                            layout: {
                                                type: 'vbox',
                                                pack: 'center'
                                            },
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            border:true,
//                                            bodyStyle: 'background-color: transparent;',
                                            defaults: {
                                                width: 1850,
                                                align: 'center'
                                            },
                                            items: [
                                                {   xtype: prototype.id + '-chartInterline',
                                                    id: prototype.id + '-panelChartInterline'
                                                },
                                                {   xtype: prototype.id + '-chartSales',
                                                    id: prototype.id + '-panelChartSales'
                                                },
                                                {   xtype: prototype.id + '-chartFlown',
                                                    id: prototype.id + '-panelChartFlown'
                                                }
                                            ]
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="pie">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-lblPagination',
                                            hidden: true,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    height: '100%',
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    defaults: {
                                                        xtype: 'label',
                                                        margin: '3px 0px 0px 5px'
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Page',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-currentPage',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total',
                                                            text: '0',
                                                            width: 50
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



