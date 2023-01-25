/**
 * @class Ext.global.plugin.Account
 * @extends Ext.form.Panel
 * @author jbazan
 */
Ext.define('Ext.global.Account',{
    extend: 'Ext.Container',
    xtype: 'Account',
    config: {
        autoScroll:false,
        border:false
    },
    id:'',
    constructor: function(config){
        var me = this;
        me.config_=config;
        me.id=config.id;
        me.items=[
            {
                xtype:'panel',
                border:false,
                height:30,
                items:[
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                width: config.width,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-account-a',
                                        readOnly:config.readOnly,
                                        fieldLabel:config.fieldLabel,
                                        labelWidth:config.labelWidth,
                                        labelAlign:config.labelAlign,
                                        maxLength:2,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,//maskRe:/[0-9.]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 40,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-account-b',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:2,
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
                                        id:me.id+'-form-account-c',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:6,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 50,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-account-d',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:4,
                                        enforceMaxLength:true,
                                        //maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 50,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-account-e',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:4,
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
                                        id:me.id+'-form-account-f',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:5,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 50,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-account-g',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:4,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                width: 40,border:false,
                                padding:'5px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-form-account-h',
                                        readOnly:config.readOnly,
                                        fieldLabel: '',
                                        labelWidth:0,
                                        labelAlign:'right',
                                        maxLength:2,
                                        enforceMaxLength:true,
                                        maskRe:/[0-9]/,
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
        Ext.getCmp(this.id+'-form-account-a').setValue(record.CIA);
        Ext.getCmp(this.id+'-form-account-b').setValue(record.NEG);
        Ext.getCmp(this.id+'-form-account-c').setValue(record.CTO);
        Ext.getCmp(this.id+'-form-account-d').setValue(record.UBC);
        Ext.getCmp(this.id+'-form-account-e').setValue(record.CTA);
        Ext.getCmp(this.id+'-form-account-f').setValue(record.SCT);
        Ext.getCmp(this.id+'-form-account-g').setValue(record.EQP);
        Ext.getCmp(this.id+'-form-account-h').setValue(record.ICI);
    },
    getDataAccount:function(type){
        var CIA = Ext.getCmp(this.id+'-form-account-a').getValue();
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
        }
    },
    setClearDataAccount:function(){
        Ext.getCmp(this.id+'-form-account-a').setValue("");
        Ext.getCmp(this.id+'-form-account-b').setValue("");
        Ext.getCmp(this.id+'-form-account-c').setValue("");
        Ext.getCmp(this.id+'-form-account-d').setValue("");
        Ext.getCmp(this.id+'-form-account-e').setValue("");
        Ext.getCmp(this.id+'-form-account-f').setValue("");
        Ext.getCmp(this.id+'-form-account-g').setValue("");
        Ext.getCmp(this.id+'-form-account-h').setValue("");
    },
});

