Ext.define('Ext.Praxis.view.payments.MinimumMaximumAmountsForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMinimumMaximumAmountsForm',
    requires:[
        'Ext.Praxis.controller.payments.MinimumMaximumAmounts.DataEntryMinimumMaximumAmountsController'
    ],
    controller: 'DataEntryMinimumMaximumAmountsController',
    title:'Data Entry',
    header:true,
    height:550,
    width:800,
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
                            id: prototype.id + '-panelDataEntry',
                            bodyStyle: 'background: transparent;"',
                            layout: 'vbox',
                            margin: '0 0 40 0',
                            width: 750,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '20 2 2 35',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 1},
                                        {
                                            xtype: 'label',
                                            text: 'Minimum & Maximum Amounts',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 350,
                                            height: 40
                                        },
                                        {xtype: 'tbspacer', width: 534}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    //bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 60},
                                        
                                        {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 60
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 15,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                        {xtype: 'tbspacer', width: 30},                                        
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCURRENCY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '3',
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100,
                                            maskRe: /[a-zA-Z]/
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 55
                                        },                                        
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 15,
                                                autoEl: {
                                                    tag: 'label',
                                                    'data-qtip': 'Mandatory Field'
                                                }
                                        },
                                        {xtype: 'tbspacer', width: 36},
                                        
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCOUNTRY',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '2',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
                                            maskRe: /[a-zA-Z]/
                                        },

                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '25 2 2 35',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 3},
                                        {
                                            xtype: 'label',
                                            text: 'FASE I',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',                                            
                                            width: 130,
                                            height: 20
                                        },
                                        {xtype: 'tbspacer', width: 534}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    //bodyStyle: 'background:#E5ECEF;',
                                    margin: '20 0 0 0',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 61},
                                        {
                                            xtype: 'label',
                                            text: 'Max. Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMAXF1',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '14',
//                                            maskRe: /[0-9]/,
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Min. Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMINF1',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '14',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
//                                            maskRe: /[a-zA-Z]/
                                        },

                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '25 2 2 35',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 3},
                                        {
                                            xtype: 'label',
                                            text: 'FASE II',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 130,
                                            height: 20
                                        },
                                        {xtype: 'tbspacer', width: 534}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                   // bodyStyle: 'background:#E5ECEF;',
                                    margin: '20 0 0 0',
                                    defaults: {
                                        anchor: '100%',
                                     width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 62},
                                        {
                                            xtype: 'label',
                                            text: 'Max. Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMAXF2',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '14',
//                                            maskRe: /[0-9]/,
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Min. Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 25},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMINF2',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '14',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
//                                            maskRe: /[a-zA-Z]/
                                        },
                                    ]
                                },
                                                        
                            ]
                        },
                
                   
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                { xtype: 'tbspacer', heigth: 105 },
                {
                    xtype: 'label',
                    text: 'Control Data',
                    height: 180,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                    width: 234,
//                    padding : '70 10 10 10'
                    margin: '40 10 4 35'
                },
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '20 2 10 50',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
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
                            margin: '5 0 10 50',
                            
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