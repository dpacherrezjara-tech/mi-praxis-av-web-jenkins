prototype.ProrrateoIxC = {
    id: 'ProrrateoIxCForm',
    url: CONTEXTPATH + '/ProrrateoIxC',
    widthContenedor: 1096
};
Ext.define('Ext.Praxis.view.program.ProrrateoIxCForm.ProrrateoIxCForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProrrateoIxCForm',
    requires: [
        'Ext.Praxis.controller.program.ProrrateoIxC.ProrrateoIxCController',
        'Ext.Praxis.view.program.ProrrateoIxCForm.ProrrateoIxC'
    ],
    controller: 'ProrrateoIxCController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.ProrrateoIxC.id + '-xpanel',
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.ProrrateoIxC.id + '-form',
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
                                    id: prototype.ProrrateoIxC.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.ProrrateoIxC.widthContenedor,
                                        height: 980,
                                        border: false
                                    },
                                    items: [
                                        {
                                            region: 'center',
                                            xtype: prototype.ProrrateoIxC.id + '-prorrateo'
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