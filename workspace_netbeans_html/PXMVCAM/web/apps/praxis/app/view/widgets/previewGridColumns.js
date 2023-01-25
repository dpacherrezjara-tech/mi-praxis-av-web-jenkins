Ext.define('Ext.Praxis.view.widgets.previewGridColumns', {
    extend: 'Ext.window.Window',
    alias: 'widget.previewGridColumns',    
    title: '',
    header: true,
    width: 640,
    height: 130,
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
        
        me.events = {
            change_chkeck: function(checkboxfield, newValue, oldValue, eOpts){
                me.data.columns.forEach(function callback(currentValue, index, array) {
                    var data = currentValue.dataIndex;
                    
                    switch(checkboxfield.id){
                        case me.id + '-chkCol8':
                            if(data === 'A713FVLO1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol12':
                            if(data === 'A713LOHO1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol13':                            
                            if(data === 'A713CB'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol14':
                            if(data === 'A713TBASE1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol15':
                            if(data === 'A713STBAS1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol16':
                            if(data === 'A713VT'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol1718':
                            if(data === 'A713TDESC1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            if(data === 'A713PORDS1'){                                
                                currentValue.setVisible(newValue);                                
                            }                            
                            break;
                        case me.id + '-chkCol19':
                            if(data === 'A713VIA1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol2021':
                            if(data === 'A713FARE1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            if(data === 'A713TFARE1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol22':
                            if(data === 'A713SS1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol2324': 
                            if(data === 'A713DIFER1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            if(data === 'A713FDIFE1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        /*case 'A713CB':
                            Ext.getCmp(me.id + '-chkCol2526').setValue(true);  
                            break;*/
                        case me.id + '-chkCol29':
                            if(data === 'A713ACUE1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break;
                        case me.id + '-chkCol30':
                            if(data === 'A713ISC1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break; 
                        case me.id + '-chkCol41':
                            if(data === 'A713YQ1'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break; 
                        case me.id + '-chkCol4142':
                            if(data === 'A713COMPR'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            if(data === 'A713COM'){                                
                                currentValue.setVisible(newValue);                                
                            }
                            break; 
                    } 
                });
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
                id: me.id + '-FormGridColumns',
                width: 635,
                height: 105,
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
                                xtype: 'panel',
                                bodyStyle: 'background: #E5ECEF',
                                height: 98,
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '1 1 1 1',
                                //border: false,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '<b  style="font-size:12px">Grid Columns<b/>',
                                        bodyStyle: 'background: #E5ECEF',
                                        margin: '1 5 0 5',
                                        width: 624,
                                        height: 90,
                                        defaults: {
                                            border: true
                                        },
                                        //border: true,                                                    
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 40,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Date',
                                                                width: 40,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol8',
                                                                style:'padding-left:12px;padding-top:3px;',
                                                                width: 40,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'LH',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol12',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'CB',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol13',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'T',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol14',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 40,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'St FB',
                                                                width: 40,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol15',
                                                                style:'padding-left:12px;padding-top:3px;',
                                                                width: 40,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'VT',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol16',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 40,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Dscto',
                                                                width: 40,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol1718',
                                                                style:'padding-left:12px;padding-top:3px;',
                                                                width: 40,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'GI',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol19',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Fare',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol2021',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Q',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol22',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 60,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Diferencial',
                                                                width: 60,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol2324',
                                                                style:'padding-left:20px;padding-top:3px;',
                                                                width: 60,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 60,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Bajar Tarifas',
                                                                width: 60,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol2526',
                                                                style:'padding-left:20px;padding-top:3px;',
                                                                width: 60,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'SPA',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol29',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'ISC',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol30',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 30,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'YQ',
                                                                width: 30,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol41',
                                                                style:'padding-left:8px;padding-top:3px;',
                                                                width: 30,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'panel',
                                                        layout: {
                                                          type: 'vbox'
                                                        },
                                                        width: 60,
                                                        height: 63,
                                                        bodyStyle: 'background: #E5ECEF;border-color:#0d5280;',
                                                        defaults: {                                                    
                                                            border: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                style: 'background: #02507A;color:white;text-align:center;padding-top:3px;',
                                                                labelAlign: 'center',
                                                                text: 'Comision',
                                                                width: 60,
                                                                height:35,
                                                                anchor: '100%'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                id: me.id + '-chkCol4142',
                                                                style:'padding-left:20px;padding-top:3px;',
                                                                width: 60,
                                                                anchor: '100%',
                                                                listeners: {
                                                                    change: me.events.change_chkeck
                                                                }
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
        ];

        me.listeners = {
            beforeRender: function(){                                 
                 me.data.columns.forEach(function callback(currentValue, index, array) {
                    var data = currentValue.dataIndex;
                    var hidden = !currentValue.hidden;
                    switch(data){
                        case 'A713FVLO1':
                            Ext.getCmp(me.id + '-chkCol8').setValue(hidden);  
                            break;
                        case 'A713LOHO1':
                            Ext.getCmp(me.id + '-chkCol12').setValue(hidden);  
                            break;
                        case 'A713CB':
                            Ext.getCmp(me.id + '-chkCol13').setValue(hidden);  
                            break;
                        case 'A713TBASE1':
                            Ext.getCmp(me.id + '-chkCol14').setValue(hidden);  
                            break;
                        case 'A713STBAS1':
                            Ext.getCmp(me.id + '-chkCol15').setValue(hidden);  
                            break;
                        case 'A713VT':
                            Ext.getCmp(me.id + '-chkCol16').setValue(hidden);  
                            break;
                        case 'A713TDESC1':
                            Ext.getCmp(me.id + '-chkCol1718').setValue(hidden);  
                            break;
                        case 'A713VIA1':
                            Ext.getCmp(me.id + '-chkCol19').setValue(hidden);  
                            break;
                        case 'A713FARE1':
                            Ext.getCmp(me.id + '-chkCol2021').setValue(hidden);  
                            break;
                        case 'A713SS1':
                            Ext.getCmp(me.id + '-chkCol22').setValue(hidden);  
                            break;
                        case 'A713DIFER1':
                            Ext.getCmp(me.id + '-chkCol2324').setValue(hidden);  
                            break;
                        /*case 'A713CB':
                            Ext.getCmp(me.id + '-chkCol2526').setValue(true);  
                            break;*/
                        case 'A713ACUE1':
                            Ext.getCmp(me.id + '-chkCol29').setValue(hidden);  
                            break;
                        case 'A713ISC1':
                            Ext.getCmp(me.id + '-chkCol30').setValue(hidden);  
                            break; 
                        case 'A713YQ1':
                            Ext.getCmp(me.id + '-chkCol41').setValue(hidden);  
                            break; 
                        case 'A713COMPR':
                            Ext.getCmp(me.id + '-chkCol4142').setValue(hidden);  
                            break; 
                    }
                });
            }
        };
        
        me.callParent();
    }
});



