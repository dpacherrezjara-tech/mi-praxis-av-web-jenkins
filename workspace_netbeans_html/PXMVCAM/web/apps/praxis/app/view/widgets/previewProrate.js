Ext.define('Ext.Praxis.view.widgets.previewProrate', {
    extend: 'Ext.window.Window',
    alias: 'widget.previewProrate',
    //controller: prototype.id + '-dataEntryController',
    title: '',
    header: true,
    width: 1200,
    height: 288,
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
        
        me.items = [];

        me.events = {
            onSaveProrateBtnClick: function(ev){
                alert('onSaveProrateBtnClick');
            },
            onProrateLogBtnClick: function(ev){
                alert('onProrateLogBtnClick');
            }
        };
        
        me.items = [
            {
                xtype: 'form',
                region: 'center',
                border: false,
                layout: {
                    type: 'vbox'
                },
                id: me.id + '-form',
                defaults: {
                  border: false,
                  bodyStyle: 'background: #E6EFF5;'
                },
                items: [
                  {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                      border: false,
                      bodyStyle: 'background: #E6EFF5;padding:3px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            width: 'auto',
                            style: 'margin-top:4px',
                            padding: '3px',
                            html: '<strong style="color:#000;">Preview data</strong>'

                        },
                        {
                            xtype: 'checkbox',
                            id: me.id + '-chkPreview',
                            padding: '2px 5px 2px 3px'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            defaults: {
                              xtype: 'button',
                              cls: 'x-btn-sent',
                              overCls: 'x-btn-sent-over',
                              style: 'margin: 0px 3px'
                            },
                            items: [
                              {
                                text: '<span style="color: white; font-weight: bold;">Save Prorate</span>',
                                listeners: {
                                  click: me.events.onSaveProrateBtnClick
                                }
                              },
                              {
                                text: '<span style="color: white; font-weight: bold;">Prorate Log</span>',
                                listeners: {
                                  click: me.events.onProrateLogBtnClick
                                }
                              }
                            ]
                        },
                        {
                            xtype: 'label',
                            id: me.id + '-lblWarning',
                            labelAlign: 'left',
                            width: 'auto',
                            padding: '3px',
                            style: 'background:orange;margin-top:4px',
                            html: '<strong style="color:#000;">WARNING</strong>'

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: 1200,
                    scrollable: true,
                    defaults: {
                      border: false,
                      bodyStyle: 'background: white'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: me.id  + '-gridPreview',
                            height: 200,
                            width: '100%',
                            columns:{
                                defaults:{
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items:[
                                    //{ text: '<span style="font-size: 10px;">CpnOri</span>', dataIndex: 'CpnOri', width: 0 },
                                    //{ text: '<span style="font-size: 10px;">NumTkt</span>', dataIndex: 'NumTkt', width: 0 },
                                    { text: '<span style="font-size: 10px;">Cpn</span>', dataIndex: 'CPNPR', width: 34 },//Cpn
                                    { text: '<span style="font-size: 10px;">O</span>', dataIndex: 'A720CONEX', width: 22 },//O
                                    { text: '<span style="font-size: 10px;">From</span>', dataIndex: 'A720RUTAO', width: 46 },//From
                                    { text: '<span style="font-size: 10px;">To</span>', dataIndex: 'A720RUTAD', width: 46 },//To
                                { text: '<span style="font-size: 10px;">Cr</span>', dataIndex: '', width: 34 },//Cr
                                    { text: '<span style="font-size: 10px;">Flt</span>', dataIndex: 'A720NVLO', width: 53 },//Flt
                                    { text: '<span style="font-size: 10px;">Ope</span>', dataIndex: 'A720CARRA', width: 36 },//Ope
                                    { text: '<span style="font-size: 10px;">Date</span>', dataIndex: 'A720FVLO', width: 77 },//Date
                                    { text: '<span style="font-size: 10px;">R</span>', dataIndex: 'A720BOOKI', width: 22 },//R
                                    { text: '<span style="font-size: 10px;">C</span>', dataIndex: 'A720CLASE', width: 22 },//C
                                    { text: '<span style="font-size: 10px;">F.Basis</span>', dataIndex: 'A720FBUSO', width: 101 },//F.Basis 
                                    { text: '<span style="font-size: 10px;">T</span>', dataIndex: 'A720TBASE', width: 22 },//T
                                    { text: '<span style="font-size: 10px;">St<br/>FB</span>', dataIndex: 'A720STBAS', width: 30 },//St FB
                                    { text: '<span style="font-size: 10px;">Code </span>', dataIndex: 'A720TDESC', width: 43 },//Code
                                    { text: '<span style="font-size: 10px;">Dscto</span>', dataIndex: 'A720PORDS', width: 60 },//Dscto
                                    { text: '<span style="font-size: 10px;">Gi</span>', dataIndex: 'A720VIA', width: 30 },//Gi
                                    { text: '<span style="font-size: 10px;">Fare</span>', dataIndex: 'A720FARE', width: 82 },
                                    { text: '<span style="font-size: 10px;">ST</span>', dataIndex: 'A720TFARE', width: 43 },//ST
                                { text: '<span style="font-size: 10px;">Q</span>', dataIndex: '', width: 58 },//Q
                                    { text: '<span style="font-size: 10px;">Diferencial</span>', dataIndex: 'A720DIFL', width: 82 },//Diferencial
                                    { text: '<span style="font-size: 10px;">Flag<br/>Difer</span>', dataIndex: 'A720INDIF', width: 43 },//Flag Difer
                                    { text: '<span style="font-size: 10px;">Bajar Tarifas</span>', dataIndex: 'A720TRFM', width: 82 },//Bajar Tarifas
                                    { text: '<span style="font-size: 10px;">Cur<br/>Tarifa</span>', dataIndex: 'A720MNTFM', width: 43 },//Cur Tarifa
                                    { text: '<span style="font-size: 10px;">SRP</span>', dataIndex: 'A720VLSRP', width: 65 },//SRP
                                    { text: '<span style="font-size: 10px;">MPA</span>', dataIndex: 'A720VLMPA', width: 65 },//MPA
                                    { text: '<span style="font-size: 10px;">SPA</span>', dataIndex: 'A720ACUEO', width: 65 },//SPA
                                    { text: '<span style="font-size: 10px;">Code SPA</span>', dataIndex: 'A720ACUCD', width: 180 },//Code SPA
                                    { text: '<span style="font-size: 10px;">ISC</span>', dataIndex: 'A720ISC', width: 53 },//ISC
                                    { text: '<span style="font-size: 10px;">Applied<br/>Value</span>', dataIndex: 'A720VALOR', width: 77 },//Applied Value
                                    { text: '<span style="font-size: 10px;">Adjust</span>', dataIndex: 'A720AJUST', width: 82 },//Adjust
                                    { text: '<span style="font-size: 10px;">Q Final</span>', dataIndex: 'A720Q', width: 82 },//Q Final
                                    { text: '<span style="font-size: 10px;">Factor Millas</span>', dataIndex: 'A720FACT', width: 82 },//Factor Millas
                                    { text: '<span style="font-size: 10px;">Proviso %</span>', dataIndex: 'A720PPRO', width: 82 },//Proviso %
                                    { text: '<span style="font-size: 10px;">Monto Base</span>', dataIndex: 'A720PROV', width: 82 },//Monto Base
                                { text: '<span style="font-size: 10px;">Origin Q DL</span>', dataIndex: '', width: 82 },//Origin Q DL
                                { text: '<span style="font-size: 10px;">SAS Q DL</span>', dataIndex: '', width: 82 },//SAS Q DL
                                { text: '<span style="font-size: 10px;">Origin YQ DL</span>', dataIndex: '', width: 82 },//Origin YQ DL
                                { text: '<span style="font-size: 10px;">Discount DL</span>', dataIndex: '', width: 82 },//Discount DL
                                { text: '<span style="font-size: 10px;">SAS Prorate<br/>DL</span>', dataIndex: '', width: 82 },//SAS Prorate DL
                                    { text: '<span style="font-size: 10px;">Code</span>', dataIndex: '', width: 48 },//Code
                                    { text: '<span style="font-size: 10px;">Comment</span>', dataIndex: '', width: 360 },//Comment
                                    { text: '<span style="font-size: 10px;">Commission</span>', dataIndex: '', width: 94 },//Commission
                                    //{ text: '<span style="font-size: 10px;">LH</span>', dataIndex: 'LH', width: 0 },
                                    { text: '<span style="font-size: 10px;"></span>', dataIndex: 'SPA Force', width: 94 },//SPA Force
                                    { text: '<span style="font-size: 10px;"></span>', dataIndex: 'IndPr', width: 94 },//IndPr
                                    { text: '<span style="font-size: 10px;">Over<br/>Commission</span>', dataIndex: '', width: 94 },//Over Commission
                                    { text: '<span style="font-size: 10px;">YQ</span>', dataIndex: 'A720YQ', width: 94 },//YQ
                                    { text: '<span style="font-size: 10px;">IVA</span>', dataIndex: '', width: 94 }//IVA
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 1200,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            id: me.id + '-lblDiff',
                            labelAlign: 'left',
                            width: 'auto',
                            padding: '3px',
                            style: 'background:orange;margin-top:4px',
                            html: '<strong style="color:#000;">EXISTE DIFERENCIA CON LA TARIFA COBRADA</strong>'

                        }
                    ]
                }
            ]}
        ];
    
        me.listeners = {
            afterRender: function(){
                //alert('listeder after render');
                Ext.getCmp(me.id + '-gridPreview').getStore().removeAll();
        
                var i, n = me.data.length;

                for(i=0;i<n;i++){
                    Ext.getCmp(me.id  + '-gridPreview').getStore().insert(i, me.data[i]);
                }

                Ext.getCmp(me.id+'-gridPreview').getView().refresh();
            }
        };
        
        me.callParent();
    }
});
/*
        
 * 
 */