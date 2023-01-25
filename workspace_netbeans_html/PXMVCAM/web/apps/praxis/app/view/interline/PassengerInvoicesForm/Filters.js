Ext.define('Ext.Praxis.view.interline.PassengerInvoicesForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1550
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters1',
                    border: false,
                    //style: 'border-bottom: 2px #ffffff solid;',
                    layout: 'hbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '8px 3px 8px 3px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Billing Date',
                            style: 'font-weight:bold;',
                            padding: '10 0 5 5',
                            width: 97
                        },
                        //<editor-fold defaultstate="collapsed" desc="cmbDate">
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 110,
                            labelWidth: 40,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            listeners: {
                                select: 'selectComboFromYear'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true,
                            listeners: {
                                select: 'selectComboFromMonth'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'To',
                            width: 100,
                            labelWidth: 30,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listConfig: {maxHeight: 111},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true,
                            listeners: {
                                select: 'selectComboToMonth'
                            }
                        },
                        //</editor-fold>
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPERNUM',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["01", "01"], ["02", "02"],
                                    ["03", "03"], ["04", "04"]
                                ]
                            }),
                            selectOnFocus: true,
                            forceSelection: true,
                            typeAhead: true,
                            autoSelect: true,
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            value: "",
                            fieldLabel: 'Period',
                            width: 130,
                            labelWidth: 60,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbAirline',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'Airline',
                            width: 247,
                            labelWidth: 60,
                            selectOnFocus: true,
                            forceSelection: true,
                            typeAhead: true,
                            autoSelect: true,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'A005KEY', displayField: 'A005KEY2',
                            listConfig: {maxHeight: 111, minWidth: 242}
                        },
                        {xtype: 'tbspacer', width: 23},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbPMI',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [null, "&nbsp;"], ["", "All"],
                                    ["N", "N"], ["O", "O"]
                                ]
                            }),
                            hidden: true,
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'PMI',
                            width: 100,
                            value: null,
                            labelWidth: 40,
                            selectOnFocus: true,
                            forceSelection: true,
                            typeAhead: true,
                            autoSelect: true,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code', displayField: 'name',
                            listeners: {
                                select: function (comp, record, index) {
                                    if (comp.rawValue === "&nbsp;") {
                                        comp.setValue(null);
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 25},
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-btn',
                            margin: '8 0',
                            width: 100,
                            boxLabel: '<b>Source Code</b>',
                            inputValue: '1',
                            listeners: {
                                change: 'btn_SourceCode'
                            }
                        },
                        {
                            xtype: 'combo',
                            hidden:true,
                            id: prototype.id + '-cmbSource',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: '',
                            width: 200,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODSOUR', displayField: 'DESSOU',
                            selectOnFocus: true,
                            forceSelection: true,
                            typeAhead: true,
                            autoSelect: true,
                            listConfig: {maxHeight: 111, minWidth: 295}
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFindBy',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["TICKET", "Ticket"], ["REJ", "Reject"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "",
                            fieldLabel: 'Search by ',
                            labelWidth: 111,
                            labelAlign: 'right',
                            width: 184,
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                change: 'cmbFind_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 33},
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblTkt',
                            text: '',
                            width: 1,
                            hidden: true,
                            padding: '10 0 0 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
//                            maxLength: 13,
                            maskRe: /[0-9]/,
                            width: 150,
                            hidden: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblRej',
                            text: '',
                            width: 110,
                            hidden: true,
                            padding: '10 0 0 0'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRej',
                            fieldStyle: 'text-align:center;',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            hidden: true,
                            width: 140,
                            listeners: {
                                keypress: 'searchRejection'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



