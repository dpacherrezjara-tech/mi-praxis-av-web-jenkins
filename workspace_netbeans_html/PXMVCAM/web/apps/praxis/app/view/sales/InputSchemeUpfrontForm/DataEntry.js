Ext.define('Ext.Praxis.view.sales.InputSchemeUpfrontForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInputSchemeUpfrontForm',
    requires:[
        'Ext.Praxis.controller.sales.InputSchemeUpfront.DataEntryInputSchemeUpfrontController'
    ],
    controller: 'DataEntryInputSchemeUpfrontController',
    title:'Upfront Commission:',
    header:true,
    height:720,
    width:1210,
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
                    xtype: 'tabpanel',
                    id: prototype.id + '-TabMaster',
                    width: 710,
                    anchor: '100%',
                    margin: '10 10 10 10',
                    autoScroll: true,
                    defaults: {
                        height: 645,
                        border: true,
                        listeners: {
                            activate: 'getChangeTab'
                        }
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Information Agreement">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">Information Agreement</label>',
                            id: prototype.id + '-boxInfo',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    padding: '4 4 4 7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            padding: '7 0 7 0',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Name:',
                                                    width: 50
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '(*):',
                                                    style: 'font-weight:bold;color:#9C1717;',
                                                    width: 29,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-textNameScheme',
                                                    fieldStyle: 'text-align:left;font-weight:bold;color:#000;',
                                                    enforceMaxLength: true,
                                                    maxLength: 120,
                                                    width: 372
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-textA1155CODAC',
                                                    fieldStyle: 'text-align:left;font-weight:bold;color:#000;',
                                                    hidden: true,
                                                    width: 88
                                                },
                                                { xtype: 'tbspacer', width: 15 },
                                                {
                                                    xtype: 'label',
                                                    text: 'Version:',
                                                    width: 57
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '(*):',
                                                    style: 'font-weight:bold;color:#9C1717;',
                                                    width: 28,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-textA1155VRSAC',
                                                    fieldStyle: 'text-align:left;',
                                                    enforceMaxLength: true,
                                                    disabled: true,
                                                    maxLength: 3,
                                                    maskRe: /[0-9]/,
                                                    width: 50
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            padding: '7 0 7 0',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Effective Date From:',
                                                    width: 140
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '(*):',
                                                    style: 'font-weight:bold;color:#9C1717;',
                                                    width: 30,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Mandatory Field'
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id:prototype.id+'-txtA1155FINI',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                                    minValue: new Date(2000, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    width: 104,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 10 },
                                                {
                                                    xtype: 'label',
                                                    text: 'To:',
                                                    width: 30,
                                                    padding: '4 0 0 0'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id:prototype.id+'-txtA1155FFIN',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                                    minValue: new Date(2000, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    width: 95,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 4 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHKA1155FFIN',
                                                    boxLabel: '',
                                                    checked: false,
                                                    width: 27,
                                                    listeners:{
                                                        change: 'setChangeDate'
                                                    }
						},
                                                { xtype: 'tbspacer', width: 10 },
                                                {
                                                    xtype: 'label',
                                                    text: 'Status:',
                                                    width: 55,
                                                    padding: '4 0 0 0'
                                                },
                                                {
                                                    xtype:'combo',
                                                    id: prototype.id + '-cmbA1155FESTA',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["R", "[R] REGISTERED."], ["D", "[D] DEVELOPMENT."], ["P", "[P] TEST."], ["U", "[U] UPGRADE."], ["C", "[C] CERTIFICATE."]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    hiddenLabel: false,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 96,
                                                    disabled: true,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners:{
                                                        afterrender: function (combo, eOpts) {
                                                            combo.setValue("R");
                                                        },
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            padding: '7 0 7 0',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Reception Date................:',
                                                    width: 182
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id:prototype.id+'-txtA1155FRECE',
                                                    fieldStyle: 'text-align:center',
                                                    format: 'Y/m/d',
                                                    formatText: '',
                                                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                                                    value: new Date(),
                                                    minValue: new Date(2000, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    width: 144,
                                                    autoEl: {
                                                        tag: 'label',
                                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                                    }
                                                },
                                                { xtype: 'tbspacer', width: 10 },
                                                {
                                                    xtype: 'label',
                                                    text: 'Data Type:',
                                                    width: 80,
                                                    padding: '4 0 0 0'
                                                },
                                                {
                                                    xtype:'combo',
                                                    id: prototype.id + '-cmbA1155FLGFE',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["E", "[E]DATE OF SALE"], ["I", "[I]DATE OF INITIAL TRAVEL"], ["F", "[F]DATE OF INVOICING"], ["U", "[U]DATE OF USE"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    allowBlank: true,
                                                    hiddenLabel: false,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: true,
                                                    width: 193,
                                                    typeAhead: true,
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners:{
//                                                        afterrender: function (combo, eOpts) {
//                                                            combo.setValue("R");
//                                                        },
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            padding: '7 0',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHKA1155FLGAU',
                                                    boxLabel: 'Automated:',
                                                    checked: false,
                                                    width: 100
						},
                                                { xtype: 'tbspacer', width: 10 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHKA1155FLGAD',
                                                    boxLabel: 'Continue:',
                                                    checked: false,
                                                    width: 100
						},
                                                { xtype: 'tbspacer', width: 10 },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-RBDA1155IDSCO',
                                                    boxLabel: 'Addendum:',
                                                    checked: false,
                                                    width: 100
						},
                                                { xtype: 'tbspacer', width: 10 },
                                                {
                                                    xtype: 'label',
                                                    text: 'N°:',
                                                    width: 30,
                                                    padding: '4 0 0 0'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-txtA1155PDEFA',
                                                    fieldStyle: 'text-align:left;',
                                                    enforceMaxLength: true,
                                                    maxLength: 5,
                                                    maskRe: /[0-9]/,
                                                    width: 49
                                                }
                                            ]
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="TabMasterLabel">
                                        {
                                            xtype: 'tabpanel',
                                            id: prototype.id + '-TabMasterLabel',
                                            width: 610,
                                            anchor: '100%',
                                            padding: '7 0 7 0',
                                            autoScroll: true,
                                            defaults: {
                                                height: 400,
                                                border: true,
                                                listeners: {
                                                    activate: 'getChangeTabLabel'
                                                }
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    title: '<label style="color:#0B333C;">IATA GROUPS</label>',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        width: 598
                                                    },
                                                    items: [
                                                        { xtype: 'tbspacer', height: 2 },
                                                        // <editor-fold defaultstate="collapsed" desc="Options">
                                                        {
                                                            xtype: 'panel',
                                                            border: false,
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'toolbar',
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnSearch2',
                                                                            iconCls: 'prx-icon-search',
                                                                            tooltip: 'Search',
                                                                            listeners: {
                                                                                click: 'getListIATAGROUP'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnAdd2',
                                                                            iconCls: 'prx-icon-add',
                                                                            tooltip: 'New',
                                                                            listeners: {
                                                                                click: 'displaySearchCodeIATAPopup'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        { xtype: 'tbspacer', height: 2 },
                                                        // <editor-fold defaultstate="collapsed" desc="gridAirlineExtra">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridAirlineExtra',
                                                            height: 220,
                                                            columnLines: true,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'IATA', dataIndex: 'IATA', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'NAME', dataIndex: 'NAME', width: 240,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'COUNTRY', dataIndex: 'COUNTRY', width: 100
                                                                    },
                                                                    {
                                                                        text: 'SOURCE', dataIndex: 'A2649TIPO', width: 100
                                                                    },
                                                                    {
                                                                        text: 'Delt',
                                                                        sortable: false,
                                                                        xtype: 'actioncolumn',
                                                                        width: 56,
                                                                        align: 'center',
                                                                        items: [
                                                                            {
                                                                                icon: 'resources/img/botones/delete.png',
//                                                                                tooltip: '',
                                                                                handler: 'onDeltClick'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        // </editor-fold>
                                                        { xtype: 'tbspacer', height: 10 },
                                                        // <editor-fold defaultstate="collapsed" desc="ControlData">
                                                        {
                                                            xtype: 'panel',
                                                            bodyStyle: 'border-style:solid;border-color:#999999;border-bottom-width:4px;',
                                                            border: true,
                                                            layout: 'vbox',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id+'-boxRegister',
                                                                    border: false,
                                                                    layout: 'hbox',
                                                                    padding: '5 0 0 7',
                                                                    margin: '5 0 0 0',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Register:',
                                                                            width: 90,
                                                                            padding: '4 0 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id:prototype.id+'-textRegister',
                                                                            fieldStyle: 'text-align:left;',
                                                                            disabled: true,
                                                                            width: 340
                                                                        },
                                                                        { xtype: 'tbspacer', width: 10 },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id:prototype.id+'-textUser',
                                                                            fieldStyle: 'text-align:left;',
                                                                            disabled: true,
                                                                            width: 106
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'tbspacer', height: 10 },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id+'-boxLast',
                                                                    border: false,
                                                                    layout: 'hbox',
                                                                    padding: '5 0 0 7',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Last Update:',
                                                                            width: 90,
                                                                            padding: '4 0 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id:prototype.id+'-textLastUpdate',
                                                                            fieldStyle: 'text-align:left;',
                                                                            disabled: true,
                                                                            width: 340
                                                                        },
                                                                        { xtype: 'tbspacer', width: 10 },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id:prototype.id+'-textLastUser',
                                                                            fieldStyle: 'text-align:left;',
                                                                            disabled: true,
                                                                            width: 106
                                                                        }
                                                                    ]
                                                                },
                                                                { xtype: 'tbspacer', height: 10 },
                                                                {
                                                                    xtype: 'panel',
                                                                    id: prototype.id+'-boxCertified',
                                                                    border: false,
                                                                    layout: 'hbox',
                                                                    padding: '5 0 0 7',
                                                                    margin: '0 0 10 0',
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Certified:',
                                                                            width: 90,
                                                                            padding: '4 0 0 0'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id:prototype.id+'-textCertified',
                                                                            fieldStyle: 'text-align:left;',
                                                                            disabled: true,
                                                                            width: 340
                                                                        },
                                                                        { xtype: 'tbspacer', width: 10 },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id:prototype.id+'-textCertifiedUser',
                                                                            fieldStyle: 'text-align:left;',
                                                                            disabled: true,
                                                                            width: 106
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    title: '<label style="color:#0B333C;">REGISTER LABEL</label>',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    defaults: {
                                                        width: 598
                                                    },
                                                    items: [
                                                        { xtype: 'tbspacer', height: 2 },
                                                        // <editor-fold defaultstate="collapsed" desc="Options">
                                                        {
                                                            xtype: 'panel',
                                                            border: false,
                                                            layout: {
                                                                type: 'hbox',
                                                                pack: 'end'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'toolbar',
                                                                    items: [
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnSearch3',
                                                                            iconCls: 'prx-icon-search',
                                                                            tooltip: 'Search',
                                                                            listeners: {
                                                                                click: 'getListLabel'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            id: prototype.id + '-btnAdd3',
                                                                            iconCls: 'prx-icon-add',
                                                                            tooltip: 'New',
                                                                            listeners: {
                                                                                click: 'btnAddRegisterLabel_click'
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        { xtype: 'tbspacer', height: 2 },
                                                        // <editor-fold defaultstate="collapsed" desc="gridRegisterLabel">
                                                        {
                                                            xtype: 'grid',
                                                            id: prototype.id + '-gridRegisterLabel',
                                                            height: 350,
                                                            columnLines: true,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {
                                                                        text: 'Effec.Date', dataIndex: 'A2862EFFST', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Term.Date', dataIndex: 'A2862EFFEN', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Name Label', dataIndex: 'A2862LABEN', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Description', dataIndex: 'A2862LABED', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Percent.%', dataIndex: 'A2862PERCE', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Elegible', dataIndex: 'A2862LABET', width: 67, sortable: false,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            if(value==="C") value ="YES";
                                                                            if(value==="N") value ="NO";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Critery', dataIndex: 'A2862CRITE', width: 80,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'actioncolumn',
                                                                        text: 'Edit',
                                                                        id: prototype.id+'-COLUMN_GRID_LBL_EDT',
                                                                        sortable: false,
                                                                        width: 39,
                                                                        align: 'center',
                                                                        items: [
                                                                            {
                                                                                iconCls: 'prx-icon-edit',
                                                                                tooltip: 'Edit',
                                                                                handler: 'setChangeDataRowLabel'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    padding: '4 4 4 7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'Fuctions and Data Type Summary',
                                            bodyStyle: 'border-style:solid;border-color:#999999;border-bottom-width:4px;',
                                            width: 410,
                                            anchor: '100%',
                                            autoScroll: true,
                                            border: true,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                padding: '7 0',
                                                width: 404
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridFunction">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridFunction',
                                                    height: 260,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Type', dataIndex: 'A1179INDIC', width: 160
                                                            },
                                                            {
                                                                text: 'Description', dataIndex: 'A1179FUNC', width: 230,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        { xtype: 'tbspacer', height: 2 },
                                        {
                                            xtype: 'panel',
                                            title: 'Application code Summary',
                                            bodyStyle: 'border-style:solid;border-color:#999999;border-bottom-width:4px;',
                                            width: 410,
                                            anchor: '100%',
                                            autoScroll: true,
                                            border: true,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                padding: '7 0',
                                                width: 392
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridReferentes">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridReferentes',
                                                    height: 260,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: '&nbsp', dataIndex: 'A1179FUNC', width: 390,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="boxInfoABC">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxInfoABC',
                                    layout: 'vbox',
                                    border: false,
                                    padding: '4 4 4 7',
                                    defaults: {
                                        xtype: 'button',
                                        style: 'font-weight:bold;',
                                        padding: '4 4 4 4',
                                        margin: '2 0 2 0',
                                        width: 120,
                                        scale: 'large',
                                        border: true,
                                        iconAlign: 'bottom'
                                    },
                                    items: [
                                        {
                                            id:prototype.id+'-btn2',
                                            html: '<strong style="font-size:13px;">Save</strong>',
                                            icon: 'resources/img/botones/24x24/1337982029_3floppy_unmount.png',
                                            listeners:{
                                                click: 'btnInsert_clickHandler'
                                            }
                                        },
                                        {
                                            id:prototype.id+'-btn5',
                                            html: '<strong style="font-size:13px;">New Version</strong>',
                                            icon: 'resources/img/botones/24x24/247-24.png',
                                            listeners:{
                                                click: 'setResetNewVersion'
                                            }
                                        },
                                        {
                                            id:prototype.id+'-btn3',
                                            html: '<strong style="font-size:13px;">Delete</strong>',
                                            icon: 'resources/img/botones/24x24/1337982061_001_05.gif',
                                            listeners:{
                                                click: 'btnDelete_clickHandler'
                                            }
                                        },
                                        {
                                            id:prototype.id+'-btn7',
                                            html: '<strong style="font-size:13px;">Exit</strong>',
                                            icon: 'resources/img/botones/24x24/1337982061_001_05.gif',
                                            listeners:{
                                                click: 'btnCancel_clickHandler'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Program Logic">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">Program Logic</label>',
                            id: prototype.id + '-boxGlobalLogic4',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background: #D9E3E2;',
                            border: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxGlobalLog4',
                                    layout: 'hbox',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'Global Condition',
                                            layout: 'hbox',
                                            bodyStyle: 'background: #FFFFFF;',
                                            border: true,
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridGlobalLogic4">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridGlobalLogic4',
                                                    border: true,
                                                    width: 617,
                                                    height: 170,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'FUNCTION', dataIndex: 'FUNC', width: 75
                                                            },
                                                            {
                                                                text: 'PARAMETER', dataIndex: 'PRMA1', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'OPERATOR', dataIndex: 'PRMA2', width: 90
                                                            },
                                                            {
                                                                text: 'VALUE', dataIndex: 'AAFIR', width: 360,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                },
                                { xtype: 'tbspacer', height: 3 },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxGlobalLog5',
                                    layout: 'hbox',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'Specific Condition',
                                            layout: 'hbox',
                                            bodyStyle: 'background: #FFFFFF;',
                                            border: true,
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridGlobalLogic5">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridGlobalLogic5',
                                                    border: true,
                                                    width: 762,
                                                    height: 400,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'COMMISSION %', dataIndex: 'STEP', width: 120
                                                            },
                                                            {
                                                                text: 'FUNCTION', dataIndex: 'FUNC', width: 110
                                                            },
                                                            {
                                                                text: 'PARAMETER', dataIndex: 'PRMA1', width: 250,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'VALUE', dataIndex: 'AAFIR', width: 180,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'APPLICATION', dataIndex: 'REFER', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Program Logic">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">Program Logic</label>',
                            id: prototype.id + '-boxGlobalLogic',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxOptionSPA',
                                    bodyStyle: 'background:#A2B7BD;',
                                    layout: 'hbox',
                                    border: false,
                                    width: 1172,
                                    padding: '4 4 0 7',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Type:',
                                            style: 'font-weight:bold;color:#FFFFFF;',
                                            width: 75,
                                            padding: '2 4 4 7'
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            id:prototype.id+'-paymentType',
                                            items: [
                                                { boxLabel: '<label style="font-weight:bold;color:#FFFFFF;">Global</label>', inputValue: '1', name: 'paymentType', checked: true, width: 116 },
                                                { boxLabel: '<label style="font-weight:bold;color:#FFFFFF;">Sector</label>', inputValue: '2', name: 'paymentType', width: 150 }
                                            ],
                                            listeners: {change: 'handlePayment' }
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="canvas_console">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-canvas_console',
                                    bodyStyle: 'background:#CED7D6;',
                                    layout: 'hbox',
                                    border: false,
                                    width: 1172,
                                    padding: '0 4 0 7',
                                    defaults: {
                                        xtype: 'panel',
                                        bodyStyle: 'background:#CED7D6;',
                                        layout: 'vbox',
                                        border: false
                                    },
                                    items: [
                                        {
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background:#CED7D6;',
                                                    layout: 'hbox',
                                                    border: true,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Parameter A1:',
                                                            style: 'text-align:left;',
                                                            padding: '12 7 7 7',
                                                            width: 96
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            id: prototype.id+'-CMPLBL',
                                                            text: '',
                                                            style: 'font-weight:bold;text-align:left;color:#50BE42;',
                                                            padding: '12 7 7 7',
                                                            width: 156
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-CMPA',
                                                    queryMode: 'local',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 250,
                                                    typeAhead: true,
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    padding: '0 7 4 7',
                                                    listeners: {
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        },
                                                        keypress: 'onCMPAKeypress',
                                                        change: 'onCMPAChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Parameter B1:',
                                                    style: 'text-align:left;',
                                                    padding: '7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-CMPE',
                                                    queryMode: 'local',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 250,
                                                    typeAhead: true,
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    padding: '0 7 20 7',
                                                    listeners: {
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Parameter A2:',
                                                    style: 'text-align:left;',
                                                    padding: '12 7 7 7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-CMPB',
                                                    queryMode: 'local',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 230,
                                                    typeAhead: true,
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    padding: '0 7 4 7',
                                                    listeners: {
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        },
                                                        keypress: 'onCMPBKeypress',
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Parameter B2:',
                                                    style: 'text-align:left;',
                                                    padding: '7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-CMPF',
                                                    queryMode: 'local',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 230,
                                                    typeAhead: true,
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    padding: '0 7 20 7',
                                                    listeners: {
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Yes A:',
                                                    style: 'text-align:left;',
                                                    padding: '12 7 7 7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-CMPC',
                                                    queryMode: 'local',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 220,
                                                    typeAhead: true,
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    padding: '0 7 4 7',
                                                    listeners: {
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        },
                                                        keypress: 'onCMPCKeypress',
                                                        change: 'onCMPCChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Yes B:',
                                                    style: 'text-align:left;',
                                                    padding: '7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-CMPG',
                                                    fieldStyle: 'text-align:left',
                                                    enableKeyEvents: true,
                                                    width: 220,
                                                    padding: '0 7 20 7',
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'No A:',
                                                    style: 'text-align:left;',
                                                    padding: '12 7 7 7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-CMPD',
                                                    fieldStyle: 'text-align:left',
                                                    enableKeyEvents: true,
                                                    width: 120,
                                                    padding: '0 7 4 7',
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'No B:',
                                                    style: 'text-align:left;',
                                                    padding: '7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-CMPH',
                                                    fieldStyle: 'text-align:left',
                                                    enableKeyEvents: true,
                                                    width: 120,
                                                    padding: '0 7 20 7',
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background:#CED7D6;',
                                                    layout: 'hbox',
                                                    border: true,
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Inserted Before(Row):',
                                                            style: 'text-align:left;',
                                                            padding: '33 0 7 7',
                                                            width: 150
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: prototype.id+'-CHKA',
                                                            boxLabel: '',
                                                            checked: false,
                                                            padding: '29 7 7 0',
                                                            width: 10
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Action:',
                                                    style: 'text-align:left;',
                                                    padding: '7',
                                                    width: 96
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-CMPI',
                                                    fieldStyle: 'text-align:left',
                                                    enableKeyEvents: true,
                                                    width: 120,
                                                    padding: '0 7 20 7',
                                                    listeners:{
                                                        change: 'onUpperValue'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            defaults: {
                                                xtype: 'button',
                                                style: 'font-weight:bold;',
                                                border: true,
                                                scale: 'small',
                                                width: 100
                                            },
                                            items: [
                                                {
                                                    id:prototype.id+'-BTNA',
                                                    html: '<strong style="font-size:13px;">New</strong>',
                                                    margin: '12 4 5 7',
                                                    listeners:{
                                                    }
                                                },
                                                {
                                                    id:prototype.id+'-BTNB',
                                                    html: '<strong style="font-size:13px;">Save</strong>',
                                                    margin: '0 4 5 7',
                                                    listeners:{
                                                    }
                                                },
                                                {
                                                    id:prototype.id+'-BTNC',
                                                    html: '<strong style="font-size:13px;">Copy</strong>',
                                                    margin: '0 4 5 7',
                                                    listeners:{
                                                    }
                                                },
                                                {
                                                    id:prototype.id+'-BTND',
                                                    html: '<strong style="font-size:13px;">Delete</strong>',
                                                    margin: '0 4 20 7',
                                                    listeners:{
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxGlobalLog2',
                                    layout: 'hbox',
                                    border: false,
                                    width: 1172,
                                    padding: '0 4 4 7',
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridGlobalLogic">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridGlobalLogic',
                                            border: true,
                                            height: 450,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'STEP', dataIndex: 'STEP', width: 50
                                                    },
                                                    {
                                                        text: 'Parameter A1', dataIndex: 'PRMA1', width: 240,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;";
                                                            return '('+data.FUNC+')'+data.PRMA1;
                                                        }
                                                    },
                                                    {
                                                        text: 'Parameter A2', dataIndex: 'PRMA2', width: 160,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'YES A', dataIndex: 'AAFIR', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'NO A', dataIndex: 'ANEGA', width: 80
                                                    },
                                                    {
                                                        text: 'Parameter B1', dataIndex: 'PRMB1', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Parameter B2', dataIndex: 'PRMB2', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'YES B', dataIndex: 'BAFIR', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'NO B', dataIndex: 'BNEGA', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Action', dataIndex: 'REFER', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                    {
//                                                        xtype: 'checkboxfield',
                                                        text: 'SEL', dataIndex: 'SELEC', width: 40, sortable: false, id: prototype.id+'-COLUMN_GRID_PRO_SEL',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            //selected="{data.SELEC}
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        id: prototype.id+'-COLUMN_GRID_PRO_EDT',
                                                        text: 'Edit',
                                                        sortable: false,
                                                        width: 40,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'onEditClick'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Auxiliary Table">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">Auxiliary Table</label>',
                            id: prototype.id + '-boxAuxiliaryTable',
                            layout: 'vbox',
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Head">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxAuxiliary1',
                                    layout: 'hbox',
                                    border: false,
                                    padding: '4 4 4 7',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Search By:',
                                            width: 75,
                                            margin: '4 0 4 0'
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            id:prototype.id+'-TABLEAXU',
                                            items: [
                                                { boxLabel: 'All the Tables', id: prototype.id+'-search1', inputValue: '1', name: 'TABLEAXU', checked: true, width: 116 },
                                                { boxLabel: 'Selection Nº Table', id: prototype.id+'-search2', inputValue: '2', name: 'TABLEAXU', width: 150 }
                                            ],
                                            listeners: {change: 'getEvetSQP01090' }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbsearch2',
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 187,
                                            typeAhead: true,
                                            disabled: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                                focus: function(combo) {
                                                    combo.expand();
                                                }
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-btnsearchRefresh',
                                            style: 'font-weight:bold;',
                                            html: '<strong style="font-size:13px;">Refresh</strong>',
                                            border: true,
                                            scale: 'small',
                                            margin: '2 0 2 0',
                                            width: 80,
                                            listeners:{
                                                click: 'getResetData'
                                            }
                                        },
                                        { xtype: 'tbspacer', width: 10 },
                                        {
                                            xtype: 'filefield',
                                            id: prototype.id + '-txtRutaExcel',
                                            fileStyle: 'background:red;',
                                            fieldLabel: 'Upload File Format:',
                                            labelWidth: 130,
                                            allowBlank: true,
                                            accept: '.xlsx, .xls',
                                            margin: '4 3 4 3',
                                            width: 435,
                                            regex: /(.)+((\.xlsx)|(\.xls)(\w)?)$/i,
                                            regexText: 'Only XLS and XLSX formats are accepted',
                                            buttonConfig: {
                                                style: 'font-weight:bold;background:#024F79;',
                                                text : '<strong style="background:#024F79;color:white;">Upload</strong>',
                                                width: 80,
                                                margin: '0 0 0 8'
                                            },
                                            listeners:{
                                                change: 'btnUpload_clickHandler',
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            style: 'font-weight:bold;background:#024F79;',
                                            id:prototype.id+'-btnSaveFilter',
                                            html: '<strong style="background:#024F79;color:white;">Save</strong>',
                                            border: true,
                                            margin: '4 0 4 4',
                                            width: 80,
                                            listeners:{
                                                click: 'btnSave_clickHandler',
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxAuxiliary2',
                                    layout: 'hbox',
                                    border: false,
                                    padding: '4 4 4 7',
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridAuxiliaryTable">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridAuxiliaryTable',
                                            width: 1162,
                                            height: 430,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Nº TABLE', dataIndex: 'A1172FAMIL', width: 110
                                                    },
                                                    {
                                                        text: 'DATA TYPE', dataIndex: 'A1172TDATA', width: 110
                                                    },
                                                    {
                                                        text: 'DATA', dataIndex: 'A1172DATA', width: 110
                                                    },
                                                    {
                                                        text: 'INDICATOR', dataIndex: 'DESCRIPT', width: 150
                                                    },
                                                    {
                                                        text: 'VALUE', dataIndex: 'A1172VALOR', width: 110
                                                    },
                                                    {
                                                        text: 'CURRENCY', dataIndex: 'A1172MONED', width: 110
                                                    },
                                                    {
                                                        text: 'PERCENTAGE', dataIndex: 'A1172PORCE', width: 110
                                                    },
                                                    {
                                                        text: 'METHOD', dataIndex: 'A1172METOD', width: 110
                                                    },
                                                    {
                                                        text: 'EQUIVALENT', dataIndex: 'A1172EQUIV', width: 110
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        id: prototype.id+'-COLUMN_GRID_AX_DEL',
                                                        text: 'DELT',
                                                        sortable: false,
                                                        width: 65,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/delete.png',
                                                                tooltip: '',
                                                                handler: 'setDeleteDataRowTable'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        id: prototype.id+'-COLUMN_GRID_AX_EDT',
                                                        text: 'Edit',
                                                        sortable: false,
                                                        width: 65,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-edit',
                                                                tooltip: 'Edit',
                                                                handler: 'setChangeDataRowTable'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxAuxiliary3',
                                    layout: 'hbox',
                                    border: false,
                                    padding: '15 4 7 20',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxAuxiliary300',
                                            layout: 'vbox',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxAuxiliary30',
                                                    layout: 'hbox',
                                                    border: false,
        //                                            padding: '4 4 4 7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Nº Table:',
                                                            width: 88,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbTable',
                                                            queryMode: 'local',
                                                            autoSelect: true,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            editable: true,
                                                            valueField: 'code', displayField: 'name',
                                                            width: 240,
                                                            typeAhead: true,
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            listeners: {
                                                                focus: function(combo) {
                                                                    combo.expand();
                                                                },
                                                                keypress: 'onCmbTableKeypress'
                                                            }
                                                        },
                                                        { xtype: 'tbspacer', width: 12 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Data Type:',
                                                            width: 80,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbDataType',
                                                            queryMode: 'local',//dataProvider="{lstTDATA}"
                                                            autoSelect: true,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            editable: true,
                                                            valueField: 'code', displayField: 'name',
                                                            width: 240,
                                                            typeAhead: true,
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            listeners: {
                                                                focus: function(combo) {
                                                                    combo.expand();
                                                                },
                                                                keypress: function(obj , e , eOpts) {//setValidateInputTB
                                                                    if ( e.getKey() === e.ENTER ||  e.getKey() === e.TAB){
                                                                        //setValidateInputTB
                                                                    }
                                                                },
                                                            }
                                                        },
                                                        { xtype: 'tbspacer', width: 12 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Data:',
                                                            width: 78,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id:prototype.id+'-textData',
                                                            fieldStyle: 'text-align:left',
                                                            enableKeyEvents: true,
                                                            width: 230
                                                        }
                                                    ]
                                                },
                                                { xtype: 'tbspacer', height: 15 },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxAuxiliary31',
                                                    layout: 'hbox',
                                                    border: false,
        //                                            padding: '4 4 4 7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Indicador:',
                                                            width: 88,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbIndicador',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["09", "EQU"], ["06", "HIG-VAL-PER-MET-CUR"], ["07", "LOW-VAL-PER-MET-CUR"], ["05", "MET"], ["08", "PER-MET"],
                                                                    ["01", "VAL"], ["02", "VAL-CUR"], ["03", "VAL-PER"], ["04", "VAL-PER-MET"], ["10", "VALORPLM"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            autoSelect: true,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            editable: true,
                                                            valueField: 'code', displayField: 'name',
                                                            width: 240,
                                                            typeAhead: true,
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            listeners: {
                                                                focus: function(combo) {
                                                                    combo.expand();
                                                                },
                                                                change: 'setChangeEnabled'
                                                            }
                                                        },
                                                        { xtype: 'tbspacer', width: 12 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Value:',
                                                            width: 80,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id:prototype.id+'-textValue',
                                                            fieldStyle: 'text-align:left',
                                                            disabled: true,
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 8,
                                                            maskRe: /[0-9.]/,
                                                            width: 240
                                                        },
                                                        { xtype: 'tbspacer', width: 12 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Currency:',
                                                            width: 78,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbCurrency',
                                                            queryMode: 'local',//dataProvider="{lstMONEDA}"
                                                            autoSelect: true,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            editable: true,
                                                            disabled: true,
                                                            valueField: 'code', displayField: 'name',
                                                            width: 230,
                                                            typeAhead: true,
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            listeners: {
                                                                focus: function(combo) {
                                                                    combo.expand();
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                { xtype: 'tbspacer', height: 15 },
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id+'-boxAuxiliary32',
                                                    layout: 'hbox',
                                                    border: false,
        //                                            padding: '4 4 4 7',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Percentage:',
                                                            width: 88,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id:prototype.id+'-textPencentage',
                                                            fieldStyle: 'text-align:left',
                                                            disabled: true,
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            maskRe: /[0-9.]/,
                                                            width: 206
                                                        },
                                                        { xtype: 'tbspacer', width: 8 },
                                                        {
                                                            xtype: 'label',
                                                            text: '%',
                                                            width: 26,
                                                            margin: '4 0 4 0'
                                                        },
                                                        { xtype: 'tbspacer', width: 12 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Method:',
                                                            width: 80,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id + '-cmbMethod',
                                                            queryMode: 'local',
                                                            autoSelect: true,
                                                            forceSelection: true,
                                                            selectOnFocus: true,
                                                            caseSensitive: false,
                                                            editable: true,
                                                            disabled: true,
                                                            valueField: 'code', displayField: 'name',
                                                            width: 240,
                                                            typeAhead: true,
                                                            listConfig: {maxHeight: 111},
                                                            enableKeyEvents: true,
                                                            triggerAction: 'all',
                                                            listeners: {
                                                                focus: function(combo) {
                                                                    combo.expand();
                                                                }
                                                            }
                                                        },
                                                        { xtype: 'tbspacer', width: 12 },
                                                        {
                                                            xtype: 'label',
                                                            text: 'Equivalent:',
                                                            width: 78,
                                                            margin: '4 0 4 0'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id:prototype.id+'-textEquivalent',
                                                            fieldStyle: 'text-align:left',
                                                            enableKeyEvents: true,
                                                            disabled: true,
                                                            width: 230
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        { xtype: 'tbspacer', width: 40 },
                                        // <editor-fold defaultstate="collapsed" desc="Botones">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxAuxiliary301',
                                            layout: 'vbox',
                                            border: false,
                                            defaults: {
                                                xtype: 'button',
                                                style: 'font-weight:bold;',
                                                border: true,
                                                scale: 'small',
                                                margin: '0 0 6 0',
                                                width: 110
                                            },
                                            items: [
                                                {
                                                    id:prototype.id+'-btnAuxiliary2',
                                                    html: '<strong style="font-size:13px;">New</strong>',
                                                    listeners:{
                                                        click: 'setNewTBAX'
                                                    }
                                                },
                                                {
                                                    id:prototype.id+'-btnAuxiliary4',
                                                    html: '<strong style="font-size:13px;">Add</strong>',
                                                    listeners:{
                                                        click: 'btnInsertSQP01090'
                                                    }
                                                },
                                                {
                                                    id:prototype.id+'-btnAuxiliary1',
                                                    html: '<strong style="font-size:13px;">Export</strong>',
                                                    listeners:{
                                                        click: ''
                                                    }
                                                },
                                                {
                                                    id:prototype.id+'-btnAuxiliary3',
                                                    html: '<strong style="font-size:13px;">Delete All</strong>',
                                                    listeners:{
                                                        click: 'setDeleteDataRowTableAll'
                                                    }
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                },
                            ]
                        },
                        // </editor-fold>
                        
                        // <editor-fold defaultstate="collapsed" desc="Process Control">
                        {
                            xtype: 'panel',
                            title: '<label style="color:#0B333C;">Process Control</label>',
                            id: prototype.id + '-boxTestingProcess',
                            layout: 'hbox',
                            autoscroll: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: 'Parameters',
                                    layout: 'vbox',
                                    border: true,
                                    padding: '4',
                                    bodyStyle: 'border-style:solid;border-color:#999999;border-bottom-width:4px;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lbl_test',
                                            text: 'Environment:',
                                            style: 'font-weight:bold;color:#323232;text-align:left;',
                                            padding: '7',
                                            width: 230
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbEnvironment',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["T", "SIMULATOR"], ["P", "PRODUCTION"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 230,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("T");
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Process:',
                                            style: 'font-weight:bold;color:#323232;text-align:left;',
                                            padding: '0 7 4 7',
                                            width: 230
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbtTypeProcessCalc',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["L", "LABELED"], ["S", "SUMARY"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 230,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("L");
                                                },
                                                change: 'ChangeTypeCalc'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbForma',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["M", "MASIVE"], ["G", "GROUP"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 230,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("M");
                                                },
                                                change: 'ChangeTypeForma'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtCodigoForma',
                                            fieldStyle: 'text-align:left',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            maskRe: /[0-9]/,
                                            width: 140,
                                            padding: '0 7 4 7',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lbl_from',
                                            text: 'Year:',
                                            style: 'font-weight:bold;color:#323232;text-align:left;',
                                            padding: '0 7 4 7',
                                            width: 230
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYear',
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 77,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Type Period:',
                                            style: 'font-weight:bold;color:#323232;text-align:left;',
                                            padding: '0 7 4 7',
                                            width: 230
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbtypeperiod',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["M", "MONTHLY"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 230,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                                afterrender: function (combo, eOpts) {
                                                    combo.setValue("M");
                                                },
                                                change: 'getChangePeriod'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbPeriod',
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 230,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                                change: 'getCheckList'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lbl_country',
                                            text: 'Country:',
                                            style: 'font-weight:bold;color:#323232;text-align:left;',
                                            padding: '0 7 4 7',
                                            width: 230
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbPais',
                                            queryMode: 'local',
                                            autoSelect: true,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 230,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            padding: '0 7 4 7',
                                            listeners: {
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lbl_SOURCE',
                                            text: 'Source:',
                                            style: 'font-weight:bold;color:#323232;text-align:left;',
                                            padding: '0 7 4 7',
                                            width: 230
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            id:prototype.id+'-panel_SOURCE',
                                            padding: '0 7 4 7',
                                            items: [
                                                { boxLabel: '<label style="color:#057ECB;font-weight:bold;">ARC</label>', id: prototype.id+'-rbSA2', inputValue: 'rbSA2', name: 'rbSA', width: 80 },
                                                { boxLabel: '<label style="color:#057ECB;font-weight:bold;">BSP</label>', id: prototype.id+'-rbSA3', inputValue: 'rbSA3', name: 'rbSA', width: 80, checked: true },
                                                { boxLabel: '<label style="color:#057ECB;font-weight:bold;">ASR</label>', id: prototype.id+'-rbSA4', inputValue: 'rbSA4', name: 'rbSA', width: 80 }
                                            ],
                                            listeners: {change: 'setChangeRoute' }
                                        },
                                        // <editor-fold defaultstate="collapsed" desc="buttons">
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-PROCCESS_PANEL',
                                            html: '<strong style="font-size:13px;">PROCESS</strong>',
                                            style: 'font-weight:bold;',
                                            icon: 'resources/img/botones/24x24/Manipulator_robot_politician.png',
                                            padding: '4 7 1 7',
                                            margin: '2 0 5 7',
                                            scale: 'large',
                                            border: true,
                                            iconAlign: 'bottom',
                                            width: 230,
                                            listeners:{
                                                click: 'setProccessLC'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-CHECK_LIST',
                                            html: '<strong style="font-size:13px;">REFRESH CHECK LIST</strong>',
                                            style: 'font-weight:bold;',
                                            icon: 'resources/img/botones/24x24/1337982080_system-software-update.png',
                                            padding: '4 7 1 7',
                                            margin: '2 0 5 7',
                                            scale: 'large',
                                            border: true,
                                            iconAlign: 'bottom',
                                            width: 230,
                                            listeners:{
                                                click: 'getCheckList'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-CHECK_LIST_STATUS',
                                            html: '<strong style="font-size:13px;">REFRESH CHECK STATUS</strong>',
                                            style: 'font-weight:bold;',
                                            icon: 'resources/img/botones/24x24/1337982080_system-software-update.png',
                                            padding: '4 7 1 7',
                                            margin: '2 0 10 7',
                                            scale: 'large',
                                            border: true,
                                            iconAlign: 'bottom',
                                            hidden: true,
                                            width: 230,
                                            listeners:{
                                                click: 'getStatusList'
                                            }
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'View requirements',
                                            padding: '4',
                                            bodyStyle: 'border-style:solid;border-color:#999999;border-bottom-width:4px;',
                                            width: 900,
                                            anchor: '100%',
                                            autoScroll: true,
                                            border: true,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                padding: '7 0 7 0',
                                                width: 883
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridRequires">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridRequires',
                                                    height: 260,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'Description', dataIndex: 'A3012NAME', width: 250,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Date', dataIndex: 'A3012DESCR', width: 130,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Hour', dataIndex: 'A3012DESCI', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'User', dataIndex: 'A3012ELIGI', width: 140,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'A3012SOURC', width: 160,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;";
                                                                    if(value==="Y")value ="assets/icons/16x16/green.png";
                                                                    if(value==="W")value ="assets/icons/16x16/warning.png";
                                                                    if(value==="N")value ="assets/icons/16x16/red.png";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Mandatory', dataIndex: 'A3012SOURCN', width: 100, sortable: false,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    if(value==="Y")value ="YES";
                                                                    if(value==="N")value ="NO";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        },
                                        { xtype: 'tbspacer', height: 12 },
                                        {
                                            xtype: 'panel',
                                            title: 'Process Status',
                                            padding: '4',
                                            bodyStyle: 'border-style:solid;border-color:#999999;border-bottom-width:4px;',
                                            width: 900,
                                            anchor: '100%',
                                            autoScroll: true,
                                            border: true,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                padding: '7 0 7 0',
                                                width: 883
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="gridMSN">
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridMSN',
                                                    height: 260,
                                                    columnLines: true,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {
                                                                text: 'User', dataIndex: 'A3061USER', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Start',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'A3061IFECH', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Hour', dataIndex: 'A3061IHOUR', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Finalized',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Date', dataIndex: 'A3061FFECH', width: 100,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Hour', dataIndex: 'A3061FHOUR', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Time', dataIndex: 'A3061TIME', width: 70,
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:left;";
                                                                            return value;
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Message', dataIndex: 'A3061MSN', width: 250,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Status', dataIndex: 'A3061STAT', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#d5f4d5;";
                                                                    if(value==="Y")value ="assets/icons/16x16/green.png";
                                                                    if(value==="W")value ="assets/icons/16x16/warning.png";
                                                                    if(value==="N")value ="assets/icons/16x16/red.png";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                                // </editor-fold>
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ],
    dockedItems:[
    ]
});