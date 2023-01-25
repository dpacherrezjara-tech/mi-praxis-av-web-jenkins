Ext.define('Ext.Praxis.view.sales.CountryObjectiveForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCountryObjectiveForm',

    controller: 'DataEntryCountryObjectiveController',

    requires:[
        'Ext.Praxis.controller.sales.CountryObjective.DataEntryCountryObjectiveController'
    ],

    title:'GSA Incentive Annual Country Objective',
    header:true,
    height:400,
    width:600,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },

    items:[
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'GSA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtGSA',
                                    fieldStyle: 'text-align:center',
                                    editable: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCountry',
                                    fieldStyle: 'text-align:center',
                                    editable: false,
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Area',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtArea',
                                    fieldStyle: 'text-align:left',
                                    editable: false,
                                    width: 345
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Year',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtYear',
                                    fieldStyle: 'text-align:center',
                                    editable: false,
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                enforceMaxLength: true
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Payment Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtPaymentCurrency',
                                    fieldStyle: 'text-align:center',
                                    maxLength: 8,
                                    editable: false,
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                enforceMaxLength: true
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Annual',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote',
                                    fieldStyle: 'text-align:right',
                                    maxLength: 15,
                                    editable: false,
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                maxLength: 15,
                                enforceMaxLength: true,
                                editable: false
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Jan',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote01',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Jul',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote07',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                maxLength: 15,
                                enforceMaxLength: true,
                                editable: false
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Feb',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote02',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Aug',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote08',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                maxLength: 15,
                                enforceMaxLength: true,
                                editable: false
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Mar',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote03',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Sep',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote09',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                maxLength: 15,
                                enforceMaxLength: true,
                                editable: false
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Apr',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote04',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Oct',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote10',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                maxLength: 15,
                                enforceMaxLength: true,
                                editable: false
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'May',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote05',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Nov',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote11',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                }
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                maxLength: 15,
                                enforceMaxLength: true,
                                editable: false
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Jun',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote06',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Dec',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtQuote12',
                                    fieldStyle: 'text-align:right',
                                    width: 100
                                }
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
                    text: 'Save',
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
//                ,
//                { xtype: 'tbspacer', width: 30 },
//                {
//                    xtype: 'label',
//                    text: '(*) Required Fields',
//                    style: 'font-weight:bold;color:red;',
//                    width: 120
//                }
//                ,
//                { xtype: 'tbspacer', width: 30 },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-prev',
//                    icon: 'resources/img/botones/prev.png',
//                    tooltip: 'View Previous Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onPrevClick'
//                    }
//                },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-next',
//                    icon: 'resources/img/botones/next2.png',
//                    tooltip: 'View Next Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onNextClick'
//                    }
//                }
            ]
        }
    ]

});