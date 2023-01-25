prototype.Facsimil = {
    id: 'ProFacsimilForm',
    url: CONTEXTPATH+'/ProFacsimil'
};
Ext.define('Ext.Praxis.view.program.ProFacsimilForm.ProFacsimilForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ProFacsimilForm',
    requires: [
        'Ext.Praxis.controller.program.ProFacsimil.ProFacsimilController',
        'Ext.Praxis.view.program.ProFacsimilForm.Info'
    ],
    controller: 'ProFacsimilController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.Facsimil.id+'-xpanel',
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.Facsimil.id+'-form',
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
                                    id: prototype.Facsimil.id+'-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: false,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1752,
                                        height: 1140,
                                        border: false
                                    },
                                    items: [
                                        {
                                            region: 'center',
                                            xtype: prototype.Facsimil.id+'-Info'
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