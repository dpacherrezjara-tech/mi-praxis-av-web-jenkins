// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'TAXRATD2Form';
prototype.url = CONTEXTPATH+'/TAXRATD2';
prototype.widthContenedor = 1100;
prototype.widthGrid = 1050;
prototype.widthGrid2 = 970;
prototype.widthGrid3 = 1200;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.TAXRATD2Form.TAXRATD2Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.TAXRATD2Form',
    requires: [
        'Ext.Praxis.controller.interline.TAXRATD2.TAXRATD2Controller',
        'Ext.Praxis.view.interline.TAXRATD2Form.Options',
        'Ext.Praxis.view.interline.TAXRATD2Form.Filters',
        'Ext.Praxis.view.interline.TAXRATD2Form.Info'
    ],
    controller: 'TAXRATD2Controller',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
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
                                            height: 600,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
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