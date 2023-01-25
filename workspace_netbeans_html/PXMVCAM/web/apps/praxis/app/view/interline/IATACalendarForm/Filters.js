Ext.define('Ext.Praxis.view.interline.IATACalendarForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: '100%',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Date Invoiced:',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 15},
                                // <editor-fold defaultstate="collapsed" desc="Combo Date">
                                {
                                    xtype: 'label',
                                    html: 'From:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px',
                                    width: 45
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDay',
                                    labelAlign: 'right',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: true,
                                    autoSelect: false,
                                    forceSelection: true,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    typeAhead: true,
                                    hidden: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        change: 'cbxDateFromDay_changeHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'To:',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px',
                                    width: 31
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToYear',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    typeAhead: true,
                                    listConfig: {maxHeight: 111},
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: false,
                                    forceSelection: true,
                                    editable: true,
                                    typeAhead: true,
                                    hidden: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    width: 65,
                                    listeners: {
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        }
                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 300},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxLoad',
                                    hidden: true,
                                    width: 280,
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [
                                        {
                                            xtype: 'form',
                                            id: prototype.id + '-form-01',
                                            border: false,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            items: [{
                                                xtype: 'filefield',
                                                id: prototype.id + '-file',
                                                name: 'excelfile',
                                                clearOnSubmit: false,
                //                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update Excel</strong>',
                                                allowBlank: true,
                                                accept: '.xlsx, .xls',
                                                labelWidth: 85,
                                                width: 160,
                                                buttonText: 'Select excel...',
                                                regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                                regexText: 'Only XLS and XLSX formats are accepted',
                                                buttonConfig: {
                                                    text : '<strong>Select file</strong>',
                                                    width: 80
                                                },
                                                listeners:{
                                                    //change: 'onUploadChange'
                                                }
                                            }]
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-btn-upload',
                                            margin: '2 0 0 0',
                                            width: 60,
                                            html: '<strong style="color:white;">LOAD</strong>',
                                            style: 'background:#24678D;color:white;font-weight:bold;',
                                            border: false,
                                            listeners:{
                                                click: 'onFileLoad'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});