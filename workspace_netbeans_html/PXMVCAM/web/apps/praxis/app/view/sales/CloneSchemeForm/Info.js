Ext.define('Ext.Praxis.view.sales.CloneSchemeForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridAgremment">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridAgremment',
                            width: prototype.widthGrid,
                            height: 320,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'CONTRACT NBR.', dataIndex: 'A1155CODAC', width: 150,
                                        listeners: {
                                            click: 'setFillData'
                                        }
                                    },
                                    {
                                        text: 'VERSION', dataIndex: 'A1155VRSAC', width: 110,
                                        listeners: {
                                            click: 'setFillData'
                                        }
                                    },
                                    {
                                        text: 'TYPE', dataIndex: 'A1155INDAC', width: 70,
                                        listeners: {
                                            click: 'setFillData'
                                        }
                                    },
                                    {
                                        text: 'EFFEC. DATE', dataIndex: 'A1155FINI', width: 110, sortable: false,
                                        listeners: {
                                            click: 'setFillData'
                                        }
                                    },
                                    {
                                        text: 'TERM. DATE', dataIndex: 'A1155FFIN', width: 110, sortable: false,
                                        listeners: {
                                            click: 'setFillData'
                                        }
                                    },
                                    {
                                        text: 'DATE TYPE', dataIndex: 'A1155FLGFE', width: 150, sortable: false,
                                        listeners: {
                                            click: 'setFillData'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="E") value ="[E]DATE OF SALE";
                                            if(value==="I") value ="[I]DATE OF INITIAL TRAVEL";
                                            if(value==="F") value ="[F]DATE OF INVOICING";
                                            if(value==="U") value ="[U]DATE OF USE";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'AUTOMATED', dataIndex: 'A1155FLGAU', width: 100,
                                        listeners: {
                                            click: 'setFillData'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="S") value ="YES";
                                            if(value==="Y") value ="YES";
                                            if(value==="N") value ="NO";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'STATUS', dataIndex: 'A1155FESTA', width: 140,
                                        listeners: {
                                            click: 'setFillData'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="R")value ="[R] REGISTERED.";
                                            if(value==="D")value ="[D] DEVELOPMENT.";
                                            if(value==="P")value ="[P] TEST.";
                                            if(value==="U")value ="[U] UPGRADE.";
                                            if(value==="C")value ="[C] CERTIFICATE.";
                                            if(value==="A")value ="[A] CANCELLED.";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                },
                // </editor-fold>
                {xtype: 'tbspacer', height: 25},
                {
                    region: 'center',
                    border: false,
                    width: prototype.widthGrid,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: #FFFFFF;border-style:solid;border-color:#999999;border-top-width:0px;border-right-width:0px;border-bottom-width:4px;border-left-width:0px;',
                                border: true,
                                height: 160
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Selected:">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-textPanelSELECT',
                                    title: 'Selected:',
                                    width: 300,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '10 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agreement:',
                                                    style: 'color:#000;text-align:right;',
                                                    padding: '4 7 5 0',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-TXT_SELECT_CODE',
                                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#999999;border-top-width:1px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;',
                                                    disabled: true,
                                                    width: 160
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Version:',
                                                    style: 'color:#000;text-align:right;',
                                                    padding: '4 7 5 0',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-TXT_SELECT_VERSION',
                                                    fieldStyle: 'text-align:left;font-weight:bold;border-style:solid;border-color:#999999;border-top-width:1px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;',
                                                    disabled: true,
                                                    width: 160
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Type:',
                                                    style: 'color:#000;text-align:right;',
                                                    padding: '4 7 5 0',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-TXT_SELECT_TYPE',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["U", "Upfront"], ["B", "Backend"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#999999;border-top-width:1px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 160,
                                                    disabled: true,
                                                    typeAhead: true,
                                                    emptyText: 'Upfront',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        afterrender: function (combo, eOpts) {
                                                            combo.setValue("U");
                                                        },
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 19},
                                // <editor-fold defaultstate="collapsed" desc="UPFRONT/BACKEND to Duplicate:">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-textPanelCOPY',
                                    title: 'UPFRONT/BACKEND to Duplicate:',
                                    width: 300,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '10 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Agreement:',
                                                    style: 'color:#000;text-align:right;',
                                                    padding: '4 7 5 0',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-TXT_COPY_CODE',
                                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#999999;border-top-width:1px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    maskRe: /[0-9]/,
                                                    width: 160,
                                                    listeners: {
                                                        blur: 'PadCode'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Version:',
                                                    style: 'color:#000;text-align:right;',
                                                    padding: '4 7 5 0',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-TXT_COPY_VERSION',
                                                    fieldStyle: 'text-align:left;font-weight:bold;border-style:solid;border-color:#999999;border-top-width:1px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;',
                                                    enforceMaxLength: true,
                                                    maxLength: 6,
                                                    maskRe: /[0-9]/,
                                                    width: 160,
                                                    listeners: {
                                                        blur: 'PadVersion'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Type:',
                                                    style: 'color:#000;text-align:right;',
                                                    padding: '4 7 5 0',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-TXT_COPY_TYPE',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["U", "Upfront"], ["B", "Backend"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    fieldStyle: 'text-align:left;border-style:solid;border-color:#999999;border-top-width:1px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;',
                                                    autoSelect: true,
                                                    forceSelection: true,
                                                    selectOnFocus: true,
                                                    caseSensitive: false,
                                                    editable: true,
                                                    valueField: 'code', displayField: 'name',
                                                    width: 160,
                                                    disabled: true,
                                                    typeAhead: true,
                                                    emptyText: 'Upfront',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners: {
                                                        afterrender: function (combo, eOpts) {
                                                            combo.setValue("U");
                                                        },
                                                        focus: function(combo) {
                                                            combo.expand();
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 19},
                                // <editor-fold defaultstate="collapsed" desc="UPFRONT/BACKEND Structure:">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-textPanelSTRE',
                                    title: 'UPFRONT/BACKEND Structure:',
                                    width: 300,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left'
                                    },
                                    defaults: {
                                        border: false
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '10 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHK_INFO',
                                                    boxLabel: 'Information',
                                                    checked: true,
                                                    width: 104
						}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHK_GLOBAL',
                                                    boxLabel: 'Global Logic',
                                                    checked: true,
                                                    width: 104
						}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHK_SECTOR',
                                                    boxLabel: 'Sector Logic',
                                                    checked: true,
                                                    width: 104
						}
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            padding: '5 0 4 7',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id+'-CHK_AX_TABLE',
                                                    boxLabel: 'Auxiliary Table',
                                                    checked: true,
                                                    width: 104
						}
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                },
                {xtype: 'tbspacer', height: 25},
                // <editor-fold defaultstate="collapsed" desc="pie">
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    width: prototype.widthGrid,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthGrid,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});