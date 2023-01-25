prototype.Prorrateo = {
    id: 'ProrrateoForm',
    url: CONTEXTPATH+'/Prorrateo',
    widthContenedor: 1096
};
Ext.define('Ext.Praxis.view.program.ProrrateoForm.ProrrateoForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProrrateoForm',
    requires: [
        'Ext.Praxis.controller.program.Prorrateo.ProrrateoController',
        'Ext.Praxis.view.program.ProrrateoForm.Prorrateo'
    ],
    controller: 'ProrrateoController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.Prorrateo.id+'-xpanel',
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.Prorrateo.id+'-form',
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
                                    id: prototype.Prorrateo.id+'-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.Prorrateo.widthContenedor,
                                        height: 980,
                                        border: false
                                    },
                                    items: [
                                        {
                                            region: 'center',
                                            xtype: prototype.Prorrateo.id+'-prorrateo'
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