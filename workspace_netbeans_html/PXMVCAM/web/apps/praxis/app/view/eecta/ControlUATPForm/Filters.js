Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.Filters', {
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha1',
                                            fieldLabel: 'Periodo desde', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 210,
                                            height: 24,
                                            format: 'Ymd',
                                            value: '20210401',
//                                            value: new Date(),
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
                                            fieldLabel: 'Hasta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                            width: 128,
                                            height: 24,
                                            format: 'Ymd',value: new Date(),
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
                                            xtype: 'button',
                                            id: prototype.id + '-btn-consultar',
                                            text: 'Consultar',
                                            margin: '1 0 0 10',
                                            icon: 'resources/img/icon/search.png',
                                            listeners: {
                                                click: 'btnSearch_click'
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-subBoxFilter01',
                                            border: false,
                                            hidden: false,
                                            layout: 'hbox',
                                            bodyStyle: 'background: transparent;"',
                                            margin: '1 0 0 50',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '1 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'bottom',
                                                    ui: 'footer',
                                                    margin: '2 0 2 15',
                                                    layout: {
                                                        pack: 'center'
                                                    },
                                                    fieldStyle: 'text-align:center',
                                                    defaults: {
                                                        scale: 'medium'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-procesar',
                                                            text: 'Procesar',
                                                            icon: 'resources/img/botones/process.png',
                                                            listeners: {
                                                                click: 'btnProcesar_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-get-UUID',
                                                            text: 'UUID',
                                                            icon: 'resources/img/botones/1400098721_cv.png',
                                                            listeners: {
                                                                click: 'btnUUIDForm_click'
                                                            }
                                                        }                                                        
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-BoxFilter02',
//                                    border: false,
//                                    hidden: false,
//                                    layout: 'hbox',
//                                    bodyStyle: 'background: transparent;"',
//                                    margin: '1 0',
//                                    defaults: {
//                                        anchor: '100%',
//                                        padding: '1 0'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-NRRPT',
//                                            fieldLabel: 'Nº Reporte', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
//                                            enableKeyEvents: true,
//                                            width: 210,
//                                            height: 24,
//                                            listeners: {
//                                                keypress: 'onTxtFilterKeypress'
//                                            }
//                                        },
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-REFPG',
//                                            fieldLabel: 'Nº Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
//                                            enableKeyEvents: true,
//                                            width: 210,
//                                            height: 24,
//                                            listeners: {
//                                                keypress: 'onTxtFilterKeypress'
//                                            }
//                                        },
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id + '-CTABC',
//                                            fieldLabel: 'Cta. Bancaria', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
//                                            enableKeyEvents: true,
//                                            width: 230,
//                                            height: 24,
//                                            listeners: {
//                                                keypress: 'onTxtFilterKeypress'
//                                            }
//                                        },
//                                        {
//                                            xtype: 'combo',
//                                            id: prototype.id + '-STSPG',
//                                            fieldLabel: 'Estado Pago', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
//                                            store: new Ext.data.SimpleStore({
//                                                fields: ['code', 'name'],
//                                                data: [
//                                                    ["", "TODOS"],
//                                                    ["Z", "PENDIENTE"],
//                                                    ["T", "TOTAL"],
//                                                    ["X", "PARCIAL"] 
//                                                ]
//                                            }),
//                                            queryMode: 'local',
//                                            triggerAction: 'all',
//                                            autoSelect: false,
//                                            forceSelection: true,
//                                            caseSensitive: false,
//                                            editable: true,
//                                            typeAhead: true,
//                                            valueField: 'code', displayField: 'name',
//                                            width: 250,
//                                            height: 24,
//                                            value: "",
////                                            listConfig: {
////                                                maxHeight: 111
////                                            },
//                                            enableKeyEvents: true,
//                                            padding: '0 0',
//                                            listeners: {
//                                                //change: 'cmbfiltro_clickHandler'
//                                            }
//                                        },
//                                        {
//                                            xtype: 'toolbar',
//                                            dock: 'bottom',
//                                            ui: 'footer',
//                                            margin: '2 0 2 15',
//                                            layout: {
//                                                pack: 'center'
//                                            },
//                                            fieldStyle: 'text-align:center',
//                                            defaults: {
//                                                scale: 'medium'
//                                            },
//                                            items: [
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id + '-btn-apl-batch',
//                                                    text: 'Aplicar pago masivo',
//                                                    icon: 'resources/img/icon/single_format.png',                                                    
//                                                    listeners: {
//                                                        click: 'btnAplPaymentBatch'
//                                                    }
//                                                },
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id + '-btn-apl-reporte',
//                                                    text: 'Aplicar por reporte',
//                                                    icon: 'resources/img/botones/check.png',                                                    
//                                                    listeners: {
//                                                        click: 'btnApl_pay_click'
//                                                    }
//                                                }
//                                            ]
//                                        }
//                                        
//                                    ]
//                                }
                                // </editor-fold>                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});