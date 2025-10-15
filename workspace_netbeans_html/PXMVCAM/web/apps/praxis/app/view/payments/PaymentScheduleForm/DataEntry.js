Ext.define('Ext.Praxis.view.payments.PaymentScheduleForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataPaymentScheduleForm',
    requires:[
        'Ext.Praxis.controller.payments.PaymentSchedule.DataEntryPaymentScheduleController'
    ],
    controller: 'DataEntryPaymentScheduleController',
    title:'PaymentSchedule - Data Entry Form',
    header:true,
    height:430,
    width:760,
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
                            text: 'Payment Schedule Information',
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
                                    id:prototype.id+'-de-txtSAGENT',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false,
                                    align: 'center',
                                    width: 80
                                    
                                    
                                },
                                { xtype: 'tbspacer', width: 35 },
                                {
                                    xtype: 'label',
                                    text: 'Distribution Channel',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140
                                    
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSUBFTE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 80
                                    
                                },
                                { xtype: 'tbspacer', width: 50 },
                                
                                
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                    
                                },
                                { xtype: 'tbspacer', width: 10 },
//                                {
//                                    xtype: 'textfield',
//                                    id:prototype.id+'-de-cmbSCOUNTRY',
//                                    style: 'font-weight:bold;color:#0B333C;',
//                                    fieldStyle: 'text-align:center;',
//                                    editable : false,
//                                    width: 85      
//                                    
//                                },
                                
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-de-cmbSCOUNTRY',
                                    fieldStyle: 'text-align:left;',
                                    enableKeyEvents: true,
                                    width: 95,
                                    editable: true,
                                    readOnly: false,
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    emptyText: 'All',
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE'
//                                    listeners: {
//                                        select: 'searchCitys'
//                                    }
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
                                    text: 'Name Agent',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                    
                                },
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNAMEAG',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 340,
                                    enforceMaxLength: true
                                    
                                },
                                  { xtype: 'tbspacer', width: 50 },
                                {
                                    xtype: 'label',
                                    text: 'Payment Type',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90
                                    
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtTVENTA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 85,
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
                                        text: 'Payment Details',
                                        hidden: false,
                                        style: 'font-weight:bold;color:#0B333C;',
                                        width: 80

                                },
                                {xtype: 'tbspacer', width: 17},
                                {
                                xtype: 'textfield',
                                        id: prototype.id + '-de-txtDFREQPAY',
                                        style: 'font-weight:bold;color:#0B333C;',
                                        fieldStyle: 'text-align:center;',
                                        width: 575,
                                        enforceMaxLength: true

                                },
                                
                                {xtype: 'tbspacer', width: 50}
                                
                                



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
                                    text: 'Days Agroup',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 90

                                },

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAGROUPD',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 110,
                                    enforceMaxLength: true

                                },

                                {xtype: 'tbspacer', width: 10},
                                
                                
                                
                                
                                
                                {
                                    xtype: 'label',
                                    text: 'Payment Frequency',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 85

                                },

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFPAGO',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 40,
                                    enforceMaxLength: true

                                },

                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Payment per Month',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120

                                },

                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYPAGO',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 40,
                                    enforceMaxLength: true

                                },
                                
                                {xtype: 'tbspacer', width: 10},

                                
                                
                                {
                                    xtype: 'label',
                                    text: 'Payment Day',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80

                                },

                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDIAPAGO',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 40,
                                    enforceMaxLength: true

                                }


                            ]
                        },

                        
                        
                        ///////////////////////////////////////////
                        
                        
                        
                        
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 2 8',
                            items: [
                                {xtype: 'tbspacer', width: 7},


                                {
                                    xtype: 'label',
                                    text: 'Delayed Payment Days',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140

                                },

                                {xtype: 'tbspacer', width: 27},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYDPOS',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 40,
                                    enforceMaxLength: true

                                },
                                
                                
                                {xtype: 'tbspacer', width: 20},
                                

                                {
                                    xtype: 'label',
                                    text: 'Advanced Payment Days',
                                    hidden: false,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 140

                                },

                                {xtype: 'tbspacer', width: 17},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYDPRE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 40,
                                    enforceMaxLength: true

                                }
                                
                              


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
            ]
        }
    ]
  }
);
