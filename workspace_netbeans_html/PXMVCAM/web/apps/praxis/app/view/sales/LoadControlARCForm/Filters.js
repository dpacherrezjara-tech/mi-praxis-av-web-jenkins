Ext.define('Ext.Praxis.view.sales.LoadControlARCForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        padding: '6px 1px 6px 1px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Search By: ',
                                    style: 'font-weight:bold;',
                                    padding: '4 0 5 0'
                                },
                                {xtype: 'tbspacer', width: 17},
                                // <editor-fold defaultstate="collapsed" desc="cmbOpcion">
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cbxFiltro',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["1", "System date"], ["2", "Processing Date"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 120,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
//                                        blur: function(combo, event, eOpts) {
//                                            if (combo.getValue() === null) {
//                                                combo.setValue("");
//                                            }
//                                        },
//                                        keyup: function (combo, e) {
//                                            var key = String.fromCharCode(e.getKey());
//                                            var filter = /^[a-zA-Z]+$/;
//                                            var test_bool = filter.test(key);
//                                            if (test_bool) {
//                                                combo.doQuery(key);
//                                            }
//                                        },
                                        change: 'cmbFiltro_clickHandler'
                                    }
                                },
                                // </editor-fold>
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="HBox_filter01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_filter01',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'System Date:',
                                            id: prototype.id+'-Lbl_optFCARG',
                                            hidden: true,
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            id: prototype.id+'-lblMandatorySystem',
                                            hidden: true,
                                            text: '*',
                                            style: 'font-weight:bold;color:#FF0000;',
                                            width: 15,
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtA1698FCARG',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            selectOnFocus: true,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9/]/,
                                            hidden: true,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 85,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            },
                                            listeners: {
                                                keypress: 'txtFilterValue_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: '(*) Required parameter',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 200,
                                            padding: '4 0 5 0'
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="HBox_filter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id+'-HBox_filter02',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Processing Date:',
                                            id: prototype.id+'-Lbl_optPRDA',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            text: '*',
                                            style: 'font-weight:bold;color:#FF0000;',
                                            width: 15,
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtA1698FPRDA',
                                            fieldStyle: 'text-align:center',
                                            format: 'Y/m/d',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            selectOnFocus: true,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 85,
                                            listeners: {
                                                keypress: 'txtFilterValue_keyDownHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Hour:',
                                            id: prototype.id+'-Lbl_optHFILE',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1698HFILE',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            width: 35,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'txtFilterValue_keyDownHandler',
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Country:',
                                            id: prototype.id+'-Lbl_optCountry',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1698PAIS',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            width: 35,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'txtFilterValue_keyDownHandler',
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'City:',
                                            id: prototype.id+'-Lbl_optBank',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1698BANK',
                                            fieldStyle: 'text-align:center;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 35,
                                            listeners:{
                                                change: 'onUpperValue',
                                                keypress: 'txtFilterValue_keyDownHandler',
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: '(*) Required parameter',
                                            style: 'font-weight:bold;color:#9C1717;',
                                            width: 200,
                                            padding: '4 0 5 0'
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});