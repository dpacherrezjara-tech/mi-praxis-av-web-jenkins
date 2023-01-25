Ext.define('Ext.Praxis.view.sales.GSAIncentiveConditionsForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryGSAIncentiveConditionsForm',

    controller: 'DataEntryGSAIncentiveConditionsController',

    requires:[
        'Ext.Praxis.controller.sales.GSAIncentiveConditions.DataEntryGSAIncentiveConditionsController'
    ],

    title:'GSA Incentive Commissions',
    header:true,
    height:280,
    width:645,
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
                                    width: 230,
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
                                    text: 'Area',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtArea',
                                    fieldStyle: 'text-align:left',
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
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 230,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCountry',
                                    fieldStyle: 'text-align:center',
                                    editable: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'City',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCity',
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
                                    text: 'Initial Range',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 230,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtInitialRange',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    editable: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'End Range',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtEndRange',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
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
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Annual percent of commision',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 230,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtAnnualPercentOfCommision',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    editable: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Year Aplication',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtYearAplication',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
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
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Monthly percent of commision',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 230,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtMonthlyPercentOfCommision',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    editable: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'Month Aplication',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtMonthAplication',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
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
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Net Exclude',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 230,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtNetExclude',
                                    fieldStyle: 'text-align:center',
                                    editable: false,
                                    width: 70
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
                                    text: 'Initial Date Validity',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 230,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtInitialDateValidity',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    fieldStyle: 'text-align:center',
                                    editable: false,
                                    width: 100
                                },
                                { xtype: 'tbspacer', width: 15 },
                                {
                                    xtype: 'label',
                                    text: 'End Date Validity',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    padding: '2 0 2 0'
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtEndDateValidity',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    editable: false,
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