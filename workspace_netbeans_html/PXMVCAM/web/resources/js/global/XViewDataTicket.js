/**
 * @class Ext.global.plugin.ViewProrrate
 * @extends Ext.form.Panel
 * @author jbazan
 */
Ext.define('Ext.global.XViewDataTicket', {
     extend: 'Ext.Container',
     xtype: 'XViewDataTicket',
     config: {
        layout: 'fit',
        autoScroll:false
     },
     config_:{},
     constructor: function(config){
        var me = this;
        me.config_=config;
        me.id=config.id;
        me.items=[
            {
                xtype:'panel',
                border:false,
                //height:30,
                items:[
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-air',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Ticket',
                                        labelWidth:85,
                                        labelAlign:'left',
                                        maxLength:3,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 80,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-numbre-tkt',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:10,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 36,border:false,
                                padding:'5px 0px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-d',
                                        readOnly:config.readOnly,
                                        fieldLabel: 'D',
                                        labelWidth:13,
                                        labelAlign:'right',
                                        maxLength:1,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 140,border:false,    
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-transaction',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Transaction',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 130,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-doc-type',
                                        readOnly:config.readOnly,
                                        fieldLabel: 'Doc. Type',
                                        labelWidth:85,
                                        labelAlign:'right',
                                        //maxLength:10,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,    
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-conjunction-a',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Conjunction',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 60,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-conjunction-b',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:10,
                                        labelAlign:'right',
                                        //maxLength:10,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 60,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-conjunction-c',
                                        readOnly:config.readOnly,
                                        fieldLabel: '/',
                                        labelWidth:10,
                                        labelAlign:'right',
                                        //maxLength:10,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,    
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-transaction-number',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Transaction N°',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 120,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-seq',
                                        readOnly:config.readOnly,
                                        fieldLabel: 'Seq.',
                                        labelWidth:40,
                                        labelAlign:'right',
                                        //maxLength:10,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 200,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-iata-code',
                                        readOnly:config.readOnly,
                                        fieldLabel:'IATA Code',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 200,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-tour-code',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Tour Code',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-fare',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Fare',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 120,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-fare-b',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:10,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-eqv-fare',
                                        readOnly:config.readOnly,
                                        fieldLabel:'EQV. Fare',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 120,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-eqv-fare-b',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:10,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-discount',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Discount',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 120,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-discount-b',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:10,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-q',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Q',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 120,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-q-b',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:10,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 270,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-exchange-rate',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Exchange Rate',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: 150,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-local-cur',
                                        readOnly:config.readOnly,
                                        fieldLabel:'Local Cur.',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: '100%',border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-error-sum',
                                        visible:false,
                                        readOnly:config.readOnly,
                                        fieldLabel:'',
                                         labelWidth:85,
                                        labelAlign:'left',
                                        //maxLength:3,
                                        //enforceMaxLength:true,
                                        //maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        me.callParent();
     },
    setDataAccount:function(record){
        /*Ext.getCmp(this.id+'-form-account-a').setValue(record.CIA);
        Ext.getCmp(this.id+'-form-account-b').setValue(record.NEG);
        Ext.getCmp(this.id+'-form-account-c').setValue(record.CTO);
        Ext.getCmp(this.id+'-form-account-d').setValue(record.UBC);
        Ext.getCmp(this.id+'-form-account-e').setValue(record.CTA);
        Ext.getCmp(this.id+'-form-account-f').setValue(record.SCT);
        Ext.getCmp(this.id+'-form-account-g').setValue(record.EQP);
        Ext.getCmp(this.id+'-form-account-h').setValue(record.ICI);*/
    },
    getDataAccount:function(type){
        /*var CIA = Ext.getCmp(this.id+'-form-account-a').getValue();
        var NEG = Ext.getCmp(this.id+'-form-account-b').getValue();
        var CTO = Ext.getCmp(this.id+'-form-account-c').getValue();
        var UBC = Ext.getCmp(this.id+'-form-account-d').getValue();
        var CTA = Ext.getCmp(this.id+'-form-account-e').getValue();
        var SCT = Ext.getCmp(this.id+'-form-account-f').getValue();
        var EQP = Ext.getCmp(this.id+'-form-account-g').getValue();
        var ICI = Ext.getCmp(this.id+'-form-account-h').getValue();
        if(type){
            return {CIA:CIA,NEG:NEG,CTO:CTO,UBC:UBC,CTA:CTA,SCT:SCT,EQP:EQP,ICI:ICI};
        }else{
            return CIA +""+ NEG +""+ CTO +""+ UBC +""+ CTA +""+ SCT +""+ EQP +""+ ICI;
        }*/
    },
    setClearDataAccount:function(){
        /*Ext.getCmp(this.id+'-form-account-a').setValue("");
        Ext.getCmp(this.id+'-form-account-b').setValue("");
        Ext.getCmp(this.id+'-form-account-c').setValue("");
        Ext.getCmp(this.id+'-form-account-d').setValue("");
        Ext.getCmp(this.id+'-form-account-e').setValue("");
        Ext.getCmp(this.id+'-form-account-f').setValue("");
        Ext.getCmp(this.id+'-form-account-g').setValue("");
        Ext.getCmp(this.id+'-form-account-h').setValue("");*/
    }
 });