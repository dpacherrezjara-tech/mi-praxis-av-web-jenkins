/**
 * @class Ext.global.plugin.ControlData
 * @extends Ext.form.Panel
 * @author jbazan
 */
Ext.define('Ext.global.ControlData',{
    extend: 'Ext.Container',
    xtype: 'ControlData',
    config: {
        autoScroll:false,
        border:false,
        layout:'fit'
    },
    id:'',
    constructor: function(config){
        var me = this;
        me.config_=config;
        me.id=config.id;        
        me.items=[
            {
                xtype:'fieldset',
                title:'<strong style="color:orange;">Control Data</strong>',
                padding:5,
                margin:5,
                items:[
                    {
                        layout:'column',border:false,
                        items:[
                            {
                                columnWidth: .50,border:false,
                                padding:'0px 2px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-txtRegisteredBy',
                                        readOnly:true,
                                        fieldLabel: '<strong style="color:#000;">Registered By</strong>',
                                        labelWidth:100,
                                        labelAlign:'right',
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                columnWidth: .30,border:false,
                                padding:'0px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-txtRegisteredDate',
                                        readOnly:true,
                                        fieldLabel: '<strong style="color:#000;">Date</strong>',
                                        labelWidth:40,
                                        labelAlign:'right',
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                columnWidth: .20,border:false,
                                padding:'0px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-txt-time',
                                        readOnly:true,
                                        fieldLabel: '<strong style="color:#000;">Time</strong>',
                                        labelWidth:40,
                                        labelAlign:'right',
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
                                columnWidth: .50,border:false,
                                padding:'0px 2px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-txt-update-By',
                                        readOnly:true,
                                        fieldLabel: '<strong style="color:#000;">Update By</strong>',
                                        labelWidth:100,
                                        labelAlign:'right',
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                columnWidth: .30,border:false,
                                padding:'0px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-txt-update-Date',
                                        readOnly:true,
                                        fieldLabel: '<strong style="color:#000;">Date</strong>',
                                        labelWidth:40,
                                        labelAlign:'right',
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            },
                            {
                                columnWidth: .20,border:false,
                                padding:'0px 5px 0px 0px',  bodyStyle: 'background: transparent',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        id:me.id+'-txt-update-time',
                                        readOnly:true,
                                        fieldLabel: '<strong style="color:#000;">Time</strong>',
                                        labelWidth:40,
                                        labelAlign:'right',
                                        width:'100%',
                                        anchor:'100%'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                listenert:{
                    afterrender:function(){
                        //me.setData(config.record);
                    }
                }
            }
        ];
        me.callParent();
    },
    setDataControl:function(record){
        Ext.getCmp(this.id+'-txtRegisteredBy').setValue(record.REGISTERBY);
        Ext.getCmp(this.id+'-txtRegisteredDate').setValue(record.REGISTERDATE);
        Ext.getCmp(this.id+'-txt-time').setValue(record.REGISTERTIME);
        Ext.getCmp(this.id+'-txt-update-By').setValue(record.UPDATEBY);
        Ext.getCmp(this.id+'-txt-update-Date').setValue(record.UPDATEDATE);
        Ext.getCmp(this.id+'-txt-update-time').setValue(record.UPDATETIME);
    },
    setClearDataControl:function(){
        Ext.getCmp(this.id+'-txtRegisteredBy').setValue('');
        Ext.getCmp(this.id+'-txtRegisteredDate').setValue('');
        Ext.getCmp(this.id+'-txt-time').setValue('');
        Ext.getCmp(this.id+'-txt-update-By').setValue('');
        Ext.getCmp(this.id+'-txt-update-Date').setValue('');
        Ext.getCmp(this.id+'-txt-update-time').setValue('');
    }
});

