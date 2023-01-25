/**
 * @class Ext.global.plugin.ViewProrrate
 * @extends Ext.form.Panel
 * @author Jim
 */
Ext.define('Ext.global.XViewProrrateInfo', {
     extend: 'Ext.Container',
     xtype: 'XViewProrrateInfo',
     config: {
        layout: 'fit',
        autoScroll:false,bodyStyle: 'background: transparent',
     },
     config_:{},
     constructor: function(config){
        var me = this;
        me.config_=config;
        me.id = config.id;
        
        me.items=[{
            xtype: 'panel',
            //layout: 'fit',
            border:false,
            frame:true,
            collapsible: false,
            bodyPadding: 0,
            bodyStyle: 'background: transparent',
            fieldDefaults: {
                labelAlign: 'top',
                msgTarget: 'side'
            },
            defaults: {
                anchor: '100%'
            },
            items:[
                {
                    xtype: 'panel',
                    border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtGRUPO',
                            fieldLabel: 'Group',
                            labelWidth: 60,
                            width: 150
                        },
                        {
                            id: me.id+'Prorrate-txtORIG',
                            hideLabel: true,
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: me.id+'Prorrate-txtMONREG',
                            fieldLabel: 'Cur.Reg',
                            labelWidth: 50,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtMethod',
                            fieldLabel: 'Method',
                            labelWidth: 60,
                            width: 150
                        },
                        {
                            id: me.id+'Prorrate-txtPRO',
                            hideLabel: true,
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtCNJ',
                            fieldLabel: 'Cnj',
                            labelWidth: 50,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtCIUVTA',
                            fieldLabel: 'Sales City',
                            labelWidth: 60,
                            width: 120
                        },
                        {
                            id: me.id+'Prorrate-txtPAIVTA',
                            hideLabel: true,
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtFEXCH',
                            fieldLabel: 'Transaction',
                            labelWidth: 80,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtCIUEMI',
                            fieldLabel: 'Issue',
                            labelWidth: 60,
                            width: 120
                        },
                        {
                            id: me.id+'Prorrate-txtPAIEMI',
                            hideLabel: true,
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtFECVTA',
                            fieldLabel: 'Sale Date',
                            labelWidth: 60,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtINITRA',
                            fieldLabel: 'Initial Trip',
                            labelWidth: 61,
                            width: 120
                        },
                        {
                            id: me.id+'Prorrate-txtA1530STPRO',
                            fieldLabel: 'Status Code',
                            labelWidth: 105,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: left;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtCODIT',
                            fieldLabel: 'IT',
                            labelWidth: 60,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtTARIFA',
                            fieldLabel: 'FARE',
                            labelWidth: 60,
                            width: 150
                        },
                        {
                            id: me.id+'Prorrate-txtMONEDA',
                            hideLabel: true,
                            fieldStyle: 'text-align: center;',
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtTRFNUC',
                            fieldLabel: 'NUC',
                            labelWidth: 40,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtTRFPAG',
                            fieldLabel: 'EQV.',
                            labelWidth: 60,
                            width: 150
                        },
                        {
                            id: me.id+'Prorrate-txtMDAPAG',
                            hideLabel: true,
                            fieldStyle: 'text-align: center;',
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtROE',
                            fieldLabel: 'ROE',
                            labelWidth: 40,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtCSOVER',
                            fieldLabel: 'S.Over',
                            labelWidth: 60,
                            width: 150
                        },
                        {
                            id: me.id+'Prorrate-txtQSOVER',
                            hideLabel: true,
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtCPLUSS',
                            fieldLabel: 'Plus',
                            labelWidth: 40,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtCOMMIS',
                            fieldLabel: 'Comm.',
                            labelWidth: 60,
                            width: 150
                        },
                        {
                            id: me.id+'Prorrate-txtMDACOM',
                            hideLabel: true,
                            fieldStyle: 'text-align: center;',
                            width: 40
                        },
                        {
                            id: me.id+'Prorrate-txtPORCOM',
                            fieldLabel: 'Dsct',
                            labelWidth: 40,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtTAJUST',
                            fieldLabel: 'Adjust',
                            labelWidth: 60,
                            width: 155
                        },
                        {
                            id: me.id+'Prorrate-txtTAJUSQ',
                            fieldLabel: 'AdjustQ',
                            labelWidth: 60,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    bodyStyle: 'background-color: #E6EFF5;',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtRATE',
                            fieldLabel: 'Local Ex/Rate',
                            labelWidth: 85,
                            width: 180
                        },
                        {
                            id: me.id+'Prorrate-txtSTAT',
                            fieldLabel: 'Status',
                            labelWidth: 55,
                            fieldStyle: 'text-align: center;',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    bodyStyle: 'background-color: #E6EFF5;',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtFARECOBL',
                            fieldLabel: 'Fare',
                            labelWidth: 60,
                            width: 210
                        },
                        {
                            id: me.id+'Prorrate-txtCURR',
                            hideLabel: true,
                            labelWidth: 60,
                            fieldStyle: 'text-align: center;',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    bodyStyle: 'background-color: #E6EFF5;',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: right;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtPAGO',
                            fieldLabel: 'ADC',
                            labelWidth: 60,
                            width: 210
                        },
                        {
                            id: me.id+'Prorrate-txtPGCURR',
                            hideLabel: true,
                            labelWidth: 60,
                            fieldStyle: 'text-align: center;',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtREGIST',
                            fieldLabel: 'Crt by',
                            labelWidth: 60,
                            width: 210
                        },
                        {
                            id: me.id+'Prorrate-txtFREGIS',
                            hideLabel: true,
                            labelWidth: 60,
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',border:false,
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        style: 'margin: 2px;',
                        labelStyle: 'font-weight: bold; font-size: 11px;',
                        fieldStyle: 'text-align: center;',
                        readOnly: true
                    },
                    items: [
                        {
                            id: me.id+'Prorrate-txtREVISA',
                            fieldLabel: 'Upd by',
                            labelWidth: 60,
                            width: 210
                        },
                        {
                            id: me.id+'Prorrate-txtFREVIS',
                            hideLabel: true,
                            labelWidth: 60,
                            flex: 1
                        }
                    ]
                }
            ],
            listeners:{
                'afterrender':function(){
                    
                }
            }
        }];
        me.callParent();
     },
     salir:function(){
        Ext.getCmp(this.id+'-win').close();
     }
 });