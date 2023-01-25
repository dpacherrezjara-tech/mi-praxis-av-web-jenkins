Ext.define('Ext.Praxis.view.sales.LoadCommissionADMACMForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadCommissionADMACMForm',
    requires:[
        'Ext.Praxis.controller.sales.LoadCommissionADMACM.DataEntryLoadCommissionADMACMController'
    ],
    controller: 'DataEntryLoadCommissionADMACMController',
    title:'Load Commission ACM/ADM',
    header:true,
    height:500,
    width:700,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '0 2 4 2',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0',
                                        xtype: 'textfield'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'System Date',
                                            labelWidth: 60,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            padding: '4 0 5 0',
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            id:prototype.id+'-txtdate',
                                            fieldStyle: 'text-align:center',
                                            width: 66,
                                            editable: false,
                                           padding:'0px 5px 0px 5px'
                                        },
                                        {
                                            id:prototype.id+'-txtscheme',
                                            fieldLabel: 'Scheme',
                                            fieldStyle: 'text-align:center',
                                            width: 150,
                                            labelWidth: 50,
                                            editable: false,
                                            padding:'0px 5px 0px 5px'
                                        },
                                        {
                                            id:prototype.id+'-txtpais',
                                            fieldLabel: 'Country',
                                            fieldStyle: 'text-align:center',
                                            width: 150,
                                            labelWidth: 50,
                                            editable: false
                                        },
                                        {
                                            id:prototype.id+'-txtlote',
                                            fieldStyle: 'text-align:center',
                                            hidden: true,
                                            width: 66,
                                            readOnly: true
                                        },
                                        {
                                            id:prototype.id+'-txttype',
                                            fieldStyle: 'text-align:center',
                                            hidden: true,
                                            width: 66,
                                            readOnly: true
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridGP',
                                            border: true,
//                                            width: 292,
                                            width: 550,
                                            height: 350,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', dataIndex: 'A2960PAIVT', width: 125
                                                    },{
                                                        text: 'Scheme', dataIndex: 'A2960CODAC', width: 125
                                                    },{
                                                        text: 'Period', dataIndex: 'A2960FPERI', width: 125
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'A2960TYPE', width: 125
                                                    },
                                                    {
                                                        text: '',
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/check.png',
                                                                handler: 'onAgregarCOMMIClick'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                /*{
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridGP">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridGP',
                                            border: true,
//                                            width: 292,
                                            width: 500,
                                            height: 400,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', dataIndex: 'A2960PAIVT', width: 125
                                                    },{
                                                        text: 'Scheme', dataIndex: 'A2960CODAC', width: 125
                                                    },{
                                                        text: 'Period', dataIndex: 'A2960FPERI', width: 125
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'A2960TYPE', width: 125
                                                    },
                                                    {
                                                        text: '',
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/check.png',
                                                                handler: 'onAgregarCOMMIClick'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }*/
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    html: '<strong>Save</strong>',
                    id:prototype.id+'-btn-load',
                    icon: 'resources/img/botones/process_load.png',
                    listeners:{
                        click: 'onLoadClick'
                    }
                },
                {
                    html: '<strong>Cancel</strong>',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;'
                }
            ]
        }
    ]
});