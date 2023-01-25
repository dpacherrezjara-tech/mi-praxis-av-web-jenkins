Ext.define('Ext.Praxis.view.eecta.RegistroVentaOALForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '1 0 1 0 ',
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
                            layout: 'vbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                defaults: {
                                    anchor: '100%'
                                }
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter01">                                
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter01',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '1 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '1 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltro-fechas',
                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["01", "Fecha Venta"],
                                                    ["02", "Fecha Registro"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 190,
                                            //height: 26,
                                            value: "01",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                //focus: function(combo) {
                                                //    combo.expand();
                                                //},
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha01',
                                            fieldLabel: 'Desde', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            width: 155,
                                            //height: 24,
                                            format: 'Ymd',
                                            value: '20210101',
//                                            value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ', 
                                            padding: '6 0',
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-fecha02').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha02',
                                            fieldLabel: 'Hasta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                            width: 128,
                                            //height: 24,
                                            format: 'Ymd', value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '6 0 0 10 ',
                                            //padding: '6 0',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {

                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TICKET-NUMBER-CIA',
                                            fieldLabel: 'Cia', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 90,
                                            value:'',
                                            enforceMaxLength: true,
                                            maxLength: 3,padding: '6 0',
                                            //height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TICKET-NUMBER',
                                            fieldLabel: 'Boleto', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            //padding:'0 0 0 2',
                                            padding: '6 0 0 2',
                                            width: 170,
                                            enforceMaxLength: true,
                                            maxLength: 13,
                                            //height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltro-tipo',
                                            fieldLabel: 'Tipo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "ALL"],
                                                    ["OA", "OAL"],
                                                    ["HO", "HOSPEDAJE"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 170,
                                            //height: 26,
                                            value: "",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                //focus: function(combo) {
                                                //    combo.expand();
                                                //},
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-consultar',
                                            text: 'Consultar',
                                            margin: '5 0 0 10',
                                            icon: 'resources/img/icon/search.png',
                                            listeners: {
                                                click: 'btnSearch_click'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-upload',
                                            text: 'Upload from file',
                                            margin: '5 0 0 5',
                                            icon: 'resources/img/icon/file.png',
                                            listeners: {
                                                click: ''
                                            }
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