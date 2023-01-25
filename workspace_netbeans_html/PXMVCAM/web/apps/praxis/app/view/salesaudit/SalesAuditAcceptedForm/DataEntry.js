Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySalesAuditAcceptedForm',
    requires:[
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntrySalesAuditAcceptedController'
    ],
    controller: 'DataEntrySalesAuditAcceptedController',
    title:"ADM Information",
    header:true,
    height:280,
    width:820,
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
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: 678
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: true,
                            padding: '2 0',
                            defaults: {
                                anchor: '100%',
                                padding: '2 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Status: ',
                                    style: 'font-weight:bold;',
                                    width: 70,
                                    padding: '6 0'
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbStatusASR',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["D", "Disputed"], ["N", "Rejected"], ["R", "Reaudited"],
                                            ["J", "Justified"], ["Z", "Authorized"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    hidden: true,
                                    width: 100,
                                    value: "D",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'cmbStatus_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbStatus',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["A", "Approved"], ["N", "Rejected"], ["R", "Reaudited"],
                                            ["J", "Justified"], ["Z", "Authorized"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    hidden: true,
                                    width: 100,
                                    value: "A",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'cmbStatus_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id+'-cmbStatusARC',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["A", "Approved"], ["N", "Rejected"], ["R", "Reaudited"],
                                            ["J", "Justified"], ["Z", "Authorized"], ["P", "Pending"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    hidden: true,
                                    width: 100,
                                    value: "A",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'cmbStatus_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    id: prototype.id+'-lblCantCarac',
                                    text: '0',
                                    style: 'font-weight:bold;',
                                    width: 47,
                                    padding: '6 0'
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-hbox1',
                                    layout: 'hbox',
                                    border: false,
                                    hidden: true,
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblReason',
                                            text: 'Reason: ',
                                            style: 'font-weight:bold;',
                                            width: 70,
                                            padding: '4 0 2 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id+'-cmbComment',
                                            queryMode: 'local',
                                            allowBlank: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 306,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            listConfig: {maxHeight: 111, minWidth: 320},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                focus: function (combo) {
                                                    combo.expand();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'textarea',
                            id: prototype.id+'-txtComent',
                            value: '',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 300,
                            height: 101,
                            listeners: {
                                keypress: 'contarCaracteres'
                            }
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'background: transparent',
                            border: false,
                            items:[
                                {
                                    xtype: 'filefield',
                                    id: prototype.id+'-txtFile',
                                    fieldLabel: '<strong style="color:#20454D;">File</strong>',
                                    labelWidth: 110,
                                    allowBlank: true,
                                    accept: '.doc, .docx',
                                    width: '100%',
                                    listeners:{
                                        change: 'btnLoad_clickHandler'
                                    },
                                    regex: /(.)+((\.doc)|(\.docx)(\w)?)$/i,
                                    regexText: 'Only DOC and DOCX formats are accepted',
                                    buttonConfig: {
                                        text : '<strong>Select file...</strong>',
                                        width: 92
                                    }
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
                    id:prototype.id+'-btnLoad0',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'reviewADM'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'btnCancel_clickHandler'
                    }
                }
            ]
        }
    ]
});