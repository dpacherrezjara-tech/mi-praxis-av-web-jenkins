Ext.define('Ext.Praxis.view.sales.AccountingMasterProcessADJForm.DataEntryReverse',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryReverseAccountingMasterProcessADJForm',

    controller: 'DataEntryReverseAccountingMasterProcessADJController',

    requires:[
        'Ext.Praxis.controller.sales.AccountingMasterProcessADJ.DataEntryReverseAccountingMasterProcessADJController'
    ],

    title:'Reverse Detail - Data Entry Form ',
    header:true,
    height:200,
    width:400,
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
            id: prototype.id + '-formDataEntryReverse',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtProcessDate2',
                            fieldLabel: '<strong>Process Date</strong>',
                            labelAlign: 'left',
                            labelWidth: 120,
                            width: 220,
                            maxLength: 10,                   
                            enforceMaxLength: true,
                            editable: false
                        }
                    ]                
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRegistrationDate2',
                            fieldLabel: '<strong>Registration Date</strong>',
                            labelAlign: 'left',
                            labelWidth: 120,
                            width: 220,
                            maxLength: 10,                   
                            enforceMaxLength: true,
                            editable: false
                        }
                    ]                
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkRegularizacion',
                            boxLabelAlign: 'before',
                            width: 138,
                            boxLabel: '<b>Regularization </b>',
                            readOnly: false
                        }
                    ]                
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            width: 125,
                            text: 'Total records',
                            style: 'font-weight:bold'
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblTotal',
                            labelAlign: 'left',
                            width: 20,
                            text: '0',
                            style: 'font-weight:bold'
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
                    id:prototype.id+'-btn-save2',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel2',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});