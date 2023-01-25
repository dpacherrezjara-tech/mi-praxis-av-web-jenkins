/**
 * @class Ext.global.plugin.ViewProrrate
 * @extends Ext.form.Panel
 * @author Jim
 */
Ext.define('Ext.global.XViewProrrate', {
     extend: 'Ext.Container',
     xtype: 'XViewProrrate',
     config: {
        layout: 'fit',
        autoScroll:false
     },
     config_:{},
     constructor: function(config){
        var me = this;
        me.config_=config;
        
        me.items=[{
            xtype: 'panel',
            layout: 'fit',
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
                    layout: 'border',
                    defaults: {
                        border: false,
                        bodyStyle: 'background-color: #E8F9E8;',
                        style: 'margin: 2px;'
                    },
                    items: [
                        {
                            region: 'west',
                            style: 'margin: 0px;',
                            //xtype: 'view-ticket-form-view-facsimil-panel',
                            layout: 'fit',
                            height: 450,
                            width: 787,
                            items:[
                                {
                                    xtype:'XViewFacsimilPanel',
                                    id: me.id+'ViewFacsimil'
                                }
                            ]
                        },
                        {
                            region: 'center',
                            //layout: 'fit',
                            defaults: {
                                border: false,
                                bodyStyle: 'background: transparent;'
                            },bodyStyle: 'background-color: #E8F9E8;',
                            border: true,
                            items: [
                                {
                                    xtype:'XViewProrrateInfo',
                                    id: me.id+'ViewProrrateInfo'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 140,
                            layout: 'fit',
                            defaults: {
                                bodyStyle: 'background: transparent;'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: me.id+'Prorrate-gridDetCpn',
                                    store: [],//Ext.create('MasterTicketApp.store.ViewTicketForm.ViewProrrateGridDetCpns'),
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableHdMenu: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: false,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'O',
                                                dataIndex: 'A720CONEX',
                                                width: 25
                                            },
                                            {
                                                text: 'From',
                                                dataIndex: 'A720RUTAO',
                                                width: 45
                                            },
                                            {
                                                text: 'To',
                                                dataIndex: 'A720RUTAD',
                                                width: 35
                                            },
                                            {
                                                text: 'Cr',
                                                dataIndex: 'A720CARRA',
                                                width: 30
                                            },
                                            {
                                                text: 'Fit',
                                                dataIndex: 'A720NVLO',
                                                width: 50
                                            },
                                            {
                                                text: 'Date',
                                                dataIndex: 'A720FVLO',
                                                width: 70
                                            },
                                            {
                                                text: 'R',
                                                dataIndex: 'A720BOOKI',
                                                width: 20
                                            },
                                            {
                                                text: 'C',
                                                dataIndex: 'A720CLASE',
                                                width: 20
                                            },
                                            {
                                                text: 'F.Basis',
                                                dataIndex: 'A720FBUSO',
                                                width: 70
                                            },
                                            {
                                                text: 'Fare',
                                                dataIndex: 'A720FARE',
                                                width: 50,
                                                align: 'right'
                                            },
                                            {
                                                text: 'ST',
                                                dataIndex: 'A720TFARE',
                                                width: 30
                                            },
                                            {
                                                text: 'Q',
                                                dataIndex: 'A720SS',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Value',
                                                dataIndex: 'A720VALOR',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Q Surcharge',
                                                dataIndex: 'A720QIN',
                                                width: 95,
                                                align: 'right'
                                            },
                                            {
                                                text: 'YQ',
                                                dataIndex: 'A720YQ',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'SRP',
                                                dataIndex: 'A720VLSRP',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'MPA',
                                                dataIndex: 'A720VLMPA',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'SPA',
                                                dataIndex: 'A720ACUE',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'ISC',
                                                dataIndex: 'A720ISC',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Adjust',
                                                dataIndex: 'A720AJUST',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'SPA<br>Force',
                                                dataIndex: 'A720ACUEO',
                                                cls: 'column_header_double',
                                                width: 70
                                            },
                                            {
                                                text: 'Factor<br>Millas',
                                                dataIndex: 'A720FACT',
                                                cls: 'column_header_double',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: '%<br>Proviso',
                                                dataIndex: 'A720PPRO',
                                                cls: 'column_header_double',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Base<br>Amt',
                                                dataIndex: 'A720PROV',
                                                cls: 'column_header_double',
                                                width: 70,
                                                align: 'right'
                                            },
                                            {
                                                text: 'Proration',
                                                defaults: {
                                                    menuDisabled: false,
                                                    sortable: false,
                                                    align: 'right'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Commision',
                                                        dataIndex: 'A720PRRCM',
                                                        width: 90
                                                    },
                                                    {
                                                        text: 'SCM Rev',
                                                        dataIndex: 'A720PRSCM',
                                                        width: 80
                                                    },
                                                    {
                                                        text: 'Local Currency',
                                                        dataIndex: 'PRORAT_LOCAL_CUR',
                                                        width: 115
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
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