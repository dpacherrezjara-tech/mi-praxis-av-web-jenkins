Ext.define('Ext.Praxis.view.widgets.previewDelivery', {
    extend: 'Ext.window.Window',
    alias: 'widget.previewDelivery',    
    title: '',
    header: true,
    width: 1200,
    height: 521,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    constructor: function (config) {
        var me = this;
        me.config_ = config;
        me.id = config.id;
        me.data = config.data;
        
        me.items = [
            {
                xtype: 'form',
                region: 'center',
                border: false,
                layout: {
                    type: 'vbox'
                },
                id: me.id + '-FormDelivery',
                width: '100%',
                height: '100%',
                defaults: {
                  border: false,
                  bodyStyle: 'background: #E6EFF5;'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: 'vbox',
                        defaults: {
                          border: false,
                          bodyStyle: 'background: #E6EFF5;padding:3px'
                        },
                        items: [
                            {
                                xtype: 'textarea',
                                id: me.id + '-txtDelivery',
                                fieldStyle: 'background: black;color: white;',
                                width: 1185,
                                height: 400
                            },
                            {
                                xtype: 'panel',
                                bodyStyle: 'background: #E5ECEF',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '1 1 1 1',
                                //border: false,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '<b  style="font-size:12px">Legend<b/>',
                                        bodyStyle: 'background: #E5ECEF',
                                        margin: '1 5 0 5',
                                        width: 500,
                                        height: 70,
                                        defaults: {
                                            border: false
                                        },
                                        //border: true,                                                    
                                        items: [
                                            {
                                                xtype: 'panel',
                                                bodyStyle: 'background: #E5ECEF',
                                                layout: 'vbox',
                                                margin: '1 1 1 1',
                                                items: [
                                                   {
                                                        xtype: 'label',
                                                        labelAlign: 'left',
                                                        width: 500,
                                                        style: 'margin-top:4px',
                                                        padding: '3px',
                                                        html: '<strong style="color:#00134d;">{=0 A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9</strong>'

                                                    },
                                                    {
                                                        xtype: 'label',
                                                        labelAlign: 'left',
                                                        width: 500,
                                                        style: 'margin-top:4px',
                                                        padding: '3px',
                                                        html: '<strong style="color:#330000;">}=0- J=1- K=2- L=3- M=4- N=5- O=6- P=7- Q=8- R=9-</strong>'

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
        ];

        me.listeners = {
            afterRender: function(){                
                Ext.Ajax.request({
                url: CONTEXTPATH+'/Prorate//searchDelivery',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: JSON.stringify(me.data)},
                beforerequest: Ext.getCmp(me.id + '-txtDelivery').mask('Loading...', ''),
                success: function(response, opts){
                    Ext.getCmp(me.id + '-txtDelivery').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        if(res.strTexto !== undefined) {                    
                            Ext.getCmp(me.id + '-txtDelivery').setValue(res.strTexto);
                        } else {
                            global.Msg({msg: 'Data not Found.'});
                        }
                    } else global.Msg({ msg: res.sesion });
                },
                failure: function(response, opts) {
                    Ext.getCmp(me.id + '-txtDelivery').unmask();
                    console.log('server-side failure with status code '+response.status);
                }
              });                               
            }
        };
        
        me.callParent();
    }
});

