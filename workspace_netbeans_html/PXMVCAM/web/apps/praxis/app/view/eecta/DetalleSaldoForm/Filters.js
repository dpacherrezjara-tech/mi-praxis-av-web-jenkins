Ext.define('Ext.Praxis.view.eecta.DetalleSaldoForm.Filters', {
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-CDCLI',
                                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 210,
                                            height: 24,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-RSOCI',
                                            fieldLabel: 'Nombre Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 300,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha1',
                                            fieldLabel: 'Periodo desde', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 210,
                                            height: 24,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ',                                            
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha2',
                                            fieldLabel: 'Hasta', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                            width: 128,
                                            height: 24,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '2 0 0 10 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {

                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TICKET_NUMBER_CIA',
                                            fieldLabel: 'Boleto', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 90,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 130,
                                            value:'139',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TICKET_NUMBER',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            padding:'0 0 0 2',
                                            width: 110,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                         {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TICKET_NUMBER_SEQ',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 30,
                                            value:'00',
                                            height: 24,
                                            padding:'0 0 0 2',
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter02',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-NRRPT',
                                            fieldLabel: 'Nº Reporte', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 210,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-REFPG',
                                            fieldLabel: 'Nº Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 210,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-CTABC',
                                            fieldLabel: 'Cta. Bancaria', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 230,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-STSPG',
                                            fieldLabel: 'Estado Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "TODOS"],
                                                    ["Z", "PENDIENTE"],
                                                    ["T", "TOTAL"],
                                                    ["X", "PARCIAL"] 
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
                                            width: 250,
                                            height: 24,
                                            value: "",
//                                            listConfig: {
//                                                maxHeight: 111
//                                            },
                                            enableKeyEvents: true,
                                            padding: '0 0',
                                            listeners: {
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        }/*,
                                        {
                                            xtype: 'radiogroup',
                                            labelAlign: 'right',
                                            id:prototype.id+'-rbt-agrupar',
                                            fieldLabel: 'Nivel',                                            
                                            items: [
                                                { boxLabel: 'Reporte', width: 80, inputValue: '1', name: 'rbtagrupar', checked: true },
                                                { boxLabel: 'Boleto', inputValue: '0', name: 'rbtagrupar' }                                                
                                            ]
                                        }*/
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