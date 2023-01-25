prototype.id = 'ItemForm';
prototype.url = CONTEXTPATH + '/Item';
prototype.widthContenedor = 850;
prototype.widthGrid = 800;

Ext.define('Ext.Praxis.view.flown.ItemForm.ItemForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ItemForm',
    requires: [
          'Ext.Praxis.controller.flown.Item.ItemController',
          'Ext.Praxis.view.flown.ItemForm.Options',
          'Ext.Praxis.view.flown.ItemForm.Filters',
          'Ext.Praxis.view.flown.ItemForm.Info'
    ],
    controller: 'ItemController',
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
                    id: prototype.id +'-form',
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
                                    id: prototype.id +'-centerC',
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
                                            xtype:prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype:prototype.id+ '-filters',
                                            id: prototype.id+'-contentFilter',
                                            hidden: true
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 580,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id +'-info',
                                                            id:prototype.id+'-contentInfo'
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



