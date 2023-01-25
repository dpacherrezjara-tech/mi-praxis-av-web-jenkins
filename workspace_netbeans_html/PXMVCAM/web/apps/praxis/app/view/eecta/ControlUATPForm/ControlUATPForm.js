prototype.widthContenedor = 1200;
prototype.widthGrid = '100%';
prototype.id01 = 'Info01';
prototype.id02 = 'ControlUATPProcesarForm';
prototype.id03 = 'ControlUATPUUIDForm';
prototype.id04 = 'ControlUATPErroresForm';

Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ControlUATPForm',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATP.ControlUATPController',
        'Ext.Praxis.view.eecta.ControlUATPForm.Options',
        'Ext.Praxis.view.eecta.ControlUATPForm.Filters',
        'Ext.Praxis.view.eecta.ControlUATPForm.Info00',
        'Ext.Praxis.view.eecta.ControlUATPForm.Info01'
    ],
    controller: 'ControlUATPController',
    id: prototype.id + '-ContenedorMain',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panel-contenedor-grid',
                                            height: 550,
                                            //border:true,
                                            layout: 'fit',
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="setGridData">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    align: 'center',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'background: transparent',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            border: true,
                                                            width: 185,
                                                            padding: '1 1 1 1',
                                                            items: [
                                                                {
                                                                    xtype: prototype.id + '-info00'
                                                                }
                                                            ]

                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            border: true,
                                                            width: '100%',
                                                            padding: '1 1 1 1',
                                                            layout: 'vbox',
                                                            items: [
                                                                {
                                                                    // <editor-fold defaultstate="collapsed" desc="BoxFilter_grid01">
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-BoxFilter02',
                                                                    border: false,
                                                                    hidden: false,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'background: transparent;"',
                                                                    margin: '1 0',
                                                                    items: [
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-FCONT',
                                                                            fieldLabel: 'Fecha Contable', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                                                            enableKeyEvents: true,
                                                                            width: 210, readOnly: true,
                                                                            height: 24
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            text: 'Filtrar:',
                                                                            margin: '1 0 0 10'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-rowIndex',
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-TKT-NUMBER',
                                                                            fieldLabel: 'Nº Ticket', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                                                            enableKeyEvents: true,
                                                                            enforceMaxLength: true,
                                                                            maxLength: 13,
                                                                            width: 200,
                                                                            height: 24,
                                                                            listeners: {
                                                                                keypress: 'onTxtFilterTKTKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-TKT-NUMBER-SEQ',
                                                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                                                            enableKeyEvents: true,
                                                                            width: 30,
                                                                            value: '00',
                                                                            height: 24,
                                                                            padding: '0 0 0 2',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 2,
                                                                            listeners: {
                                                                                keypress: 'onTxtFilterTKTKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-STSTKT',
                                                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 95,
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["", "TODOS"],
                                                                                    ["2", "ERRORES"],
                                                                                    ["0", "OK"]
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
                                                                            width: 200,
                                                                            height: 24,
                                                                            value: "",
                                                                            enableKeyEvents: true,
                                                                            padding: '0 0',
                                                                            listeners: {
                                                                                change: 'cmbfiltroSTS_clickHandler'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'button',
                                                                            margin: '0 0 0 15',
                                                                            id: prototype.id + '-btn-errores',
                                                                            text: 'Errores',
                                                                            icon: 'resources/img/botones/error.png',
                                                                            listeners: {
                                                                                click: 'btnFormErrores_click'
                                                                            }
                                                                        }
                                                                    ]
                                                                            //</editor-fold> 
                                                                },
                                                                {
                                                                    xtype: prototype.id01 + '-info01'
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
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});