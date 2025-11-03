Ext.define('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryPending',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryPendingBankReconciliationForm',
     id: 'BankReconciliationForm-dataEntryPending', 
    requires:[
        'Ext.Praxis.controller.payments.BankReconciliation.DataEntryPendingBankReconciliationController'
    ],
    controller: 'DataEntryPendingBankReconciliationController',
    title:'BankReconciliation - Data Entry Pending Form',
    header:true,
    height:400,
    width:720,
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
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width:930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Pending Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 3'
                        },
                        { xtype: 'tbspacer', width: 6 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Agent ',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                },
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtAGENTMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'background-color:#FFF2CC; color:#0B333C; text-align:center; font-weight:bold;',

                                    editable: true,
                                    
                                    maskRe: /[0-9]/,
//                                    regex: /^[0-9]{0,8}$/,
                                    align: 'center',
                                    width: 80
                                    
                                    
                                },
                                { xtype: 'tbspacer', width: 35 },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                    
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtSTATUSMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 100
                                    
                                },
                                { xtype: 'tbspacer', width: 30 },
                                
                                
                                {
                                    xtype: 'label',
                                    text: 'Value Date',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    
                                    width: 100
                                    
                                },
                                { xtype: 'tbspacer', width: 10 },

                                
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtVALUEDATEMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 90
                                    
                                },
                                { xtype: 'tbspacer', width: 20 }
                                
                            ]
                            
                            
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            hidden: true,
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width:90
                                    
                                },
                                { xtype: 'tbspacer', width: 7 }
 
                            ]
                        },
                        { xtype: 'tbspacer', width: 6 },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Concept',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                    
                                },
                                { xtype: 'tbspacer', width: 17 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCONCEPTMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 80,
                                    enforceMaxLength: true
                                    
                                },
                                  { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Adjusment Type',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                    
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtATYPEMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 100,
                                    enforceMaxLength: true
                                    
                                },
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    text: 'Consol',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                    
                                },
                                { xtype: 'tbspacer', width: 9 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCONSOLMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 90,
                                    enforceMaxLength: true
                                    
                                }
                            ]
                        },
                        
                        
  
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                
                                { xtype: 'tbspacer', width: 7 },
                                
                                
                                {
                                xtype: 'label',
                                        text: 'Currency',
                                        hidden: false,
                                        style: 'font-weight:bold;color:#0B333C;',
                                        width: 80

                                },
                                {xtype: 'tbspacer', width: 17},
                                {
                                xtype: 'textfield',
                                        id: prototype.id + '-txtCURRENCYMPF199',
                                        style: 'font-weight:bold;color:#0B333C;',
                                        fieldStyle: 'text-align:center;',
                                        editable: false,
                                        width: 60,
                                        enforceMaxLength: true

                                },
                                
                                {xtype: 'tbspacer', width: 80},
                                
                                {
                                xtype: 'label',
                                        text: 'Neto',
                                        hidden: false,
                                        style: 'font-weight:bold;color:#0B333C;',
                                        width: 50

                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                xtype: 'textfield',
                                        id: prototype.id + '-txtNETOMPF199',
                                        style: 'font-weight:bold;color:#0B333C;',
                                        fieldStyle: 'text-align:center;',
                                        editable: false,
                                        width: 100,
                                        enforceMaxLength: true

                                },
                                
                                {xtype: 'tbspacer', width: 37},
                                
                                {
                                xtype: 'label',
                                        text: 'Issued Payment',
                                        hidden: false,
                                        style: 'font-weight:bold;color:#0B333C;',
                                        width: 80

                                },
                                {xtype: 'tbspacer', width: 23   },
                                {
                                xtype: 'textfield',
                                        id: prototype.id + '-txtIPAYMPF199',
                                        style: 'font-weight:bold;color:#0B333C;',
                                        fieldStyle: 'text-align:center;',
                                        editable: false,
                                        width: 90,
                                        enforceMaxLength: true

                                }
                                



                            ]
                        },
                        
                        
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                
                                
                                {
                                    xtype: 'label',
                                    text: 'Start Date',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90

                                },

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTARTMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 90,
                                    enforceMaxLength: true

                                },

                                {xtype: 'tbspacer', width: 40},
                                
                                
                                
                                
                                
                                {
                                    xtype: 'label',
                                    text: 'End Date',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 82

                                },

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtENDMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 90,
                                    enforceMaxLength: true

                                },

                               
                                
                                {xtype: 'tbspacer', width: 10}

                                
                                

                            ]
                        },

                        
                        
                        
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                {xtype: 'tbspacer', width: 7},


                                {
                                    xtype: 'label',
                                    text: 'Reference',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90

                                },

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtREFEMPF199',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    width: 240,
                                    enforceMaxLength: true

                                },
                                
                                
                                {xtype: 'tbspacer', width: 20}
                                

                                
                                
                              


                            ]
                        }

                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        //////////////////////////

                        
                    ]
                },
                { xtype: 'tbspacer', height: 10 },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '0 2 4 8'
                     
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 30',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border:false,
                            layout: 'hbox',
                            margin: '8 2 4 30',
                            
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '0 0 10 0',
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
//                {
//                    text: 'Delete',
//                    id:prototype.id+'-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    listeners:{
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
  }
);
