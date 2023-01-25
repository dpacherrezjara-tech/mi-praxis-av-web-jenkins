Ext.define('Ext.Praxis.view.sales.InvoiceCommissionGSAForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInvoiceCommissionGSAForm',
    requires:[
        'Ext.Praxis.controller.sales.InvoiceCommissionGSA.DataEntryInvoiceCommissionGSAController'
    ],
    controller: 'DataEntryInvoiceCommissionGSAController',
    title:'Invoice Commission GSA',
    header:true,
    height:490,
    width:650,
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
            id:prototype.id+'-formDataEntry',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Fila 1">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0',
                                xtype: 'textfield'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'GSA:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    labelSeparator: ':',
                                    style: 'font-weight:bold;color:#A63030;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826GSA2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 81,
                                    enableKeyEvents: true,
                                    listeners:{
                                        blur: 'onValidaCodeGSABlur',
                                        keypress: function(obj , e , eOpts) { if ( e.getKey() === e.ENTER ) Ext.getCmp(prototype.id+'-txtA1826NFACT').focus(); }
                                    }
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    id:prototype.id+'-txtA1839RSOC',
                                    fieldStyle: 'text-align:left',
                                    readOnly: true,
                                    width: 340
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 2">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0',
                                xtype: 'textfield'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Invoice Number:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    labelSeparator: ':',
                                    style: 'font-weight:bold;color:#A63030;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826NFACT',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    width: 133,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: function(obj , e , eOpts) { if ( e.getKey() === e.ENTER ) Ext.getCmp(prototype.id+'-txtA1826FFACT2').focus(); }
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Seq.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    id:prototype.id+'-txtA1826SEQ',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    value: '00',
                                    maxLength: 8,
                                    readOnly: true,
                                    width: 54
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 3">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Invoice Date:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    labelSeparator: ':',
                                    style: 'font-weight:bold;color:#A63030;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'datefield',
                                    id:prototype.id+'-txtA1826FFACT2',
                                    fieldStyle: 'text-align:center',
                                    allowBlank: false,
                                    format: 'Y/m/d',
                                    formatText: '',
                                    invalidText: 'Date Format invalid',
                                    minValue: new Date(2000, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 97,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: function(obj , e , eOpts) { if ( e.getKey() === e.ENTER ) Ext.getCmp(prototype.id+'-txtA1826LOTE2').focus(); },
                                        blur: function(cmp) {
                                            var temp = cmp.getErrors();
                                            if (temp.length>0) {
                                                global.Msg({
                                                    msg: temp[0]
                                                });
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 4">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Type Invoice:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    labelSeparator: ':',
                                    style: 'font-weight:bold;color:#A63030;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cbmtipo_invoice',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["C", "Commission"], ["I", "Incentive"], ["N", "Interline"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    caseSensitive: false,
                                    editable: false,
                                    width: 120,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("C");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onTipo_invoiceChange'
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 5">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0',
                                xtype: 'textfield'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Lote Number:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    labelSeparator: ':',
                                    style: 'font-weight:bold;color:#A63030;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826LOTE2',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    maskRe: /[0-9-]/,
                                    width: 132,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: function(obj , e , eOpts) { if ( e.getKey() === e.ENTER ) Ext.getCmp(prototype.id+'-txtA1826TCOM').focus(); }
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'label',
                                    text: 'Process Date:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 90
                                },
                                {
                                    xtype: 'datefield',
                                    id:prototype.id+'-txtA1826FPROC',
                                    fieldStyle: 'text-align:left',
                                    format: 'Y/m',
                                    allowBlank: false,
                                    formatText: '',
                                    readOnly: true,
                                    width: 80,
                                    hideTrigger: false,
                                    listeners:{
                                        keypress: function(obj , e , eOpts) { if ( e.getKey() === e.ENTER ) Ext.getCmp(prototype.id+'-txtA1826LOTE2').focus(); },
                                        change: 'onTotalPrefChange'
                                    }
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    text: '(YYYY/MM)',
                                    style: 'font-weight:bold;color:#A63030;'
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 6">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0',
                                xtype: 'textfield'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Currency:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#A63030;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826MONED',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 59,
                                    readOnly: true,
                                    enableKeyEvents: true,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 7">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 131 },
                                {
                                    xtype: 'label',
                                    text: 'Invoice',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 99
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Pre-Invoice',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 99
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'label',
                                    text: 'Difference',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 99
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 8">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0',
                                xtype: 'textfield'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Commission Give',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826TCOM',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /[-0-9.]/,
                                    value: '0.00',
                                    width: 99,
                                    enableKeyEvents: true,
                                    listeners:{
                                        keypress: function(obj , e , eOpts) { if ( e.getKey() === e.ENTER ) Ext.getCmp(prototype.id+'-cbmPeriod').focus(); },
                                        blur: 'onTCOMBlur'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826TCOM_PRE',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /[-0-9.]/,
                                    value: '0.00',
                                    width: 99,
                                    readOnly: true,
                                    enableKeyEvents: true
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826TCOM_DIF',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /[-0-9.]/,
                                    value: '0.00',
                                    width: 99,
                                    readOnly: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 9">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Periodicity:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cbmPeriod',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["A", "Anual"], ["M", "Mensual"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    caseSensitive: false,
                                    editable: false,
                                    width: 120,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("A");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Fila 10">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults: {
                                anchor: '100%',
                                margin: '3 0 3 0',
                                padding: '3 0 3 0',
                                xtype: 'textfield'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Status:',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '4 0 5 0',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    id:prototype.id+'-txtA1826STATU',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 1,
                                    maskRe: /[A,D]/,
                                    width: 59,
                                    enableKeyEvents: true,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'label',
                                    text: 'A=Match /  D=Difference',
                                    style: 'font-weight:bold;color:#323232;',
                                    padding: '4 0 5 0',
                                    width: 244
                                }
                            ]
                        }
                        // </editor-fold>
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
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOCR',
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
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 25 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOUP',
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
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:#A63030;',
                    width: 120
                }
            ]
        }
    ]
});