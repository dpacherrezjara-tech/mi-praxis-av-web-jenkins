Ext.define('Ext.Praxis.view.screens.Dashboard01Form.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    requires: [
          'Ext.Praxis.view.screens.Dashboard01Form.tabs.SalesAnalysis',
          'Ext.Praxis.view.screens.Dashboard01Form.tabs.FlownAnalysis',
          'Ext.Praxis.view.screens.Dashboard01Form.tabs.ByIATA',
          'Ext.Praxis.view.screens.Dashboard01Form.tabs.ScrInterline',
          'Ext.Praxis.view.screens.Dashboard01Form.tabs.ScrExpired',
          'Ext.Praxis.view.screens.Dashboard01Form.tabs.ScrEMD'
    ],
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tabMain',
                    deferredRender: true,
                    width: 1500,
                    height: 750,//820
                    anchor: '100%',
                    margin: '1 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: transparent', 
                    listeners: {
                        'tabchange': function (tabPanel, tab) {
                            console.log(tabPanel.id + ' ' + tab.id);
                            me.changeTab_clickHandler(tab.id);

                        }
                    },
//                    activeTab: 0,     ///  ------- here is something what you looking for
                    items: [
                        
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-SalesAnalysis_tab',
                            title: 'Sales Analysis',
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            margin: '10 10 10 10',
//                            defaults: {
//                                labelAlign: 'left'
//                            },
                            items: [
                                {
                                    id: prototype.id+ '-SalesAnalysis_screen',
                                    xtype:prototype.id + '-SalesAnalysis'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-FlownAnalysis_tab',
                            title: 'Flown Analysis',                            
                            items: [
                                {                                    
                                    id: prototype.id+ '-FlownAnalysis_screen',
                                    xtype:prototype.id + '-FlownAnalysis'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ScrInterline_tab',
                            title: 'Interline Analysis',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {                                    
                                    id: prototype.id+ '-ScrInterline_screen',
                                    xtype:prototype.id + '-ScrInterline'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ScrExpired_tab',
                            title: 'Expired Analysis',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    id: prototype.id+ '-ScrExpired_screen',
                                    xtype:prototype.id + '-ScrExpired'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-tabScrRefund',
                            title: 'Spa Profitability',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
//                                    xtype:prototype.id + '-FlownAnalysis'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ByIATA_tab',
                            title: 'Sales By IATAs',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    id: prototype.id+ '-ByIATA_screen',
                                    xtype:prototype.id + '-ByIATA'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ScrEMD_tab',
                            title: 'EMD',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    id: prototype.id + '-ScrEMD_screen',
                                    xtype: prototype.id + '-ScrEMD'
                                }
                            ]
                        },   
                
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});
