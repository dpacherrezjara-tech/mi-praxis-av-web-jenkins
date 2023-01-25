/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.flown.AccountingMasterProcessForm.DataEntryReverse', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntryReverse',
    controller: prototype.id + '-dataEntryReverseController',
    requires: [
           'Ext.Praxis.controller.flown.AccountingMasterProcess.DataEntryReverseAccountingMasterProcessController'
    ],
    title: 'Reverse Detail - Data Entry Form',
    header:true,
    height:180,
    width:400,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,

    defaults:{
        border: false
    },
    items: [
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
                            fieldLabel: '<strong>Valorization Date</strong>',
                            labelAlign: 'left',
                            labelWidth: 150,
                            width: 250,
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
                            width: 170,
                            boxLabel: '<b>Automatic adjustment  </b>',
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
                            width: 155,
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
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 100 10 50',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save2',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel2',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }                
            ]
        }
    ]
});

