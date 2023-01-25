// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'ProrrateoA728Form';
prototype.url = CONTEXTPATH+'/ProrrateoA728';
prototype.widthContenedor = 1096;
// </editor-fold>

Ext.define('Ext.Praxis.view.program.ProrrateoA728Form.ProrrateoA728Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProrrateoA728Form',
    requires: [
        'Ext.Praxis.controller.program.ProrrateoA728.ProrrateoA728Controller',
        'Ext.Praxis.view.program.ProrrateoA728Form.ProrrateoA728'
    ],
    controller: 'ProrrateoA728Controller',
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
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        height: 740,
                                        border: false
                                    },
                                    items: [
                                        {
                                            region: 'center',
                                            xtype: prototype.id + '-prorrateo'
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