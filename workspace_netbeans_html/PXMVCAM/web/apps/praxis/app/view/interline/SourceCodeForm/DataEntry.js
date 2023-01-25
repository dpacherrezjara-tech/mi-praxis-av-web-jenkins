Ext.define('Ext.Praxis.view.interline.SourceCodeForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySourceCodeForm',
    requires:[
        'Ext.Praxis.controller.interline.SourceCode.DataEntrySourceCodeController'
    ],
    controller: 'DataEntrySourceCodeController',
    title:'SOURCE CODE -Data Entry Form',
    header:true,
    height:285,
    width:1000,
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
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Source Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtCODSOUR',
                                    fieldStyle: 'text-align:center;text-decoration:underline;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    maskRe: /[0-9]/,
                                    width: 45,
                                    listeners:{
                                        blur: 'ValidarA1852',
                                    }
                                },
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lbldes2',
                                    text: 'Source Descriptions: ',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 183
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lblDescripcion',
                                    text: '',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 480
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtDESSOU',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    hidden: true,
                                    maxLength: 45,
                                    maskRe: /[0-9a-zA-Z ]/,
                                    width: 549
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Group Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 180
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtGRUSOR',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    maskRe: /[0-9]/,
                                    width: 45,
                                    listeners:{
                                        blur: 'ValidarA1852_2',
                                    }
                                },
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lbldes',
                                    text: 'Group Code Descriptions: ',
                                    hidden: true,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 183
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    id:prototype.id+'-lblDescripcion2',
                                    text: '',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 480
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtstrGRUSOR',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    hidden: true,
                                    maxLength: 45,
                                    maskRe: /[0-9a-zA-Z ]/,
                                    width: 300
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
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
                            layout: 'hbox',
                            margin: '5 0 10 0',
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
});