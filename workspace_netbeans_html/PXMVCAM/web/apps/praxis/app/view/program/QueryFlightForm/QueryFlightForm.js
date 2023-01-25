prototype.id = 'QueryFlightForm';
prototype.url = CONTEXTPATH + '/QueryFlight';
prototype.widthContenedor = 1440;
prototype.widthGrid = 1390;
prototype.widthGridDetail = 1110;
prototype.widthGridQtySummary = 1000;
prototype.widthGridDetQtySum = 1425;
prototype.widthGridDetQtySummVal = 970;
prototype.widthGridConsolid = 1351;
prototype.widthGridConsolidByDay = 1280;
prototype.widthGridConsolidByNFLIGHT = 1170;
prototype.widthGridDetTicketContab = 1280;

Ext.define('Ext.Praxis.view.program.QueryFlightForm.QueryFlightForm', {
//    extend: 'Ext.window.Window',
    extend: 'Ext.form.Panel',
    alias: 'widget.QueryFlightForm',
    requires: [
        'Ext.Praxis.controller.program.QueryFlight.QueryFlightController',
        'Ext.Praxis.view.program.QueryFlightForm.Options',
        'Ext.Praxis.view.program.QueryFlightForm.Filters',
        'Ext.Praxis.view.program.QueryFlightForm.Info'
    ],
    controller: 'QueryFlightController',
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
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 680,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    bodyStyle: 'background-color: white;',
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
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});