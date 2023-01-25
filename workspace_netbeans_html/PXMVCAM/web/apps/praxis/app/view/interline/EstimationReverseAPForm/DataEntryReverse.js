Ext.define('Ext.Praxis.view.interline.EstimationReverseAPForm.DataEntryReverse', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryReverseEstimationReverseAPForm',
    requires: [
        'Ext.Praxis.controller.interline.EstimationReverseAP.DataEntryReverseEstimationReverseAPController'
    ],
    controller: 'DataEntryReverseEstimationReverseAPController',
    title: 'Reverse Accounting - Data Entry Form',
    header:true,
    height:150,
    width:500,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items: [
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
                        {xtype: 'tbspacer', heigth: 50},
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Accounting Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-txtAccountingDate2',
                                    fieldStyle: 'text-align:center',
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 90,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                    }
                                }
                            ]
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
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'btnInsert_clickHandler'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'btnCancel_clickHandler'
                    }
                }
            ]
        }
    ]
});