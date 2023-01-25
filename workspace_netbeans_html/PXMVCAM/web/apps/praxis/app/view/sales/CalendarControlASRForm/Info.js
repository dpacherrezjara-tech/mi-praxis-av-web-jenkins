Ext.define('Ext.Praxis.view.sales.CalendarControlASRForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
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
                    region: 'center',
                    id: prototype.id + '-region-content-center',
                    border:false,
                    items:[
                    {
                        xtype: 'panel',
                        border:false,
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        bodyStyle: 'background: transparent',
                        defaults: {
                            width: 620,
                            border:false
                        },
                        items:[{
                            xtype: 'panel',
                            id: prototype.id + '-contenedor-calendario',
                            bodyStyle: 'background: transparent',
//                            height: 480,
                            width: 620,
                            autoScroll: true,
                            listeners:{
                                afterrender: function(obj, e){

                                }
                            }
                        }]
                    }]
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