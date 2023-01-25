Ext.define('Ext.Praxis.view.sales.AccountingMasterProcessADJForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAccountingMasterProcessADJForm',

    controller: 'DataEntryAccountingMasterProcessADJController',

    requires:[
        'Ext.Praxis.controller.sales.AccountingMasterProcessADJ.DataEntryAccountingMasterProcessADJController'
    ],

    title:'ADJ Accounting Master Process- Data Entry Form',
    header:true,
    height:260,
    width:815,
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
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Module',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype:'combo',
                            id: prototype.id + '-cbxModulo',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "(Select)"],
                                    ["PADJMA", "Manual Adjustment"],
                                    ["PADJMV", "Massive Adjustment"]
                                ]
                            }),
                            queryMode: 'local',
                            hiddenLabel: false,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 160,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            change: 'onMostrarCampoChange',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                },
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                change: 'onMostrarCampoChange',
                            }
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="boxFecha">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id + '-boxFecha',
                    hidden: false,
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Process Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtProcessDate',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Format valid YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maskRe: /[0-9/]/,
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            inputAttrTpl: "data-qtip='Format valid YYYY/MM/DD'",
                            width: 90
                        }
                    ]
                }
                // </editor-fold>                
                ,
                // <editor-fold defaultstate="collapsed" desc="boxCaducos">
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            id: prototype.id + '-boxCaducos',
                            //hidden: true,
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center'
                            },
                            items: [
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'label',
                                    text: 'Period',
                                    style: 'font-weight:bold;color:#000;',
                                    padding: '2px 0px 2px 0px'
                                },
                                { xtype: 'tbspacer', width: 82 },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 80,
                                    hiddenLabel: false,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 0,
                                    width: 77,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
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
                                /*,
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'label',
                                    text: 'Month To',
                                    style: 'font-weight:bold;color:#000;',
                                    padding: '2px 0px 2px 0px'
                                },
                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                }
                                ,
                                { xtype: 'tbspacer', width: 10 },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 80,
                                    hiddenLabel: false,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onToYearChange',
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 0,
                                    width: 80,
                                    anchor: '100%',
                                    listConfig: {maxHeight: 111},
                                    listeners: {
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        change: 'onToMonthChange',
                                    }
                                }*/
                            ]
                        }
                        // </editor-fold>                
                ,
                /*
                // <editor-fold defaultstate="collapsed" desc="boxPeriodo">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id + '-boxPeriodo',
                    hidden: true,
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center'
                    },
                    items: [
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Billing Period',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDateYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: false,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 80,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111},
                            listeners: {
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[0-9]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                change: 'onYearChange',
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxDateMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: false,
                            valueField: 'code',
                            displayField: 'name',
                            labelWidth: 0,
                            width: 80,
                            anchor: '100%',
                            listConfig: {maxHeight: 111},
                            listeners: {
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                change: 'onMonthChange',
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype:'combo',
                            id: prototype.id + '-cbxDatePeriod',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "Select"],
                                    ["01", "01"],
                                    ["02", "02"],
                                    ["03", "03"],
                                    ["04", "04"]
                                ]
                            }),
                            queryMode: 'local',
                            hiddenLabel: false,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 80,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners:{
                                afterrender: function (combo, eOpts) {
                                    combo.setValue("");
                                },
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                change: 'onPeriodChange',
                            }
                        }
                    ]
                },
                // </editor-fold>
                */
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    width: 760,
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
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 60 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 60 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 60 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                                { xtype: 'tbspacer', width: 60 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
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
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                }
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